const AttributedString = require("sf-core/ui/attributedstring");
const Font = require("sf-core/ui/font");
const Image = require('sf-core/ui/image');
const extend = require("js-base/core/extend");
const Color = require('sf-core/ui/color');
const TabBarItem = require('sf-core/ui/tabbaritem');
const Page = require('sf-core/ui/page');

const TabbarExtendedController = require("sf-core/ui/tabbarcontroller");

const SamplePage = extend(Page)(
    function(_super, params) {
        _super(this, params);
        this.layout.backgroundColor = params.bgColor;
        this.onHide = () => {
            console.log(" ON HIDE SamplePage")
        }
    }
);

var pgRecents = new SamplePage({ bgColor: Color.BLACK });
var pgFavorites = new SamplePage({ bgColor: Color.BLUE });
var pgContacts = new SamplePage({ bgColor: Color.WHITE });
var pgMessages = new SamplePage({ bgColor: Color.YELLOW });

var tabPages = [pgRecents, pgFavorites, pgContacts];

var TabBarController1 = extend(TabbarExtendedController)(
    function(_super, params) {
        _super(this);
        this.onPageCreate = function(index) {
            // console.log(" onPageCreate  index " + index);
            return tabPages[index];
        };
        this.onShow = function() {
            this.headerBar.visible = false;
        }.bind(this);
        this.onHide = function() {
            console.log("hidden");
        }.bind(this);
        this.onLoad = function() {
            console.log(" ===>>  " + (undefined instanceof TabBarItem));
            console.log(" ===>>  " + (this.constructor === TabBarController1));
            console.log(" ===>>  " + (this.constructor === "TabBarController1"));

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
        this.onSelected = (index) => {
            // console.log("Selected item index: " + index);
            // console.log(" current index " + this.selectedIndex);
        };
    }
);
var recentsImage = Image.createFromFile("images://icon.png");
var favImage = Image.createFromFile("images://icon.png");
var contactImage = Image.createFromFile("images://icon.png");
var messageImage = Image.createFromFile("images://icon.png");

var seleceteImg = Image.createFromFile("images://smartface.png");

var attributeString = new AttributedString();
attributeString.string = "First\n";
attributeString.foregroundColor = Color.GREEN;

//Constructor value ? 
var recentItem = new TabBarItem({
    icon: recentsImage,
    title: "TESTEST"
});

setTimeout(() => {
    recentItem.android.attributedTitle = attributeString;
}, 2000);


var attributeString1 = new AttributedString();
attributeString1.string = "Favorite\n";
attributeString1.foregroundColor = Color.PURPLE;

var favItem = new TabBarItem({
    android: {
        attributedTitle: attributeString,
        systemIcon : 17301545
    }
});

setTimeout(() => {
    favItem.icon = {
        normal: favImage,
        selected: seleceteImg
    };
}, 8000);


var contactItem = new TabBarItem({
    title: "Contact",
    icon: {
        normal: favImage,
        selected: seleceteImg
    }
});


var messageItem = new TabBarItem({
    title: "Message",
    icon: {
        normal: favImage,
        selected: seleceteImg
    }
});
var items = [recentItem, favItem, contactItem];

module.exports = TabBarController1;
