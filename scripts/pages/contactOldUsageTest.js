const Page = require("sf-core/ui/page");
const Contacts = require("sf-core/device/contacts");
const Button = require("sf-core/ui/button");
const Application = require("sf-core/application");
const Color = require("sf-core/ui/color");
const Device = require('sf-core/device');
const extend = require("js-base/core/extend");

var Page1 = extend(Page)(
    function (_super) {
        var page = this;
        _super(this, {
            onShow: function (params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
            }
        });

        function getContact(e) {
            var displayName = e.displayName;
            var phoneNumber = e.phoneNumber;
            alert("Name : " + displayName + " Phone : " + phoneNumber);


            Contacts.getAll({
                onSuccess: function (contacts) {
                    console.log("Contact : ", contacts);

                    Contacts.add({
                        contact: {
                            displayName: "Smartface Team",
                            phoneNumber: "+16506173265",
                            email: "info@smartface.io",
                            address: "347 N Canon Dr Beverly Hills, CA 90210"
                        },
                        onSuccess: function () {
                            console.log("Success addded ");
                        },
                        onFailure: function () {
                            console.log("Failure   !~~!!!");
                        }
                    });
                },
                onFailure: function (error) {
                    console.log("Message : " + error);
                }
            });

        }

        var myButton = new Button({
            marginTop: 250,
            marginRight: 50,
            marginLeft: 50,
            height: 60,
            text: "PICK CONTACT",
            backgroundColor: Color.RED,
            onPress: function () {
                pickContact();
            }
        });

        this.layout.addChild(myButton);

        function pickContact() {
            if (Device.System.OS === "Android") {
                var result = Application.android.checkPermission(Application.android.Permissions.READ_CONTACTS);
                if (!result) {
                    var permissionCode = 1001;
                    Application.android.requestPermissions(permissionCode, Application.android.Permissions.READ_CONTACTS);
                }
                result = Application.android.checkPermission(Application.android.Permissions.READ_CONTACTS);
                if (result) {
                    Contacts.pick({
                        onSuccess: getContact,
                        page: page
                    });
                }
            } else if (Device.System.OS === "iOS") {
                Contacts.pick({
                    onSuccess: getContact,
                    page: page
                });
            }
        }
    }
);
module.exports = Page1;