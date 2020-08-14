// Import the client
import Client from './client.js'

// Get all places that match filters
function getPlaces(options) {
    // Set url
    let url = '/places.json';
    // Use the client to make a request
    return Client.get({
        url: url,
        filter: options.filter,
        includeResponse: true
    })
}

// Generate menu items for all listings
function generateMenuItems() {
    // Set url
    let url = '/places.json';
    // Use the client to make a request
    return Client.request({
        url: url,
        // includeResponse: true
    }).then((response) => {
        // With a response back now create and insert menu items
        let listings = response;

        // For items in all the listings
        for (let i in listings) {
            let menu = [];
    
            // For a random number of times upto 10
            for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
                // Set the available item names
                var things = ['Cauliflower and monkfish korma', 'Sausage and egg soup', 'Potato and pineapple skewers', 'Eel and durian salad', 'Cheese and cod gyoza', 'Blackcurrant and sesame crepes', 'Jalapeno and cardamom gyoza', 'Pepper and mushroom burgers', 'Strawberry and raita salad', 'Melon and rabbit salad', 'Pumpkin and pepper stir fry', 'Rosemary and chilli parcels', 'Pancetta and cheese spaghetti', 'Chicken and artichoke soup', 'Breadfruit and gorgonzola salad', 'Coriander and cardamom cookies', 'Pork and chard stew', 'Fettuccine salad with garlic dressing', 'Mustard seed and amchoor vindaloo', 'Parmesan and mango soup', 'Duck and tumeric madras', 'Basil and mozzarella skewers', 'Lemon and vanilla pudding', 'Spinach and mango vindaloo', 'Sole and apple dumplings', 'Boysenberry and lumache salad', 'Bacon and sausage fusilli', 'Cinnamon and sultana buns', 'Banana and cod vindaloo', 'Falafel and squash sausages'];
                // Pick a random item name 
                var thing = things[Math.floor(Math.random() * things.length)];
                // Set the price between 5 and 25 upto 2dp
                var price = (Math.random() * (25 - 5) + 5).toFixed(2);
    
                // Push the new menu item to the menu items list
                menu.push({ name: thing, price: price });
            }
    
            // Set the lisitngs menu to the new one
            listings[i].menu = menu;
        }
    
        // document.write(listings);
        console.log(JSON.stringify(listings))
    })
}

// Get a single listing based on its id
function getPlace(options) {
    // Set url
    let url = '/places.json';
    // Use the client to make a get request
    // Send through the option of id
    return Client.get({
        url: url,
        id: options.id,
        includeResponse: true
    })
}

// Export the functions
export default {
    getPlaces: getPlaces,
    getPlace: getPlace,
    generateMenuItems: generateMenuItems
}