const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const Color = require('sf-core/ui/color');
const Application = require('sf-core/application');
const ActivityIndicator = require('sf-core/ui/activityindicator');
const FlexLayout = require('sf-core/ui/flexlayout');

var Page1 = extend(Page)(
    function (_super) {
        _super(this, {
            onLoad: function () {
                const page = this;
                page.headerBar.title = "Smartface";
                page.headerBar.backgroundColor = Color.WHITE;
                page.headerBar.titleColor = Color.BLACK;

                let itemContainerFl = new FlexLayout({
                    height: 50,
                    width: 50,
                    justifyContent: FlexLayout.JustifyContent.CENTER,
                    alignItems: FlexLayout.AlignItems.CENTER
                });

                let myActivityIndicator = new ActivityIndicator({
                    height: 35,
                    width: 35,
                    color: Color.create("#00A1F1")
                });
                myActivityIndicator.ios.activityIndicatorViewStyle = ActivityIndicator.iOS.ActivityIndicatorViewStyle.NORMAL;
                itemContainerFl.addChild(myActivityIndicator);

                let indicatorItem = new HeaderBarItem({
                    customView: itemContainerFl
                });

                let itemWithBadge = new HeaderBarItem({
                    android: {
                        systemIcon: 17301545   // OR 'ic_dialog_email'
                    },
                    ios: {
                        systemItem: HeaderBarItem.iOS.SystemItem.BOOKMARKS
                    },
                    onPress: function () {
                        page.headerBar.setItems([indicatorItem]);
                    }
                });
                page.headerBar.setItems([itemWithBadge]);

                itemWithBadge.badge.visible = true;
                itemWithBadge.badge.text = "7";
            },
            onShow: function (params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = true;
            }
        });
    }
);

module.exports = Page1;
