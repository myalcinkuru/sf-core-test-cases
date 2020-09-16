const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Hardware = require('sf-core/device/hardware');
const System = require('sf-core/device/system');
const AlertView = require('sf-core/ui/alertview');


module.exports = extend(Page)(
    function (_super) {
        _super(this, {
            onShow: function (params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
            },
            onLoad: function () {
                console.log("hellooo ")

                var myAlertView = new AlertView({
                    title: "Alert Title",
                    message: "Device.Hardware.IMEI: " + Hardware.android.IMEI +
                        "\n Device.Hardware.UID: " + Hardware.UID +
                        "\n Device.Hardware.brandName: " + Hardware.brandName +
                        "\n Device.Hardware.brandModel: " + Hardware.brandModel +
                        "\n Device.Hardware.vendorID: " + Hardware.android.vendorID +
                        "\n Device.System.OS: " + System.OS +
                        "\n Device.System.OSVersion: " + System.OSVersion +
                        "\n Device.System.android.apiLevel: " + System.android.apiLevel +
                        "\n Device.System.batteryLevel: " + System.batteryLevel +
                        "\n Device.System.isBatteryCharged: " + System.isBatteryCharged +
                        "\n Device.System.language: " + System.language
                });
                myAlertView.addButton({
                    type: AlertView.Android.ButtonType.NEGATIVE,
                    text: "Cancel"
                });
                myAlertView.addButton({
                    type: AlertView.Android.ButtonType.POSITIVE,
                    text: "Okay",
                    onClick: function () {
                        console.log("Okay clicked.");
                    }
                });
                myAlertView.show();

                this.layout.onTouch = () => {
                    myAlertView.show();
                }
            }
        });
    }
);