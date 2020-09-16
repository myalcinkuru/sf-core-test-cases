const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Color = require('sf-core/ui/color');
const Label = require('sf-core/ui/label');
const FlexLayout = require('sf-core/ui/flexlayout');
const ListView = require('sf-core/ui/listview');
const ListViewItem = require('sf-core/ui/listviewitem');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const SearchView = require('sf-core/ui/searchview');

var Page1 = extend(Page)(
    function (_super) {
        _super(this, {
            onShow: function (params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
            }
        });
        const page = this;
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

        const searchViewHeight = 80;

        var mySearchView = new SearchView({
            height: searchViewHeight,
            top: -searchViewHeight,
            left: 0,
            right: 0,
            backgroundColor: Color.BLUE,
            positionType: FlexLayout.PositionType.ABSOLUTE,
            onTextChanged: function (searchText) {
                console.log("searched text : " + searchText);
            }
        });

        var myListView = new ListView({
            flexGrow: 1,
            rowHeight: 70,
            itemCount: myDataSet.length,
            refreshEnabled: false
        });

        this.layout.addChild(myListView);
        this.layout.addChild(mySearchView)

        myListView.onRowCreate = function () {
            var myListViewItem = new ListViewItem();
            var myLabelTitle = new Label({
                flexGrow: 1,
            });
            myLabelTitle.font = Font.create(Font.DEFAULT, 15, Font.BOLD);
            myLabelTitle.textAlignment = TextAlignment.MIDCENTER;
            myLabelTitle.textColor = Color.WHITE;
            myListViewItem.addChild(myLabelTitle);
            myListViewItem.myLabelTitle = myLabelTitle;
            return myListViewItem;
        };
        myListView.onRowBind = function (listViewItem, index) {
            var myLabelTitle = listViewItem.myLabelTitle;
            myLabelTitle.text = myDataSet[index].title;
            myLabelTitle.backgroundColor = myDataSet[index].backgroundColor;
        };
        myListView.onRowSelected = function (listViewItem, index) {
            console.log("selected index = " + index)
        };

        myListView.onScroll = function (params) {

            console.log("params.translation.y  " + params.translation.y);
            if (params.translation.y > 0) {
                let diff = mySearchView.top - params.translation.y;
                diff = diff < -searchViewHeight ? -searchViewHeight : diff;
                if (mySearchView.top !== -searchViewHeight) {
                    mySearchView.top = diff;
                    page.layout.applyLayout();
                }
            } else {
                let nextTop = mySearchView.top - params.translation.y;
                nextTop = nextTop > 0 ? 0 : nextTop;
                if (mySearchView.top !== 0) {
                    if (myListView.contentInset.top != searchViewHeight)
                        myListView.contentInset = { top: searchViewHeight };
                    mySearchView.top = nextTop;
                    page.layout.applyLayout();
                }
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


// const Screen = require("sf-core/device/screen");
// const Page = require("sf-core/ui/page");
// const extend = require("js-base/core/extend");
// const Color = require("sf-core/ui/color");
// const Label = require("sf-core/ui/label");
// const GridView = require("sf-core/ui/gridview");
// const GridViewItem = require("sf-core/ui/gridviewitem");
// const TextAlignment = require("sf-core/ui/textalignment");
// const LayoutManager = require("sf-core/ui/layoutmanager");
// const SearchView = require('sf-core/ui/searchview');
// const FlexLayout = require('sf-core/ui/flexlayout');

// const SPAN_COUNT = 2;
// const COLORS = [
//     "#ffffff", "#e6f7ff", "#cceeff", "#b3e6ff", "#99ddff", "#80d4ff", "#66ccff",
//     "#4dc3ff", "#33bbff", "#1ab2ff", "#00aaff", "#0099e6", "#0088cc", "#0077b3",
//     "#006699"
// ];

// module.exports = extend(Page)(
//     function (_super) {
//         _super(this, {
//             onShow: function (params) {
//                 Application.statusBar.visible = false;
//                 this.headerBar.visible = false;
//             },
//             onLoad: function () {
//                 var myDataSet = generateDataset();
//                 const page = this;
//                 const searchViewHeight = 80;
//                 var layoutManager = new LayoutManager({
//                     spanCount: SPAN_COUNT,
//                     scrollDirection: LayoutManager.ScrollDirection.VERTICAL,
//                     onItemLength: function () {
//                         // Make sure GridViewItem's are square sized
//                         return Screen.width / SPAN_COUNT;
//                     }
//                 });


//                 console.log("searhview animation test page..");
//                 var mySearchView = new SearchView({
//                     height: searchViewHeight,
//                     top: -searchViewHeight,
//                     left: 0,
//                     right: 0,
//                     backgroundColor: Color.BLUE,
//                     positionType: FlexLayout.PositionType.ABSOLUTE,
//                     onTextChanged: function (searchText) {
//                         console.log("searched text : " + searchText);
//                     }
//                 });

//                 let diff = { dx: 0, dy: 0 };
//                 var gridView = new GridView({
//                     layoutManager: layoutManager,
//                     refreshEnabled: true,
//                     backgroundColor: Color.TRANSPARENT,
//                     flexGrow: 1,
//                     itemCount: myDataSet.length,
//                     scrollBarEnabled: false,
//                     refreshEnabled: false,
//                     onItemCreate: function () {
//                         var gridViewViewItem = new GridViewItem();
//                         var myLabel = new Label({
//                             flexGrow: 1,
//                             textAlignment: TextAlignment.MIDCENTER
//                         });
//                         gridViewViewItem.addChild(myLabel);
//                         gridViewViewItem.myLabel = myLabel;
//                         return gridViewViewItem;
//                     },
//                     onItemBind: function (gridViewItem, index) {
//                         var { title, backgroundColor } = myDataSet[index];
//                         gridViewItem.myLabel.text = title;
//                         gridViewItem.myLabel.backgroundColor = backgroundColor;
//                     },
//                     onItemSelected: function (gridViewItem, index) {
//                         console.log(`Item title : ${gridViewItem.myLabel.text}`);
//                     },
//                     onScroll: function (params) {

//                         if (params.translation.y > 0) {
//                             let diff = mySearchView.top - params.translation.y;
//                             diff = diff < -searchViewHeight ? -searchViewHeight : diff;
//                             if (mySearchView.top !== -searchViewHeight) {
//                                 mySearchView.top = diff;
//                                 page.layout.applyLayout();
//                             }
//                         } else {
//                             let nextTop = mySearchView.top - params.translation.y;
//                             nextTop = nextTop > 0 ? 0 : nextTop;
//                             if (mySearchView.top !== 0) {
//                                 if (layoutManager.contentInset != searchViewHeight)
//                                     layoutManager.contentInset = { top: searchViewHeight };
//                                 mySearchView.top = nextTop;
//                                 page.layout.applyLayout();
//                             }
//                         }

//                     }
//                 });
//                 this.layout.addChild(gridView);
//                 this.layout.addChild(mySearchView);
//             }
//         });
//     }
// );

// function generateDataset() {
//     var dataset = [];
//     for (let i = 0; i < 12; ++i) {
//         dataset.push({
//             title: `Smartface Title ${i}`,
//             backgroundColor: Color.create(COLORS[i % COLORS.length])
//         });
//     }
//     return dataset;
// }


// const Page = require("sf-core/ui/page");
// const extend = require("js-base/core/extend");
// const Color = require('sf-core/ui/color');
// const Label = require('sf-core/ui/label');
// const FlexLayout = require('sf-core/ui/flexlayout');
// const ListView = require('sf-core/ui/listview');
// const ListViewItem = require('sf-core/ui/listviewitem');
// const Font = require('sf-core/ui/font');
// const TextAlignment = require('sf-core/ui/textalignment');
// const SearchView = require('sf-core/ui/searchview'); var Page1 = extend(Page)(
//     function (_super) {
//         _super(this, {
//             onShow: function (params) {
//             },
//             onLoad: function (params) {
//                 this.headerBar.title = "11111";
//             }
//         });
//         var myListView = new ListView({
//             flexGrow: 1,
//             itemCount: 100,
//             contentInset: {
//                 top: 50,
//                 bottom: 0
//             }
//         });
//         myListView.backgroundColor = Color.TRANSPARENT;
//         this.layout.addChild(myListView);
//         myListView.nativeObject.contentOffset = {
//             x: 0,
//             y: 0
//         }
//         myListView.onRowCreate = function (type) {
//             var myListViewItem = new ListViewItem();
//             return myListViewItem;
//         };
//         myListView.onRowHeight = function (index) {
//             return 70;
//         }; myListView.onRowBind = function (listViewItem, index) {
//             listViewItem.backgroundColor = index % 2 == 0 ? Color.RED : Color.YELLOW;
//         }; var maxSearchHeight = 50;
//         var innerMaxSearchFlexHeight = 40;
//         var innerMaxSearchFlexBorderRadius = 10; var searchFlex = new FlexLayout();
//         // searchFlex.backgroundColor = Color.BLACK;
//         searchFlex.positionType = FlexLayout.PositionType.ABSOLUTE;
//         searchFlex.top = 0;
//         searchFlex.left = 0;
//         searchFlex.right = 0;
//         searchFlex.height = 0;
//         searchFlex.alpha = 0;
//         // searchFlex.justifyContent = FlexLayout.JustifyContent.CENTER;        var innerSearchFlex = new FlexLayout();
//         innerSearchFlex.backgroundColor = Color.LIGHTGRAY;
//         innerSearchFlex.borderRadius = 15;
//         innerSearchFlex.height = 0;
//         innerSearchFlex.marginTop = 5;
//         innerSearchFlex.marginLeft = 20;
//         innerSearchFlex.marginRight = 20;
//         searchFlex.addChild(innerSearchFlex); var searchBar = new SearchView();
//         searchBar.positionType = FlexLayout.PositionType.ABSOLUTE;
//         searchBar.left = 0;
//         searchBar.right = 0;
//         searchBar.bottom = -20;
//         searchBar.top = -20; searchBar.hint = "Search";
//         searchBar.nativeObject.setSearchFieldBackgroundImage(__SF_UIImage.getInstance(), 0);
//         searchBar.ios.searchViewStyle = SearchView.iOS.Style.MINIMAL;
//         searchBar.backgroundColor = Color.LIGHTGRAY;
//         searchBar.textFieldBackgroundColor = Color.LIGHTGRAY;
//         innerSearchFlex.addChild(searchBar); this.layout.addChild(searchFlex); myListView.onScroll = function (params) {
//             if (params.contentOffset.y >= 0 && params.contentOffset.y < maxSearchHeight) {
//                 searchFlex.height = maxSearchHeight - params.contentOffset.y;
//                 innerSearchFlex.height = innerMaxSearchFlexHeight - params.contentOffset.y;
//                 innerSearchFlex.borderRadius = innerSearchFlex.height * innerMaxSearchFlexBorderRadius / innerMaxSearchFlexHeight;
//                 searchFlex.alpha = searchFlex.height / maxSearchHeight;
//                 searchFlex.applyLayout();
//             } else if (params.contentOffset.y < 0) {
//                 if (searchFlex.height != maxSearchHeight) {
//                     searchFlex.height = maxSearchHeight;
//                     innerSearchFlex.height = innerMaxSearchFlexHeight;
//                     innerSearchFlex.borderRadius = innerMaxSearchFlexBorderRadius;
//                     searchFlex.alpha = 1;
//                     searchFlex.applyLayout();
//                 }
//             } else {
//                 if (searchFlex.height != 0) {
//                     searchFlex.height = 0;
//                     innerSearchFlex.height = 0
//                     searchFlex.alpha = 0;
//                     searchFlex.applyLayout();
//                 }
//             }
//         }        myListView.ios.onScrollEndDecelerating = function (contentOffset) {
//             stopScroll(contentOffset);
//         }
//         myListView.ios.onScrollEndDraggingWillDecelerate = function (contentOffset, decelerate) {
//             if (!decelerate) {
//                 stopScroll(contentOffset);
//             }
//         }         function stopScroll(contentOffset) {
//             if (contentOffset.y > 0 && contentOffset.y < maxSearchHeight) {
//                 var contentOffsetY = ((contentOffset.y / maxSearchHeight) <= 0.5) ? -maxSearchHeight : 0;
//                 myListView.nativeObject.setContentOffsetAnimated({
//                     x: 0,
//                     y: contentOffsetY
//                 }, true);
//             }
//         }
//     }
// );
// module.exports = Page1;