// An instance of the Stack is used to attach event listeners.
const stack = window.swing.Stack();

// Application Variables
var booking = {
    location: "",
    guests: 0,
    dates: "",
    days: 0,
};

// Listings
var listings = {
    totalLoaded: 0,
    properties: [],
    likedProperties: [],
    dislikedProperties: []
}

// Set the citys
var citys = [];
function GetCitys(result) {
    citys = result;
};

// =================================================================
// 
//                       General Functions
// 
// =================================================================

// Api call
function getData(file, callBack) {
    $.ajax({
        url: file,
        type: "GET",
        success: function (result) {
            // console.log(result);
            callBack(result);
        },
        error: function (error) {
            console.log(error)
        }
    })
}

// =================================================================
// 
//                           Home View
// 
// =================================================================

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
function createMapPoint(point, features) {
    features.push({
        'type': 'Feature',
        'properties': {
            'city': point.city,
            'country': point.country
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

// Creates a point on the home page map for each city in the array
// Returns a features array to be inserted into the map
function getCityPoints() {
    var features = [];
    $.each(citys, function (i, val) {
        createMapPoint(val, features);
    });
    return features;
};

// On load add points to the home screen map
map.on('load', function () {
    // Add an image to use as a custom point
    map.loadImage(
        'https://img.icons8.com/ultraviolet/80/000000/circled-dot.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('custom-marker', image);
            // Add a GeoJSON source with 3 points.
            map.addSource('points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': getCityPoints()
                }
            });

            // Add a symbol layer
            map.addLayer({
                'id': 'symbols',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    'icon-image': 'custom-marker'
                }
            });
        }
    );

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

// Date Picker
var input = document.getElementById('dates');
var datepicker = new HotelDatepicker(input, {
    format: 'MM-DD-YYYY'
});

// Return days between two dates
function daysBetween(firstDate, secondDate) {
    var startDay = new Date(firstDate);
    var endDay = new Date(secondDate);
    var millisBetween = startDay.getTime() - endDay.getTime();
    var days = millisBetween / (1000 * 3600 * 24);

    return Math.round(Math.abs(days));
};

// On form home form submit
function home_submitForm() {
    try {

        // Correctly format location and split off the city name
        var location = $("input.mapboxgl-ctrl-geocoder--input").val();
        var city = location.split(',')[0];

        // Check the city is an accepted location
        if (citys.filter(p => p.city == city).length >= 1) {
            // Set the booking location to the city name
            booking.location = city;
        } else {
            // If the city isnt in the citys array throw an error
            throw new Error("The location selected doesn't have any listings");
        }

        // Set the number of guests in the booking
        booking.guests = $('#booking-form #guests').val();

        // Split the dates into an array
        // Set the dates in the booking
        booking.dates = $('#booking-form #dates').val().split(' - ');

        // Set the number of days into the booking
        // Call the days between function to calculate the days between the two dates
        booking.days = daysBetween(booking.dates[0], booking.dates[1]);

        // Hide the home view
        $("#home").addClass("hidden");

        // Run the listnigs view
        view_listings()
    } catch (err) {
        alert(err.message);
    };
};

function view_home() {
    $("#booking-form").on('submit', function (e) {
        e.preventDefault();
        home_submitForm();
    });
};

// =================================================================
// 
//                          Listings View
// 
// =================================================================

// Create listing template
function createListing(listing) {
    // Listing template
    var template = `
        <img src="${listing.fields.xl_picture_url}" class="h-full pointer-events-none object-cover">
    `;

    // Create the DOM element
    let element = document.createElement('li');
    // Set the element data
    $(element).data("recordid", listing.recordid);
    element.innerHTML = template;

    // Return template
    return element;
};

function generateListings(num, start, location) {
    var link = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=${num}&start=${start}&facet=host_response_time&facet=host_response_rate&facet=host_verifications&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features&refine.city=${location}`;
    getData(link, insertListings);
}

    // Callback Function
    // Called when listings data is pulled from the api
    function insertListings(result) {
        var records = result.records;
    
        listings.properties = listings.properties.concat(records);
        listings.totalLoaded += records.length;
        console.log("adding to the total: " + records.length);

        // For each record create a listing element
        records.forEach((listing) => {
            var targetElement = createListing(listing);
            $('#listings').append(targetElement);
            // Add card element to the Stack.
            stack.createCard(targetElement, true);
            targetElement.classList.add('in-deck');
        });
    }

// Update the listings
function updateListings(location, num) {
    var start = listings.totalLoaded + 1;
    generateListings(num, start, location)
}

// Event listners for card events e.g. swipes or taps
function cardStackEvents() {
    stack.on('throwout', function (e) {

        var numCards = document.querySelectorAll('.in-deck').length;
        if (numCards < 6) {
            updateListings(booking.location, 5);
        }
    });

    stack.on('throwoutright', function (e) {
        for (listing of listings.properties) {
            if (listing.recordid === $(e.target).data("recordid")) {
                listings.likedProperties.push(listing);
                e.target.remove();
            }
        }
    });

    stack.on('throwoutleft', function (e) {
        for (listing of listings.properties) {
            if (listing.recordid === $(e.target).data("recordid")) {
                listings.dislikedProperties.push(listing);
                e.target.remove();
            }
        }
    });
}

// 
function search() {
    var searchObject = '#search_city';

    // Fill select feild with citys
    // 
    $.each(citys, function (i, city) {
        $(searchObject).append($('<option>', {
            value: city.city,
            text: city.city
        }));
    });
    $(searchObject).val(booking.location);

    updateListings(booking.location, 10);

    // Detect change in select feild
    $(searchObject).change(function () {
        var value = $(this).val();

        // Reset listings
        $('#listings').html('');

        // Update booking location
        booking.location = value;
        updateListings(booking.location, 10);
    });
};

function view_listings() {
    // Hide the home view
    $("#viewListings").removeClass("hidden");

    search();
    cardStackEvents();
};

// =================================================================
// 
//                                Nav
// 
// =================================================================

function nav() {
    var navObject = '#nav';
};

// =================================================================
// 
//                                App
// 
// =================================================================

function App() {
    // Get city data
    getData('../json/locations.json', GetCitys)
    // Load home view
    view_home();
    // Load nav systems
    nav();
};

// Onload
App();