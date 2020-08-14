// Import API calls
import citys from '../api/citys.js'
import places from '../api/places.js'

/////////////////////////////// MAP ////////////////////////////////
// Initalise the home page map
mapboxgl.accessToken = 'pk.eyJ1Ijoib2dyaWZmaXRoam9uZXMiLCJhIjoiY2o0dGZhdWZyMDdhdDJxbGE3cmw4cnEwNSJ9.HGvBtuM22otbwSeTLbLhRg';
var map = new mapboxgl.Map({
    // Set to light style and cetntre on the states
    style: 'mapbox://styles/mapbox/light-v10',
    center: [172.139012, -41.607228],
    zoom: 6,
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
    // Setup the current app booking, listings and other objects
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

    // Initalise the app
    init() {
        // Load in the citys
        this.loadCitys();
        // Set the current view to the home
        this.viewHome();
    };

    // View and setup the home view
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
        // For each city create a marker / feature point
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

    // Create a listing based on the html template
    createListing(listing) {
        // Listing template
        var extras = ``;
        // For each listing extras create a tab to be inserted to the listing
        listing.extras.forEach((extra) => {
            extras += `<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#${extra.name}</span>`
        });

        // Setup the listing template and insert data
        var template = `
            <a id="${listing.id}" href="#listingModal" rel="modal:open">
                <img class="w-full h-64 object-cover" src="${listing.thumbnail}">
                <div class="px-3 py-4">
                    <div class="font-bold text-xl mb-2">${listing.name}</div>
                    <p class="text-gray-700 text-base">
                    ${listing.price} /night 
                    </p>
                </div>
                <div class="px-3 py-4">
                    ${extras}
                </div>
            </a>
        `;

        // Create the DOM element
        let element = document.createElement('div');

        // Add a click listner to the lisiting
        element.addEventListener('click', () => {
            // On click run the lisitng modal function
            this.listingModal(listing.id);
        }, false);

        // Add a mouse over listner to the listing
        element.addEventListener('mouseover', () => {
            // Setup off set for mobile or desktop
            if (window.innerWidth < 600) {
                var offset = [150, -550]
            } else {
                var offset = [250, -550]
            }

            // Update Map position on hover
            this.listingsMap.map.flyTo({
                offset: offset,
                center: [
                    listing.location.long,
                    listing.location.lat
                ],
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });

            // Move the marker to current listing
            this.listingsMap.marker.setLngLat([listing.location.long, listing.location.lat])
        }, false);

        // Set the listing element to include the template
        element.innerHTML = template;

        // Return template
        return element;
    }

    // Set the modal data to the current listing
    listingModal(id) {
        // Get the current listing
        places.getPlace({ id: id }).then((listing) => {
            // Get the price for the num nights
            var price = listing.price * this.booking.nights;

            // Reset menu
            $('#listingModal_menu').html('');
            // For each menu item add a tab element with the menu items name and price
            listing.menu.forEach((item) => {
                // Setup the tap element
                let targetElement = document.createElement('div');
                // Setup the html content to be templated
                targetElement.innerHTML = `<p>${item.name} | ${item.price}</p>`;
                // Append the menu item into the menu area on the modal
                $('#listingModal_menu').append(targetElement);
                // Attach the correct element classes
                targetElement.classList.add('px-3', 'py-2', 'bg-gray-200', 'my-2', 'mx-3');
            })

            // Set the name on the modal
            $("#listingModal_name").text(`${listing.name}`);
            // Set the price to the correct dp
            $("#listingModal_price").text(`$${price.toFixed(2)} for ${this.booking.nights} night(s)`);
            // Show the location / city of the listing
            $("#listingModal_descTitle").text(`${listing.location.city}`);
            // Insert the description
            $("#listingModal_desc").text(`${listing.desc}`);
        });
    }

    // Load the lisitngs using filters and options
    loadListings(options) {
        // Get all listings with the correct filters to match the current search
        places.getPlaces({ filter: { location: this.booking.location, nights: this.booking.nights, guests: this.booking.guests } })
            .then((data) => {
                // If there arent any listings error and tell the user
                if (data.length == 0) {
                    // If no results are found tell the user
                    alert("No Results Found!")
                } else {
                    // If this is the first time loading, then run the viewListings function
                    if (options.first) {
                        this.viewListings()
                    }
                    // Add the listings
                    this.listings = data;
                    // Insert the listrings from the class into the DOM
                    this.insertListings();
                }
            })
    }

    // Insert listings into the DOM
    insertListings() {
        // For each lisiting
        this.listings.forEach((listing) => {
            // Create a listing element
            var targetElement = this.createListing(listing);
            // Append the lisitng card / element into the DOM
            $('#listings').append(targetElement);
            // Attach the correct classes
            targetElement.classList.add('w-full', 'md:w-1/2', 'lg:w-1/3', 'px-5', 'py-3');
        })
    }


    // Update the loaction
    updateLocation(city) {
        // Set the booking to the new location
        this.booking.location = city;

        // Reset listings
        $('#listings').html('');
        this.listings = [];
        // Update booking location
        this.loadListings({first: false});
    }

    // Update the number of guests
    updateGuests(guests) {
        // Set the booking to the new number of guests
        this.booking.guests = guests;

        // Reset listings
        $('#listings').html('');
        this.listings = [];
        // Update booking location
        this.loadListings({first: false});
    }


    // Home search function
    search() {
        var searchObject = '#search_city';

        // For each city
        $.each(this.citys, function (i, city) {
            // Apend the city to the select options
            $(searchObject).append($('<option>', {
                value: city.city,
                text: city.city
            }));
        });
        // Set the current option to the booking location / city
        $(searchObject).val(this.booking.location);

        // Add an event listner to the select input
        // On change update the current location and reload listings
        document.getElementById('search_city').addEventListener('change', (res) => {
            this.updateLocation(res.target.value)
        });

        // Add an event listner to the guest number input
        // On change update the current guests and reload listings
        document.getElementById('search_guests').addEventListener('change', (res) => {
            this.updateGuests(res.target.value)
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
            center: [172.139012, -41.607228],
            zoom: 20,
            container: 'listingMap',
            antialias: true
        });
        // Setup a marker on the map
        this.listingsMap.marker = new mapboxgl.Marker()
            .setLngLat([12.550343, 55.665957])
            .addTo(this.listingsMap.map);

        // Run the listings functions
        this.search();
    }
}

// Setup and init the app class
const app = new App();
app.init();
