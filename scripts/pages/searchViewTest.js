const Application = require("sf-core/application");
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const SearchView = require('sf-core/ui/searchview');

var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
            }
        });
        this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
      
        var mySearchView = new SearchView({
            marginLeft: 20,
            marginRight: 20,
            onTextChanged: function(searchText) {
                console.log("searched text : " + searchText);
            },
            onSearchButtonClicked: function(){
                console.log(" onSearchButtonClicked ");
            },
            onSearchEnd : function() {
                console.log(" onSearchEnd ");
            },
            onSearchBegin : function() {
                console.log(" onSearchBegin ");
            }
        });
        
        // mySearchView.android.iconifiedByDefault = true;
        this.layout.addChild(mySearchView);
    }
);
module.exports = Page1;