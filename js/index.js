var spreadsheetId = "1Asm_Z8rjJTD4jbIBmTgmdn-ASVMJX6LKNtv4BfW8KlE",
  url = "https://spreadsheets.google.com/feeds/list/" +
  spreadsheetId +
  "/1/public/basic?alt=json";

$.get({
  url: url,
  success: function(response) {
    var data = response.feed.entry,
      len = data.length,
      i = 0,
      parsedData = [];

    for (i = 0; i < len; i++) {
      parsedData.push({
        label: data[i].title.$t,
        value: data[i].content.$t.replace('цена: ', '')
      });
    }

    new FusionCharts({
      type: 'bar2d',
      renderAt: 'chart-container',
      width: '100%',
      height: '300',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "caption": "Пример работы с данными Google Spreadsheet",
          "yAxisName": "Свод стоимости обеда  (в ГРН)",
          "numberPrefix": "грн."
        },
        "data": parsedData
      }
    }).render();
  }
});