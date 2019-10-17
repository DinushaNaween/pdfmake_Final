let fetch = require('node-fetch');
let url = require('../../url');
let pdfmake = require('../../js/index');
let moment = require('moment');

/**
 * fontPath and imagePath is to define path eith respect to server.js file.
 * router access files in local storage with respect to server file
 */

let fontPath = './Reports/LC/fonts/';
let imagePath = './Reports/LC/Images/';
let leftMargin = 30;

/** 
 * fonts variable contains all fonts that using in this report card.
 * each one must have normal, bold, italic, boldItalic properties.
 * it doesn't matter all 4 propeties are directed to one file.
 */

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

/**
 * introduce fonts to pdfmake
 */

pdfmake.setFonts(fonts);

/**
 * this async function is to get data from api endpoint
 */

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

/**
 * main function to generate report
 */

async function generateReport(req, res) {
  console.log('Generating Report...');
  const beforeReq = new Date();
  const reportData = await getStaffData(url.allStaff); //request data to generate report
  // console.log(reportData);
  const fetchTime = new Date() - beforeReq;
  console.log('Data received in: ' + fetchTime + ' ms')

  /**
   * create table body
   */

  function buildTableBody(data){
    let body = [];

    body.push([{ text: 'ID', style: 'tableHeader' }, { text: 'Full Name', style: 'tableHeader' }, { text: 'Section', style: 'tableHeader' }, { text: 'Designation', style: 'tableHeader' }, { text: 'E-Mail', style: 'tableHeader' }, { text: 'Gender', style: 'tableHeader' }])

    for(let i=0; i<data.length-1; i++){
      let dataRow = [];

      dataRow.push(data[i].staffNo);
      dataRow.push(data[i].fullName); 
      dataRow.push(data[i].section);
      dataRow.push(data[i].designation);
      dataRow.push(data[i].email);
      dataRow.push(data[i].gender);

      body.push(dataRow);
    }
    return body;
  }

  /**
   * pdfmake table creating function, in this section any special layouts, special characteristic, column withs, no of table row are need to define
   */

  function table(data){
    return {
      table: {
        layout: 'lightHorizontalLines', 
        dontBreakRows: true,
        keepWithHeaderRows: false,
        widths: ['8%', '41%', '14%', '13%', '20%', '8%'],
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

  /**
   * dd = docDefinition is the structure of whole report.
   * every part of the report must define here
   */

  let dd = {
    pageSize: 'A4',   //page size
    pageMargins: [ 40, 20, 40, 30 ],   //page margin
    footer: function (currentPage, pageCount) {       //footer defines elements in footer
      return {
        margin: 10,
        columns: [
          {
            text: 'Printed: ' + getDateNow() + ' at ' + getTimeNow(),
            style: 'planText',
            absolutePosition: { x: leftMargin + 9, y: 10 }    //positioning inside page
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
            absolutePosition: { x: 526, y: 10 }
          }
        ]
      };
    },
    content: [     //content of the report excluding footer
      {
        canvas: [          //drow shapes using canvas
          {
            type: 'line',
            x1: leftMargin + 31, y1: 60,
            x2: 530, y2: 60,
            lineWidth: 0.5
          }
        ], absolutePosition: { x: 34, y: 15 }
      },
      {
        image: imagePath + 'Capture.PNG',      //add image
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
      {
        text: 'As At: ' + dueDate,
        style: 'planText',
        absolutePosition: { x: leftMargin + 430, y: 60 }
      },
      table(reportData),     //add table
    ],
    styles: {       //styles sorted into categeries
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
  let pdf = pdfmake.createPdf(dd);     //create pdf report
  pdf.pipe(res);                       //add report to responce
  let runtime = new Date() - now;
  console.log("Report generated in: " + runtime + " ms");
  console.log('DONE..');
};
 
module.exports.generateStaffDetailsReport = generateReport;