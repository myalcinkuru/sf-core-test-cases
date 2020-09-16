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

        const NORMAL_FONT = Font.create(Font.DEFAULT, 22, Font.NORMAL);
        const TB_HEIGHT_ANDROID = 85;
        var isIOS = System.OS === "iOS";

        var flWrapper = new FlexLayout({
            alignItems: FlexLayout.AlignItems.CENTER,
            height: 300
        });
        var imgShow = new ImageView({
            height: 20,
            image: "images://key.png",
            imageFillType: ImageView.FillType.ASPECTFIT,
        });
        var mtbUsername = new MaterialTextBox({
            width: 200,
            hint: "Username",
            onActionButtonPress: e => mtbPassword.requestFocus()
        });
        mtbUsername.onTextChanged = e => {
            // Reset error message
            mtbUsername.errorMessage = "";
            mtbUsername.enableErrorMessage = false;
        };
        var mtbPassword = new MaterialTextBox({
            width: 200,
            hint: "Password",
            onActionButtonPress: e => mtbPassword.removeFocus()
        });
        mtbPassword.isPassword = true;
        mtbPassword.onTextChanged = e => {
            // Reset error message
            mtbPassword.errorMessage = "";
            mtbPassword.enableErrorMessage = false;
        };
        mtbPassword.android.rippleEnabled = true;
        mtbPassword.android.rippleColor = Color.RED;
        mtbPassword.rightLayout = { view: imgShow, width: 30 };
        var btnLogin = new Button({
            top: 20,
            height: 60,
            width: 200,
            backgroundColor: Color.create("#00A1F1"),
            text: "Login",
            onPress: e => {
                // If username or password doesn't exist, show error message
                let usernameExists = !!mtbUsername.text;
                let passwordExists = !!mtbPassword.text;
                !usernameExists && (mtbUsername.errorMessage = "Invalid username");
                !passwordExists && (mtbPassword.errorMessage = "Invalid password");
            }
        });

        // On Android, height must be given (Refer "Height difference")
        if (!isIOS)
            mtbUsername.height = TB_HEIGHT_ANDROID;
        mtbUsername.ios.clearButtonEnabled = true;
        mtbUsername.font = NORMAL_FONT; // Font of editable area
        mtbUsername.labelsFont = NORMAL_FONT; // Font of error & hint area
        mtbUsername.enableErrorMessage = true;
        mtbUsername.keyboardType = KeyboardType.android.TEXTSHORTMESSAGE;

        // On Android, height must be given (Refer "Height difference")
        if (!isIOS)
            mtbPassword.height = TB_HEIGHT_ANDROID;
        mtbPassword.ios.clearButtonEnabled = true;
        mtbPassword.font = NORMAL_FONT; // Font of editable area
        mtbPassword.labelsFont = NORMAL_FONT; // Font of error & hint area
        mtbPassword.enableErrorMessage = true;

        flWrapper.addChild(mtbUsername);
        flWrapper.addChild(mtbPassword);
        flWrapper.addChild(btnLogin);
        this.layout.addChild(flWrapper);
    }
);