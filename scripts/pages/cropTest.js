const Color = require("sf-core/ui/color");
const ImageView = require("sf-core/ui/imageview");
const FlexLayout = require("sf-core/ui/flexlayout");
const Multimedia = require("sf-core/device/multimedia");
const Contacts = require("sf-core/device/contacts");

const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Button = require('sf-core/ui/button');

module.exports = extend(Page)(
    function(_super) {
        const page = this;
        _super(this, {
            onLoad: () => {
                let btnTakePhoto = new Button({
                    height: 70,
                    width: 150,
                    margin: 10,
                    text: "Take A Photo", 
                    onPress: () => {
                        Multimedia.startCamera({
                            onSuccess: ({ image }) => {
                                console.log("startCamera is onSuccess onSuccess ! ")
                                // myImageView.image = image;
                            },
                            aspectRatio: {
                              x: 1,
                              y: 1
                            },
                            allowsEditing: true,
                            action: Multimedia.ActionType.IMAGE_CAPTURE,
                            page,
                            onCancel: () => {
                                console.log("its is canceled ! ")
                            },
                            onFailure: () => {
                                console.log("it is failured ! ")
                            }, 
                        });
                    }
                });
                let btnPickPhoto = new Button({
                    height: 70,
                    width: 150,
                    text: "Pick from Gallery",
                    onPress: () => {
                        Multimedia.pickFromGallery({
                            type: Multimedia.Type.IMAGE,
                            allowsEditing: true,
                            android : { 
                                cropShape: Multimedia.Android.CropShape.OVAL
                            },
                            aspectRatio: {
                              x: 4,
                              y: 9
                            },
                            onSuccess: ({ image }) => {
                                 console.log("gallery its is successsss ! ")
                                myImageView.image = image;
                            },
                            onCancel: () => {
                                console.log("its is canceled ! ")
                            },
                            onFailure: () => {
                                console.log("it is failured ! ")
                            },
                            page
                        });
                    }
                });
                var myImageView = new ImageView({
                    left: 0,
                    width: 200,
                    height: 200,
                    backgrounColor: Color.create("#eaedf2"),
                    imageFillType: ImageView.FillType.ASPECTFIT,
                });
                page.layout.addChild(myImageView);
                page.layout.addChild(btnTakePhoto);
                page.layout.addChild(btnPickPhoto);
            }
        });
        page.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        page.layout.alignItems = FlexLayout.AlignItems.CENTER;
    }
);
