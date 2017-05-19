# TableToSpreadsheetChromeExtension
This is a chrome extension that allows the user to click on any table in their browser and the table will be downloaded as an .xls file.
The aim is to keep it a very lightweight extension, relying on the power of other software. This aim is explained more fully in the following points:

1) The extension will not use any external javascript libraries, such as jQuery;
2) The application will limit itself to the taking text from spreadsheets, i.e. images and hyperlinks will be ignored;
3) The app will simply create a text file containing the HTML of the table and rely on the spreadsheet app, eg excel, LibreOffice Calc, to do the work of turning the html into a spreadsheet. Giving the text file a .xls extension should be enough for any modern spreedsheet application. 

