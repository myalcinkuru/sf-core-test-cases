const extend = require('js-base/core/extend');
const PageTitleLayoutssDesign = require('library/PageTitleLayoutss');

const PageTitleLayoutss = extend(PageTitleLayoutssDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
	}
);

module.exports = PageTitleLayoutss;
