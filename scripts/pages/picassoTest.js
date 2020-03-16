const File = require("sf-core/io/file");
const Application = require("sf-core/application");
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const ListView = require('sf-core/ui/listview');
const ListViewItem = require('sf-core/ui/listviewitem');
const ImageView = require('sf-core/ui/imageview');
const Image = require('sf-core/ui/image');
const Label = require('sf-core/ui/label');
const System = require('sf-core/device/system');
var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false;
            }
        });

        var myImageView = new ImageView({
            flexGrow: 1,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 50,
            marginRight: 50
        });
        myImageView.imageFillType = ImageView.FillType.ASPECTFIT;

        this.layout.addChild(myImageView);

        console.log(" test test");

        myImageView.onTouch = () => {
            console.log("  onTouchhh ")
            myImageView.loadFromUrl({
                url: "https://via.placeholder.com/150",
                placeholder: Image.createFromFile("images://smartface.png"),
                android: {
                    memoryPolicy: ImageView.Android.MemoryPolicy.NO_CACHE
                },
                fade: false,
                onSuccess: () => {
                    console.log("on success");
                },
                onFailure: () => {
                    console.log("on failure");
                }
            });

            // console.log("ImageView.Android.MemoryPolicy.NO_CACHE " + ImageView.Android.MemoryPolicy.NO_CACHE);
            // console.log("ImageView.Android.MemoryPolicy.NO_STORE " + ImageView.Android.MemoryPolicy.NO_STORE);

            // console.log("ImageView.Android.NetworkPolicy.NO_STORE " + ImageView.Android.NetworkPolicy.NO_STORE);
            // console.log("ImageView.Android.NetworkPolicy.NO_CACHE " + ImageView.Android.NetworkPolicy.NO_CACHE);


            // myImageView.loadFromFile({
            //     file: new File({
            //         path: 'images://smartface.png'
            //     }),
            //     placeholder: undefined,
            //     android: {
            //         memoryPolicy: [ImageView.Android.MemoryPolicy.NO_CACHE, ImageView.Android.MemoryPolicy.NO_STORE]
            //     }
            // });

            // myImageView.fetchFromUrl({
            //     url: "https://productimages.hepsiburada.net/s/28/884/10220114280498.jpg",
            //     placeholder: Image.createFromFile("images://smartface.png"),
            //     android: {
            //         networkPolicy: ImageView.Android.NetworkPolicy.NO_STORE,
            //         memoryPolicy: [ImageView.Android.MemoryPolicy.NO_CACHE, ImageView.Android.MemoryPolicy.NO_STORE]
            //     }
            // });
        };
    }
);
module.exports = Page1;
