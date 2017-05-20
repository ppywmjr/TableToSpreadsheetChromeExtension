var tablesArray = document.getElementsByTagName("table");
var containersArray = new Array();
var tablesHTMLArray = new Array();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if  (request.greeting == "set up spreadsheet downloader"){
      console.log("runtime.onMessage.setup");
      addContainersToTables();
      setUpTablesForDownload();
      sendResponse({farewell: "byebye"});
      return true;
    } else {}
    if (request.greeting == "turn on spreadsheet downloader"){
      console.log("runtime.onMessage.turnon");
      setUpTablesForDownload();
      sendResponse({farewell: "byebye"});
      return true;
    } else {}
    if (request.greeting == "turn off spreadsheet downloader"){
      setUpContainersForNoDownload();
      console.log("else");
      sendResponse({farewell: "byebye"});
      return true;
    } else {}
});

function setUpTablesForDownload(){
      console.log("setUpTablesForDownload");
    addEventListenersToContainers();
}

function addContainersToTables(){
      console.log("addContainersToTables");
    var numberOfTables = tablesArray.length;
    for (i = 0; i < numberOfTables; i++) {
      var thisTable = tablesArray[i];
      tablesHTMLArray[i] = thisTable.outerHTML;
      console.log(tablesHTMLArray[i]);
      addContainerToOneTable(thisTable);
    }
}

function addContainerToOneTable(thisTable){
      console.log("addContainerToOneTable");
    var thisTableOuterHTML = thisTable.outerHTML;
    console.log(thisTableOuterHTML);
    thisTable.outerHTML = '<div class="myContainer">' + thisTableOuterHTML + '<div class="overlay"><img src="chrome-extension://fdocjokhcfnllccciekghidljpjgnjog/icon128.png" class="tableDownloaderIcon"></img></div></div>';
}

function addEventListenersToContainers(){
    console.log("addEventListenersToContainers");
    containersArray = document.getElementsByClassName("myContainer");
    var numberOfContainers = containersArray.length;
    for (i = 0; i < numberOfContainers; i++) {
      var thisContainer = containersArray[i];
      var tableHTML = tablesHTMLArray[i];
      thisContainer.addEventListener("click", function(){downloadTable(tableHTML);}, false);
    }
}

function downloadTable(tableHTML){
        console.log("downloadTable");
    var filename = "table download.xls";
    download(filename, tableHTML);
}

function download(filename, text) {
    console.log("download");
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + text);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

/*
function setUpTablesForNoDownload(myNodeList){
var numberOfNodes = myNodeList.length;
for (i = 0; i < numberOfNodes; i++) {
var myTable = myNodeList[i];
setUpOneTableForNoDownload(myTable);
}
}

function setUpOneTableForNoDownload(myTable){
myTable.removeEventListener("click", downloadTable, false);
}
*/
