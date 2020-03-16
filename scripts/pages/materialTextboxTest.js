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
    function(_super) {
        _super(this, {
            onShow: function(params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
            }
        });
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;

        const NORMAL_FONT = Font.create(Font.DEFAULT, 30, Font.NORMAL);
        const BIGGER_FONT = Font.create(Font.DEFAULT, 30, Font.NORMAL);

        const TB_HEIGHT_IOS = 52;
        const TB_HEIGHT_ANDROID = TB_HEIGHT_IOS + 30;
        var isIOS = System.OS === "iOS";

        var flWrapper = new FlexLayout({
            alignItems: FlexLayout.AlignItems.CENTER,
            height: 300
        });
        var imgShow = new ImageView({
            height: 20,
            image: "images://smartface.png",
            imageFillType: ImageView.FillType.ASPECTFIT,
        });
        var mtbUsername = new MaterialTextBox({
            width: 200,
            onActionButtonPress: e => mtbPassword.requestFocus(),
            onTextChanged: e => {
                // Reset error message
                if (mtbUsername.enableErrorMessage) {
                    mtbUsername.errorMessage = "";
                    mtbUsername.enableErrorMessage = false;
                }
                else {
                    mtbUsername.errorMessage = "asdasdsd";
                    mtbUsername.enableErrorMessage = true;
                }

                // mtbUsername.font = NORMAL_FONT2; // Font of editable area
                // mtbUsername.labelsFont = BIGGER_FONT2; // Font of error & hint area

                // mtbUsername.hint = "Username2"
                // mtbUsername.nativeObject.setHintEnabled(false);
                // mtbUsername.nativeObject.setHintEnabled(true);
            }
        });

        var mtbPassword = new MaterialTextBox({
            width: 200,
            hint: "Password",
            isPassword: true,
            onActionButtonPress: e => mtbPassword.removeFocus(),
            onTextChanged: e => {
                // Reset error message
                mtbPassword.errorMessage = "";
                mtbPassword.enableErrorMessage = false;
            }
        });
        mtbPassword.android.rippleEnabled = true;
        mtbPassword.android.rippleColor = Color.RED;
        mtbPassword.rightLayout = { view: imgShow, width: 30 };
        var btnLogin = new Button({
            top: 20,
            height: 60,
            width: 200,
            text: "Login",
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
        mtbUsername.height = isIOS ? TB_HEIGHT_IOS : (TB_HEIGHT_ANDROID + 40);
        mtbUsername.ios.clearButtonEnabled = true;

        // const NORMAL_FONT2 = Font.create(Font.DEFAULT, 15, Font.NORMAL);
        // const BIGGER_FONT2 = Font.create(Font.DEFAULT, 30, Font.BOLD);

        // mtbUsername.nativeObject.setHintEnabled(true);
        // mtbUsername.nativeObject.setHint("Username2");

        mtbUsername.hint = "Username2"

        // mtbUsername.nativeObject.setHintEnabled(false);
        // mtbUsername.labelsFont = BIGGER_FONT2; // Font of error & hint area
        // mtbUsername.font = NORMAL_FONT2; // Font of editable area



        mtbUsername.enableErrorMessage = false;
        mtbUsername.errorColor = Color.BLUE;
        // mtbUsername.nativeObject.getInstance().setErrorTextAppearance(mtbUsername.NativeR.style.SFMaterialTextBoxErrorTextAppearance);


        // mtbUsername.font = BIGGER_FONT2; // Font of editable area

        // mtbUsername.enableErrorMessage = true;
        // mtbUsername.keyboardType = KeyboardType.android.TEXTSHORTMESSAGE;
        // isIOS && (mtbUsername.marginBottom = 30);

        // On Android, height must be higher (Refer "Height difference")
        mtbPassword.height = isIOS ? TB_HEIGHT_IOS : (TB_HEIGHT_ANDROID + 40);
        mtbPassword.ios.clearButtonEnabled = true;
        // mtbPassword.font = BIGGER_FONT; // Font of editable area
        // mtbPassword.labelsFont = NORMAL_FONT; // Font of error & hint area
        mtbPassword.enableErrorMessage = true;
        isIOS && (mtbPassword.marginBottom = 30);

        flWrapper.addChild(mtbUsername);
        flWrapper.addChild(mtbPassword);
        flWrapper.addChild(btnLogin);
        this.layout.addChild(flWrapper);
    }
);
