const SearchView = require("sf-core/ui/searchview");
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
        
        const Badge = require('sf-core/ui/badge');
        const cluster = require('sf-core/ui/mapview/cluster/cluster-Android.js');
        const picker = require("sf-core/ui/searchview/searchview-Android.js");
        const searchview  = require("sf-core/ui/searchview/searchview-Android.js");
        

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
            backgroundColor:Color.create("#00a1f1")
        }, {
            title: 'Smartface Title 5',
            backgroundColor:Color.create("#00a1f1")
        }, {
            title: 'Smartface Title 6',
            backgroundColor:Color.create("#00a1f1")
        }, {
            title: 'Smartface Title 7',
            backgroundColor:Color.create("#00a1f1")
        }, {
            title: 'Smartface Title 8',
            backgroundColor:Color.create("#00a1f1")
        }, {
            title: 'Smartface Title 9',
            backgroundColor:Color.create("#00a1f1")
        }];

        var myListView = new ListView({
            flexGrow: 1,
            rowHeight: 70,
            itemCount: myDataSet.length,
        });

        this.layout.addChild(myListView);
        
        var mySearchView = new SearchView({
            marginLeft: 20,
            marginRight: 20,
            onTextChanged: function(searchText) {
                console.log("searched text : " + searchText);
            }
        });
        mySearchView.font = Font.create("SFProText", 30);
        this.layout.addChild(mySearchView);
            
        myListView.onRowCreate = function() {
            var myListViewItem = new ListViewItem();
            myListViewItem.width = 200;
            myListViewItem.height = 200;
            var myLabelTitle = new Label({
                flexGrow:1
            });
            myLabelTitle.font = Font.create(Font.DEFAULT, 15, Font.BOLD);
            myLabelTitle.textAlignment = TextAlignment.MIDCENTER;
            myLabelTitle.textColor = Color.WHITE;
            // myLabelTitle.borderRadius = 10;
            myListViewItem.addChild(myLabelTitle);
            myListViewItem.myLabelTitle = myLabelTitle;
            return myListViewItem;
        };
        myListView.onRowBind = function(listViewItem, index) {
            // listViewItem.width = 50;
            var myLabelTitle = listViewItem.myLabelTitle;
            myLabelTitle.text = myDataSet[index].title;
            myLabelTitle.backgroundColor = myDataSet[index].backgroundColor;
        };
        myListView.onRowSelected = function(listViewItem, index) {
            console.log("selected index = " + index);
        };

        myListView.onPullRefresh = function() {
            myDataSet.push({
                title: 'Smartface Title ' + (myDataSet.length+1),
                backgroundColor: Color.RED,
            });
            myListView.itemCount = myDataSet.length;
            myListView.refreshData();
            myListView.stopRefresh();
        };
    }
);
module.exports = Page1;