# Fork of Node.js SDK for Api.ai - with ability to work on intents

This is a fork of the official Node.js client for [Api.ai](http://api.ai) - where we have added the ability to work with intents (create, udpate, list and remove).
Note that this fork requires the developer token as well - it's also suitable for other Api.ai objects that work with the developer token.

* [Installation](#installation)
* [Usage](#usage)

# Installation

* Install [Node.js](https://nodejs.org/)
* Install Api.ai SDK with `npm`:
```shell
npm install apiai
```

# Usage
* Create `main.js` file with the following code:
```javascript
var apiai = require('apiai');

var app = apiai("<your client access token>", "<your developer access token>");

function ask(text, options) {
	return new Promise((resolve, reject) => {
		var defaultOptions = {
			sessionId: '<unique session id>', // use any arbitrary id - doesn't matter
		};

		let request = app.textRequest(text, Object.assign(defaultOptions, options));

		request.on('response', (response) => {
			return resolve(response);
		});

		request.on('error', (error) => {
			return reject(error);
		});

		request.end();
	})
}

function getAllIntents(options) {
	return new Promise((resolve, reject) => {
		let request = app.intentGetRequest(options);

		request.on('response', (response) => {
			return resolve(response);
		});

		request.on('error', (error) => {
			return reject(error);
		});

		request.end();
	})
}

// ask something
ask('<Your text query>')
	.then(response => {
		console.log(response);
	}).catch(error => {
		console.log(error)
	});
	
// get list of all intents
getAllIntents()
	.then(intents => {
		console.log(intents);
	}).catch(error => {
		console.log(error)
	});


```
* Run following command.
```shell
node main.js
```
* Your can find more examples in [`samples`](samples) directory.
