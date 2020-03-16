// const View = require("sf-core/ui/view");
// const Image = require("sf-core/ui/image");
// const Application = require("sf-core/application");
// const Page = require("sf-core/ui/page");
// const extend = require("js-base/core/extend");
// const Color = require('sf-core/ui/color');
// const Label = require('sf-core/ui/label');
// const FlexLayout = require('sf-core/ui/flexlayout');
// const ListView = require('sf-core/ui/listview');
// const ListViewItem = require('sf-core/ui/listviewitem');
// const TextAlignment = require('sf-core/ui/textalignment');
// const Font = require('sf-core/ui/font');
// const System = require('sf-core/device/system');

// var Page1 = extend(Page)(
// 	function(_super) {
// 		_super(this, {
// 			onShow: function(params) {
// 				// Application.statusBar.visible = false;
// 				// this.parentController.headerBar.visible = false;
// 			}
// 		});
// 		var myDataSet = [];
// 		for (var i = 0; i < 5; i++) {
// 			myDataSet.push({
// 				title: 'Smartface Title ' + i,
// 				backgroundColor: Color.WHITE
// 			});
// 		}
// 		var myListView = new ListView({
// 			flexGrow: 1,
// 			rowHeight: 100,
// 			itemCount: myDataSet.length,
// 			backgroundColor: Color.create(240, 240, 240),
// 		});
// 		myListView.contentInset = { top: 20, left: 0, bottom: 0, right: 0 };
// 		myListView.swipeEnabled = true;
// 		myListView.onRowCanSwipe = function(index) {
// 			return [ListView.SwipeDirection.LEFTTORIGHT, ListView.SwipeDirection.RIGHTTOLEFT];
// 		}
// 		myListView.onRowSwipe = function(e) {
// 			if (e.direction == ListView.SwipeDirection.LEFTTORIGHT) {
// 				e.ios.expansionSettings.buttonIndex = -1;
// 				var archiveItem = new ListView.SwipeItem();
// 				archiveItem.text = "ARCHIVE " + e.index;
// 				archiveItem.backgroundColor = Color.GREEN;
// 				archiveItem.textColor = Color.BLACK;
// 				archiveItem.font = Font.create("Arial-ItalicMT", 8);
// 				archiveItem.ios.padding = 40;
// 				applyDimension(e.index, archiveItem);
// 				archiveItem.ios.isAutoHide = false;
// 				archiveItem.onPress = function(e) {
// 					console.log("Archive : " + e.index);
// 					deleteAndRefresh(e)
// 				};
// 				return [archiveItem];
// 			}
// 			else if (e.direction == ListView.SwipeDirection.RIGHTTOLEFT) {
// 				e.ios.expansionSettings.buttonIndex = 0;
// 				e.ios.expansionSettings.threshold = 1.5;
// 				e.ios.expansionSettings.fillOnTrigger = true;
// 				var deleteItem = new ListView.SwipeItem();
// 				deleteItem.text = "DELETE " + e.index;
// 				deleteItem.backgroundColor = Color.RED;
// 				deleteItem.textColor = Color.YELLOW;
// 				deleteItem.icon = Image.createFromFile("images://accountimg36.png");
// 				deleteItem.ios.iconTextSpacing = 10;
// 				deleteItem.ios.isAutoHide = false;
// 				deleteItem.onPress = function(e) {
// 					console.log("Delete Index : " + e.index);
// 					deleteAndRefresh(e);
// 				};
// 				var moreItem = new ListView.SwipeItem();
// 				moreItem.text = "MORE";
// 				moreItem.onPress = function(e) {
// 					console.log("More : " + e.index);
// 					myListView.refreshData();
// 				};
// 				applyDimension(e.index, deleteItem);
// 				return [deleteItem, moreItem];
// 			}
// 		}
// 		function setBordersForiOS(index, listViewItem) {
// 			var item = listViewItem || myListView.listViewItemByIndex(index);
// 			if (!item) {
// 				return;
// 			}
// 			var maskedBorders = 0;
// 			if (index == 0) {
// 				maskedBorders = maskedBorders | View.Border.TOP_LEFT | View.Border.TOP_RIGHT;
// 			}
// 			if (index == myDataSet.length - 1) {
// 				maskedBorders = maskedBorders | View.Border.BOTTOM_LEFT | View.Border.BOTTOM_RIGHT;
// 			}
// 			if (maskedBorders) {
// 				item.__nativeCell.layer.cornerRadius = 20;
// 				item.__nativeCell.layer.maskedCorners = maskedBorders;
// 			}
// 		}
// 		function deleteAndRefresh(e) {
// 			var length = myDataSet.length;
// 			myDataSet.splice(e.index, 1);
// 			myListView.itemCount = myDataSet.length;
// 			myListView.deleteRowRange({
// 				itemCount: 1,
// 				positionStart: e.index,
// 				ios: {
// 					animation: ListView.iOS.RowAnimation.FADE
// 				}
// 			});
// 			if (System.OS == "iOS") {
// 				if (e.index == 0) {
// 					setBordersForiOS(0);
// 				}
// 				else if (e.index == length - 1) {
// 					setBordersForiOS(length - 2);
// 				}
// 			}
// 			else {
// 				myListView.refreshRowRange({ itemCount: 1, positionStart: 0 })
// 				myListView.refreshRowRange({ itemCount: 1, positionStart: myDataSet.length - 1 })
// 			}
// 		}
// 		function applyDimension(index, item) {
// 			if (index == 0) {
// 				item.android.borderTopRightRadius = 20;
// 				item.android.borderTopLeftRadius = 20;
// 			}
// 			else if (index == myDataSet.length - 1) {
// 				item.android.borderBottomRightRadius = 20;
// 				item.android.borderBottomLeftRadius = 20;
// 			}
// 			else {
// 				item.android.borderBottomRightRadius = 0;
// 				item.android.borderBottomLeftRadius = 0;
// 				item.android.borderTopRightRadius = 0;
// 				item.android.borderTopLeftRadius = 0;
// 			}
// 			item.android.paddingLeft = 50;
// 			item.android.paddingRight = 50;
// 		}
// 		this.layout.addChild(myListView);
// 		myListView.onRowCreate = function() {
// 			var myListViewItem = new ListViewItem();
// 			myListViewItem.backgroundColor = Color.TRANSPARENT;
// 			let mainFl = new FlexLayout({
// 				flexGrow: 1
// 			});
// 			var myLabelTitle = new Label({
// 				flexGrow: 1
// 			});
// 			mainFl.addChild(myLabelTitle)
// 			myLabelTitle.backgroundColor = Color.WHITE;
// 			myLabelTitle.font = Font.create(Font.DEFAULT, 15, Font.BOLD);
// 			myLabelTitle.textAlignment = TextAlignment.MIDCENTER;
// 			myLabelTitle.textColor = Color.BLACK;
// 			myListViewItem.addChild(mainFl);
// 			var line = new View();
// 			line.positionType = FlexLayout.PositionType.ABSOLUTE;
// 			line.backgroundColor = Color.LIGHTGRAY;
// 			line.height = 1;
// 			line.bottom = 0;
// 			line.left = 0;
// 			line.right = 0;
// 			mainFl.addChild(line);
// 			mainFl['line'] = line;
// 			myListViewItem.mainFl = mainFl;
// 			myListViewItem.myLabelTitle = myLabelTitle;
// 			return myListViewItem;
// 		};
// 		myListView.onRowBind = function(listViewItem, index) {
// 			console.log(" on row bind " + index);
// 			var myLabelTitle = listViewItem.myLabelTitle;
// 			if (System.OS == "iOS") { //Native Access
// 				listViewItem.__nativeCell.clipsToBounds = true;
// 				listViewItem.__nativeCell.backgroundColor = myDataSet[index].backgroundColor.nativeObject;
// 				setBordersForiOS(index, listViewItem);
// 				listViewItem.__nativeCell.marginLeft = 50;
// 				listViewItem.__nativeCell.marginRight = 50;
// 			}
// 			else {
// 				if (index === 0) {
// 					listViewItem.mainFl.maskedBorders = [View.Border.TOP_LEFT, View.Border.TOP_RIGHT];
// 					listViewItem.mainFl.borderRadius = 20;
// 					myLabelTitle.maskedBorders = [View.Border.TOP_LEFT, View.Border.TOP_RIGHT];
// 					myLabelTitle.borderRadius = 20;
// 				}
// 				else if (index === myDataSet.length - 1) {
// 					listViewItem.mainFl.maskedBorders = [View.Border.BOTTOM_LEFT, View.Border.BOTTOM_RIGHT];
// 					listViewItem.mainFl.borderRadius = 20;
// 					myLabelTitle.maskedBorders = [View.Border.BOTTOM_LEFT, View.Border.BOTTOM_RIGHT];
// 					myLabelTitle.borderRadius = 20;
// 					listViewItem.mainFl.line.height = 0;
// 				}
// 				else {
// 					listViewItem.mainFl.borderRadius = 0;
// 					myLabelTitle.borderRadius = 0;
// 				}
// 				listViewItem.mainFl.marginLeft = 50;
// 				listViewItem.mainFl.marginRight = 50;
// 			}
// 			myLabelTitle.text = myDataSet[index].title;
// 			myLabelTitle.backgroundColor = myDataSet[index].backgroundColor;
// 		};
// 	}
// );
// module.exports = Page1;

const Image = require("sf-core/ui/image");
const Application = require("sf-core/application");
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Color = require('sf-core/ui/color');
const Label = require('sf-core/ui/label');
const FlexLayout = require('sf-core/ui/flexlayout');
const ListView = require('sf-core/ui/listview');
const ListViewItem = require('sf-core/ui/listviewitem');
const TextAlignment = require('sf-core/ui/textalignment');
const View = require('sf-core/ui/view');
const Font = require('sf-core/ui/font');

var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
            }
        });
        this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.layout.alignItems = FlexLayout.AlignItems.CENTER;

        console.log(" border radius page !! ");

        var myDataSet = [];
        for (var i = 0; i < 20; i++) {
            myDataSet.push({
                title: 'Smartface Title ' + i,
                backgroundColor: Color.create("#00a1f1")
            });
        }
        var myListView = new ListView({
            height: 350,
            rowHeight: 100,
            itemCount: myDataSet.length
        });

        myListView.swipeEnabled = true;
        myListView.onRowCanSwipe = function(index) {
            return [];
        }
        myListView.onRowSwipe = function(e) {
            if (e.direction == ListView.SwipeDirection.LEFTTORIGHT) {
                e.ios.expansionSettings.buttonIndex = -1;

                var archiveItem = new ListView.SwipeItem();
                archiveItem.text = "ARCHIVE";
                archiveItem.backgroundColor = Color.GREEN;
                archiveItem.textColor = Color.BLACK;
                archiveItem.font = Font.create("Arial-ItalicMT", 8);
                archiveItem.ios.padding = 40;

                archiveItem.android.borderBottomLeftRadius = 25; 
                archiveItem.android.borderTopLeftRadius = 25; 

                archiveItem.android.paddingLeft = 25;
                archiveItem.android.paddingRight = 25;
                archiveItem.android.paddingTop = 25;
                archiveItem.android.paddingBottom = 25;

                // archiveItem.ios.isAutoHide = false;
                archiveItem.onPress = function(e) {
                    console.log("Archive : " + e.index);
                };
                return [archiveItem];
            }
            else if (e.direction == ListView.SwipeDirection.RIGHTTOLEFT) {
                e.ios.expansionSettings.buttonIndex = 0;
                e.ios.expansionSettings.threshold = 1.5;

                var deleteItem = new ListView.SwipeItem();
                deleteItem.text = "DELETE";
                deleteItem.backgroundColor = Color.RED;
                deleteItem.textColor = Color.YELLOW;
                deleteItem.icon = Image.createFromFile("images://accountimg36.png");
                deleteItem.ios.iconTextSpacing = 10;
                deleteItem.onPress = function(e) {
                    console.log("Delete Index : "  + e.index);
                };

                // deleteItem.android.borderBottomRightRadius = 25; 
                deleteItem.android.borderTopRightRadius = 25; 

                // deleteItem.android.paddingLeft = 25;
                // deleteItem.android.paddingRight = 25;
                // deleteItem.android.paddingTop = 25;
                // deleteItem.android.paddingBottom = 25;

                var moreItem = new ListView.SwipeItem();
                moreItem.text = "MORE";
                moreItem.onPress = function(e) {
                    console.log("More : " + e.index);
                };
                return [deleteItem,moreItem];
            }
        }
        this.layout.addChild(myListView);
        myListView.onRowCreate = function() {
            var myListViewItem = new ListViewItem();
            var myLabelTitle = new Label({
                flexGrow: 1,
                margin: 25
            });
            myLabelTitle.font = Font.create(Font.DEFAULT, 15, Font.BOLD);
            myLabelTitle.textAlignment = TextAlignment.MIDCENTER;
            myLabelTitle.textColor = Color.WHITE;
            myLabelTitle.borderRadius = 25;
            // myLabelTitle.maskedBorders = [View.Border.TOP_LEFT, View.Border.BOTTOM_LEFT];
            myListViewItem.addChild(myLabelTitle);
            myListViewItem.myLabelTitle = myLabelTitle;
            return myListViewItem;
        };
        myListView.onRowBind = function(listViewItem, index) {
            var myLabelTitle = listViewItem.myLabelTitle;
            myLabelTitle.text = myDataSet[index].title;
            myLabelTitle.backgroundColor = myDataSet[index].backgroundColor;
        };
    }
);
module.exports = Page1;

// const Page = require("sf-core/ui/page");
// const extend = require("js-base/core/extend");
// const Color = require('sf-core/ui/color');
// const Label = require('sf-core/ui/label');
// const FlexLayout = require('sf-core/ui/flexlayout');
// const ListView = require('sf-core/ui/listview');
// const View = require('sf-core/ui/view');
// const ListViewItem = require('sf-core/ui/listviewitem');
// const TextAlignment = require('sf-core/ui/textalignment');
// const Font = require('sf-core/ui/font');
// const Image = require('sf-core/ui/image');

// var Page1 = extend(Page)(
//     function (_super) {
//         _super(this, {
//             onShow: function (params) {
//                 // Application.statusBar.visible = false;
//                 // this.headerBar.visible = false;
//             }
//         });
//         this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
//         this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
//         this.layout.alignItems = FlexLayout.AlignItems.CENTER;

//         var myDataSet = [{
//             title: 'Smartface Title 1',
//             backgroundColor: Color.create("#99d9f9")
//         }, {
//             title: 'Smartface Title 2',
//             backgroundColor: Color.create("#66c6f6")
//         }, {
//             title: 'Smartface Title 3',
//             backgroundColor: Color.create("#32b3f3")
//         }, {
//             title: 'Smartface Title 4',
//             backgroundColor: Color.create("#00a1f1")
//         }, {
//             title: 'Smartface Title 5',
//             backgroundColor: Color.create("#00a1f1")
//         }, {
//             title: 'Smartface Title 6',
//             backgroundColor: Color.create("#00a1f1")
//         }, {
//             title: 'Smartface Title 7',
//             backgroundColor: Color.create("#00a1f1")
//         }, {
//             title: 'Smartface Title 8',
//             backgroundColor: Color.create("#00a1f1")
//         }, {
//             title: 'Smartface Title 9',
//             backgroundColor: Color.create("#00a1f1")
//         }];

//         var myListView = new ListView({
//             height: 350,
//             rowHeight: 70,
//             itemCount: myDataSet.length,
//         });

//         this.layout.addChild(myListView);

//         myListView.onRowCreate = function () {
//             var myListViewItem = new ListViewItem({
//                 margin: 15
//             });
//             var myLabelTitle = new Label({
//                 flexGrow: 1
//             });
//             myLabelTitle.font = Font.create(Font.DEFAULT, 15, Font.BOLD);
//             myLabelTitle.textAlignment = TextAlignment.MIDCENTER;
//             myLabelTitle.textColor = Color.WHITE;
//             // myLabelTitle.maskedBorders = [View.Border.TOP_LEFT, View.Border.BOTTOM_RIGHT, View.Border.TOP_RIGHT];
//             // myLabelTitle.maskedBorders = [View.Border.TOP_LEFT, Vi]
//             myListViewItem.addChild(myLabelTitle);
//             myListViewItem.myLabelTitle = myLabelTitle;
//             return myListViewItem;
//         };
//         myListView.onRowBind = function (listViewItem, index) {
//             var myLabelTitle = listViewItem.myLabelTitle;
//             myLabelTitle.text = myDataSet[index].title;
//             myLabelTitle.backgroundColor = myDataSet[index].backgroundColor;
//         };

//         // let masks = [View.Border.TOP_LEFT, View.Border.BOTTOM_RIGHT, View.Border.TOP_RIGHT];
//         myListView.onRowSelected = function (listViewItem, index) {
//             console.log("selected index = " + index)
//             if (index % 2 == 0) {
//                 // listViewItem.myLabelTitle.maskedBorders = masks;
//             }
//         };

//         myListView.ios.leftToRightSwipeEnabled = true;
//         myListView.ios.rightToLeftSwipeEnabled = true;

//         const NativeLog = requireClass("android.util.Log");
//         const AndroidConfig = require("sf-core/util/Android/androidconfig");

//         myListView.swipeEnabled = true;

//         // myListView.onRowCanSwipe = (index) => {
//         //     return [ListView.SwipeDirection.LEFTTORIGHT , ListView.SwipeDirection.RIGHTTOLEFT];
//         // } 
        
//         myListView.onRowSwipe = function (direction, index) {
//             let font = Font.create("SFProText", 20),
//                 backgroundColor = Color.YELLOW,
//                 textColor = Color.RED,
//                 image = Image.createFromFile("images://accountimg36.png");
//             NativeLog.d("ROWSWIPE", " onRowSwipe is clicked ! ==> ");
//             if (direction == ListView.SwipeDirection.LEFTTORIGHT) {
//                 NativeLog.d("ROWSWIPE", " onRowSwipe is clicked ! ==>  LEFT ");
//                 return [{
//                     font, backgroundColor, textColor, text: "LEFTITEM", image, threshold: 0.2, onRowSwiped: function (index) {
//                         NativeLog.d("ROWSWIPE", "THE LEFT ITEM is SWIPED  " + index);
//                         myListView.deleteRowRange({ positionStart: index, itemCount: 1 })
//                     }
//                 }];
//             } else if (direction == ListView.SwipeDirection.RIGHTTOLEFT) {
//                 NativeLog.d("ROWSWIPE", " onRowSwipe is clicked ! ==>  RIGHT ");
//                 return [{
//                     font, backgroundColor, textColor, text: "ABDURRAHMAN ABDURRAHMAN", image, threshold: 0.8, onRowSwiped: function (index) {
//                         NativeLog.d("ROWSWIPE", "THE RIGHT ITEM is SWIPED  " + index);
//                         myListView.deleteRowRange({ positionStart: index, itemCount: 1 })
//                     }
//                 }];
//             }
//         };

//         myListView.ios.onRowSwiped = function (direction, expansionSettings, index) {
//             if (direction == ListView.iOS.SwipeDirection.LEFTTORIGHT) {
//                 //Expansion button index. Default value 0
//                 expansionSettings.buttonIndex = -1;

//                 var archiveSwipeItem = ListView.iOS.createSwipeItem("ARCHIVE", Color.GREEN, 100, function (e) {
//                     console.log("Archive " + e.index);
//                 });

//                 return [{}, {}];
//             } else if (direction == ListView.iOS.SwipeDirection.RIGHTTOLEFT) {
//                 //Expansion button index. Default value 0
//                 expansionSettings.buttonIndex = 0;
//                 //Size proportional threshold to trigger the expansion button. Default value 1.5
//                 expansionSettings.threshold = 1;

//                 var iconSwipeItem = ListView.iOS.createSwipeItemWithIcon("HI", Image.createFromFile("images://accountimg36.png"), Color.WHITE, 30, function (e) {
//                     console.log("Icon " + e.index);
//                 }, false);

//                 return [];
//             }
//         }

//         myListView.onPullRefresh = function () {
//             myDataSet.push({
//                 title: 'Smartface Title ' + (myDataSet.length + 1),
//                 backgroundColor: Color.RED,
//             })
//             myListView.itemCount = myDataSet.length;
//             myListView.refreshData();
//             myListView.stopRefresh();
//         }
//     }
// );
// module.exports = Page1;