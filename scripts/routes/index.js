const OS = require('sf-core/device/system').OS;
const buildExtender = require('sf-extension-utils/lib/router/buildExtender');
const {
    NativeRouter: Router,
    NativeStackRouter: StackRouter,
    Route,
} = require('@smartface/router');
require('sf-extension-utils/lib/router/goBack'); // Implements onBackButtonPressed


module.exports = Router.of({
    path: '/',
    to: "/pages",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: '/pages',
            to: "/pages/headerBarTest",
            homeRoute: 0,
            isRoot: true,
            routes: [
                Route.of({
                    path: '/pages/searchViewTest',
                    build: buildExtender({ getPageClass: () => require('pages/searchViewTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/scrollingTest',
                    build: buildExtender({ getPageClass: () => require('pages/scrollingTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/swipeTest',
                    build: buildExtender({ getPageClass: () => require('pages/swipeTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/tabbarTest',
                    build: buildExtender({ getPageClass: () => require('pages/tabbarTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/networkTest',
                    build: buildExtender({ getPageClass: () => require('pages/networkTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/materialTextboxTest',
                    build: buildExtender({ getPageClass: () => require('pages/materialTextboxTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/picassoTest',
                    build: buildExtender({ getPageClass: () => require('pages/picassoTest'), headerBarStyle: { visible: true } }),
                }), Route.of({
                    path: '/pages/gridViewTest',
                    build: buildExtender({ getPageClass: () => require('pages/gridViewTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/webviewTest',
                    build: buildExtender({ getPageClass: () => require('pages/webviewTest'), headerBarStyle: { visible: true } }),
                }), Route.of({
                    path: '/pages/textboxTest',
                    build: buildExtender({ getPageClass: () => require('pages/textboxTest'), headerBarStyle: { visible: true } }),
                }), Route.of({
                    path: '/pages/gridViewSingleTest',
                    build: buildExtender({ getPageClass: () => require('pages/gridViewSingleTest'), headerBarStyle: { visible: true } }),
                }), Route.of({
                    path: '/pages/listViewTest',
                    build: buildExtender({ getPageClass: () => require('pages/listViewTest'), headerBarStyle: { visible: true } }),
                }), Route.of({
                    path: '/pages/dialogTest',
                    build: buildExtender({ getPageClass: () => require('pages/dialogTest'), headerBarStyle: { visible: true } }),
                }), Route.of({
                    path: '/pages/webbrowserTest',
                    build: buildExtender({ getPageClass: () => require('pages/webbrowserTest'), headerBarStyle: { visible: true } }),
                }), Route.of({
                    path: '/pages/alertTest',
                    build: buildExtender({ getPageClass: () => require('pages/alertTest'), headerBarStyle: { visible: true } }),
                }), Route.of({
                    path: '/pages/animationTest',
                    build: buildExtender({ getPageClass: () => require('pages/animationTest'), headerBarStyle: { visible: true } }),
                }), Route.of({
                    path: '/pages/buttonTest',
                    build: buildExtender({ getPageClass: () => require('pages/buttonTest'), headerBarStyle: { visible: true } }),
                }), Route.of({
                    path: '/pages/contactsTest',
                    build: buildExtender({ getPageClass: () => require('pages/contactsTest'), headerBarStyle: { visible: true } }),
                }), Route.of({
                    path: '/pages/textviewTest',
                    build: buildExtender({ getPageClass: () => require('pages/textviewTest'), headerBarStyle: { visible: true } }),
                }), Route.of({
                    path: '/pages/maskToBoundsTest',
                    build: buildExtender({ getPageClass: () => require('pages/maskToBoundsTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/videoPlayerTest',
                    build: buildExtender({ getPageClass: () => require('pages/videoPlayerTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/masksToBoundPgTest',
                    build: buildExtender({ getPageClass: () => require('pages/masksToBoundPgTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/dragDropTest',
                    build: buildExtender({ getPageClass: () => require('pages/dragDropTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/borderRadiusTest',
                    build: buildExtender({ getPageClass: () => require('pages/borderRadiusTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/headerBarTest',
                    build: buildExtender({ getPageClass: () => require('pages/headerBarTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/snapToAlignmentTest',
                    build: buildExtender({ getPageClass: () => require('pages/snapToAlignmentTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/rangeSliderTest',
                    build: buildExtender({ getPageClass: () => require('pages/rangeSliderTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/cropTest',
                    build: buildExtender({ getPageClass: () => require('pages/cropTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/contactsTest',
                    build: buildExtender({ getPageClass: () => require('pages/contactsTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/documentPickerTest',
                    build: buildExtender({ getPageClass: () => require('pages/documentPickerTest'), headerBarStyle: { visible: true } }),
                }),
                Route.of({
                    path: '/pages/firebaseTest',
                    build: buildExtender({ getPageClass: () => require('pages/firebaseTest'), headerBarStyle: { visible: true } }),
                }),
                StackRouter.of({
                    path: '/pages/modal',
                    modal: true,
                    routes: [
                        Route.of({
                            path: '/pages/modal/page2',
                            build: buildExtender({ getPageClass: () => require('pages/page2'), headerBarStyle: { visible: true } }),
                        }),
                        StackRouter.of({
                            path: '/pages/modal/next',
                            modal: true,
                            routes: [
                                Route.of({
                                    path: '/pages/modal/next/page3',
                                    build: buildExtender({ getPageClass: () => require('pages/page3'), headerBarStyle: { visible: true } }),
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        }),
    ],
});

// const BottomTabBarRouter = require("@smartface/router/src/native/BottomTabBarRouter");
// const TabBarItem = require("sf-core/ui/tabbaritem");
// const Color = require('sf-core/ui/color');
// const Image = require("sf-core/ui/image");

// const Page1 = require("../pages/headerBarTest"); 
// const Page2 = require("../pages/alertTest");
// const Page3 = require("../pages/tabbarTest"); 

// let btbItemMessages = new TabBarItem();
// btbItemMessages.title = "Messages";
// btbItemMessages.icon = Image.createFromFile("images://icon.png");

// const router = Router.of({
//     path: "/",
//     isRoot: true,
//     routes: [
//         BottomTabBarRouter.of({
//             path: "/pages/cropTest",
//             to: "/pages/cropTest",
//             tabbarParams: () => ({
//                 ios: { visible: false },
//                 itemColor: {
//                     normal: Color.BLACK,
//                     selected: Color.WHITE
//                 },
//                 backgroundColor: Color.create("#00A1F1")
//             }),
//             items: () => [{
//                     title: "Profile",
//                     icon: Image.createFromFile("images://icon.png")
//                 },
//                 btbItemMessages, 
//                 {
//                     title: "Settings",
//                     icon: Image.createFromFile("images://icon.png")
//                 }
//             ],
//             // tab1
//             routes: [
//                 // tab1
//                 Route.of({
//                     path: "/pages/contactsTest",
//                     build: (router, route) => {
//                         return new Page1(router);
//                     }
//                 }),
//                 // tab2
//                 Route.of({
//                     path: "/pages/cropTest",
//                     build: (router, route) => {
//                         return new Page2(router);
//                     }
//                 }),
//                 // tab3
//                 Route.of({
//                     path: "/pages/videoPlayerTest",
//                     build: (router, route) => {
//                         return new Page3(router);
//                     }
//                 })
//             ]
//         })
//     ]
// });
// router.push("/pages/cropTest");

// module.exports = router;