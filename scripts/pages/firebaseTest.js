const Page = require("sf-core/ui/page");
const Application = require("sf-core/application");
const extend = require("js-base/core/extend");
const Fabric = require("sf-plugin-firebase/fabric");   
const Crashlytics = require("sf-plugin-firebase/fabric/crashlytics");
const Answers = require("sf-plugin-firebase/fabric/answers");
const Firebase = require('sf-plugin-firebase');


var Page1 = extend(Page)(
    function (_super) {
        var page = this;
        _super(this, {
            onShow: function (params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
            },
            onLoad: function (params) {
                var myPage = this;
                /*
                  You can use Crashlytics.setUserIdentifier to provide an ID number, token, or hashed value that uniquely     
                  identifies the end-user of your application without disclosing or transmitting any of their personal 
                  information. This value is displayed right in the Fabric dashboard.
                */
                Crashlytics.setUserIdentifier("UserIdentifier");
                
                // If you would like to take advantage of advanced user identifier features, you can additionally use both:
                Crashlytics.setUserName("UserName");
                Crashlytics.setUserEmail("UserEmail");
                
                /*
                  Crashlytics allows you to associate arbitrary key/value pairs with your crash reports, which are viewable 
                  right from the Crashlytics dashboard. Setting keys are as easy as calling: Crashlytics.setString(key, value) 
                  or one of the related methods. Options are:
                */
                Crashlytics.setString("stringkey", "value");
                Crashlytics.setBool("boolkey", true);
                Crashlytics.setFloat("floatkey", 15.5);
                Crashlytics.setInt("intkey", 12);

                /*
                  To log a custom event to be sent to Answers, use the following.
                  You can also include a series of custom attributes to get even deeper insight into what’s happening in your 
                  app.
                  In addition to the recommended attributes for each event, you can also add custom attributes for any event. 
                  To log an event with a custom attribute, use the following.
                */
                Answers.logCustom('Log-Title', 
                  [
                    // Value must be only string or number
                    new Answers.CustomAttribute("key1","value1"), 
                    new Answers.CustomAttribute("key2",2)
                  ] 
                );
                Firebase.analytics.logEvent(Firebase.analytics.Event.APP_OPEN);

                
            }
        });
    }
);
module.exports = Page1;
