const Screen = require("sf-core/device/screen");
const Screen1 = require("sf-core/device/screen");
const Color = require("sf-core/ui/color");
const Application = require("sf-core/application");
const extend = require("js-base/core/extend");
const Dialog = require("sf-core/ui/dialog");
const FlexLayout = require("sf-core/ui/flexlayout");
const ActivityIndicator = require('sf-core/ui/activityindicator');
const WINDOW_SERVICE = 'window';
// const Page = require('ui/ui_page1');

var Page = require("sf-core/ui/page");

const Page1 = extend(Page)(
    function(_super) {  
        var self = this;
        _super(self);
        // this.parentController.headerBar.visible = false;
        // this.ios.safeAreaLayoutMode = false;
        this.onShow = function() {
            Application.statusBar.visible = true;
            this.headerBar.visible = true;
            
            // this.parentController.headerBar.backgroundColor = Color.BLUE;
            // this.parentController.headerBar.visible = false;

            // setInterval(() => {
            //     console.log("Screen size " + Screen.height + "width " + Screen.width + " orientation " + Screen.orientation);
            // }, 1000);
            // Application.statusBar.android.transparent  = true;

            this.layout.backgroundColor = Color.RED;

            this.orientation = Page.Orientation.AUTO;

            // this.ios.safeAreaLayoutMode = false;

            var myDialog = new Dialog({
                android: {
                    isTransparent: true,
                    cancelable: false
                }
            });

            myDialog.layout.alignItems = FlexLayout.AlignItems.CENTER;
            myDialog.layout.justifyContent = FlexLayout.JustifyContent.CENTER;

            var myActivityIndicator = new ActivityIndicator();
            let flWrapper = new FlexLayout({
                flexGrow: 1,
                backgroundColor: Color.GRAY
            });

            flWrapper.addChild(myActivityIndicator);
            // flWrapper.height = Screen.height - Application.statusBar.height;
            // this.layout.addChild(flWrapper);

            myDialog.layout.addChild(flWrapper);
            myDialog.layout.applyLayout();
            myDialog.show();

        }.bind(this);

        this.onLoad = function() {
            // this.parentController.headerBar.visible = false;
            // Application.statusBar.visible = false;
            // this.headerBar.visible = false;
            // this.ios.safeAreaLayoutMode = true;
        }.bind(this);
    });
module.exports = Page1;
