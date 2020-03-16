const Page = require("sf-core/ui/page");
const DocumentPicker = require("sf-core/device/documentpicker");
const Button = require("sf-core/ui/button");
const Application = require("sf-core/application");
const Color = require("sf-core/ui/color");
const Device = require('sf-core/device');
const extend = require("js-base/core/extend");
const ImageView = require('sf-core/ui/imageview');
const Image = require('sf-core/ui/image');

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
            console.log(e)
            var displayName = e.firstName;
            var phoneNumber = e.phoneNumbers;
            alert("Name : " + displayName + " Phone : " + phoneNumber);
        }

        let myButton = new Button({
            marginTop: 250,
            marginRight: 50,
            marginLeft: 50,
            height: 60,
            text: "PICK DOCUMENT",
            backgroundColor: Color.RED,
            onPress: function () {
                chooseContact();
            }
        });

        let myImageView = new ImageView({
            height: 100,
            width: 100
        })

        this.layout.addChild(myButton);
        this.layout.addChild(myImageView);

        function chooseContact() {
            if (Device.System.OS === "Android") {
                var result = Application.android.checkPermission(Application.android.Permissions.READ_EXTERNAL_STORAGE);
                if (!result) {
                    var permissionCode = 1001;
                    Application.android.requestPermissions(permissionCode, Application.android.Permissions.READ_EXTERNAL_STORAGE);

                    Application.android.onRequestPermissionsResult = function (e) {
                        if (e.requestCode != permissionCode)
                            return;
                        if (e.result) {
                            pickDocument();
                        }
                        else {
                            console.log("DENIED");
                        }
                    };
                } else {
                    pickDocument();
                }

            } else if (Device.System.OS === "iOS") {
                pickDocument();
            }

            function pickDocument() {
                DocumentPicker.pick({
                    type: [DocumentPicker.Types.IMAGES , DocumentPicker.Types.PDF],
                    page,
                    onSuccess: (pickedFile) => {
                        console.log("filePath   ==>> " + pickedFile.path + " size --> " + pickedFile.size);
                        myImageView.image = Image.createFromFile(pickedFile.path);
                    },
                    onFailure: (err) => {
                        console.log(" <<==  Error   ==>> ", err);
                    },
                    onCancel: () => {
                        console.log(" <<==  Cancel   ==>> ");
                    }
                });
            }
        }
    }
);
module.exports = Page1;