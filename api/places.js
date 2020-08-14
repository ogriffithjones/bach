import Client from './client.js'

function getPlaces(options) {
    let url = '/places.json';
    return Client.get({
        url: url,
        filter: options.filter,
        includeResponse: true
    })
}

function generateMenuItems() {
    let url = '/places.json';
    return Client.request({
        url: url,
        // includeResponse: true
    }).then((response) => {
        let listings = response;

        for (let i in listings) {
            let menu = [];
    
            for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
    
                var things = ['Cauliflower and monkfish korma', 'Sausage and egg soup', 'Potato and pineapple skewers', 'Eel and durian salad', 'Cheese and cod gyoza', 'Blackcurrant and sesame crepes', 'Jalapeno and cardamom gyoza', 'Pepper and mushroom burgers', 'Strawberry and raita salad', 'Melon and rabbit salad', 'Pumpkin and pepper stir fry', 'Rosemary and chilli parcels', 'Pancetta and cheese spaghetti', 'Chicken and artichoke soup', 'Breadfruit and gorgonzola salad', 'Coriander and cardamom cookies', 'Pork and chard stew', 'Fettuccine salad with garlic dressing', 'Mustard seed and amchoor vindaloo', 'Parmesan and mango soup', 'Duck and tumeric madras', 'Basil and mozzarella skewers', 'Lemon and vanilla pudding', 'Spinach and mango vindaloo', 'Sole and apple dumplings', 'Boysenberry and lumache salad', 'Bacon and sausage fusilli', 'Cinnamon and sultana buns', 'Banana and cod vindaloo', 'Falafel and squash sausages'];
                var thing = things[Math.floor(Math.random() * things.length)];
                var price = (Math.random() * (25 - 5) + 5).toFixed(2);
    
                menu.push({ name: thing, price: price });
            }
    
            listings[i].menu = menu;
        }
    
        // document.write(listings);
        console.log(JSON.stringify(listings))
    })
}

function getPlace(options) {
    let url = '/places.json';
    return Client.get({
        url: url,
        id: options.id,
        includeResponse: true
    })
}

export default {
    getPlaces: getPlaces,
    getPlace: getPlace,
    generateMenuItems: generateMenuItems
}