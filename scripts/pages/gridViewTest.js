const Screen = require("sf-core/device/screen");
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Color = require("sf-core/ui/color");
const Label = require("sf-core/ui/label");
const GridView = require("sf-core/ui/gridview");
const GridViewItem = require("sf-core/ui/gridviewitem");
const TextAlignment = require("sf-core/ui/textalignment");
const LayoutManager = require("sf-core/ui/layoutmanager");

const SPAN_COUNT = 2;
const COLORS = [
    "#ffffff", "#e6f7ff", "#cceeff", "#b3e6ff", "#99ddff", "#80d4ff", "#66ccff",
    "#4dc3ff", "#33bbff", "#1ab2ff", "#00aaff", "#0099e6", "#0088cc", "#0077b3",
    "#006699"
];

module.exports = extend(Page)(
    function (_super) {
        _super(this, {
            onShow: function (params) {
                // Application.statusBar.visible = false;
                // this.headerBar.visible = false;
            },
            onLoad: function () {
                var myDataSet = generateDataset();
                var layoutManager = new LayoutManager({
                    spanCount: SPAN_COUNT,
                    scrollDirection: LayoutManager.ScrollDirection.VERTICAL,
                    onItemLength: function () {
                        // Make sure GridViewItem's are square sized
                        return Screen.width / SPAN_COUNT;
                    }
                });

                var gridView = new GridView({
                    layoutManager: layoutManager,
                    refreshEnabled: true,
                    backgroundColor: Color.TRANSPARENT,
                    flexGrow: 1,
                    itemCount: myDataSet.length,
                    scrollBarEnabled: false,
                    onItemCreate: function () {
                        var gridViewViewItem = new GridViewItem();
                        var myLabel = new Label({
                            flexGrow: 1,
                            textAlignment: TextAlignment.MIDCENTER
                        });
                        gridViewViewItem.addChild(myLabel);
                        gridViewViewItem.myLabel = myLabel;
                        return gridViewViewItem;
                    },
                    onItemBind: function (gridViewItem, index) {
                        var { title, backgroundColor } = myDataSet[index];
                        gridViewItem.myLabel.text = title;
                        gridViewItem.myLabel.backgroundColor = backgroundColor;
                    },
                    onItemSelected: function (gridViewItem, index) {
                        console.log(" LOOK to  native object " + gridViewItem.nativeObject);
                        console.log(`Item title : ${gridViewItem.myLabel.text}` + " item position "  + 
                        gridView.indexByListViewItem(gridViewItem) + " sure index " + index);
                        // gridView.itemCount += 1;
                        // myDataSet.splice(index, 0, {
                        //     title: "Smartface Title " + index + 1,
                        //     backgroundColor: Color.create(COLORS[index % COLORS.length])
                        // });
                        // gridView.refreshRowRange({ positionStart: index, itemCount: 2 });
                    },
                    onPullRefresh: function () {
                        console.log("onPullRefresh");
                    },
                    onScroll: function () {
                        console.log("onScroll");
                    }
                });
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