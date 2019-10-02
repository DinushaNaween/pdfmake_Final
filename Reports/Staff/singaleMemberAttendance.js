let fetch = require('node-fetch');
let url = require('../../url');
let pdfmake = require('../../js/index');
let moment = require('moment');

let fontPath = './Reports/LC/fonts/';
let imagePath = './Reports/LC/Images/';

let fonts = {
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

const getData = async (url, startDay, endDay, staffNo) => {

  let body = {
    "startDay": startDay,
    "endDay": endDay,
    "staffNo": staffNo
  }

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

let reportType = 'Staff';
let schoolName = 'Ladies College - Colombo';

async function generateReport(req, res) {
  console.log('Generating Report...');
  const beforeReq = new Date();

  let data = req.body;

  if(data.data){
    data = JSON.parse(data.data);
  }

  console.log(data);

  let startDay = data.startDay;
  let endDay = data.endDay;
  let staffNo = data.staffNo;
  let dueDate = 'From: ' + startDay + '   To: ' + endDay;

  const reportData = await getData(url.singlePersonAttendance, startDay, endDay, staffNo);

  const fetchTime = new Date() - beforeReq;
  console.log('Data received in: ' + fetchTime + ' ms')

  let reportSubType = 'Attendance Report - '+ reportData[0].staffName;
  let idForFooter = reportData[0].staffNo;

  function buildTableBody(data){
    let body = [];

    body.push([{ text: 'No', style: 'tableHeader', alignment: 'center' }, { text: 'Punch date', style: 'tableHeader', alignment: 'center' }, { text: 'In Time', style: 'tableHeader', alignment: 'center' }, { text: 'Out Time', style: 'tableHeader', alignment: 'center' }])

    for(let i=0; i<data.length; i++){
      let dataRow = [];

      dataRow.push({ text: i+1, alignment: 'center' });
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
        widths: ['21%', '29%', '27%', '27%'],
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

  let dd = {
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
            text: 'Staff No: ' + idForFooter,
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

  let now = new Date(); 
  let pdf = pdfmake.createPdf(dd);
  pdf.pipe(res);  
  let runtime = new Date() - now;
  console.log("Report generated in: " + runtime + " ms");
  console.log('DONE..');
};

module.exports.generateSingleMemberAttendanceReport = generateReport;