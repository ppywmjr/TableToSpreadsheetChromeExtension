var tablesArray = document.getElementsByTagName("table");
var containersArray = new Array();
var tablesHTMLArray = new Array();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if  (request.greeting == "turn on spreadsheet downloader"){
      console.log("runtime.onMessage.turnon");
      addContainersToTables();
      addEventListenersToContainers();
      sendResponse({farewell: "byebye"});
      return true;
    } else {}
    if (request.greeting == "turn off spreadsheet downloader"){
      console.log("else");
      removeEventListenersFromContainers();
      removeContainersFromTables();
      sendResponse({farewell: "byebye"});
      return true;
    } else {}
});

function addContainersToTables(){
      console.log("addContainersToTables");
    var numberOfTables = tablesArray.length;
    for (i = 0; i < numberOfTables; i++) {
      var thisTable = tablesArray[i];
      tablesHTMLArray[i] = thisTable.outerHTML;
      addContainerToOneTable(thisTable);
    }
}

function addContainerToOneTable(thisTable){
      console.log("addContainerToOneTable");
    var thisTableOuterHTML = thisTable.outerHTML;
    thisTable.outerHTML = '<div class="myTableDownloaderContainer">' + thisTableOuterHTML + '<div class="myTableDownloaderOverlay"><img src="chrome-extension://gcecjnpjjcknlgikoofhjoejegiffpdf/icon128.png" class="tableDownloaderIcon"></img></div></div>';
}

function addEventListenersToContainers(){
    console.log("addEventListenersToContainers");
    containersArray = document.getElementsByClassName("myTableDownloaderContainer");
    var numberOfContainers = containersArray.length;
    for (i = 0; i < numberOfContainers; i++) {
      var thisContainer = containersArray[i];
      thisContainer.onclick = function(){downloadTable(this)};
    }
}

function downloadTable(thisContainer){
    var thisContainerInnerHTML = thisContainer.innerHTML;
    var filename = "table download.xls";
    download(filename, thisContainerInnerHTML);
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

function removeEventListenersFromContainers(){
    console.log("addEventListenersToContainers");
    containersArray = document.getElementsByClassName("myTableDownloaderContainer");
    var numberOfContainers = containersArray.length;
    for (i = 0; i < numberOfContainers; i++) {
      var thisContainer = containersArray[i];
      thisContainer.onclick = function(){};
    }
}

function removeContainersFromTables(){
    console.log("removeContainersFromTables");
    var numberOfContainers = containersArray.length;
    for (i = 0; i < numberOfContainers; i++) {
        var thisContainer = containersArray[0];
        thisContainer.outerHTML = tablesHTMLArray[i];
    }
}
