/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var DeveloperRequest = require('./developer_request').DeveloperRequest;
var util = require('util');

var ServerError = require('./exceptions').ServerError;

exports.JSONApiDeveloperRequest = module.exports.JSONApiDeveloperRequest = JSONApiDeveloperRequest;

util.inherits(JSONApiDeveloperRequest, DeveloperRequest);

function JSONApiDeveloperRequest() {
    JSONApiDeveloperRequest.super_.apply(this, arguments);
}

JSONApiDeveloperRequest.prototype._handleResponse = function(response) {
    var self = this;

    var body = '';

    response.on('data', function(chunk) {
        body += chunk;
    });

    response.on('end', function() {
        if (response.statusCode >= 200 && response.statusCode <= 299) {
            try {
                var json_body = JSON.parse(body);
                self.emit('response', json_body);
            } catch (error) {
                // JSON.parse can throw only one exception, SyntaxError
                // All another exceptions throwing from user function,
                // because it just rethrowing for better error handling.

                if (error instanceof SyntaxError) {
                    self.emit('error', error);
                } else {
                    throw error;
                }
            }
        } else {
            var error = new ServerError(response.statusCode, body, 'Wrong response status code.');
            self.emit('error', error);
        }
    });
};