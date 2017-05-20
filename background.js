// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var switcher = "set up spreadsheet downloader";
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: switcher}, function(response) {
      console.log(switcher);
      console.log(response.farewell);
      if (switcher == "turn off spreadsheet downloader") {
        switcher =  "turn on spreadsheet downloader";
      }
      else
      {
      switcher = "turn off spreadsheet downloader";
      }
      console.log(switcher);
    });
  });

});
