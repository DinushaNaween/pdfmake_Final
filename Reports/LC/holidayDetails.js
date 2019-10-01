let fetch = require('node-fetch');
let url = require('../../url');
let pdfmake = require('../../js/index');
let moment = require('moment');

let fontPath = './fonts/';
let imagePath = './Images/';
let leftMargin = 25;

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
  },
  ARIALUNI: {
    normal: fontPath + 'ARIALUNI.ttf',
    bold: fontPath + 'ARIALUNI.ttf',
    italics: fontPath + 'ARIALUNI.ttf', 
    bolditalics: fontPath + 'ARIALUNI.ttf'
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
 
let reportType = 'Staff';
let reportSubType = 'Holiday Details';
let schoolName = 'Ladies College - Colombo';
let dueDate = moment().format('L');

async function generateReport(req, res) {
  console.log('Generating Report...');
  const beforeReq = new Date();
  const reportData = await getStaffData(url.holidayDetails);

  const fetchTime = new Date() - beforeReq;
  console.log('Data received in: ' + fetchTime + ' ms')

  function checkMark(data){
    if(data == 1){
      return { text: '✓', style: 'checkMark', alignment: 'center' }
    } else {
      return { text: '', style: 'checkMark', alignment: 'center' }
    }
  }

  function buildTableBody(data){
    let body = [];

    body.push([{ text: 'ID', style: 'tableHeader' }, { text: 'Holiday Date', style: 'tableHeader' }, { text: 'Holiday Name', style: 'tableHeader' }, { text: 'Public', style: 'tableHeader' }, { text: 'Bank', style: 'tableHeader' }, { text: 'Weekend', style: 'tableHeader' }, { text: 'Mercantile', style: 'tableHeader' }, { text: 'Special', style: 'tableHeader' }])

    for(let i=0; i<data.length; i++){
      let dataRow = [];

      dataRow.push(i+1);
      dataRow.push({ text: data[i].holidayDate.slice(0,10) }); 
      dataRow.push(data[i].holidayName);
      dataRow.push(checkMark(data[i].isPublic));
      dataRow.push(checkMark(data[i].isBank));
      dataRow.push(checkMark(data[i].isWeekend));
      dataRow.push(checkMark(data[i].isMercantile));
      dataRow.push(checkMark(data[i].isSpecial));

      body.push(dataRow);
    }
    return body;
  }

  function table(data){
    return {
      table: {
        layout: 'lightHorizontalLines', 
        dontBreakRows: true,
        keepWithHeaderRows: false,
        widths: ['5%', '15%', '20%', '13%', '13%', '13%', '13%', '13%'],
        headerRows: 1, 
        body: buildTableBody(data)
      }, 
        fontSize: 9, 
        absolutePosition: { x: leftMargin + 10, y: 90 },
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
    pageSize: 'A4',
    pageMargins: [ 40, 20, 40, 30 ],
    footer: function (currentPage, pageCount) { 
      return {
        margin: 10,
        columns: [
          {
            text: 'Printed: ' + getDateNow() + ' at ' + getTimeNow(),
            style: 'planText',
            // alignment: 'left'
            absolutePosition: { x: leftMargin + 9, y: 10 }
          }, 
          {
            text: reportType + ' - ' + reportSubType,
            style: 'planText',
            alignment: 'center',
            absolutePosition: { y: 10 }
          },
          {
            text: 'Page ' + currentPage.toString() + ' of ' + pageCount,
            style: 'planText',
            // alignment: 'right',
            absolutePosition: { x: 526, y: 10 }
          }
        ] 
      };  
    },
    content: [
      {
        canvas: [
          {
            type: 'line',
            x1: leftMargin + 31, y1: 60,
            x2: 530, y2: 60,
            lineWidth: 0.5
          }
        ], absolutePosition: { x: 34, y: 15 }
      },
      {
        image: imagePath + 'Capture.PNG',
        width: 50,
        absolutePosition: { x: leftMargin + 8, y: 25 }
      },
      {
        text: reportType + ' - ' + reportSubType,
        style: 'header',
        absolutePosition: { x: leftMargin + 73, y: 32 }
      },
      {
        text: schoolName,
        style: 'subHeader',
        absolutePosition: { x: leftMargin + 73, y: 55 }    
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
      checkMark: {
        font: 'ARIALUNI'
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
  pdf.write('../../../pdfs/LC/HolidayDetails.pdf')
  // pdf.pipe(res);  
  let runtime = new Date() - now;
  console.log("Report generated in: " + runtime + " ms");
  console.log('DONE..');
};
 
// module.exports.generateStaffDetailsReport = generateReport; 

generateReport()