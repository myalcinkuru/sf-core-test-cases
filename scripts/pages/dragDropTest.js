const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Color = require('sf-core/ui/color');
const Label = require('sf-core/ui/label');
const FlexLayout = require('sf-core/ui/flexlayout');
const ListView = require('sf-core/ui/listview');
const ListViewItem = require('sf-core/ui/listviewitem');
const Font = require('sf-core/ui/font');
const TextAlignment = require('sf-core/ui/textalignment');
var Page1 = extend(Page)(
	function(_super) {
		_super(this, {
			onShow: function(params) {
				// Application.statusBar.visible = false;
				// this.headerBar.visible = false;
			}
		});
		const HEADER_TYPE = 2,
			GENERAL_TYPE = 1;
		var _headerData = [
			"Complementary",
			"Analogous"
		];
		var _rowData = [
			["#eeb8ff", "#ffb8c9", "#c9ffb8", "#b8ffee", "#ffb8c9"],
			["#ff6c8f", "#ff85a2", "#ff9fb6", "#ffb8c9", "#ffd2dc", "#ffebf0"]
		];
		var dataArray = [];
		function pushDataToArray(headerData, rowData) {
			for (var i = 0; i < headerData.length; i++) {
				dataArray.push({ isHeader: true, data: headerData[i] });
				for (var j = 0; j < rowData[i].length; j++) {
					dataArray.push({ isHeader: false, data: rowData[i][j] });
				}
			}
		};
		pushDataToArray(_headerData, _rowData);
		var myListView = new ListView({
			flexGrow: 1,
			marginLeft: 20,
			marginRight: 20,
			marginTop: 15,
			marginBottom: 15,
			itemCount: dataArray.length,
            rowMoveEnabled: true
		});
		this.layout.addChild(myListView);
		myListView.onRowCreate = function(type) {
            console.log("on row create is triggered ");
			var myListViewItem = new ListViewItem({
				flexDirection: FlexLayout.FlexDirection.ROW,
				alignItems: FlexLayout.AlignItems.CENTER
			});
			if (type === GENERAL_TYPE) {
				var myLabelTitle = new Label({
					flexGrow: 1,
					margin: 10
				});
				var myEditableLbl = new Label({
					width: 30,
					height: 30,
					backgroundColor: Color.RED,
					borderRadius: 15,
					text: "-",
					textColor: Color.WHITE,
					textAlignment: TextAlignment.MIDCENTER
				});
				myLabelTitle.textColor = Color.WHITE;
				myLabelTitle.borderRadius = 10;
				myLabelTitle.textAlignment = TextAlignment.MIDCENTER;
				myListViewItem.addChild(myEditableLbl);
				myListViewItem.addChild(myLabelTitle);
				myListViewItem.myLabelTitle = myLabelTitle;
				myListViewItem.myEditableLbl = myEditableLbl;
			}
			else { // Header
				var myLabelTitle = new Label({
					flexGrow: 1,
					margin: 10
				});
				myLabelTitle.font = Font.create(Font.DEFAULT, 30, Font.BOLD);
				myLabelTitle.backgroundColor = Color.WHITE;
				myListViewItem.addChild(myLabelTitle);
				myListViewItem.myLabelTitle = myLabelTitle;
			}
			return myListViewItem;
		};
		myListView.onRowHeight = function(index) {
			if (dataArray[index].isHeader) {
				return 70;
			}
			return 40;
		};
		let indexOfSecondHeader = () => dataArray.findIndex(data => data.data === "Analogous");
		myListView.onRowBind = function(listViewItem, index) {
            console.log("on row bind is triggered ");
			var myLabelTitle = listViewItem.myLabelTitle;
			if (dataArray[index].isHeader) {
				myLabelTitle.text = dataArray[index].data;
			}
			else {
				myLabelTitle.backgroundColor = Color.create(dataArray[index].data);
				myLabelTitle.text = dataArray[index].data;
				if (index > indexOfSecondHeader()) {
					listViewItem.myEditableLbl.text = "+"
					listViewItem.myEditableLbl.backgroundColor = Color.GREEN;
					listViewItem.myEditableLbl.onTouch = function() {
						const mlistViewItem = this;
						let index = myListView.indexByListViewItem(mlistViewItem);
						let prevData = dataArray[index];
						dataArray.splice(index, 1);
						myListView.itemCount = dataArray.length;
						myListView.deleteRowRange({
							positionStart: index,
							itemCount: 1,
							ios: {
								animation: ListView.iOS.RowAnimation.FADE
							}
						});
						dataArray.splice(indexOfSecondHeader(), 0, prevData);
						myListView.itemCount = dataArray.length;
						myListView.insertRowRange({
							positionStart: indexOfSecondHeader() - 1,
							itemCount: 1,
							ios: {
								animation: ListView.iOS.RowAnimation.FADE
							}
						});
						return false;
					}.bind(listViewItem);
				}
				else {
					listViewItem.myEditableLbl.text = "-"
					listViewItem.myEditableLbl.backgroundColor = Color.RED;
					listViewItem.myEditableLbl.onTouch = function() {
						const mlistViewItem = this;
						let index = myListView.indexByListViewItem(mlistViewItem);
						let prevData = dataArray[index];
						dataArray.splice(index, 1);
						myListView.itemCount = dataArray.length;
						myListView.deleteRowRange({
							positionStart: index,
							itemCount: 1,
							ios: {
								animation: ListView.iOS.RowAnimation.FADE
							}
						});
						dataArray.splice(indexOfSecondHeader() + 1, 0, prevData);
						myListView.itemCount = dataArray.length;
						myListView.insertRowRange({
							positionStart: indexOfSecondHeader() + 1,
							itemCount: 1,
							ios: {
								animation: ListView.iOS.RowAnimation.FADE
							}
						});
						return false;
					}.bind(listViewItem);
				}
			}
		};
		myListView.onRowType = function(index) {
			if (dataArray[index].isHeader) {
				return HEADER_TYPE;
			}
			else {
				return GENERAL_TYPE;
			}
        };

        myListView.onRowSelected = (listViewItem, index) => {
            console.log(" on row selected index  " + index);
        }

		myListView.onRowMoved = (source, dest) => {
            console.log("onRowMoved source " + source + " dest  " + dest);
            dataArray = array_move(dataArray, source, dest);
		}
		myListView.onRowMove = (sourceIndex, desIndex) => {
			if (dataArray[desIndex].isHeader || desIndex > indexOfSecondHeader()) {
				return false;
			}
			return true;
		};
		myListView.onRowCanMove = (index) => {
			if (!dataArray[index].isHeader && indexOfSecondHeader() > index) {
				return true;
			}
			return false;
		};
		myListView.onPullRefresh = function() {
			myListView.itemCount = dataArray.length;
			myListView.refreshData();
			myListView.stopRefresh();
		}
		function array_move(arr, old_index, new_index) {
			if (new_index >= arr.length) {
				var k = new_index - arr.length + 1;
				while (k--) {
					arr.push(undefined);
				}
			}
			arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
			return arr; // for testing
		};
	}
);
module.exports = Page1;