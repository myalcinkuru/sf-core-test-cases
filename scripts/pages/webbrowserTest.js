const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Color = require('sf-core/ui/color');
const WebBrowser = require('sf-core/ui/webbrowser');

var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                const page = this;
                var webOptions = new WebBrowser.Options();
                webOptions.url = "https://smartface.io";
                webOptions.barColor = Color.RED;
                
                webOptions.ios.itemColor = Color.WHITE;
                webOptions.ios.statusBarVisible = true;
                WebBrowser.show(page, webOptions);
            }
        });
    }
);
module.exports = Page1;