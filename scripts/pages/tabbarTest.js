const Image = require('sf-core/ui/image');
const extend = require("js-base/core/extend");
const TabBarController = require('sf-core/ui/tabbarcontroller');
const Color = require('sf-core/ui/color');
const TabBarItem = require('sf-core/ui/tabbaritem');
const Page = require('sf-core/ui/page');
const SamplePage = extend(Page)(
    function(_super, params) {
        _super(this, params);
        // this.statusBar.visible = false;
    }
);

var pgRecents = new SamplePage();
var pgFavorites = new SamplePage();
var pgContacts = new SamplePage();
var pgMessages = new SamplePage();
var tabPages = [pgRecents, pgFavorites, pgContacts, pgMessages];

var TabBarController1 = extend(TabBarController)(
    function(_super, params) {
        _super(this);
        this.onPageCreate = function(index) {
            return tabPages[index];
        };
        this.onShow = function() {
            this.headerBar.visible = false;
        }.bind(this);
        this.onHide = function() {
            console.log("hidden");
        }.bind(this);
        this.onLoad = function() {
            this.scrollEnabled = true;
            this.indicatorColor = Color.BLACK;
            this.indicatorHeight = 3;
            this.barColor = Color.create("#F3F0F0");
            this.textColor = {
                normal: Color.BLACK,
                selected: Color.create("#00A1F1")
            };
            this.items = items;
            this.autoCapitalize = true;
        }.bind(this);
        this.onSelected = function(index) {
            console.log("Selected item index: " + index);
        };
    }
);
var recentsImage = Image.createFromFile("images://icon.png");
var favImage = Image.createFromFile("images://icon.png");
var contactImage = Image.createFromFile("images://icon.png");
var messageImage = Image.createFromFile("images://icon.png");

var recentItem = new TabBarItem({
    title: "Recent",
    icon: recentsImage
});
var favItem = new TabBarItem({
    title: "Favorite",
    icon: favImage
});
var contactItem = new TabBarItem({
    title: "Contact",
    icon: contactImage
});
var messageItem = new TabBarItem({
    title: "Message",
    icon: messageImage
});

var items = [recentItem, favItem, contactItem, messageItem];
module.exports = TabBarController1;
