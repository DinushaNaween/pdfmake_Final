var fetch = require('node-fetch');
var url = require('../../url');
var pdfmake = require('../../js/index');
var moment = require('moment');

var fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  },
  Tinos: {
    normal: 'fonts/Tinos-Regular.ttf',
    bold: 'fonts/Tinos-Bold.ttf',
    italics: 'fonts/Tinos-Italic.ttf',
    bolditalics: 'fonts/Tinos-BoldItalic.ttf'
  }
};

pdfmake.setFonts(fonts);

const getStaffData = async url => {
  try {
    const response = await fetch(url);
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

var reportType = 'Information';
var reportSubType = 'Staff Details';
var schoolName = 'Ladies College - Colombo';
var dueDate = moment().format('L');

async function generateReport() {
  const reportData = await getStaffData(url.allStaff);
  // console.log(reportData);

  function buildTableBody(data){
    var body = [];

    body.push([{ text: 'ID', style: 'tableHeader' }, { text: 'Full Name', style: 'tableHeader' }, { text: 'Section', style: 'tableHeader' }, { text: 'Designation', style: 'tableHeader' }, { text: 'E-Mail', style: 'tableHeader' }, { text: 'Gender', style: 'tableHeader' }])

    for(var i=0; i<data.length-1; i++){
      var dataRow = [];

      dataRow.push(data[i].staffId);
      dataRow.push(data[i].fullName);
      dataRow.push(data[i].section);
      dataRow.push(data[i].designation);
      dataRow.push(data[i].email);
      dataRow.push(data[i].gender);

      body.push(dataRow);
    }

    return body;
  }

  function table(data){
    return {
      table: {
        dontBreakRows: true,
        keepWithHeaderRows: false,
        widths: ['6%', '41%', '15%', '14%', '20%', '8%'],
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
        image: './Images/Capture.PNG',
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
        text: 'As At: ' + dueDate,
        style: 'planText',
        absolutePosition: { x: 465, y: 60 }
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
  pdf.write('pdfs/LCstaffDetails.pdf');

  var runtime = new Date() - now
  console.log("Run Time: " + runtime + " ms")
};

generateReport();