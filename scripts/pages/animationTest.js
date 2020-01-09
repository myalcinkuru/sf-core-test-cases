const View = require("sf-core/ui/view");
const Animator = require("sf-core/ui/animator");
const Color = require("sf-core/ui/color");
const Font = require("sf-core/ui/font");
const Label = require("sf-core/ui/label");
const ListView = require("sf-core/ui/listview");
const ListViewItem = require("sf-core/ui/listviewitem");
const TextAlignment = require("sf-core/ui/textalignment");
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const FlexLayout = require('sf-core/ui/flexlayout');


var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                this.headerBar.visible = false; //For Android
            },
            onLoad: function(params) {

                let mainFl = new FlexLayout({
                    flexGrow: 1
                });

                let innerFl = new View({
                    height: 450,
                    width: null,
                    positionType: FlexLayout.PositionType.RELATIVE,
                    backgroundColor: Color.BLUE
                });

                mainFl.addChild(innerFl);

                let myListview = createListView();

                mainFl.addChild(myListview);

                this.layout.addChild(mainFl);

                console.log(" on load");
                let returnBack = false;
                innerFl.onTouch = () => {
                    console.log(" on touch");
                    if (!returnBack) {
                        myListview.scrollEnabled = false;
                        Animator.animate(mainFl, 500, () => {
                            innerFl.height = 100;
                        }).complete(function() {
                            innerFl.backgroundColor = Color.GREEN;
                            myListview.scrollEnabled = true;
                        });
                        returnBack = true;
                    }
                    else {
                        myListview.scrollEnabled = false;
                        Animator.animate(mainFl, 500, () => {
                            innerFl.height = 450;
                        }).complete(function() {
                            innerFl.backgroundColor = Color.BLUE;
                            myListview.scrollEnabled = true;
                        });
                        returnBack = false;
                    }
                    return false;
                };
            }
        });
        this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.layout.alignItems = FlexLayout.AlignItems.CENTER;
    }
);

function createListView() {
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
    }, , {
        title: 'Smartface Title 9',
        backgroundColor: Color.create("#00a1f1")
    }, {
        title: 'Smartface Title 9',
        backgroundColor: Color.create("#00a1f1")
    }, {
        title: 'Smartface Title 9',
        backgroundColor: Color.create("#00a1f1")
    }, {
        title: 'Smartface Title 9',
        backgroundColor: Color.create("#00a1f1")
    }, {
        title: 'Smartface Title 9',
        backgroundColor: Color.create("#00a1f1")
    }, {
        title: 'Smartface Title 9',
        backgroundColor: Color.create("#00a1f1")
    }, {
        title: 'Smartface Title 9',
        backgroundColor: Color.create("#00a1f1")
    }];

    var myListView = new ListView({
        flexGrow: 1,
        rowHeight: 70,
        itemCount: myDataSet.length,
    });


    myListView.onRowCreate = function() {
        var myListViewItem = new ListViewItem();
        var myLabelTitle = new Label({
            flexGrow: 1,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 50,
            marginRight: 50,
            backgroundColor: Color.BLUE
        });
        myLabelTitle.font = Font.create(Font.DEFAULT, 15, Font.BOLD);
        myLabelTitle.textAlignment = TextAlignment.MIDCENTER;
        myLabelTitle.textColor = Color.WHITE;
        myLabelTitle.borderRadius = 10;
        myListViewItem.addChild(myLabelTitle);
        myListViewItem.myLabelTitle = myLabelTitle;
        return myListViewItem;
    };
    myListView.onRowBind = function(listViewItem, index) {
        // var myLabelTitle = listViewItem.myLabelTitle;
        // myLabelTitle.text = myDataSet[index].title;
        // myLabelTitle.backgroundColor = myDataSet[index].backgroundColor;
    };
    // myListView.onRowSelected = function(listViewItem, index) {
    //     console.log("selected index = " + index);
    // };

    myListView.onPullRefresh = function() {
        myDataSet.push({
            title: 'Smartface Title ' + (myDataSet.length + 1),
            backgroundColor: Color.RED,
        });
        myListView.itemCount = myDataSet.length;
        myListView.refreshData();
        myListView.stopRefresh();
    };

    return myListView;
}

module.exports = Page1;
