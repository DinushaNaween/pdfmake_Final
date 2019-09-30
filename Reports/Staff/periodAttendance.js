var fetch = require('node-fetch');
var url = require('../../url');
var pdfmake = require('../../js/index');
var moment = require('moment');

let fontPath = './Reports/LC/fonts/';
let imagePath = './Reports/LC/Images/';

var fonts = {
  Roboto: {
    normal: fontPath + 'Roboto-Regular.ttf',
    bold: fontPath + 'Roboto-Medium.ttf',
    italics: fontPath + 'Roboto-Italic.ttf',
    bolditalics: fontPath + 'Roboto-MediumItalic.ttf'
  },
  Tinos: {
    normal: fontPath + 'Tinos-Regular.ttf',
    bold: fontPath + 'Tinos-Bold.ttf',
    italics: fontPath + 'Tinos-Italic.ttf',
    bolditalics: fontPath + 'Tinos-BoldItalic.ttf'
  }
};

pdfmake.setFonts(fonts);

var startDay = '2019-05-23';
var endDay = '2019-05-26';

var body = {
  "startDay": startDay,
  "endDay": endDay
}

const getData = async url => {
  try {
    const response = await fetch(url, {
      method: 'post',
      body:    JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json();
    return (json.data);
  } catch (error) {
    console.log(error);
  }
};

function getDateNow(){
  return moment().format('l');
}

function getTimeNow(){
  return moment().format('LT');
}

var reportType = 'Staff';
var reportSubType = 'Attendance Report';
var schoolName = 'Ladies College - Colombo';
var dueDate = 'From: ' + startDay + '   To: ' + endDay;

async function generateReport() {
  const reportData = await getData(url.periodAttendance);
  // console.log(reportData);

  function buildTableBody(data){
    var body = [];

    body.push([{ text: 'No', style: 'tableHeader', alignment: 'center' }, { text: 'Staff No', style: 'tableHeader', alignment: 'center' },{ text: 'Staff Name', style: 'tableHeader', alignment: 'center' }, { text: 'Punch date', style: 'tableHeader', alignment: 'center' }, { text: 'In Time', style: 'tableHeader', alignment: 'center' }, { text: 'Out Time', style: 'tableHeader', alignment: 'center' }])

    for(var i=0; i<data.length; i++){
      var dataRow = [];

      dataRow.push({ text: i+1, alignment: 'center' });
      dataRow.push({ text: data[i].staffNo, alignment: 'center' });
      dataRow.push(data[i].staffName);
      dataRow.push({ text: data[i].punchDate.slice(0,10), alignment: 'center' });
      dataRow.push({ text: data[i].inTime, alignment: 'center' });
      dataRow.push({ text: data[i].outTime, alignment: 'center' });

      body.push(dataRow);
    }

    return body;
  }

  function table(data){
    return {
      table: {
        widths: ['5%', '8%', '56%', '14%', '11%', '11%'],
        headerRows: 1,
        body: buildTableBody(data)
      }, 
        fontSize: 9, 
        absolutePosition: { x: 18, y: 90 },
        layout: {
          hLineWidth: function(i, node) {
            return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
          },
          vLineWidth: function(i, node) {
            return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
          }
        }
    }
  }

  var dd = {
    footer: function (currentPage, pageCount) {
      return {
        margin: 10,
        columns: [
          {
            text: 'Printed Date: ' + getDateNow() + ' and Time: ' + getTimeNow(),
            style: 'planText',
            alignment: 'left'
          },
          {
            text: reportType + ' - ' + reportSubType,
            style: 'planText',
            alignment: 'center'
          },
          {
            text: 'Page ' + currentPage.toString() + ' of ' + pageCount,
            style: 'planText',
            alignment: 'right'
          }
        ]
      };
    },
    content: [
      {
        canvas: [
          {
            type: 'line',
            x1: 40, y1: 60,
            x2: 530, y2: 60,
            lineWidth: 0.5
          }
        ], absolutePosition: { x: 34, y: 15 }
      },
      {
        image: imagePath + 'Capture.PNG',
        width: 50,
        absolutePosition: { x: 13, y: 25 }
      },
      {
        text: reportType + ' - ' + reportSubType,
        style: 'header',
        absolutePosition: { x: 78, y: 32 }
      },
      {
        text: schoolName,
        style: 'subHeader',
        absolutePosition: { x: 78, y: 55 }
      },
      {
        text: dueDate,
        style: 'planText',
        absolutePosition: { y: 60 },
        alignment: 'right'
      },
      table(reportData),
    ],
    styles: {
      header: {
        fontSize: 14
      },
      subHeader: {
        fontSize: 12
      },
      tableHeader: {
        fontSize: 11, 
        bold: true
      },
      planText: {
        fontSize: 10
      }
    },
    defaultStyle: {
      font: 'Tinos'
    }

  }

  var now = new Date();

  var pdf = pdfmake.createPdf(dd);
  pdf.write('../pdfs/Staff/LCperiodAttendance.pdf');

  var runtime = new Date() - now
  console.log("Run Time: " + runtime + " ms")
};

module.exports.generatePeriodAttendanceReport = generateReport; 