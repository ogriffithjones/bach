import Client from './client.js'

function getPlaces(options) {
    let url = '/places.json';
	return Client.get({
        url: url,
        filter: options.filter,
		includeResponse: true
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
    getPlace: getPlace
}