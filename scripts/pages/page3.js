const View = require("sf-core/ui/view");
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
        this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.layout.alignItems = FlexLayout.AlignItems.CENTER;
        
        const self  = this;
        
        var myImageView = new View({
            backgroundColor: Color.RED,
            onTouch: () => {
                self.router.dismiss();
            }
        });
        this.layout.addChild(myImageView);
    }
);
module.exports = Page1;
