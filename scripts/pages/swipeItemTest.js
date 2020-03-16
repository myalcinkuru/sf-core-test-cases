const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Color = require('sf-core/ui/color');
const Label = require('sf-core/ui/label');
const FlexLayout = require('sf-core/ui/flexlayout');
const ListView = require('sf-core/ui/listview');
const View = require('sf-core/ui/view');
const ListViewItem = require('sf-core/ui/listviewitem');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const Image = require('sf-core/ui/image');

var Page1 = extend(Page)(
    function (_super) {
        _super(this, {
            onShow: function (params) {
                // Application.statusBar.visible = false;
                // this.headerBar.visible = false;
            }
        });
        this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.layout.alignItems = FlexLayout.AlignItems.CENTER;

        var myDataSet = [{
            title: 'Smartface Title 1',
            backgroundColor: Color.create("#99d9f9")
        }, {
            title: 'Smartface Title 2',
            backgroundColor: Color.create("#66c6f6")
        }, {
            title: 'Smartface Title 3',
            backgroundColor: Color.create("#32b3f3")
        }, {
            title: 'Smartface Title 4',
            backgroundColor: Color.create("#00a1f1")
        }, {
            title: 'Smartface Title 5',
            backgroundColor: Color.create("#00a1f1")
        }, {
            title: 'Smartface Title 6',
            backgroundColor: Color.create("#00a1f1")
        }, {
            title: 'Smartface Title 7',
            backgroundColor: Color.create("#00a1f1")
        }, {
            title: 'Smartface Title 8',
            backgroundColor: Color.create("#00a1f1")
        }, {
            title: 'Smartface Title 9',
            backgroundColor: Color.create("#00a1f1")
        }];

        var myListView = new ListView({
            height: 350,
            rowHeight: 70,
            itemCount: myDataSet.length,
        });

        this.layout.addChild(myListView);

        myListView.onRowCreate = function () {
            var myListViewItem = new ListViewItem({
                margin: 15
            });
            var myLabelTitle = new Label({
                flexGrow: 1
            });
            myLabelTitle.font = Font.create(Font.DEFAULT, 15, Font.BOLD);
            myLabelTitle.textAlignment = TextAlignment.MIDCENTER;
            myLabelTitle.textColor = Color.WHITE;
            // myLabelTitle.maskedBorders = [View.Border.TOP_LEFT, View.Border.BOTTOM_RIGHT, View.Border.TOP_RIGHT];
            // myLabelTitle.maskedBorders = [View.Border.TOP_LEFT, Vi]
            myListViewItem.addChild(myLabelTitle);
            myListViewItem.myLabelTitle = myLabelTitle;
            return myListViewItem;
        };
        myListView.onRowBind = function (listViewItem, index) {
            var myLabelTitle = listViewItem.myLabelTitle;
            myLabelTitle.text = myDataSet[index].title;
            myLabelTitle.backgroundColor = myDataSet[index].backgroundColor;
        };

        // let masks = [View.Border.TOP_LEFT, View.Border.BOTTOM_RIGHT, View.Border.TOP_RIGHT];
        myListView.onRowSelected = function (listViewItem, index) {
            console.log("selected index = " + index)
            if (index % 2 == 0) {
                // listViewItem.myLabelTitle.maskedBorders = masks;
            }
        };

        myListView.ios.leftToRightSwipeEnabled = true;
        myListView.ios.rightToLeftSwipeEnabled = true;

        const NativeLog = requireClass("android.util.Log");
        const AndroidConfig = require("sf-core/util/Android/androidconfig");

        myListView.swipeEnabled = true;

        myListView.onRowCanSwipe = (index) => {
            return [ListView.SwipeDirection.LEFTTORIGHT];
        }

        myListView.onRowSwipe = function (direction, index) {
            let font = Font.create("SFProText", 20),
                backgroundColor = Color.YELLOW,
                textColor = Color.RED,
                image = Image.createFromFile("images://accountimg36.png");
            NativeLog.d("ROWSWIPE", " onRowSwipe is clicked ! ==> ");
            if (direction == ListView.SwipeDirection.LEFTTORIGHT) {
                NativeLog.d("ROWSWIPE", " onRowSwipe is clicked ! ==>  LEFT ");
                return [{
                    font, backgroundColor, textColor, text: "LEFTITEM", image, threshold: 0.2, onRowSwiped: function (index) {
                        NativeLog.d("ROWSWIPE", "THE LEFT ITEM is SWIPED  " + index);
                        myListView.deleteRowRange({ positionStart: index, itemCount: 1 })
                    }
                }];
            } else if (direction == ListView.SwipeDirection.RIGHTTOLEFT) {
                NativeLog.d("ROWSWIPE", " onRowSwipe is clicked ! ==>  RIGHT ");
                return [{
                    font, backgroundColor, textColor, text: "ABDURRAHMAN ABDURRAHMAN", image, threshold: 0.8, onRowSwiped: function (index) {
                        NativeLog.d("ROWSWIPE", "THE RIGHT ITEM is SWIPED  " + index);
                        myListView.deleteRowRange({ positionStart: index, itemCount: 1 })
                    }
                }];
            }
        };

        myListView.ios.onRowSwiped = function (direction, expansionSettings, index) {
            if (direction == ListView.iOS.SwipeDirection.LEFTTORIGHT) {
                //Expansion button index. Default value 0
                expansionSettings.buttonIndex = -1;

                var archiveSwipeItem = ListView.iOS.createSwipeItem("ARCHIVE", Color.GREEN, 100, function (e) {
                    console.log("Archive " + e.index);
                });

                return [{}, {}];
            } else if (direction == ListView.iOS.SwipeDirection.RIGHTTOLEFT) {
                //Expansion button index. Default value 0
                expansionSettings.buttonIndex = 0;
                //Size proportional threshold to trigger the expansion button. Default value 1.5
                expansionSettings.threshold = 1;

                var iconSwipeItem = ListView.iOS.createSwipeItemWithIcon("HI", Image.createFromFile("images://accountimg36.png"), Color.WHITE, 30, function (e) {
                    console.log("Icon " + e.index);
                }, false);

                return [];
            }
        }

        myListView.onPullRefresh = function () {
            myDataSet.push({
                title: 'Smartface Title ' + (myDataSet.length + 1),
                backgroundColor: Color.RED,
            })
            myListView.itemCount = myDataSet.length;
            myListView.refreshData();
            myListView.stopRefresh();
        }
    }
);
module.exports = Page1;