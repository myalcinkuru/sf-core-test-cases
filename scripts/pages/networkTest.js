const Application = require("sf-core/application");
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Network = require('sf-core/device/network');

var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
                
                console.log(" HIIIIIIIIIIII@I@I$$I$$$$I")
                this.layout.onTouch = () => {
                    alert(" connectionType  " + Network.connectionType);
                }
            }
        });

        var notifier = new Network.createNotifier();
        // notifier.android.ignoreCacheInitial = false;
        notifier.subscribe(function(connectionType) {
            alert("ConnectionType is " + connectionType + "  is initial " + notifier.android.isInitialStickyNotification());
        });
    }
);
module.exports = Page1;
