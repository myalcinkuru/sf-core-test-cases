const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Color = require('sf-core/ui/color');
const Label = require('sf-core/ui/label');
const FlexLayout = require('sf-core/ui/flexlayout');
const ListView = require('sf-core/ui/listview');
const ListViewItem = require('sf-core/ui/listviewitem');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const Animator = require("sf-core/ui/animator");
const ImageView = require("sf-core/ui/imageview");
const AlertView = require("sf-core/ui/alertview");
const Share = require("sf-core/share");
const Application = require("sf-core/application");
const Screen = require("sf-core/device/screen");
const GridView = require("sf-core/ui/gridview");
const GridViewItem = require("sf-core/ui/gridviewitem");
const LayoutManager = require("sf-core/ui/layoutmanager");

var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                // Application.statusBar.visible = false;
                // this.headerBar.visible = false;
            }
        });
        this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.layout.alignItems = FlexLayout.AlignItems.CENTER;

        var myListView = new ListView({
            height:350,
            width: Screen.width,
            rowHeight: 60,
            itemCount: 15
        });

        this.layout.addChild(myListView);
            
        myListView.onRowCreate = function() {
            var myListViewItem = new ListViewItem();
            let mainFlexLayout = new FlexLayout({
                flexGrow: 1
            })
            myListViewItem.flexDirection = FlexLayout.FlexDirection.ROW;
            mainFlexLayout.flexDirection = FlexLayout.FlexDirection.ROW;
            let flexlayouts = [];
                for (var i = 0; i < 5; i++) {
                    var flex = new FlexLayout();
                    // flex.backgroundColor = Color.RED;
                    flex.marginLeft = 20;
                    flex.top = 20;
                    flex.width = 50;
                    flex.height = 50;
                    flex.flexDirection = FlexLayout.FlexDirection.ROW;
                    // flex.scale = { x: 0, y: 0 };
                    var imageView = new ImageView({
                        image: "images://icon.png",
                        left: 0,
                        width: 50,
                        height: 40
                    });
                    imageView.imageFillType = ImageView.FillType.ASPECTFIT;
                    flex.addChild(imageView);
                    var label = new Label();
                    // label.backgroundColor = Color.GREEN;
                    label.width = 50;
                    label.height = 10;
                    label.text = "Text";
                    label.font = Font.create("Arial", 10, Font.BOLD);
                    label.textAlignment = TextAlignment.MIDCENTER;
                    flex.addChild(label);
                    flexlayouts.push(flex);
                    mainFlexLayout.addChild(flex);
            }
            myListViewItem.addChild(mainFlexLayout);
            myListViewItem.flexlayouts = flexlayouts;
            return myListViewItem;
        };
        myListView.onRowBind = function(listViewItem, index) {
            var flexlayouts = listViewItem.flexlayouts;
        };
        myListView.onRowSelected = function(listViewItem, index) {
            console.log("selected index = " + index)
            var flexlayouts = listViewItem.flexlayouts;
            flexlayouts.forEach((e) => {
                    e.scale = {x: 0, y: 0};
                });
                    var rootFlex = flexlayouts[0].parent;
                    Animator.animate(rootFlex, 150, function() {
                        flexlayouts[0].scale = {x: 1, y: 1};
                    })
                    .then(150, () => {
                        flexlayouts[1].scale = {x: 1, y: 1};
                    })
                    .then(150, () => {
                        flexlayouts[2].scale = {x: 1, y: 1};
                    })
                    .then(150, () => {
                        flexlayouts[3].scale = {x: 1, y: 1};
                    })
                    .then(150, () => {
                        flexlayouts[4].scale = {x: 1, y: 1};
                    })
                    .complete(function() {
                        console.log(" Animation is over ");
                    });
        };

        myListView.onPullRefresh = function() {
            // myDataSet.push({
            //     title: 'Smartface Title ' + (myDataSet.length+1),
            //     backgroundColor: Color.RED,
            // })
            // myListView.itemCount = myDataSet.length;
            myListView.refreshData();
            myListView.stopRefresh();
        }
    }
);
module.exports = Page1;