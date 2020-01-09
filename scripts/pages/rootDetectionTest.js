const Button = require("sf-core/ui/button");
const Application = require("sf-core/application");
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const ListView = require('sf-core/ui/listview');
const ListViewItem = require('sf-core/ui/listviewitem');
const ImageView = require('sf-core/ui/imageview');
const Image = require('sf-core/ui/image');
const Label = require('sf-core/ui/label');
const System = require('sf-core/device/system');
const Util = require("sf-extension-utils/lib/rootdetection");

var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
            }
        });

        let btn = new Button({
            text: "IsRooted",
            width: 80,
            height: 80,
            onPress: () => {
                console.log(" is rooted  " + Util.isRooted());

                const GoogleSafetyNet = require("sf-extension-utils/lib/googlesafetynet");
                if (System.OS === "Android") {
                    console.log(" ANDROID ")
                    const googleSafetyNet = new GoogleSafetyNet({
                        apiKey: "AIzaSyCeM-4bYIJx3bBSeKzCpk9X1sZZ_4CGMhkA"
                    });
                    console.log(" ANDROID play services " + googleSafetyNet.isPlayServicesAvailable())
                    if (googleSafetyNet.isPlayServicesAvailable()) {
                        let nonce = googleSafetyNet.generateNonce();
                        console.log("nonce " + nonce)
                        googleSafetyNet.sendAttestationRequest(nonce).then(
                                (jws) => {
                                    console.log("JWS " + jws);
                                })
                            .catch(
                                (errMessage) => {
                                    console.log("Error message " + errMessage);
                                });
                    }
                    else {
                        console.log("Google Play services are not available. You cannot proceed further");
                    }
                }
            }
        });
        this.layout.addChild(btn);
    }
);
module.exports = Page1;
