var _ = require('underscore');
var FieldType = require('../Type');
var RelationshipType = require('../relationship/RelationshipType');
var keystone = require('../../../');
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var util = require('util');
var utils = require('keystone-utils');

function relationship(list, path, options) {
	this.many = (options.many) ? true : false;
	this.filters = options.filters;
	this._defaultSize = this.many ? 'full' : 'large';
	this._nativeType = keystone.mongoose.Schema.Types.Mixed; // important
	this._underscoreMethods = ['format'];
	this._properties = ['isValid', 'many', 'filters', 'url'];
	relationship.super_.call(this, list, path, options);
}
util.inherits(relationship, FieldType);

relationship.prototype.getProperties = RelationshipType.prototype.getProperties;
relationship.prototype.addToSchema = RelationshipType.prototype.addToSchema;
relationship.prototype.addFilterToQuery = RelationshipType.prototype.addFilterToQuery;
relationship.prototype.format = RelationshipType.prototype.format;
relationship.prototype.validateInput = RelationshipType.prototype.validateInput;
relationship.prototype.updateItem = RelationshipType.prototype.updateItem;

Object.defineProperty(relationship.prototype, 'isValid', {
	get: function() {
		return keystone.list(this.options.ref) ? true : false;
	}
});

Object.defineProperty(relationship.prototype, 'refList', {
	get: function() {
		return { };
	}
});

Object.defineProperty(relationship.prototype, 'hasFilters', {
	get: function() {
		return (this.filters && _.keys(this.filters).length);
	}
});

/* Export Field Type */
exports = module.exports = relationship;
