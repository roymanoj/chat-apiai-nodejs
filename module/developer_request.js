/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var Request = require('./request').Request;
var util = require('util');

exports.DeveloperRequest = module.exports.DeveloperRequest = DeveloperRequest;

util.inherits(DeveloperRequest, Request);

function DeveloperRequest(application, options) {
    this.developerAccessToken = application.developerAccessToken;
    DeveloperRequest.super_.apply(this, arguments);
}

DeveloperRequest.prototype._headers = function() {
    var self = this;

    return {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + self.developerAccessToken,
        'api-request-source': self.requestSource
    };
};