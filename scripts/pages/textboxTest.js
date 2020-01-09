const AlertView = require("sf-core/ui/alertview");
const Button = require("sf-core/ui/button");
const View = require("sf-core/ui/view");
const Application = require("sf-core/application");
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const TextBox = require('sf-core/ui/textbox');


var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
            }
        });
        this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.layout.alignItems = FlexLayout.AlignItems.CENTER;


        var myAlertView = new AlertView({
            title: "Alert Title",
            message: "Alert Message"
        });
        myAlertView.addButton({
            index: AlertView.ButtonType.NEGATIVE,
            text: "Cancel"
        });
        myAlertView.addButton({
            index: AlertView.ButtonType.POSITIVE,
            text: "Okey",
            onClick: function() {
                console.log("Okey clicked.");
            }
        });

        let btn = new Button({
            width: 100,
            height: 50,
            text: "OpenTheDialog"
        });
        btn.nativeObject.setContentDescription("BtnTestContentDesc1");

        this.layout.addChild(btn);

        btn.onPress = () => {
            myAlertView.show();
        };

        // console.log(" page 1 test");

        // const Image = require('sf-core/ui/image');
        // const ImageView = require('sf-core/ui/imageview');

        // var myImage = Image.createFromFile("images://imageview_preview.9.png");
        // var myImageView = new ImageView({
        //     image: myImage,
        //     left: 0,
        //     width: 300,
        //     height: 400
        // });

        // this.layout.addChild(myImageView);

        // var myTextBox = new TextBox({
        //     height: 100,
        //     width: 200,
        //     backgroundColor: Color.create("#5500A1F1"),
        //     text: "TextBox",
        //     borderWidth: 1
        // });

        // this.layout.onTouch = (event) => {
        //     const Firebase = require('sf-plugin-firebase');
        //     Firebase.analytics.logEvent(Firebase.analytics.Event.APP_OPEN);

        //     const CrashlyticsNativeClass = requireClass("com.crashlytics.android.Crashlytics");
        //     alert("version" + CrashlyticsNativeClass.getInstance().getVersion());
        // };

        // this.layout.addChild(myTextBox);
    }
);
module.exports = Page1;
