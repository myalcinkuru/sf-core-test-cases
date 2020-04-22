const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const Button = require('sf-core/ui/button');
const VideoView = require('sf-core/ui/videoview');
const Application = require('sf-core/application');

var Page1 = extend(Page)(
    function (_super) {
        const page = this;
        _super(this, {
            onShow: function (params) {
                Application.statusBar.visible = true;
                this.headerBar.visible = true;
                this.layout.onTouch = () => {
                    console.log(this.myVideoView.height);
                }
            },
            onLoad: function (params) {
                let mainFl = new FlexLayout({
                    positionType: FlexLayout.PositionType.ABSOLUTE,
                    left : 0,
                    right: 0,
                    top: 0,
                    height: 150
                });
                mainFl.backgroundColor = Color.BLACK;
                
                var myVideoView = new VideoView({
                    flexGrow: 1,
                    onReady: function () {
                        page.orientation = Page.Orientation.LANDSCAPELEFT;
                        myVideoView.play();
                    }
                });
                this.myVideoView = myVideoView;
                myVideoView.setControllerEnabled(true);

                myVideoView.loadURL('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4');

                mainFl.addChild(myVideoView);

                let fl = new FlexLayout({
                    flexGrow: 1,
                    backgroundColor: Color.GRAY
                });
                this.layout.addChild(fl);
                this.layout.addChild(mainFl);

                Application.android.onBackButtonPressed = () => {
                    page.orientation = Page.Orientation.PORTRAIT;
                }
            }
        });
        this.orientation = Page.Orientation.AUTO;

        this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.layout.alignItems = FlexLayout.AlignItems.CENTER;
    }
);
module.exports = Page1;
