var keystone = require('../../../');

exports = module.exports = function(req, res) {

	keystone.render(req, res, 'home', {
		section: 'home',
		page: 'main',
		title: keystone.get('name') || 'Keystone',
		orphanedLists: keystone.getOrphanedLists()
	});

};
