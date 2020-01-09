const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const ImageView = require('sf-core/ui/imageview');

var Page2 = extend(Page)(
    function(_super) {
        var self = this;
        _super(this, {
            onShow: function(params) {},
            onLoad: function() {
                self.headerBar.visible = false;
                self.toBack = false;
                var myImageView = new ImageView({
                    flexGrow: 1,
                    image: "images://smartface.png",
                    onTouch: function() {
                        if (self.toBack) {
                            self.toBack = false;
                            self.router.dismiss();
                        }
                        else {
                            self.toBack = true;
                            self.router.push("/pages/modal/next/page3");
                        }
                    }
                });

                self.layout.addChild(myImageView);
                myImageView.transitionId = "icon";
            }
        });
        this.android.transitionViewsCallback = {
            onTransitionStart: () => console.log("onTransitionStart page 2 "),
            onTransitionEnd: () => console.log("onTransitionEnd page 2 ")
        };
    }
);
module.exports = Page2;
