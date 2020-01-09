const ImageView = require("sf-core/ui/imageview");
const Application = require("sf-core/application");
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const Button = require('sf-core/ui/button');

var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                const self = this;
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
            }
        });
         this.android.transitionViewsCallback = {
            onTransitionStart: () => console.log("onTransitionStart page 1 "),
            onTransitionEnd: () => console.log("onTransitionEnd page 1 ")
        };
        const self = this;

        this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.layout.alignItems = FlexLayout.AlignItems.CENTER;

        var myImageView = new ImageView({
            width: 50,
            height: 50,
            image: "images://smartface.png",
            onTouch: function() {
                console.log("on touch");
                self.router.push("/pages/modal/page2");
            }
        });
        this.layout.addChild(myImageView);

        myImageView.transitionId = "icon";
        this.transitionViews = [myImageView];
    }
);
module.exports = Page1;
