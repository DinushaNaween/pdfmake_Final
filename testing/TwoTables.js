var fetch = require('node-fetch');
var url = require('../url');
var pdfmake = require('../js/index');

var fonts = {
	Roboto: {
		normal: 'fonts/Roboto-Regular.ttf',
		bold: 'fonts/Roboto-Medium.ttf',
		italics: 'fonts/Roboto-Italic.ttf',
		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
	}
};

var pdfmake = require('../js/index');
pdfmake.setFonts(fonts);

const getNoteData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return(json.data);
  } catch (error) {
    console.log(error);
  }
};

const getAttendanceData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return(json.data);
  } catch (error) {
    console.log(error);
  }
};

async function collectData(){
  const noteData = await getNoteData(url.allNotes);
  const attendanceData = await getAttendanceData(url.allAttendance);

  ///////////////////////// Table 1 ////////////////////////////

  function buildTable1Body(data){
    console.log(data.length);
    var body = [];

    body.push([{ text: 'Note details from note server...', style: 'tableHeader', colSpan: 3, alignment: 'center' }, '', '', { text: 'User Details', style: 'tableHeader', rowSpan: 2, alignment: 'center' }])
    body.push([{ text: 'Note ID', style: 'tableHeader', alignment: 'center' }, { text: 'Note Topic', style: 'tableHeader', alignment: 'center' }, { text: 'Note', style: 'tableHeader', alignment: 'center' }, '']);

    for(var i=0; i<data.length; i++){
      var dataRow = [];

      dataRow.push(data[i].noteId);
      dataRow.push(data[i].noteTopic);
      dataRow.push(data[i].note);
      dataRow.push(data[i].userId);

      body.push(dataRow);
    };
    
    return body;
  }

  function table1(data){
    return {
      table: {
        widths: ['10%', '30%', '30%', '10%'],
        headerRows: 2,
        body: buildTable1Body(data)
      }
    }
  }

  ////////////////////////// Table 2 ////////////////////////////

  function buildTable2Body(data){
    console.log(data.length);
    var body = [];

    body.push([{ text: 'Attendance ID', style: 'tableHeader', alignment: 'center' }, { text: 'Full Name', style: 'tableHeader', alignment: 'cerner' }, { text: 'In Time', style: 'tableHeader', alignment: 'cerner' }, { text: 'Out Time', style: 'tableHeader', alignment: 'cerner' }])

    for(var i=0; i<data.length; i++){
      var dataRow = [];

      dataRow.push(data[i].attendanceId);
      dataRow.push(data[i].fullName);
      dataRow.push(data[i].inTime);
      dataRow.push(data[i].outTime);

      body.push(dataRow);
    };
    return body;
  }

  function table2(data){
    return {
      table: {
        widths: ['20%', '40%', '20%', '20%'],
        headerRows: 1,
        body: buildTable2Body(data)
      }
    }
  }

  ////////////////////////////////////////

  var docDefinition = {
    footer: function(currentPage, pageCount) {
      return {
          margin:10,
          columns: [
              {
              text: 'Page ' + currentPage.toString() + ' of ' + pageCount,
              }
              ],
              alignment: 'right'
      };

  },
    header: { text: 'sample text', alignment: 'center' },
    content: [
      { text: 'Data from note server...', style: 'header' },
      table1(noteData),
      { text: 'Data from attendance server...', style: 'header' },
      table2(attendanceData)
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    },
      defaultStyle: {
        // font: 'iskpota'
      }
  }

  var now = new Date();

  var pdf = pdfmake.createPdf(docDefinition);
  pdf.write('pdfs/twoTables.pdf');

  console.log(new Date() - now);
}

collectData();