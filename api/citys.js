// Import the client
import Client from './client.js'

// Get all the citys
function getCitys() {
	// Set url
	let url = '/locations.json';
	// Use the client to make a get request
	return Client.request({
		url: url,
		includeResponse: true
	})
}

// Export functions
export default {
	getCitys: getCitys
}