/* =====================================
   GOOGLE APPS SCRIPT
   Екатерина & Данил
   ===================================== */

/*
========================================
ИНСТРУКЦИЯ ПО УСТАНОВКЕ
========================================

1. Создайте новую Google Таблицу

2. В меню:
   Расширения →
   Apps Script

3. Удалите весь код

4. Вставьте этот файл полностью

5. Нажмите:
   Deploy → New deployment

6. Тип:
   Web App

7. Execute as:
   Me

8. Who has access:
   Anyone

9. Deploy

10. Скопируйте ссылку вида:

https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxx/exec

11. В index.html замените:

action="YOUR_APPS_SCRIPT_URL"

на вашу ссылку

========================================
*/

const SHEET_NAME = "Ответы гостей";

/* =====================================
   GET
   ===================================== */

function doGet() {

  return ContentService
    .createTextOutput("Wedding RSVP API");

}

/* =====================================
   POST
   ===================================== */

function doPost(e) {

  try {

    const spreadsheet =
      SpreadsheetApp.getActiveSpreadsheet();

    let sheet =
      spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {

      sheet =
        spreadsheet.insertSheet(SHEET_NAME);

    }

    /* =====================================
       СОЗДАЕМ ЗАГОЛОВКИ
       ===================================== */

    if (sheet.getLastRow() === 0) {

      sheet.appendRow([
        "Дата",
        "Имя",
        "Телефон",
        "Присутствие",
        "Напиток",
        "Комментарий"
      ]);

    }

    /* =====================================
       ПОЛУЧАЕМ ДАННЫЕ
       ===================================== */

    const name =
      e.parameter.name || "";

    const phone =
      e.parameter.phone || "";

    const attendance =
      e.parameter.attendance || "";

    const drink =
      e.parameter.drink || "";

    const comment =
      e.parameter.comment || "";

    /* =====================================
       СОХРАНЯЕМ
       ===================================== */

    sheet.appendRow([
      new Date(),
      name,
      phone,
      attendance,
      drink,
      comment
    ]);

    return ContentService
      .createTextOutput("OK")
      .setMimeType(
        ContentService.MimeType.TEXT
      );

  } catch (error) {

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          error: error.toString()
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );

  }

}

/* =====================================
   ДОПОЛНИТЕЛЬНО
   ===================================== */

/*
Если захотите позже добавить:

- количество гостей
- имя спутника
- детское меню
- трансфер
- выбор горячего блюда

нужно просто добавить новые поля:

e.parameter.fieldName

и добавить колонку в appendRow()
*/