// Setup and client class
class Client {
	// Set the base url
	constructor() {
        this.baseUrl = '../json';
    }
	
	// Setup the request function
	request(options) {

		// Return a promise allowing us to await the response
		return new Promise((resolve, reject) => {

			// Get the url and add it to the base from options
			let url = options.url;
            url = this.baseUrl + url;

			// Setup a XML http get request
			let xhr = new XMLHttpRequest();
			xhr.open(options.method || 'GET', url);

			// Setup the request body
			let body = options.body;
			if (options.data) {
				// Get response and format it to JSON
				body = JSON.stringify(options.data);
				// Set request headers
				xhr.setRequestHeader('content-type', 'application/json');
			}

			// Add an even listner for on load
			xhr.addEventListener('load', function() {

				// If the response is an error handel that and reject
				if (xhr.status >= 400) {
					var result = JSON.parse(xhr.responseText);
					var error = new Error(result.message);
					error.error = result.error;
					reject(error);
				}

				// Try and resolve the response
				try {
					// Parse the response
					resolve(JSON.parse(xhr.responseText));
				} catch (err) {
					// Catch and reject any errors
					reject(err);
				}
			}, false);
			// Add event listners for error and abort
			xhr.addEventListener('error', reject, false);
			xhr.addEventListener('abort', reject, false);
			// Send
			xhr.send(body);
		});
    }
	
	// Filter by id
    filterId (result, id) {
		// Return the result found with the requested id
        return result.find(obj => obj.id === id);
    }
	
	// Filter results by the current booking
	filterResult(result, filter) {
		// Return the filtered JSON
		return result.filter(function (obj) {
			// Return only objects that match the booking options / search
			return obj.location.city === filter.location && obj.minDays <= filter.nights && filter.nights <= obj.maxDays && obj.beds <= filter.guests 
        })
	}

	// Get request
    get(options) {
		// Return a promise that resolves with a JSON object
		return new Promise((resolve, reject) => {
			// Try to resolve
            try {
                resolve(
					// Set the method to GET
                    this.request({ method: 'GET', url: options.url })
                    .then((result) => {
						// If the get request includes an id
                        if(options.id){
							// Return it filtered by the id
							return(this.filterId(result, options.id));
						// Else filter by filters
                        } else {
							// Return it filtered by the filter options
                            return(this.filterResult(result, options.filter));
                        }
                    })
				);
			// Catch and error and reject
            } catch (err) {
                reject(err);
            }
		});
    }
}

// Setup a new client
var client = new Client();
// Export the client
export default client;