/* globals lang require */
require('i18n/i18n.js'); // Generates global lang object

const Application = require('sf-core/application');
// const OS = require('sf-core/device/system').OS;

// const Firebase = require('sf-plugin-firebase');
// const File = require('sf-core/io/file');
// var iOSPlistFile = new File({
//     path: 'assets://GoogleService-Info.plist'
// });
// var firebaseConfig = {
//     iosFile : iOSPlistFile
// };
// Firebase.initializeApp(firebaseConfig);

// const Fabric = require("sf-plugin-firebase/fabric");
// const Crashlytics = require("sf-plugin-firebase/fabric/crashlytics");
// const Answers = require("sf-plugin-firebase/fabric/answers");

// Fabric.with([new Crashlytics(), new Answers()]);

// const Notifications = require('sf-core/notifications');

// Notifications.registerForPushNotifications(
//     function success(e) {
//         console.log(" on success registerForPushNotifications " + e.token);
//     },
//     function failure(e) {
//         console.log(" on failure registerForPushNotifications ");
//     }
// );

// Application.onReceivedNotification = function(e) {
//     alert("Notification: " + typeof e);
//     alert("Notification: " + JSON.stringify(e.remote));
// };


// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function(e) {
  console.log("Error -> ", {
    title: e.type || lang.applicationError,
    message: OS === 'Android' ? e.stack : (e.message + '\n\n*' + e.stack),
  });
};

// Notifications.registerForPushNotifications(
//     function success(e) {
//         console.log(" on success registerForPushNotifications " + e.token);
//     },
//     function failure(e) {
//         console.log(" on failure registerForPushNotifications ");
//     }
// );

// Handle deeplink on Android
// Application.onApplicationCallReceived = e => {
//     alert("onApplicationCallReceived", JSON.stringify(e));
// };

// Notifications.onNotificationReceive = (e) => {
//     console.log(" ==>  ", e);
// };

// Application.onReceivedNotification = () => {
//     console.log(" ==> onReceivedNotification ");
// };

// Notifications.onNotificationClick = (e) => {
//     console.log(" CLICKED ==>  ", e);
// };

// console.log("hoops")
// Notifications.removeAllDeliveredNotifications();
// console.log("hoops removed all notification")

// const System = require('sf-core/device/system');
// console.log(" system 64 " + System.android.supported64BitAbis);
// console.log(" system 32 " + System.android.supported32BitAbis);


require('./theme');
const router = require('./routes'); 
router.push('/pages/deviceInfoTest');