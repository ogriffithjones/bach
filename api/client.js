class Client {

	constructor() {
        this.baseUrl = '../json';
        this.test;
    }
    
	request(options) {

		return new Promise((resolve, reject) => {

			let url = options.url;
            url = this.baseUrl + url;

			let xhr = new XMLHttpRequest();
			xhr.open(options.method || 'GET', url);

			let body = options.body;
			if (options.data) {
				body = JSON.stringify(options.data);
				xhr.setRequestHeader('content-type', 'application/json');
			}

			xhr.addEventListener('load', function() {

				if (xhr.status >= 400) {
					var result = JSON.parse(xhr.responseText);
					var error = new Error(result.message);
					error.error = result.error;
					reject(error);
				}

				try {
					resolve(JSON.parse(xhr.responseText));
				} catch (err) {
					reject(err);
				}
			}, false);
			xhr.addEventListener('error', reject, false);
			xhr.addEventListener('abort', reject, false);
			xhr.send(body);
		});
    }
    
    filterId (result, id) {
        return result.find(obj => obj.id === id);
    }

    filterCity(result, filter) {
        return result.filter(function (obj) {
            return obj.location.city === filter
        })
    }

    get(options) {
		return new Promise((resolve, reject) => {
            try {
                resolve(
                    this.request({ method: 'GET', url: options.url })
                    .then((result) => {
                        if(options.id){
                            return(this.filterId(result, options.id));
                        } else {
                            return(this.filterCity(result, options.filter));
                        }
                    })
                );
            } catch (err) {
                reject(err);
            }
		});
    }
}

var client = new Client();
export default client;