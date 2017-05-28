var tablesArray = $("table");
var onOffState = "initial";

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  switch(onOffState) {
      default :
        console.log("runtime.onMessage.initialise");
        addContainersToTables();
        addImagesToOverlays();
        addEventListenersToContainers();
        onOffState = "on";
        sendResponse({farewell: "byebye"});
        return true;
          break;
      case "on" :
        $(".myTableDownloaderOverlay").hide();
        removeEventListenersFromContainers();
        onOffState = "off"
        sendResponse({farewell: "byebye"});
        return true;
          break;
      case "off" :
        $(".myTableDownloaderOverlay").show();
        addEventListenersToContainers();
        onOffState = "on";
        sendResponse({farewell: "byebye"});
        return true;
            break;
  }
});

function addContainersToTables(){
      console.log("addContainersToTables");
      $('table').each(function (index, value){
        $(value).wrap('<div class="myTableDownloaderContainer"></div>');
        $(value).append('<div class="myTableDownloaderOverlay"></div>');
      });
}


function removeThisEventListenerAndOverlay(){
  console.log("clicked cross");
//  $(this).hide();
}

function addImagesToOverlays(){
      console.log("addImagesToOverlays");
      $(".myTableDownloaderOverlay").each(function (index, value){
        $(value).append('<img src="chrome-extension://koiahfpffkbjimlddagiikgbfgnbfifb/iconWithWhiteBorder.png" class="tableDownloaderIcon"></img>');
        $(value).append('<img src="chrome-extension://koiahfpffkbjimlddagiikgbfgnbfifb/cancelCross.png" class="cancelCross"></img>');
      });
}

function addEventListenersToContainers(){
    console.log("addEventListenersToContainers");
    $(".myTableDownloaderContainer").each(function (index, value){
      $(value).click(function(){
        downloadTable(this)
      });
    });
    $('.cancelCross').each(function(index, value){
        $(value).click(function(){
    //      this.parentNode.parentNode.removeChild(this.parentNode);
          $(this).parent().hide();
          $(this).parent().parent().off( "click" );
        return false;
        });
    });
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
  console.log("removeEventListenersFromContainers");
  $(".myTableDownloaderContainer").each(function (index, value){
  $( value ).off( "click" );
  });
}
