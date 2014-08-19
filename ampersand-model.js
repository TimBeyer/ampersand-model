var State = require('ampersand-state');
var _ = require('underscore');
var sync = require('ampersand-sync');
var syncMethods = require('./sync-methods')(sync);

var Model = State.extend(_.extend(syncMethods, {
    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function () {
        var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
        if (this.isNew()) return base;
        return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.getId());
    }
}));

// Throw an error when a URL is needed, and none is supplied.
var urlError = function () {
    throw new Error('A "url" property or function must be specified');
};

module.exports = Model;
