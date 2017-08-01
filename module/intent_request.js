/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';

var QueryDeveloperRequest = require('./query_dev_request').QueryDeveloperRequest;
var util = require('util');

exports.IntentRequest = module.exports.IntentRequest = IntentRequest;

util.inherits(IntentRequest, QueryDeveloperRequest);

function IntentRequest(application, options, intent) {
    IntentRequest.super_.apply(this, [application, options]);

    var self = this;
    self.intent = intent;
}

IntentRequest.prototype._headers = function() {
    var headers = IntentRequest.super_.prototype._headers.apply(this, arguments);

    headers['Content-Type'] = 'application/json; charset=utf-8';

    return headers;
};

IntentRequest.prototype._jsonRequestParameters = function() {
    var self = this;

    var json = IntentRequest.super_.prototype._jsonRequestParameters.apply(this, arguments);

	if(self.intent != undefined)
		json.intent = self.intent;

    return json;
};

IntentRequest.prototype.end = function() {
    var self = this;

    self.write(JSON.stringify(self._jsonRequestParameters()));

    IntentRequest.super_.prototype.end.apply(this, arguments);
};