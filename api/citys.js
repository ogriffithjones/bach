import Client from './client.js'

function getCitys() {
	let url = '/locations.json';
	return Client.request({
		url: url,
		includeResponse: true
	})
}

export default {
	getCitys: getCitys
}