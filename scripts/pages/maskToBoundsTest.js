const extend   = require('js-base/core/extend');
const Page     = require('sf-core/ui/page');
const TextArea = require('sf-core/ui/textarea');
const TextBox = require('sf-core/ui/textbox');
const TextView = require('sf-core/ui/textview');
const Label = require('sf-core/ui/label');
const View = require('sf-core/ui/view');
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const TextAlignment = require('sf-core/ui/textalignment');

const Page1 = extend(Page)(
  function(_super){
    _super(this);
    this.onShow = function() {
    //   this.headerBar.visible = false;
    //   Application.statusBar.visible = false;
    
    let fl1 = new FlexLayout({
        width:200,
        height: 200, 
        marginLeft : 50,
        marginTop: 15,
        borderRadius: 25,
        borderWidth: 5,
        backgroundColor: Color.BLUE
    });
    
      var myView= new TextView({
        width:500, 
        height:500,
        backgroundColor: Color.GRAY,
        textAlignment: TextAlignment.TOPLEFT,
        text: "TextArea is a UI object, contents of which is editable by the user. It supports multiline editing."
      });

      fl1.addChild(myView);

    //   fl1.masksToBounds = true; 
      fl1.android.elevation = 60;
    //   fl1.ios.clipsToBounds = true;

    //   fl1.nativeObject.setClipToOutline(true);
      this.layout.addChild(fl1);
    }.bind(this);
  }
);

module && (module.exports = Page1);