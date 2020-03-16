const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const Button = require('sf-core/ui/button');
const Application = require('sf-core/application');
const TextAlignment = require('sf-core/ui/textalignment');
const Page2 = require('ui/ui_page2');

var Page1 = extend(Page2)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false; //For Android

                // this.btnSayHello.height = 30;

            }

        });
        this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.layout.alignItems = FlexLayout.AlignItems.CENTER;

        var myButton = new Button({
            width: 90,
            height: 30,
            text: "Button2",
            textColor:Color.BLACK,
            padding: 4,
            backgroundColor: Color.create("#00A1F1"),
            onPress: function() {
                console.log("Button pressed");
            }
        });

        this.layout.addChild(myButton);
    
    }
);
module.exports = Page1;