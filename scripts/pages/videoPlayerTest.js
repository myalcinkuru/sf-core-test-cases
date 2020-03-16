const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const Button = require('sf-core/ui/button');
const VideoView = require('sf-core/ui/videoview');

var Page1 = extend(Page)(
    function (_super) {
        _super(this, {
            onShow: function (params) {
                // Application.statusBar.visible = false;
                this.headerBar.visible = false;
                this.layout.onTouch = () => {
                    console.log(this.myVideoView.height);
                }
            },
            onLoad: function (params) {
                let mainFl = new FlexLayout({
                    flexGrow: 1
                })
                mainFl.backgroundColor = Color.BLACK;
                
                var myVideoView = new VideoView({
                    flexGrow: 1,
                    onReady: function () {
                        myVideoView.play();
                    }
                });
                this.myVideoView = myVideoView;
                myVideoView.setControllerEnabled(true);

                myVideoView.loadURL('https://cdn.kapwing.com/final_5e2568706b7c810016c662f7_6790.mp4');

                mainFl.addChild(myVideoView);
                this.layout.addChild(mainFl);
            }
        });
        this.orientation = Page.Orientation.AUTO;

        this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.layout.alignItems = FlexLayout.AlignItems.CENTER;
    }
);
module.exports = Page1;
