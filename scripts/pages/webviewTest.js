const Page = require("sf-core/ui/page");
const Application = require("sf-core/application");
const extend = require("js-base/core/extend");
const FlexLayout = require('sf-core/ui/flexlayout');
const WebView = require('sf-core/ui/webview');
const Color = require('sf-core/ui/color');

var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
                
                // myWebView.loadURL('https://www.smartface.io');
            }
        });
        this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.layout.alignItems = FlexLayout.AlignItems.CENTER;

        this.layout.backgroundColor = Color.RED;

        var myWebView = new WebView({
            left: 10,
            top: 10,
            right: 10,
            bottom: 10,
            positionType: FlexLayout.PositionType.ABSOLUTE,
            onChangedURL: function(event) {
                console.log("Event Change URL: " + event.url);
                return true;
            },
            onError: function(event) {
                console.log("Event Error : " + event.message + ", URL: " + event.url);
            },
            onLoad: function(event) {
                console.log("Event Load: " + event.url);
            },
            onShow: function(event) {
                console.log("Event Show: " + event.url);
            }
        });
        // myWebView.touchEnabled = false;
        myWebView.scrollEnabled = false;

        myWebView.onTouch = (event) => {
            console.log(" onTouch  x " + event.x + " y " + event.y);
        };
        myWebView.onTouchMoved = (inside, event) => {
            console.log(" onTouchMoved  x " + event.x + " y " + event.y + " inside  " + inside);
        };
        myWebView.onTouchEnded = (inside, event) => {
            console.log(" onTouchEnded  x " + event.x + " y " + event.y + " inside  " + inside);
        };
        myWebView.onTouchCancelled = (event) => {
            console.log(" onTouchCancelled  x " + event.x + " y " + event.y);
        };

        myWebView.android.page = this;
        myWebView.backgroundColor = Color.TRANSPARENT;

        //myWebView.nativeObject.setBackgroundColor(0);

        this.layout.addChild(myWebView);
    }
);
module.exports = Page1;
