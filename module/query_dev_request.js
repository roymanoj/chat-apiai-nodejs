/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var JSONApiDeveloperRequest = require('./json_api_dev_request').JSONApiDeveloperRequest;
var util = require('util');

exports.QueryDeveloperRequest = module.exports.QueryDeveloperRequest = QueryDeveloperRequest;

util.inherits(QueryDeveloperRequest, JSONApiDeveloperRequest);

function QueryDeveloperRequest(application, options) {
    var self = this;

    if (!('method' in options)) {
        throw new Error('Must specify method (POST/GET).');
    }
    if (!('path' in options)) {
        throw new Error('Must specify path.');
    }
    if ('version' in options) {
        self.version = options.version;
    }

    self.method = options.method;
    self.path = options.path;

    QueryDeveloperRequest.super_.apply(this, arguments);
}

QueryDeveloperRequest.prototype._requestOptions = function() {
    var self = this;

    var path = self.path;

    if (self.hasOwnProperty("version")) {
        path += '?v=' + self.version;
    }

    var request_options = QueryDeveloperRequest.super_.prototype._requestOptions.apply(this, arguments);

    request_options.path = self.endpoint + path;
    request_options.method = self.method;

    return request_options;
};

QueryDeveloperRequest.prototype._jsonRequestParameters = function() {
    var self = this;

    var json = {

    };

    return json;
};