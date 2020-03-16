const Button = require("sf-core/ui/button");
const Color = require("sf-core/ui/color");
const Page = require("sf-core/ui/page");
const FlexLayout = require('sf-core/ui/flexlayout');
const Share = require('sf-core/share');
const Image = require('sf-core/ui/image');
const File = require("sf-core/io/file");
const Application = require("sf-core/application");
const extend = require("js-base/core/extend");
const Contacts = require("sf-core/device/contacts");
const Font = require('sf-core/ui/font');


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

                console.log(" Contact Test ");
                var button = new Button(); 
                button.backgroundColor = Color.RED;
                button.height = 100;
                button.text = "Share";
                button.onPress = function () {
                    var contact = new Contacts.Contact();
                    console.log("firstName : " + contact.firstName);
                    contact.firstName = "First Name";
                    console.log("firstName : " + contact.firstName);
                    console.log("lastName : " + contact.lastName);
                    contact.lastName = "Last Name";
                    console.log("lastName : " + contact.lastName);
                    console.log("namePrefix : " + contact.namePrefix);
                    contact.namePrefix = "NPrefix";
                    console.log("namePrefix : " + contact.namePrefix);
                    console.log("middleName : " + contact.middleName);
                    contact.middleName = "MiddleName";
                    console.log("middleName : " + contact.middleName);
                    console.log("nameSuffix : " + contact.nameSuffix);
                    contact.nameSuffix = "NSuffix";
                    console.log("nameSuffix : " + contact.nameSuffix);
                    console.log("phoneNumbers : " + contact.phoneNumbers);
                    contact.phoneNumbers = ["05350000000", "05350000001"];
                    console.log("phoneNumbers : " + contact.phoneNumbers);
                    console.log("urlAddresses : " + contact.urlAddresses);
                    contact.urlAddresses = ["https://dev-my.appcircle.io/build", "https://dev-my.appcircle.io/build2"];
                    console.log("urlAddresses : " + contact.urlAddresses);
                    console.log("emailAddresses : " + contact.emailAddresses);
                    contact.emailAddresses = ["email@gmail.com", "email2@gmail.com"];
                    console.log("emailAddresses : " + contact.emailAddresses);
                    console.log("addresses : " + contact.addresses);
                    contact.addresses = ["Adress", "Adress 1"];
                    console.log("addresses : " + contact.addresses);
                    var contact2 = new Contacts.Contact();
                    console.log("firstName : " + contact2.firstName);
                    contact2.firstName = "First Name";
                    console.log("firstName : " + contact2.firstName);
                    Share.share({ items: [contact, contact2], page: myPage, blacklist: [Share.ios.Twitter, Share.ios.Facebook] });
                };
                this.layout.addChild(button);
                var button2 = new Button();
                button2.font = Font.create(Font.DEFAULT, 15);
                button2.backgroundColor = Color.RED;
                button2.height = 100;
                button2.text = "Pick";
                button2.onPress = function () {
                    Contacts.pickContact({
                        onSuccess: function (contact) {
                            console.log("Success :", contact);
                            console.log("Success 2 :" + contact);
                            contact.addresses = ["Adress", "Adress 1"];
                            Share.share({ items: [contact], page: myPage, blacklist: [Share.ios.Twitter, Share.ios.Facebook] });
                        },
                        onFailure: function () {
                            console.log("Failure");
                        },
                        page: myPage
                    });
                };
                this.layout.addChild(button2);
                var button3 = new Button();
                button3.backgroundColor = Color.RED;
                button3.height = 100;
                button3.font = Font.create(Font.DEFAULT, 10);
                button3.text = "Fetchall";
                button3.onPress = function () {
                    var result = Application.android.checkPermission(Application.android.Permissions.READ_CONTACTS);
                    if (!result) {
                        var permissionCode = 1001;
                        Application.android.requestPermissions(permissionCode, Application.android.Permissions.READ_CONTACTS);
                    }
                    result = Application.android.checkPermission(Application.android.Permissions.READ_CONTACTS);
                    Contacts.fetchAll({
                        onSuccess: function (contacts) {
                            console.log("Success :", contacts);
                        },
                        onFailure: function (error) {
                            console.log("Failure ", error);
                        },
                        page: myPage
                    });
                };
                this.layout.addChild(button3);
                var button4 = new Button();
                button4.font = Font.create(Font.DEFAULT, 10);
                button4.backgroundColor = Color.RED;
                button4.height = 100;
                button4.text = "Add";
                button4.onPress = function () {
                    var contact = new Contacts.Contact();
                    contact.firstName = "Test Ekleme 5";
                    var result = Application.android.checkPermission(Application.android.Permissions.READ_CONTACTS);
                    if (!result) {
                        var permissionCode = 1001;
                        Application.android.requestPermissions(permissionCode, Application.android.Permissions.READ_CONTACTS);
                    }
                    result = Application.android.checkPermission(Application.android.Permissions.READ_CONTACTS);
                    Contacts.add({
                        onSuccess: function () {
                            console.log("Success");
                            // Share.share({ items: [contact], page: myPage, blacklist: [Share.ios.Twitter, Share.ios.Facebook] });
                        },
                        onFailure: function (error) {
                            console.log("Failure", error);
                        },
                        contact: contact,
                    });
                };
                this.layout.addChild(button4);
            }
        });
    }
);
module.exports = Page1;

/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-invalid-this */
// const Page = require('sf-core/ui/page');
// const Contacts = require('sf-core/device/contacts');
// const Button = require('sf-core/ui/button');
// const Application = require('sf-core/application');
// const Color = require('sf-core/ui/color');
// const Device = require('sf-core/device');
// const extend = require('js-base/core/extend');
// const Share = require('sf-core/share');

// const Page1 = extend(Page)(
//     function (_super) {
//         const page = this;
//         _super(this, {
//             onShow: function (params) {
//                 // Application.statusBar.visible = false;
//                 // this.headerBar.visible = false;
//             },
//         });

//         function getContact(e) {
//             console.log('Contact : ', e);
//             addContact(e);
//             // share(e);
//         }

//         const myButton = new Button({
//             marginTop: 250,
//             marginRight: 50,
//             marginLeft: 50,
//             height: 60,
//             text: 'PICK CONTACT',
//             backgroundColor: Color.RED,
//             onPress: function () {
//                 // getAll();
//                 let contactObj1 = new Contacts.Contact({
//                     firstName: 'Smartface',
//                     lastName: 'Team',
//                     urlAddresses: ["https://smartface.io"],
//                     phoneNumbers: ["+16506173265"],
//                     emailAddresses: ["info@smartface.io"],
//                     addresses: ["3790 El Camino Real # 1022 Palo Alto CA, 94306,United States"]
//                 });

//                 let contactObj2 = new Contacts.Contact({
//                     firstName: '2 Smartface',
//                     namePrefix: '2 Mr.',
//                     lastName: ' 2 Team',
//                     urlAddresses: ["https://smartface.io"],
//                     phoneNumbers: ["+1650617326522"],
//                     emailAddresses: ["2info@smartface.io"],
//                     addresses: ["222 3790 El Camino Real # 1022 Palo Alto CA, 94306,United States"]
//                 });
//                 share([contactObj1,contactObj2]);
//                 addContact();
//                 pickContact();
//             },
//         });


//         function share(contactObj) {
//             const COUNT = "COUNT";
//             const Data = require('sf-core/data');
//             if (Data.getIntVariable(COUNT) === null)
//                 Data.setIntVariable("COUNT", 0);

//             let count = Data.getIntVariable(COUNT);
//             ++count;
//             console.log("share ")
//             if (!contactObj) {
//                 contactObj = new Contacts.Contact({
//                     firstName: 'Smartface',
//                     namePrefix: 'Mr.',
//                     lastName: 'Team',
//                     urlAddresses: ["https://smartface.io"],
//                     phoneNumbers: ["+16506173265"],
//                     emailAddresses: ["info@smartface.io"],
//                     addresses: ["3790 El Camino Real # 1022 Palo Alto CA, 94306,United States"]
//                 });
//             }
//             Data.setIntVariable("COUNT", count);

//             console.time("share-time");
//             Share.share({ items: [].concat(contactObj), page, blacklist: [Share.ios.Twitter, Share.ios.Facebook] });
//             console.timeEnd("share-time")
//         }


//         console.log("In Contact test PG");

//         function getAll() {
//             Contacts.getAll({
//                 onSuccess: function (contacts) {
//                     console.log("Contacts ", contacts);
//                 },
//                 onFailure: function (error) {
//                     console.log("Message : " + error);
//                 }
//             });
//         }

//         function addContact(contactObj) {
//             var result = Application.android.checkPermission(Application.android.Permissions.WRITE_CONTACTS);
//             if (!result) {
//                 var permissionCode = 1001;
//                 Application.android.requestPermissions(permissionCode, Application.android.Permissions.WRITE_CONTACTS);
//             }
//             result = Application.android.checkPermission(Application.android.Permissions.WRITE_CONTACTS);

//             if (!contactObj) {
//                 const COUNT = "COUNT";
//                 const Data = require('sf-core/data');
//                 if (Data.getIntVariable(COUNT) === null)
//                     Data.setIntVariable("COUNT", 0);

//                 let count = Data.getIntVariable(COUNT);
//                 ++count;
//                 contactObj = new Contacts.Contact({
//                     firstName: `firstName${count}`,
//                     namePrefix: `namePrefix${count}`,
//                     lastName: `lastName${count}`,
//                     nameSuffix: `nameSuffix${count}`,
//                     middleName: `middleName${count}`,
//                     urlAddresses: ["bambam.com", "hophop.com"],
//                     phoneNumbers: ["+16506173265", "+12312124123", "+124124123", "+1532134", "+0898097248734"],
//                     emailAddresses: ["info@smartface.io", "info1@smartface.io", "info2@smartface.io"],
//                     addresses: ["347 N Canon Dr Beverly Hills, CA 90210", "347 N Canon Dr Beverly Hills, CA 23210", "347 N Canon Dr Beverly Hills, CA 90210", "347 N Canon Dr Beverly Hills, CA 2310"]
//                 });
//                 Data.setIntVariable("COUNT", count);
//             }
//             Contacts.add({
//                 contact: contactObj,
//                 onSuccess: function () {
//                     console.log("Success");
//                 },
//                 onFailure: function (error) {
//                     console.log("Failure " + error);
//                 }
//             });
//         }

//         this.layout.addChild(myButton);

//         function pickContact() {
//             if (Device.System.OS === "Android") {
//                 var result = Application.android.checkPermission(Application.android.Permissions.WRITE_CONTACTS);
//                 if (!result) {
//                     var permissionCode = 1001;
//                     Application.android.requestPermissions(permissionCode, Application.android.Permissions.WRITE_CONTACTS);
//                 }
//                 result = Application.android.checkPermission(Application.android.Permissions.WRITE_CONTACTS);
//                 if (result) {
//                     console.log(" pick Contact ");
//                     Contacts.pickContact({
//                         onSuccess: getContact,
//                         page: page
//                     });
//                 }
//             } else if (Device.System.OS === "iOS") {
//                 Contacts.pick({
//                     onSuccess: getContact,
//                     page: page
//                 });
//             }
//         }
//     },
// );


// module.exports = Page1;
