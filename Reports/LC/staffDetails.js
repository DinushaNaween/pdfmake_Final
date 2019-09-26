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
 
let reportType = 'Information';
let reportSubType = 'Staff Details';
let schoolName = 'Ladies College - Colombo';
let dueDate = moment().format('L');

async function generateReport() {
  console.log('staffDetail function');
  const reportData = await getStaffData(url.allStaff);
  console.log(reportData[0].epfName);

  function buildTableBody(data){
    let body = [];

    body.push([{ text: 'ID', style: 'tableHeader' }, { text: 'Full Name', style: 'tableHeader' }, { text: 'Section', style: 'tableHeader' }, { text: 'Designation', style: 'tableHeader' }, { text: 'E-Mail', style: 'tableHeader' }, { text: 'Gender', style: 'tableHeader' }])

    for(let i=0; i<data.length-1; i++){
      let dataRow = [];

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

  let now = new Date();

  let pdf = pdfmake.createPdf(dd);
  pdf.write('../pdfs/LC/staffDetails.pdf');

  let runtime = new Date() - now
  console.log("Run Time: " + runtime + " ms")

};

module.exports.generateStaffDetailsReport = generateReport;