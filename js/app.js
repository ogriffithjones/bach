// Import API calls
import citys from '../api/citys.js'
import places from '../api/places.js'

/////////////////////////////// MAP ////////////////////////////////
// Initalise the home page map
mapboxgl.accessToken = 'pk.eyJ1Ijoib2dyaWZmaXRoam9uZXMiLCJhIjoiY2o0dGZhdWZyMDdhdDJxbGE3cmw4cnEwNSJ9.HGvBtuM22otbwSeTLbLhRg';
var map = new mapboxgl.Map({
    // Set to light style and cetntre on the states
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-90.0066, 40.7135],
    zoom: 3.5,
    pitch: 45,
    bearing: -17.6,
    container: 'map',
    antialias: true
});

// Setup the geo coder object to be inserted into the DOM
var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: "Location",
    type: "place, locality",
    marker: false,
});

// Append the geocoder to my geocoder div
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

// Create a point on a map
// Pushes the point to the map features array
function createMapPoint(point) {
    return ({
        'type': 'Feature',
        'properties': {
            'city': point.city,
            'country': point.country,
            'title': point.city
        },
        'geometry': {
            'type': 'Point',
            'coordinates': [
                point.lng,
                point.lat
            ]
        }
    })
};


// On load add points to the home screen map
map.on('load', function () {
    // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    map.on('click', 'symbols', function (e) {
        // Format City, Country to set the geocode value to
        var country = e.features[0].properties.country;
        var city = e.features[0].properties.city;
        var geocode = city + ", " + country;
        // Set geocode value
        $("input.mapboxgl-ctrl-geocoder--input").val(geocode);

        // Move map view to that city
        map.flyTo({
            center: e.features[0].geometry.coordinates
        });
    });

    // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    map.on('mouseenter', 'symbols', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'symbols', function () {
        map.getCanvas().style.cursor = '';
    });
});
////////////////////////////////////////////////////////////////////

// Check for form submits
$("#booking-form").on('submit', function (e) {
    // Prevent default action
    e.preventDefault();
    // Run the form submit function
    app.submitForm();
});

// =================================================================
// 
//                               App
// 
// =================================================================

// Setup App Instance
class App {
    constructor() {
        this.booking = {
            listing: [],
            location: "",
            guests: 0,
            dates: {},
            nights: 0,
        },
            this.listings = [],
            this.citys = [],
            this.datepicker,
            this.listingsMap = {
                marker: {},
                map: {}
            }
    };

    init() {
        this.loadCitys()
        this.viewHome();
    };

    viewHome() {
        // Find the date picker input
        var input = document.getElementById('dates');
        // Setup the date input for the HotelDatepicker app
        this.datepicker = new HotelDatepicker(input, {
            format: 'MM-DD-YYYY'
        });
    };

    // Load citys from api
    loadCitys() {
        // Cal the citys api, then get the data and run create a function
        citys.getCitys().then((data) => {
            // Save citys to props
            this.citys = data;
            // Add the citys to the home page map
            this.mapOnLoad(this.getCityPoints(data));
        })
    };

    // Add points to the home map
    mapOnLoad(citys) {
        map.loadImage(
            'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
            function (error, image) {
                if (error) throw error;
                map.addImage('custom-marker', image);
                // Add a GeoJSON source with 2 points
                map.addSource('points', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': citys
                    }
                });

                // Add a symbol layer
                map.addLayer({
                    'id': 'symbols',
                    'type': 'symbol',
                    'source': 'points',
                    'layout': {
                        'icon-image': 'custom-marker',
                        // get the title name from the source's "title" property
                        'text-field': ['get', 'title'],
                        'text-font': [
                            'Open Sans Semibold',
                            'Arial Unicode MS Bold'
                        ],
                        'text-offset': [0, 1.25],
                        'text-anchor': 'top'
                    }
                });
            }
        );
    };

    // Creates a point on the home page map for each city in the array
    // Returns a features array to be inserted into the map
    getCityPoints(citys) {
        var features = [];
        $.each(citys, function (i, val) {
            features.push(createMapPoint(val));
        })
        return features;
    };

    // This function is given two dates
    // It will return the num nights between them
    daysBetween(firstDate, secondDate) {
        var startDay = new Date(firstDate);
        var endDay = new Date(secondDate);
        var millisBetween = startDay.getTime() - endDay.getTime();
        var days = millisBetween / (1000 * 3600 * 24);

        return Math.round(Math.abs(days));
    };

    // When the home forms submitted
    // Check the inputs for errors
    // Then run the listings view
    submitForm() {
        try {
            // Correctly format location and split off the city name
            var location = $("input.mapboxgl-ctrl-geocoder--input").val();
            var city = location.split(',')[0];

            // Check the city is an accepted location
            if (this.citys.filter(p => p.city == city).length >= 1) {
                // Set the booking location to the city name
                this.booking.location = city;
            } else {
                // If the city isnt in the citys array throw an error
                throw new Error("The location selected doesn't have any listings");
            }

            // Set the number of guests in the booking
            this.booking.guests = $('#booking-form #guests').val();

            // Split the dates into an array
            // Set the dates in the booking
            this.booking.dates = $('#booking-form #dates').val().split(' - ');

            // Set the number of days into the booking
            // Call the days between function to calculate the days between the two dates
            this.booking.nights = this.daysBetween(this.booking.dates[0], this.booking.dates[1]);

            // Try loading in lisitngs, Will tell the user if any errors occour with their inputs
            this.loadListings({ first: true });

        } catch (err) {
            alert(err.message);
        };
    }

    createListing(listing) {
        // Listing template
        var extras = ``;
        listing.extras.forEach((extra) => {
            extras += `<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#${extra.name}</span>`
        });

        var template = `
            <a id="${listing.id}" href="#listingModal" rel="modal:open">
                <img class="w-full h-64 object-cover" src="${listing.thumbnail}">
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">${listing.name}</div>
                    <p class="text-gray-700 text-base">
                    ${listing.price} /night 
                    </p>
                </div>
                <div class="px-6 py-4">
                    ${extras}
                </div>
            </a>
        `;

        // Create the DOM element
        let element = document.createElement('div');

        // Set the click listner
        // element.addEventListener('click', function () {
        //     this.listingModal(listing.id);
        // }, false);

        element.addEventListener('click', () => {
            this.listingModal(listing.id);
        }, false);

        element.addEventListener('mouseover', () => {
            console.log("yeet")

            if (window.innerWidth < 600){
                var offset = [150, -300]
            } else {
                var offset = [300, -300]
            }

            // Update Map
            this.listingsMap.map.flyTo({
                offset: offset,
                center: [
                    listing.location.lat,
                    listing.location.long
                ],
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });

            this.listingsMap.marker.setLngLat([listing.location.lat, listing.location.long])
        }, false);

        element.innerHTML = template;

        // Return template
        return element;
    }

    listingModal(id) {
        places.getPlace({ id: id }).then((listing) => {
            console.log(listing);
            var price = listing.price * this.booking.nights;

            $("#listingModal_name").text(`${listing.name}`);
            $("#listingModal_price").text(`${price}`);
            $("#listingModal_descTitle").text(`${listing.location.city}`);
            $("#listingModal_desc").text(`${listing.desc}`);
        });
    }

    loadListings(options) {
        places.getPlaces({ filter: { location: this.booking.location, nights: this.booking.nights, guests: this.booking.guests } })
            .then((data) => {
                if (data.length == 0) {
                    // If no results are found tell the user
                    alert("No Results Found!")
                } else {
                    // If this is the first time loading, then run the viewListings function
                    if (options.first) {
                        this.viewListings()
                    }
                    // Add the listings to this class
                    this.listings = data;
                    // Insert the listrings from the class into the DOM
                    this.insertListings();
                }
            })
    }

    insertListings() {
        this.listings.forEach((listing) => {
            var targetElement = this.createListing(listing);
            $('#listings').append(targetElement);
            targetElement.classList.add('w-full', 'md:w-1/2', 'lg:w-1/3', 'rounded', 'shadow-lg', 'bg-white', 'mx-5', 'my-3');
        })
    }

    // Home search function
    search() {
        var searchObject = '#search_city';

        // Fill select feild with citys
        // 
        $.each(this.citys, function (i, city) {
            $(searchObject).append($('<option>', {
                value: city.city,
                text: city.city
            }));
        });
        $(searchObject).val(this.booking.location);

        this.loadListings()

        // Detect change in select feild
        $(searchObject).change(function () {
            var value = $(this).val();

            // Reset listings
            $('#listings').html('');

            // Update booking location
            this.booking.location = value;
            updateListings(this.booking.location, 10);
        });
    }

    // Hide the home screen
    // Then setup a listing cards
    viewListings() {
        // Hide the home view
        $("#home").addClass("hidden");
        // Unhide the listings view
        $("#viewListings").removeClass("hidden");

        // Init the lisitngs map
        this.listingsMap.map = new mapboxgl.Map({
            // Set to light style and cetntre on the states
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-90.0066, 40.7135],
            zoom: 12,
            container: 'listingMap',
            antialias: true
        });
        this.listingsMap.marker = new mapboxgl.Marker()
            .setLngLat([12.550343, 55.665957])
            .addTo(this.listingsMap.map);

        // Run the listings functions
        this.search();
    }
}

const app = new App();
app.init();

// places.getPlace({id: 1}).then(function(data) {
//     console.log(data);
// })

// places.getPlaces({filter: "San Francisco"}).then(function(data) {
//     console.log(data);
// })