const Application = require("sf-core/application");
const extend = require("js-base/core/extend");
const Page = require("sf-core/ui/page");
const FlexLayout = require('sf-core/ui/flexlayout');
const SwipeView = require('sf-core/ui/swipeview');
const Label = require('sf-core/ui/label');
const Color = require('sf-core/ui/color');

const SwipeViewExtended = require("./swipeViewExtended");

var Page1 = extend(Page)(
    function(_super, params) {
        _super(this, params);
        this.onLoad = function() {
            this.theName = "Page1";
            this.layout.backgroundColor = Color.RED;
        }.bind(this);
    }
);
var Page2 = extend(Page)(
    function(_super, params) {
        _super(this, params);
        this.onLoad = function() {
            this.theName = "Page2";
            this.layout.backgroundColor = Color.YELLOW;
        }.bind(this);
    }
);
var Page3 = extend(Page)(
    function(_super, params) {
        _super(this, params);
        this.onLoad = function() {
            this.theName = "Page3";
            this.layout.backgroundColor = Color.BLUE;
        }.bind(this);
    }
);
var Page4 = extend(Page)(
    function(_super, params) {
        _super(this, params);
        this.onLoad = function() {
            this.theName = "Page4";
            this.layout.backgroundColor = Color.GREEN;
        }.bind(this);
    }
);

var SwipeViewPage = extend(Page)(
    function(_super) {
        var self = this;
        _super(this);

        this.onLoad = function() {
            Application.statusBar.visible = false;
            self.headerBar.visible = false;
            self.layout.flexDirection = FlexLayout.FlexDirection.COLUMN;
            self.layout.justifyContent = FlexLayout.JustifyContent.FLEX_START;
            self.layout.alignItems = FlexLayout.AlignItems.CENTER;

            var swipeView = new SwipeView({
                page: self,
                width: 400,
                maxHeight: 600,
                marginTop: 50,
                pages: [Page1, Page2, Page3, Page4]
            });

            swipeView.onPageSelected = function(position, pageInstance) {
                console.log(" position " + position + " page instance " + pageInstance.theName);
                console.log("swipeView current index " + swipeView.currentIndex);

            };

            swipeView.onPageScrolled = (position, offsetPixels) => {
                console.log(" position  " + position + " offsetPixels " + offsetPixels);
            };

            self.layout.addChild(swipeView);

            let locale = "eng";
            var labelState = new Label({
                width: 200,
                height: 65,
                text: "Waiting for State",
                onTouch: () => {
                    if (Application.android.locale === "ar")
                        locale = "eng"
                    else
                        locale = "ar"
                    Application.android.locale = locale; //language code
                    Application.restart();
                }
            });
            self.layout.addChild(labelState);
            self.layout.applyLayout();
        };
    }
);

module.exports = SwipeViewPage;
