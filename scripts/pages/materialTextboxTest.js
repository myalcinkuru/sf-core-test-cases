const Application = require("sf-core/application");
const ImageView = require("sf-core/ui/imageview");
const Color = require("sf-core/ui/color");
const Page = require('sf-core/ui/page');
const extend = require('js-base/core/extend');
const FlexLayout = require('sf-core/ui/flexlayout');
const MaterialTextBox = require('sf-core/ui/materialtextbox');
const Font = require('sf-core/ui/font');
const Button = require("sf-core/ui/button");
const System = require('sf-core/device/system');
const KeyboardType = require('sf-core/ui/keyboardtype');
module.exports = extend(Page)(
    function (_super) {
        _super(this, {
            onShow: function (params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
            }
        });
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;

        const NORMAL_FONT = Font.create(Font.DEFAULT, 15, Font.BOLD);
        const BIGGER_FONT = Font.create(Font.DEFAULT, 30, Font.BOLD);

        const TB_HEIGHT_ANDROID = 82;

        var flWrapper = new FlexLayout({
            alignItems: FlexLayout.AlignItems.CENTER,
            height: 400,
            backgroundColor: Color.GRAY
        });
        var imgShow = new ImageView({
            height: 20,
            image: "images://smartface.png",
            imageFillType: ImageView.FillType.ASPECTFIT,
        });
        var mtbUsername = new MaterialTextBox({
            width: 200,
            height: 100,
            multiline: false,
            onActionButtonPress: e => mtbPassword.requestFocus()
        });
        var mtbPassword = new MaterialTextBox({
            width: 200,
            height: 100,
            hint: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        });

        mtbPassword.isPassword = true;

        mtbUsername.onTextChanged = (e) => {
            console.log("mtbUsername.height  " , mtbUsername.height , " mtbPassword.height ", mtbPassword.height);

            // Reset error message
            if (mtbUsername.enableErrorMessage) {
                mtbUsername.errorMessage = "";
                mtbUsername.enableErrorMessage = false;
            }
            else {
                console.log("onTextChanged enableErrorMessage ", mtbUsername.enableErrorMessage)
                mtbUsername.enableErrorMessage = true;
                mtbUsername.errorMessage = "asdasdsd"; // Android Calismiyor !!!!
            }

            // mtbUsername.font = NORMAL_FONT2; // Font of editable area
            // mtbUsername.labelsFont = BIGGER_FONT2; // Font of error & hint area

            // mtbUsername.hint = "Username2"
            // mtbUsername.nativeObject.setHintEnabled(false);
            // mtbUsername.nativeObject.setHintEnabled(true);
        }

        // mtbPassword.android.rippleEnabled = true;
        // mtbPassword.android.rippleColor = Color.RED;

        //Eklendi: iOS Android
        mtbPassword.rightLayout = { view: imgShow, width: 30 };
        mtbPassword.ios.rightLayoutLeftPadding = 50;

        var btnLogin = new Button({
            top: 20,
            height: 60,
            width: 200,
            text: "login",
            onPress: e => {
                // If username or password doesn't exist, show error message
                let usernameExists = !!mtbUsername.text;
                let passwordExists = !!mtbPassword.text;
                !usernameExists && (mtbUsername.errorMessage = "Invalid username");
                !passwordExists && (mtbPassword.errorMessage = "Invalid password");
                // mtbUsername.nativeObject.getInstance().setErrorTextAppearance(mtbUsername.NativeR.style.SFMaterialTextBoxErrorTextAppearance);
            }
        });

        mtbUsername.selectedHintTextColor = Color.RED;
        mtbUsername.hintTextColor = Color.YELLOW;

        // On Android, height must be higher (Refer "Height difference")
        // mtbUsername.height = TB_HEIGHT_ANDROID + 40;

        mtbUsername.enableCharacterRestriction = true;
        mtbUsername.characterRestrictionColor = Color.BLUE; // Android: Restriction a count u astiktan sonra rengi bozuluyor

        //Eklendi: iOS Android
        mtbUsername.characterRestriction = 15;
        //Eklendi: iOS Android

        //Eklendi: iOS 
        // mtbUsername.ios.clearButtonEnabled = true;
        // mtbUsername.ios.clearButtonColor = Color.BLUE;

        ////Eklendi: iOS  Note: height must be spe
        // mtbUsername.ios.leftLayout = { view: imgShow, width: 30, height: 30 };
        // mtbUsername.ios.leftLayoutRightPadding = 20;


        // mtbPassword.ios.onRightLayoutRectForBounds = function(bounds, defaultRect) {
        //     defaultRect.x = defaultRect.x + 20;
        //     defaultRect.y = defaultRect.y - 20;
        //     console.log("onLeftLayoutRectForBounds " , bounds, " default rects " + defaultRect)
        //     return defaultRect;
        // };

        // const NORMAL_FONT2 = Font.create(Font.DEFAULT, 15, Font.NORMAL);
        // const BIGGER_FONT2 = Font.create(Font.DEFAULT, 30, Font.BOLD);

        // mtbUsername.nativeObject.setHintEnabled(true);
        // mtbUsername.nativeObject.setHint("Username2");

        mtbUsername.hint = "Username2"

        // mtbUsername.nativeObject.setHintEnabled(false);


        // mtbUsername.enableErrorMessage = true;
        // mtbUsername.errorColor = Color.BLUE;


        mtbUsername.lineColor = {
            normal: Color.YELLOW,
            selected: Color.BLACK
        };


        mtbUsername.labelsFont = BIGGER_FONT; // Font of error & hint area


        //Eklendi: iOS 
        mtbUsername.ios.underlineLabelsFont = NORMAL_FONT;

        // mtbUsername.font = BIGGER_FONT2; // Font of editable area

        // mtbUsername.enableErrorMessage = true;
        // mtbUsername.keyboardType = KeyboardType.android.TEXTSHORTMESSAGE;
        // isIOS && (mtbUsername.marginBottom = 30);

        // On Android, height must be higher (Refer "Height difference")
        // mtbPassword.height = TB_HEIGHT_ANDROID + 40;
        // mtbPassword.ios.clearButtonEnabled = true;

        mtbPassword.font = NORMAL_FONT; // Font of editable area
        mtbPassword.labelsFont = BIGGER_FONT; // Font of error & hint area

        // mtbPassword.enableErrorMessage = true;

        //Eklendi: iOS Android
        // mtbPassword.multiline = true;
        //Eklendi: iOS Android
        // mtbPassword.lineCount = 3;

        console.log("mMaxLines " + mtbUsername.maxLines);
        // mtbUsername.maxLines = 0;

        flWrapper.addChild(mtbUsername);
        flWrapper.addChild(mtbPassword);
        flWrapper.addChild(btnLogin);
        this.layout.addChild(flWrapper);
    }
);
