/* globals lang */
require("i18n/i18n.js"); // Generates global lang object

const Application = require("sf-core/application");
const OS = require('sf-core/device/system').OS;

const Notifications = require("sf-core/notifications");

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
    alert({
        title: e.type || lang.applicationError,
        message: OS === "Android" ? e.stack : (e.message + "\n\n*" + e.stack)
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


require("sf-extension-utils");
require("./theme");
const router = require("./routes");
router.push("/pages/alertTest");