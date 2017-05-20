/*var originalTableColour;
var orinigalTableHeaderColour;
var highlighedColour = "#9cbd9a";
var darkHighlightColour = "#79b076";

function storeOringinalColours(){
var table0 = nodeListOfTables[0];
originalTableColour = table0.style.backgroundColor;
orinigalTableHeaderColour = table0.getElementsByTagName("th")[0].style.backgroundColor;
}
*/
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + text);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
/*
function darkenbackground(){
  this.style.backgroundColor = darkHighlightColour;
}
function lightenBackground(){
    this.style.backgroundColor = highlighedColour;
}

function highlightElement(thisElement){
  thisElement.style.backgroundColor = highlighedColour;
  thisElement.addEventListener("mouseover", darkenbackground, false);
  thisElement.addEventListener("mouseout", lightenBackground, false);
}

function highlightTable(thisTable){
  highlightElement(thisTable);
}
*/
function setUpTablesForDownload(myNodeList){
var numberOfNodes = myNodeList.length;
for (i = 0; i < numberOfNodes; i++) {
var myTable = myNodeList[i];
setUpOneTableForDownload(myTable);
}
}

function setUpOneTableForDownload(myTable){
//highlightElement(myTable);
//myTable.addEventListener("click", downloadTable, false);
var oldHTML = myTable.outerHTML;
myTable.outerHTML = '<div class="container">' + oldHTML + '<div class="overlay"><img src="chrome-extension://gcecjnpjjcknlgikoofhjoejegiffpdf/icon128.png" class="tdicon"></img></div></div>';
myTable.addEventListener("click", downloadTable, false);
}



function downloadTable(){
      var text = this.outerHTML;
      var filename = "table download.xls";
      download(filename, text);
}

function setUpTablesForNoDownload(myNodeList){
var numberOfNodes = myNodeList.length;
for (i = 0; i < numberOfNodes; i++) {
var myTable = myNodeList[i];
setUpOneTableForNoDownload(myTable);
}
}

function setUpOneTableForNoDownload(myTable){
myTable.removeEventListener("click", downloadTable, false);
//myTable.removeEventListener("mouseover", darkenbackground, false);
//myTable.removeEventListener("mouseout", lightenBackground, false);
}

/*
function setBackgroundColourByTag(tag, colour){
 var nodeListOfElements = document.getElementsByTagName(tag);
 var numberOfNodes = nodeListOfElements.length;
 for (i = 0; i < numberOfNodes; i++) {
    var thisChild = nodeListOfElements[i];
    thisChild.style.backgroundColor = colour;
//     highlightElement(thisChild);
}
}
*/
var nodeListOfTables = document.getElementsByTagName("table");

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "turn on spreadsheet downloader"){
//      setBackgroundColourByTag("th", "inherit");
//      setBackgroundColourByTag("tr", "inherit");
//      setBackgroundColourByTag("td", "inherit");
      setUpTablesForDownload(nodeListOfTables);
      sendResponse({farewell: "byebye"});
return true;
}
else {
    setUpTablesForNoDownload(nodeListOfTables);
//    setBackgroundColourByTag("th", orinigalTableHeaderColour);
//    setBackgroundColourByTag("table", originalTableColour);
    sendResponse({farewell: "byebye"});
    return true;
}
});

// http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript
// https://www.w3schools.com/howto/howto_css_image_overlay.asp
