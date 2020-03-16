const Image = require("sf-core/ui/image");
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Color = require('sf-core/ui/color');
const Label = require('sf-core/ui/label');
const FlexLayout = require('sf-core/ui/flexlayout');
const ListView = require('sf-core/ui/listview');
const ListViewItem = require('sf-core/ui/listviewitem');
const RangeSlider = require('sf-core/ui/rangeslider');
const Font = require('sf-core/ui/font');
const TextAlignment = require('sf-core/ui/textalignment');

var Page1 = extend(Page)(
    function (_super) {
        _super(this, {
            onShow: function (params) { },
            onLoad: function (params) {
                this.layout.backgroundColor = Color.YELLOW;

                var rangeSlider = new RangeSlider();
                rangeSlider.backgroundColor = Color.WHITE;
                rangeSlider.marginLeft = 40;
                rangeSlider.width = 200;
                rangeSlider.height = 100;

                rangeSlider.trackColor = Color.GREEN;

                rangeSlider.outerTrackColor = Color.RED;

                rangeSlider.trackWeight = 5;
 
                console.log('rangeSlider.maxValue 1 ' + rangeSlider.maxValue);
                console.log('rangeSlider.maxValue 1  ' + rangeSlider.minValue);

                rangeSlider.minValue = 15;
                rangeSlider.maxValue = 22;
                

                console.log('rangeSlider.maxValue 2 ' + rangeSlider.minValue);
                console.log('rangeSlider.maxValue 2 ' + rangeSlider.maxValue);

                //ToDo: if mixValue is given first, it throw error. Fix it.
                // rangeSlider.maxValue = 14;
                // rangeSlider.minValue = 6;

                rangeSlider.android.thumbColor = Color.DARKGRAY;
                rangeSlider.android.thumbBorderColor = Color.GREEN;
                rangeSlider.android.thumbBorderWidth = 1;
                rangeSlider.android.outerTrackWeight = 5;

                // rangeSlider.android.thumbSize = 25;

                // rangeSlider.thumbImage = Image.createFromFile("images://tatatata.png");

                rangeSlider.isTrackRounded = true;

                rangeSlider.rangeEnabled = true;

                rangeSlider.ios.showsThumbImageShadow = false;

                // rangeSlider.ran geEnabled = false;
                console.log("isHapticSnap : " + rangeSlider.ios.isHapticSnap);

                rangeSlider.ios.isHapticSnap = false;
                console.log("isHapticSnap : " + rangeSlider.ios.isHapticSnap);

                // rangeSlider.thumbImage = undefined;
                console.log("Value : ", rangeSlider.value);

                rangeSlider.snapStepSize = 2;
                console.log("snapStepSize : ", rangeSlider.snapStepSize);

                // rangeSlider.value = [8,10];
                console.log("Value : ", rangeSlider.value);
                console.log("snapStepSize : ", rangeSlider.snapStepSize);


                rangeSlider.onValueChange = function (value) {
                    console.log("value : ", value);
                };

                // setTimeout(() => {
                //     console.log("set timoute startessss")
                //     rangeSlider.maxValue = 16;
                //     rangeSlider.minValue = 4;
                // }, 5000);

                this.layout.addChild(rangeSlider);
            }
        });
    }
);
module.exports = Page1;