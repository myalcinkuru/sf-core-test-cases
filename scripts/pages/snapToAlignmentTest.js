const Application = require("sf-core/application");
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Color = require("sf-core/ui/color");
const Label = require("sf-core/ui/label");
const GridView = require("sf-core/ui/gridview");
const GridViewItem = require("sf-core/ui/gridviewitem");
const TextAlignment = require("sf-core/ui/textalignment");
const LayoutManager = require("sf-core/ui/layoutmanager");
const System = require('sf-core/device/system');
const DecelerationRate = require("sf-core/ui/ios/decelerationrate");

const SPAN_COUNT = 1;
const COLORS = [
    "#006699", "#e6f7ff", "#cceeff", "#b3e6ff", "#99ddff", "#80d4ff", "#66ccff",
    "#4dc3ff", "#33bbff", "#1ab2ff", "#00aaff", "#0099e6", "#0088cc", "#0077b3",
    "#006699"
];
const ITEM_WIDTH = 150;
module.exports = extend(Page)(
    function (_super) {
        _super(this, {
            onShow: function (params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
            },
            onLoad: function () {
                var myDataSet = generateDataset();
                var layoutManager = new LayoutManager({
                    spanCount: SPAN_COUNT,
                    scrollDirection: LayoutManager.ScrollDirection.HORIZONTAL,
                    onItemLength: function () {
                        // Make sure GridViewItem's are square sized
                        return ITEM_WIDTH;
                    }
                });
                layoutManager.ios.targetContentOffset = function (proposedContentOffset, velocity) {
                    var positionX = gridView.contentOffset.x / ITEM_WIDTH;

                    var decimalPositionX = parseInt(positionX);

                    var precisionPositionX = positionX % 1;

                    if (velocity.x == 0 && precisionPositionX >= 0.5) {
                        decimalPositionX = decimalPositionX + 1;
                    }
                    else if (velocity.x > 0) {
                        decimalPositionX = decimalPositionX + 1;
                    }

                    return { x: decimalPositionX * ITEM_WIDTH, y: 0 };
                };
                var gridView = new GridView({
                    layoutManager: layoutManager,
                    refreshEnabled: true,
                    backgroundColor: Color.TRANSPARENT,
                    top: 100,
                    height: 200,
                    itemCount: myDataSet.length,
                    scrollBarEnabled: false,
                    onItemCreate: function () {
                        var gridViewViewItem = new GridViewItem();
                        gridViewViewItem.paddingLeft = 20;
                        var myLabel = new Label({
                            flexGrow: 1,
                            textAlignment: TextAlignment.MIDCENTER
                        });
                        gridViewViewItem.addChild(myLabel);
                        gridViewViewItem.myLabel = myLabel;
                        return gridViewViewItem;
                    },
                    onItemBind: function (gridViewItem, index) {
                        var { title, backgroundColor } = myDataSet[myDataSet.length - index - 1];
                        gridViewItem.myLabel.text = title;
                        gridViewItem.myLabel.backgroundColor = backgroundColor;
                        gridViewItem.applyLayout();
                    },
                    onItemSelected: function (gridViewItem, index) {
                        console.log(`Item title : ${gridViewItem.myLabel.text}`);
                    },
                    onPullRefresh: function () {
                        console.log("onPullRefresh");
                    },
                    onScroll: function (contentOffset) { }
                });
                gridView.ios.decelerationRate = DecelerationRate.FAST;

                gridView.android.snapToAlignment = GridView.Android.SnapAlignment.SNAPTO_START;

                layoutManager.contentInset = { top: 0, left: 0, bottom: 0, right: 20 };

                this.layout.addChild(gridView);

            }
        });
    }
);

function generateDataset() {
    var dataset = [];
    for (let i = 0; i < 12; ++i) {
        dataset.push({
            title: `Smartface Title ${i}`,
            backgroundColor: Color.create(COLORS[i % COLORS.length])
        });
    }
    return dataset;
}