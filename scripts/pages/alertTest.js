const TextBox = require("sf-core/ui/textbox");
const Application = require("sf-core/application");
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const AlertView = require('sf-core/ui/alertview');


var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false; //For Android
            }
        });

        var myAlertView1 = new AlertView({
            title: "Alert Title",
            message: "Alert Message"

        });

        // myAlertView1.addTextBox({
        //     text: "sdsdsdasd",
        //     hint: "Hint!",
        //     isPassword: false,
        //     android: {
        //         viewSpacings: { left: 50, right: 50 },
        //         width: 100
        //     }
        // });

        myAlertView1.addTextBox({
            text: "jjqirjqwper12!",
            hint: "Hint!",
            isPassword: true
        });

        var myAlertView = new AlertView({
            title: "Alert Title",
            message: "Alert Message",
            onDismiss: () => {
                console.log(" myAlertView dismisssss");
                // Application.hideKeyboard();
            }
        });

        myAlertView.addButton({
            index: AlertView.ButtonType.NEGATIVE,
            text: "Cancel"
        });

        myAlertView.addButton({
            index: AlertView.ButtonType.POSITIVE,
            text: "Okey",
            onClick: function() {
                console.log("Okey clicked. ", myAlertView.textBoxes);
            }
        });

        let textBox1 = new TextBox({
            text: "tes1t",
            width: 250,
            height: 100
        });

        myAlertView.addTextBox({
            text: "Password Test!",
            hint: "Hint!",
            isPassword: true,
            android: {
                viewSpacings: { left: 50, right: 50 },
                width: 100
            }
        });

        myAlertView.addTextBox();

        myAlertView.addTextBox({
            text: "Hello 98r124!",
            hint: "Hint!",
            android: {
                viewSpacings: { left: 50, right: 50 },
                width: 100
            }
        });

        this.layout.onTouch = () => {
            myAlertView.show();
        };

        this.layout.addChild(textBox1);
    }
);
module.exports = Page1;
