const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * SponsorCategory Model
 * ==================
 */

const SponsorCategory = new keystone.List('SponsorCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	sortable: true,
	sortContext: 'Edition:sponsor-categories'
});

SponsorCategory.add({
	name: { type: String, required: true },
	singular: {type: String},
	perColumn: {type: Number, label: 'Sponsor logos per column'},
	showName: {type: Boolean, label: 'Show sponsor category name in sponsor list', default: true},
	imageAdjust: {
		maxHeight: {type: String, label: 'Max height (px, em, rem, %)'},
		maxWidth: {type: String, label: 'Max width (px, em, rem, %)'}
	},
	edition: {type: Types.Relationship, ref: 'Edition', many: true}
});

SponsorCategory.relationship({  path: 'sponsor-categories', ref: 'Sponsor', refPath: 'category'});

SponsorCategory.register();
