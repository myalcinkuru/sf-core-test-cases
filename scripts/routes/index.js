const OS = require('sf-core/device/system').OS;
const buildExtender = require("sf-extension-utils/lib/router/buildExtender");
const {
    NativeRouter: Router,
    NativeStackRouter: StackRouter,
    Route
} = require("@smartface/router");
require("sf-extension-utils/lib/router/goBack"); // Implements onBackButtonPressed


module.exports = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            routes: [
                Route.of({
                    path: "/pages/searchViewTest",
                    build: buildExtender({ getPageClass: () => require("pages/searchViewTest"), headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/scrollingTest",
                    build: buildExtender({ getPageClass: () => require("pages/scrollingTest"), headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/swipeTest",
                    build: buildExtender({ getPageClass: () => require("pages/swipeTest"), headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/tabbarTest",
                    build: buildExtender({ getPageClass: () => require("pages/tabbarTest"), headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/networkTest",
                    build: buildExtender({ getPageClass: () => require("pages/networkTest"), headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/materialTextboxTest",
                    build: buildExtender({ getPageClass: () => require("pages/materialTextboxTest"), headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/picassoTest",
                    build: buildExtender({ getPageClass: () => require("pages/picassoTest"), headerBarStyle: { visible: true } })
                }), Route.of({
                    path: "/pages/gridViewTest",
                    build: buildExtender({ getPageClass: () => require("pages/gridViewTest"), headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/webviewTest",
                    build: buildExtender({ getPageClass: () => require("pages/webviewTest"), headerBarStyle: { visible: true } })
                }),Route.of({
                    path: "/pages/textboxTest",
                    build: buildExtender({ getPageClass: () => require("pages/textboxTest"), headerBarStyle: { visible: true } })
                }),Route.of({
                    path: "/pages/gridViewSingleTest",
                    build: buildExtender({ getPageClass: () => require("pages/gridViewSingleTest"), headerBarStyle: { visible: true } })
                }),Route.of({
                    path: "/pages/listViewTest",
                    build: buildExtender({ getPageClass: () => require("pages/listViewTest"), headerBarStyle: { visible: true } })
                }),Route.of({
                    path: "/pages/dialogTest",
                    build: buildExtender({ getPageClass: () => require("pages/dialogTest"), headerBarStyle: { visible: true } })
                }),Route.of({
                    path: "/pages/webbrowserTest",
                    build: buildExtender({ getPageClass: () => require("pages/webbrowserTest"), headerBarStyle: { visible: true } })
                }),Route.of({
                    path: "/pages/alertTest",
                    build: buildExtender({ getPageClass: () => require("pages/alertTest"), headerBarStyle: { visible: true } })
                }),Route.of({
                    path: "/pages/animationTest",
                    build: buildExtender({ getPageClass: () => require("pages/animationTest"), headerBarStyle: { visible: true } })
                }),
                StackRouter.of({
                    path: "/pages/modal",
                    modal: true,
                    routes: [
                        Route.of({
                            path: "/pages/modal/page2",
                            build: buildExtender({ getPageClass: () => require("pages/page2"), headerBarStyle: { visible: true } })
                        }),
                        StackRouter.of({
                            path: "/pages/modal/next",
                            modal: true,
                            routes: [
                                Route.of({
                                    path: "/pages/modal/next/page3",
                                    build: buildExtender({ getPageClass: () => require("pages/page3"), headerBarStyle: { visible: true } })
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    ]
});
