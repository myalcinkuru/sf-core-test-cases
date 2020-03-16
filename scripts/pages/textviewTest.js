const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const TextView = require('sf-core/ui/textview');
const TextAlignment = require('sf-core/ui/textalignment');
const EllipsizeMode = require('sf-core/ui/ellipsizemode');
const Font = require('sf-core/ui/font');


var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                // Application.statusBar.visible = false;
                // this.headerBar.visible = false;
            },
            onLoad: function(params){
            var myText = new TextView({
            width: 250,
            height: Font.create("SFProText", 37).sizeOfString("TextView", 500).height,
            positionType: FlexLayout.PositionType.RELATIVE,
            alignSelf: FlexLayout.AlignSelf.CENTER,
            backgroundColor: Color.create("#00A1F1"),
            text: "TextView",
            font: Font.create("SFProText", 37),
            scrollEnabled: false,
            textAlignment: TextAlignment.MIDRIGHT,
            ellipsizeMode: EllipsizeMode.END,
            marginTop : 1,
            marginBottom: 1
        }); 
 
        this.layout.addChild(myText);
            }
        });
        this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.layout.alignItems = FlexLayout.AlignItems.STRETCH;
        this.layout.alignContent = FlexLayout.AlignContent.STRETCH;


    }
);
module.exports = Page1;