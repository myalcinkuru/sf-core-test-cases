const FlexLayout = require("sf-core/ui/flexlayout");
const Screen = require("sf-core/device/screen");
const Font = require("sf-core/ui/font");
const ListView = require("sf-core/ui/listview");
const ListViewItem = require("sf-core/ui/listviewitem");
const Button = require("sf-core/ui/button");
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

const SPAN_COUNT = 2;
const COLORS = [
    "#006699", "#e6f7ff", "#cceeff", "#b3e6ff", "#99ddff", "#80d4ff", "#66ccff",
    "#4dc3ff", "#33bbff", "#1ab2ff", "#00aaff", "#0099e6", "#0088cc", "#0077b3",
    "#006699"
];

const ITEM_WIDTH = 150;
module.exports = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
            },
            onLoad: function() {
                var myDataSet = () => generateDataset();

                let refreshBtn = new Button({
                    width: 50,
                    height: 50,
                    text: "Refresh Button",
                });

                this.layout.addChild(refreshBtn);

                var myDataSet2 = [{
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
                    height: 500,
                    rowHeight: 350,
                    itemCount: 5,
                });

                myListView.itemsMapping = {};
                myListView.onRowCreate = function() {
                    var myListViewItem = new ListViewItem();

                    var layoutManager = new LayoutManager({
                        spanCount: SPAN_COUNT,
                        scrollDirection: LayoutManager.ScrollDirection.HORIZONTAL,
                        onItemLength: function() {
                            // Make sure GridViewItem's are square sized
                            return ITEM_WIDTH;
                        }
                    });
                    var gridView = new GridView({
                        layoutManager: layoutManager,
                        refreshEnabled: false,
                        backgroundColor: Color.TRANSPARENT,
                        top: 100,
                        height: 200,
                        width: Screen.width,
                        itemCount: myDataSet().length - 1,
                        scrollBarEnabled: false,
                        onItemCreate: function() {
                            // console.log(" onItemCreate ");
                            var gridViewViewItem = new GridViewItem({
                                padding: 4
                            });
                            let flWrapper = new FlexLayout({
                                flexGrow: 1,
                                borderColor: Color.RED,
                                backgroundColor: Color.WHITE
                            });
                            gridViewViewItem.addChild(flWrapper);
                            // gridViewViewItem.width = 200;
                            // gridViewViewItem.height = 200;
                            // var myLabel = new Label({
                            //     flexGrow: 1,
                            //     textAlignment: TextAlignment.MIDRIGHT
                            // });
                            // gridViewViewItem.addChild(myLabel);
                            gridViewViewItem.wrapperFl = flWrapper;
                            return gridViewViewItem;
                        },
                        onItemBind: function(gridViewItem, index) {
                            var { title, backgroundColor } = myDataSet()[index];
                            if ((index % 2) === 0) {
                                gridViewItem.wrapperFl.selected = true;
                                gridViewItem.wrapperFl.borderWidth = 4;
                            }
                            else {
                                gridViewItem.wrapperFl.selected = false;
                                gridViewItem.wrapperFl.borderWidth = 0;
                            }
                        },
                        onItemSelected: function(gridViewItem, index) {
                            if (!gridViewItem.wrapperFl.selected) {
                                gridViewItem.wrapperFl.selected = true;
                                gridViewItem.wrapperFl.borderWidth = 4;
                            }
                            else {
                                gridViewItem.wrapperFl.selected = false;
                                gridViewItem.wrapperFl.borderWidth = 0;
                            }
                        },
                        onPullRefresh: function() {
                            console.log("onPullRefresh");
                        },
                        onScroll: function(contentOffset) {}
                    });

                    if (System.OS === "Android") {
                        // gridView.android.snapToAlignment = GridView.Android.SnapAlignment.SNAPTO_START;
                    }
                    // layoutManager.contentInset = { top: 0, left: 50, bottom: 0, right: 0 };
                    myListViewItem.addChild(gridView);
                    myListViewItem.gridViewItem = gridView;
                    return myListViewItem;
                };
                myListView.onRowBind = function(listViewItem, index) {
                    let gridView = listViewItem.gridViewItem;

                    // gridView.scrollTo(3, false);

                    // gridView.layoutManager.nativeObject.scrollToPositionWithOffset(3, 0);

                    // console.log("myListView.itemsMapping  " + Object.keys(myListView.itemsMapping).length);
                    // if (index === 0)
                    //     myListView.itemsMapping[0] = { gridView };

                    gridView.android.onAttachedToWindow = function() {
                        if (gridView.savedInstance) {
                            gridView.android.restoreInstanceState(gridView.savedInstance);
                        }
                    };
                    console.log(" onRowBind " + index);
                };

                myListView.onRowSelected = function(listViewItem, index) {
                    let gridView = listViewItem.gridViewItem;
                    // gridView.nativeInner.scrollBy(500, 0);
                    // const AndroidUnitConverter = require("sf-core/util/Android/unitconverter");
                    // gridView.layoutManager.nativeObject.scrollToPositionWithOffset(2, AndroidUnitConverter.dpToPixel(-50));
                    // if (index === 0) {
                    //     console.log("getFirstVisibleIndex index " + index);
                    // gridView.savedInstance = gridView.android.saveInstanceState();
                    // }
                };

                refreshBtn.onPress = () => {
                    console.log(" Refresh Btn Clicked ");
                    myListView.itemCount = 5;
                    // gridView.savedInstance = gridView.android.saveInstanceState();
                    myListView.refreshData();
                };

                this.layout.addChild(myListView);
            }
        });
    }
);

var length = 0;

function generateDataset() {
    var dataset = [];
    for (let i = 0; i < 12; ++i) {
        dataset.push({
            title: `Smartface Title ${i}`,
            backgroundColor: Color.create(COLORS[Math.abs(length - i)])
        });
    }
    if (length === 0)
        length = 11;
    else
        length = 0;
    return dataset;
}
