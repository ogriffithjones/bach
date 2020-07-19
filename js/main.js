// Application Variables
var booking = {
    location: "",
    guests: 0,
    dates: "",
    days: 0,
};

var citys = [
    {
        "city": "Paris",
        "city_ascii": "Paris",
        "lat": 48.8667,
        "lng": 2.3333,
        "country": "France",
        "iso2": "FR",
        "iso3": "FRA",
        "admin_name": "Île-de-France",
        "capital": "primary",
        "population": 9904000,
        "id": 1250015082
    },
    {
        "city": "London",
        "city_ascii": "London",
        "lat": 51.5,
        "lng": -0.1167,
        "country": "United Kingdom",
        "iso2": "GB",
        "iso3": "GBR",
        "admin_name": "London, City of",
        "capital": "primary",
        "population": 8567000,
        "id": 1826645935
    },
    {
        "city": "Berlin",
        "city_ascii": "Berlin",
        "lat": 52.5218,
        "lng": 13.4015,
        "country": "Germany",
        "iso2": "DE",
        "iso3": "DEU",
        "admin_name": "Berlin",
        "capital": "primary",
        "population": 3406000,
        "id": 1276451290
    },
    {
        "city": "New York",
        "city_ascii": "New York",
        "lat": 40.6943,
        "lng": -73.9249,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "New York",
        "capital": "",
        "population": 19354922,
        "id": 1840034016
    },
    {
        "city": "Roma",
        "city_ascii": "Roma",
        "lat": -26.5594,
        "lng": 148.7907,
        "country": "Australia",
        "iso2": "AU",
        "iso3": "AUS",
        "admin_name": "Queensland",
        "capital": "",
        "population": 5496,
        "id": 1036698836
    },
    {
        "city": "Barcelona",
        "city_ascii": "Barcelona",
        "lat": 41.3833,
        "lng": 2.1834,
        "country": "Spain",
        "iso2": "ES",
        "iso3": "ESP",
        "admin_name": "Catalonia",
        "capital": "admin",
        "population": 4920000,
        "id": 1724594040
    },
    {
        "city": "Brooklyn",
        "city_ascii": "Brooklyn",
        "lat": 40.6501,
        "lng": -73.9496,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "New York",
        "capital": "",
        "population": 2629150,
        "id": 1840034030
    },
    {
        "city": "Amsterdam",
        "city_ascii": "Amsterdam",
        "lat": 52.35,
        "lng": 4.9166,
        "country": "Netherlands",
        "iso2": "NL",
        "iso3": "NLD",
        "admin_name": "Noord-Holland",
        "capital": "primary",
        "population": 1031000,
        "id": 1528355309
    },
    {
        "city": "Madrid",
        "city_ascii": "Madrid",
        "lat": 40.4,
        "lng": -3.6834,
        "country": "Spain",
        "iso2": "ES",
        "iso3": "ESP",
        "admin_name": "Madrid",
        "capital": "primary",
        "population": 5567000,
        "id": 1724616994
    },
    {
        "city": "Toronto",
        "city_ascii": "Toronto",
        "lat": 43.7,
        "lng": -79.42,
        "country": "Canada",
        "iso2": "CA",
        "iso3": "CAN",
        "admin_name": "Ontario",
        "capital": "admin",
        "population": 5213000,
        "id": 1124279679
    },
    {
        "city": "Austin",
        "city_ascii": "Austin",
        "lat": 30.3006,
        "lng": -97.7517,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "Texas",
        "capital": "admin",
        "population": 1638716,
        "id": 1840019590
    },
    {
        "city": "San Francisco",
        "city_ascii": "San Francisco",
        "lat": 37.7562,
        "lng": -122.443,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "California",
        "capital": "",
        "population": 3603761,
        "id": 1840021543
    },
    {
        "city": "Washington",
        "city_ascii": "Washington",
        "lat": 38.9047,
        "lng": -77.0163,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "District of Columbia",
        "capital": "primary",
        "population": 5289420,
        "id": 1840006060
    },
    {
        "city": "Montréal",
        "city_ascii": "Montreal",
        "lat": 45.5,
        "lng": -73.5833,
        "country": "Canada",
        "iso2": "CA",
        "iso3": "CAN",
        "admin_name": "Québec",
        "capital": "",
        "population": 3678000,
        "id": 1124586170
    },
    {
        "city": "San Diego",
        "city_ascii": "San Diego",
        "lat": 32.8312,
        "lng": -117.1225,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "California",
        "capital": "",
        "population": 3210314,
        "id": 1840021990
    },
    {
        "city": "Edinburgh",
        "city_ascii": "Edinburgh",
        "lat": 55.9483,
        "lng": -3.2191,
        "country": "United Kingdom",
        "iso2": "GB",
        "iso3": "GBR",
        "admin_name": "Edinburgh, City of",
        "capital": "admin",
        "population": 504966,
        "id": 1826492520
    },
    {
        "city": "Rome",
        "city_ascii": "Rome",
        "lat": 34.2662,
        "lng": -85.1862,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "Georgia",
        "capital": "",
        "population": 60966,
        "id": 1840014681
    },
    {
        "city": "Vancouver",
        "city_ascii": "Vancouver",
        "lat": 49.2734,
        "lng": -123.1216,
        "country": "Canada",
        "iso2": "CA",
        "iso3": "CAN",
        "admin_name": "British Columbia",
        "capital": "",
        "population": 2313328,
        "id": 1124825478
    },
    {
        "city": "New Orleans",
        "city_ascii": "New Orleans",
        "lat": 30.0687,
        "lng": -89.9288,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "Louisiana",
        "capital": "",
        "population": 1029123,
        "id": 1840001839
    },
    {
        "city": "Chicago",
        "city_ascii": "Chicago",
        "lat": 41.8373,
        "lng": -87.6862,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "Illinois",
        "capital": "",
        "population": 8675982,
        "id": 1840000494
    },
    {
        "city": "Dublin",
        "city_ascii": "Dublin",
        "lat": 53.3331,
        "lng": -6.2489,
        "country": "Ireland",
        "iso2": "IE",
        "iso3": "IRL",
        "admin_name": "Dublin",
        "capital": "primary",
        "population": 1059000,
        "id": 1372595407
    },
    {
        "city": "Hong Kong",
        "city_ascii": "Hong Kong",
        "lat": 22.305,
        "lng": 114.185,
        "country": "Hong Kong",
        "iso2": "HK",
        "iso3": "HKG",
        "admin_name": "",
        "capital": "",
        "population": 7206000,
        "id": 1344982653
    },
    {
        "city": "Seattle",
        "city_ascii": "Seattle",
        "lat": 47.6211,
        "lng": -122.3244,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "Washington",
        "capital": "",
        "population": 3643765,
        "id": 1840021117
    }, {
        "city": "Portland",
        "city_ascii": "Portland",
        "lat": 45.5371,
        "lng": -122.65,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "Oregon",
        "capital": "",
        "population": 2052796,
        "id": 1840019941
    }, {
        "city": "Boston",
        "city_ascii": "Boston",
        "lat": 42.3188,
        "lng": -71.0846,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "Massachusetts",
        "capital": "admin",
        "population": 4637537,
        "id": 1840000455
    }, {
        "city": "Copenhagen",
        "city_ascii": "Copenhagen",
        "lat": 55.6786,
        "lng": 12.5635,
        "country": "Denmark",
        "iso2": "DK",
        "iso3": "DNK",
        "admin_name": "Hovedstaden",
        "capital": "primary",
        "population": 1085000,
        "id": 1208763942
    }, {
        "city": "Nashville",
        "city_ascii": "Nashville",
        "lat": 36.1715,
        "lng": -86.7843,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "Tennessee",
        "capital": "admin",
        "population": 1076645,
        "id": 1840036155
    }, {
        "city": "Montréal",
        "city_ascii": "Montreal",
        "lat": 45.5,
        "lng": -73.5833,
        "country": "Canada",
        "iso2": "CA",
        "iso3": "CAN",
        "admin_name": "Québec",
        "capital": "",
        "population": 3678000,
        "id": 1124586170
    }, {
        "city": "Queens",
        "city_ascii": "Queens",
        "lat": 40.7498,
        "lng": -73.7976,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "New York",
        "capital": "",
        "population": 2333054,
        "id": 1840034002
    }, {
        "city": "Denver City",
        "city_ascii": "Denver City",
        "lat": 32.968,
        "lng": -102.8318,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "Texas",
        "capital": "",
        "population": 5369,
        "id": 1840022029
    }, {
        "city": "Melbourne",
        "city_ascii": "Melbourne",
        "lat": -37.82,
        "lng": 144.975,
        "country": "Australia",
        "iso2": "AU",
        "iso3": "AUS",
        "admin_name": "Victoria",
        "capital": "admin",
        "population": 4170000,
        "id": 1036533631
    }, {
        "city": "Palma",
        "city_ascii": "Palma",
        "lat": 39.5743,
        "lng": 2.6542,
        "country": "Spain",
        "iso2": "ES",
        "iso3": "ESP",
        "admin_name": "Balearic Islands",
        "capital": "admin",
        "population": 375773,
        "id": 1724728111
    }, {
        "city": "Venice",
        "city_ascii": "Venice",
        "lat": 45.4387,
        "lng": 12.335,
        "country": "Italy",
        "iso2": "IT",
        "iso3": "ITA",
        "admin_name": "Veneto",
        "capital": "admin",
        "population": 270816,
        "id": 1380660414
    }, {
        "city": "Vienna",
        "city_ascii": "Vienna",
        "lat": 38.8996,
        "lng": -77.2597,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "Virginia",
        "capital": "",
        "population": 16544,
        "id": 1840003829
    }, {
        "city": "Oakland",
        "city_ascii": "Oakland",
        "lat": 41.0314,
        "lng": -74.2408,
        "country": "United States",
        "iso2": "US",
        "iso3": "USA",
        "admin_name": "New Jersey",
        "capital": "",
        "population": 13224,
        "id": 1840000912
    }, {
        "city": "Sydney",
        "city_ascii": "Sydney",
        "lat": -33.92,
        "lng": 151.1852,
        "country": "Australia",
        "iso2": "AU",
        "iso3": "AUS",
        "admin_name": "New South Wales",
        "capital": "admin",
        "population": 4630000,
        "id": 1036074917
    },

];

// =================================================================
// 
//                       General Functions
// 
// =================================================================

function getData(file) {
    $.ajax({
        url: file,
        type: "GET",
        success: function (result) {
            return result;
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

// Initalise the home page map
mapboxgl.accessToken = 'pk.eyJ1Ijoib2dyaWZmaXRoam9uZXMiLCJhIjoiY2o0dGZhdWZyMDdhdDJxbGE3cmw4cnEwNSJ9.HGvBtuM22otbwSeTLbLhRg';
var map = new mapboxgl.Map({
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-90.0066, 40.7135],
    zoom: 3.5,
    pitch: 45,
    bearing: -17.6,
    container: 'map',
    antialias: true
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: "Location",
    type: "place, locality",
    marker: false,
});

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
}

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
        <button type="button" class="">
            ${listing.name}
        </button>
    `;
    // Return template
    return template;
};

function getListings(city) {
    // $('#listings').html('');
    var link = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&facet=host_response_time&facet=host_response_rate&facet=host_verifications&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features`;
    var result = getData(link);
    // var results = result.records;
    console.log(result);
    // var html = "";
    // for (var i = 0; i < results.length; i++) {
    //     html += createListing(results[i]);
    // }

    // $('#listings').append(html);
}

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

    // Detect change in select feild
    $(searchObject).change(function () {
        var value = $(this).val();

        // Update booking location
        booking.location = value;
    });
}

function view_listings() {
    search()
    getListings(booking.location)

    // var link = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&facet=host_response_time&facet=host_response_rate&facet=host_verifications&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features`;

    // $.get(link, function (data, status) {
    //     console.log(data);
    //     return data;
    // });
}

// =================================================================
// 
//                                App
// 
// =================================================================

function App() {
    // Load home view
    view_home();
}

// Onload
App();