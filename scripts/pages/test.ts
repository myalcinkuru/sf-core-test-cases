
import System from "sf-core/device/system";
import Griview from "sf-core/ui/gridview";
import Contact from "sf-core/device/contacts"

class TestClass {

    TestClass() {

        Contact.android.getContactsByPhoneNumber("5555555555", {
            onSuccess: function (contacts) {
                console.log("Successfully found ", contacts);
            },
            onFailure: function (error) {
                console.log("Something went wrong");
            }
        }); 
        let aas: String = System.android.supported32BitAbis;
        let gridview = new Griview({});
        gridview.onScroll = e => {
            // e.android.tran
        }
    }
}