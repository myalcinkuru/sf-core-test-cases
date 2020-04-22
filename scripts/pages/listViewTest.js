const Application = require("sf-core/application");
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Color = require('sf-core/ui/color');
const Label = require('sf-core/ui/label');
const FlexLayout = require('sf-core/ui/flexlayout');
const ListView = require('sf-core/ui/listview');
const ListViewItem = require('sf-core/ui/listviewitem');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const Animator   = require('sf-core/ui/animator');

var Page1 = extend(Page)(
    function (_super) {
        _super(this, {
            onShow: function (params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
            }
        });
        this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.layout.alignItems = FlexLayout.AlignItems.CENTER;

        var myDataSet = [];
        for (let i = 0; i < 25; i++) {
            myDataSet.push({
                title: '' + i,
                backgroundColor: Color.create("#99d9f9")
            });
        };

        var myListView = new ListView({
            flexGrow: 1,
            rowHeight: 150,
            itemCount: myDataSet.length,
            rowMoveEnabled: true,
            longPressDragEnabled: true
        });

        this.layout.addChild(myListView);

        myListView.onRowCreate = function () {
            var myListViewItem = new ListViewItem({
                flexDirection: FlexLayout.FlexDirection.ROW
            });
            myListViewItem.padding = 10;
            myListViewItem.width = 200;
            myListViewItem.height = 200;

            const font = Font.create(Font.DEFAULT, 15, Font.BOLD);

            var lblInsert = new Label({
                flexGrow: 1,
                marginLeft: 5,
                text: "Insert Range",
                font,
                textAlignment: TextAlignment.MIDCENTER,
                textColor: Color.GREEN,
                borderWidth: 2,
                borderColor: Color.BLACK
            });

            var lblIndex = new Label({
                flexGrow: 1,
                width: 20,
                font,
                textAlignment: TextAlignment.MIDCENTER,
                textColor: Color.GREEN,
                borderWidth: 2,
                borderColor: Color.BLACK
            });

            var lblDelete = new Label({
                flexGrow: 1,
                marginLeft: 5,
                text: "Delete Range",
                font,
                textAlignment: TextAlignment.MIDCENTER,
                textColor: Color.RED,
                borderWidth: 2,
                borderColor: Color.BLACK
            });

            var lblRefresh = new Label({
                flexGrow: 1,
                marginLeft: 5,
                marginRight: 50,
                text: "Refresh Rn.",
                font,
                textAlignment: TextAlignment.MIDLEFT,
                textColor: Color.WHITE,
                borderWidth: 2,
                borderColor: Color.BLACK
            });

            myListViewItem.addChild(lblIndex);
            myListViewItem.addChild(lblInsert);
            myListViewItem.addChild(lblDelete);
            myListViewItem.addChild(lblRefresh);

            myListViewItem.childs = { lblInsert, lblDelete, lblRefresh, lblIndex };
            return myListViewItem;
        };
        myListView.onRowBind = function (listViewItem, index) {
            var { lblInsert, lblDelete, lblRefresh, lblIndex } = listViewItem.childs;
            lblInsert.backgroundColor = myDataSet[index].backgroundColor;
            lblDelete.backgroundColor = myDataSet[index].backgroundColor;
            lblRefresh.backgroundColor = myDataSet[index].backgroundColor;
            lblIndex.text = myDataSet[index].title;

            console.log(" IN ROW BIND index is " + index);

            lblInsert.onTouch = function () {
                const mlistViewItem = this;

                myListView.itemCount += 1;
                let index = myListView.indexByListViewItem(mlistViewItem);
                myDataSet.splice(index, 0, {
                    title: `${index} ` + "v2",
                    backgroundColor: Color.create("#99d9f9")
                });

                myListView.insertRowRange({
                    positionStart: index,
                    itemCount: 1
                });
            }.bind(listViewItem);


            lblDelete.onTouch = function () {
                const mlistViewItem = this;

                myListView.itemCount -= 1;
                let index = myListView.indexByListViewItem(mlistViewItem);
                myDataSet.splice(index, 1);

                myListView.deleteRowRange({
                    positionStart: index,
                    itemCount: 1
                });
            }.bind(listViewItem);

            lblRefresh.onTouch = function () {
                const mlistViewItem = this;

                let animationRootView =  mlistViewItem.parent;
                Animator.animate(myListView, 2000, function () {
                    mlistViewItem.height = 0;
                }).complete(function () {
                    console.log("bitttiiiiii1!!!")
                });
            }.bind(listViewItem);
        };
        myListView.onRowSelected = function (listViewItem, index) {
            console.log(" item position " + myListView.indexByListViewItem(listViewItem) + " sure index " + index);
        };

        myListView.onRowMoved = (source, dest) => {
            let swapElement = myDataSet[source];
            myDataSet[source] = myDataSet[dest];
            myDataSet[dest] = swapElement;
            console.log("source " + source + " dest " + dest);
        }

        myListView.onRowCanMove = (index) => {
            if (index % 2 === 0) {
                return true;
            }
            return false;
        };

        myListView.onPullRefresh = function () {
            myDataSet.push({
                title: 'Smartface Title ' + (myDataSet.length + 1),
                backgroundColor: Color.RED,
            });
            myListView.itemCount = myDataSet.length;
            myListView.refreshData();
            myListView.stopRefresh();
        };
    }
);
module.exports = Page1;