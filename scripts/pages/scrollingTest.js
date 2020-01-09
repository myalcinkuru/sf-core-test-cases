const TextView = require("sf-core/ui/textview");
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

        var myDataSet = [{
            title: 'Lorem Ipsum छपाई और अक्षर योजन उद्योग का एक साधारण डमी पाठ है. Lorem Ipsum सन १५०० के बाद से अभी तक इस उद्योग का मानक डमी पाठ मन गया, जब एक अज्ञात मुद्रक ने नमूना लेकर एक नमूना किताब बनाई. यह न केवल पाँच सदियों से जीवित रहा बल्कि इसने इलेक्ट्रॉनिक मीडिया में छलांग लगाने के बाद भी मूलतः अपरिवर्तित रहा. यह 1960 के दशक में Letraset Lorem Ipsum अंश युक्त पत्र के रिलीज के साथ लोकप्रिय हुआ, और हाल ही में Aldus PageMaker Lorem Ipsum के संस्करणों सहित तरह डेस्कटॉप प्रकाशन सॉफ्टवेयर के साथ अधिक प्रचलित हुआ.',
            backgroundColor: Color.create("#99d9f9")
        }, {
            title: 'Lorem Ipsum छपाई और अक्षर योजन उद्योग का एक साधारण डमी पाठ है. Lorem Ipsum सन १५०० के बाद से अभी तक इस उद्योग का मानक डमी पाठ मन गया, जब एक अज्ञात मुद्रक ने नमूना लेकर एक नमूना किताब बनाई. यह न केवल पाँच सदियों से जीवित रहा बल्कि इसने इलेक्ट्रॉनिक मीडिया में छलांग लगाने के बाद भी मूलतः अपरिवर्तित रहा. यह 1960 के दशक में Letraset Lorem Ipsum अंश युक्त पत्र के रिलीज के साथ लोकप्रिय हुआ, और हाल ही में Aldus PageMaker Lorem Ipsum के संस्करणों सहित तरह डेस्कटॉप प्रकाशन सॉफ्टवेयर के साथ अधिक प्रचलित हुआ.',
            backgroundColor: Color.create("#66c6f6")
        }, {
            title: 'Smartface Title 3',
            backgroundColor: Color.create("#32b3f3")
        }, {
            title: 'Lorem Ipsum छपाई और अक्षर योजन उद्योग का एक साधारण डमी पाठ है. Lorem Ipsum सन १५०० के बाद से अभी तक इस उद्योग का मानक डमी पाठ मन गया, जब एक अज्ञात मुद्रक ने नमूना लेकर एक नमूना किताब बनाई. यह न केवल पाँच सदियों से जीवित रहा बल्कि इसने इलेक्ट्रॉनिक मीडिया में छलांग लगाने के बाद भी मूलतः अपरिवर्तित रहा. यह 1960 के दशक में Letraset Lorem Ipsum अंश युक्त पत्र के रिलीज के साथ लोकप्रिय हुआ, और हाल ही में Aldus PageMaker Lorem Ipsum के संस्करणों सहित तरह डेस्कटॉप प्रकाशन सॉफ्टवेयर के साथ अधिक प्रचलित हुआ.',
            backgroundColor: Color.create("#00a1f1")
        }, {
            title: 'Smartface Title 5',
            backgroundColor: Color.create("#00a1f1")
        }, {
            title: 'Lorem Ipsum छपाई और अक्षर योजन उद्योग का एक साधारण डमी पाठ है. Lorem Ipsum सन १५०० के बाद से अभी तक इस उद्योग का मानक डमी पाठ मन गया, जब एक अज्ञात मुद्रक ने नमूना लेकर एक नमूना किताब बनाई. यह न केवल पाँच सदियों से जीवित रहा बल्कि इसने इलेक्ट्रॉनिक मीडिया में छलांग लगाने के बाद भी मूलतः अपरिवर्तित रहा. यह 1960 के दशक में Letraset Lorem Ipsum अंश युक्त पत्र के रिलीज के साथ लोकप्रिय हुआ, और हाल ही में Aldus PageMaker Lorem Ipsum के संस्करणों सहित तरह डेस्कटॉप प्रकाशन सॉफ्टवेयर के साथ अधिक प्रचलित हुआ.',
            backgroundColor: Color.create("#00a1f1")
        }, {
            title: 'Smartface Title 7',
            backgroundColor: Color.create("#00a1f1")
        }, {
            title: 'Smartface Title 8',
            backgroundColor: Color.create("#00a1f1")
        }, {
            title: 'Lorem Ipsum छपाई और अक्षर योजन उद्योग का एक साधारण डमी पाठ है. Lorem Ipsum सन १५०० के बाद से अभी तक इस उद्योग का मानक डमी पाठ मन गया, जब एक अज्ञात मुद्रक ने नमूना लेकर एक नमूना किताब बनाई. यह न केवल पाँच सदियों से जीवित रहा बल्कि इसने इलेक्ट्रॉनिक मीडिया में छलांग लगाने के बाद भी मूलतः अपरिवर्तित रहा. यह 1960 के दशक में Letraset Lorem Ipsum अंश युक्त पत्र के रिलीज के साथ लोकप्रिय हुआ, और हाल ही में Aldus PageMaker Lorem Ipsum के संस्करणों सहित तरह डेस्कटॉप प्रकाशन सॉफ्टवेयर के साथ अधिक प्रचलित हुआ.',
            backgroundColor: Color.create("#00a1f1")
        }];

        var myListView = new ListView({
            height: 350,
            rowHeight: 100,
            itemCount: myDataSet.length,
        });

        this.layout.addChild(myListView);

        let moveTouchEnded = () => {
            console.log(" In Move TOuch Ended");
        };

        let justTouchEnded = () => {
            console.log("Just TOuch Ended");
        };

        myListView.onRowCreate = function() {
            var myListViewItem = new ListViewItem();
            var myLabelTitle = new TextView({
                flexGrow: 1,
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 10,
                marginRight: 10
            });
            myLabelTitle.scrollEnabled = true;
            myLabelTitle.font = Font.create(Font.DEFAULT, 15, Font.BOLD);
            myLabelTitle.textAlignment = TextAlignment.TOPLEFT;
            myLabelTitle.textColor = Color.WHITE;
            myLabelTitle.borderRadius = 10;
            // myLabelTitle.maxLines = 0;
            // myLabelTitle.showScrollBar  = true;
            myListViewItem.addChild(myLabelTitle);
            myListViewItem.myLabelTitle = myLabelTitle;
            return myListViewItem;
        };
        myListView.onRowBind = function(listViewItem, index) {
            var myLabelTitle = listViewItem.myLabelTitle;
            myLabelTitle.text = myDataSet[index].title;


            let theX, theY;
            myLabelTitle.onTouch = (events) => {
                theX = events.x;
                theY = events.y;
                myLabelTitle.getParent().android.requestDisallowInterceptTouchEvent(true);
                return false;
            };

            myLabelTitle.onTouchEnded = (isInside, events) => {
                console.log("onTouchEnded  x  " + events.x + "  y  " + events.y);
                let distance = Math.round(Math.sqrt(Math.pow((theX - events.x), 2) + Math.pow((theY - events.y), 2)));
                console.log("onTouchEnded  distance " + distance);
            };

            myLabelTitle.moveTouched = false;
      
            myLabelTitle.onTouchMoved = (isInside, events) => true;


            myLabelTitle.backgroundColor = myDataSet[index].backgroundColor;
        };
        myListView.onRowSelected = function(listViewItem, index) {
            console.log("selected index = " + index);
        };

        myListView.onPullRefresh = function() {
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
