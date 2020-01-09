const Color = require("sf-core/ui/color");
const FlexLayout = require("sf-core/ui/flexlayout");
/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const DialogTestNewDesign = require('ui/ui_dialogTestNew');

const DialogTestNew = extend(DialogTestNewDesign)(
	// Constructor
	function(_super) {
		// Initalizes super class for this page scope
		_super(this);
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
	}
);

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
	superOnShow();

	let flWrapper = new FlexLayout({
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		positionType: FlexLayout.PositionType.ABSOLUTE,
		backgroundColor: Color.GRAY
	});

	// flWrapper.addChild(myActivityIndicator);
	// flWrapper.height = Screen.height - Application.statusBar.height;
	this.layout.addChild(flWrapper);
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
	superOnLoad();
}

module.exports = DialogTestNew;
