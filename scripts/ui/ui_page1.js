//------------------------------------------------------------------------------
//
//     This code was auto generated.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
//
//------------------------------------------------------------------------------

const extend = require('js-base/core/extend');
const PageBase = require('sf-core/ui/page');
const Page = extend(PageBase);
const pageContextPatch = require('@smartface/contx/lib/smartface/pageContextPatch');

function addChild(childName, ChildClass, pageInstance) {
	this.children = this.children || {};
	this.children[childName] = new ChildClass(pageInstance);
	if (this.layout) this.layout.addChild(this.children[childName]);
	else this.addChild(this.children[childName]);
}
// Constructor
function $Page1(_super, props) {
	// Initalizes super class for this page scope
	_super(
		this,
		Object.assign(
			{},
			{
				onLoad: onLoad.bind(this),
				orientation: PageBase.Orientation.PORTRAIT
			},
			props || {}
		)
	);
	this.children = {};
	this.children['statusBar'] = this.statusBar || {};
	this.children['headerBar'] = this.headerBar;

	pageContextPatch(this, 'page1');
}
$Page1.$$styleContext = {
	classNames: '.page',
	defaultClassNames: ' .default_page',
	userProps: {
		flexProps: { justifyContent: 'SPACE_BETWEEN', alignItems: 'STRETCH' },
		paddingBottom: 20,
		paddingLeft: 16,
		paddingRight: 16
	},
	statusBar: {
		classNames: '.statusBar',
		defaultClassNames: ' .default_statusBar',
		userProps: { visible: false }
	},
	headerBar: {
		classNames: '.headerBar',
		defaultClassNames: ' .default_headerBar',
		userProps: { visible: false }
	}
};
const $Page1_ = Page($Page1);

/**
 * @event onLoad
 * This event is called once when page is created. You can create views and add them to page in this callback.
 */
function onLoad() {
	// HeaderBar props
	this.headerBar.title = 'Page1';
}

module.exports = $Page1_;
