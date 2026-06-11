const SHEET_NAME = "Ответы гостей";

function doPost(e) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Дата",
      "Имя",
      "Телефон",
      "Ответ",
      "Комментарий"
    ]);
  }

  sheet.appendRow([
    new Date(),
    e.parameter.name || "",
    e.parameter.phone || "",
    e.parameter.attendance || "",
    e.parameter.comment || ""
  ]);

  return ContentService.createTextOutput("OK");
}
