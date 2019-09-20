var fetch = require('node-fetch');
var url = require('../url');
var pdfmake = require('../js/index');

var fonts = {
  AMS_Arunalu: {
    normal: 'fonts/AMS Arunalu.ttf',
    bold: 'fonts/AMS Arunalu.ttf',
    italics: 'fonts/AMS Arunalu.ttf',
    bolditalics: 'fonts/AMS Arunalu.ttf'
  },
  AMS_Ajith: {
    normal: 'fonts/AMS_Ajith.ttf',
    bold: 'fonts/AMS_Ajith.ttf',
    italics: 'fonts/AMS_Ajith.ttf',
    bolditalics: 'fonts/AMS_Ajith.ttf'
  },
  OpenSans: {
    normal: 'fonts/OpenSans-Regular.ttf',
    bold: 'fonts/OpenSans-Bold.ttf',
    italics: 'fonts/OpenSans-Italic.ttf',
    bolditalics: 'fonts/OpenSans-BoldItalic.ttf'
  },
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

    body.push([{ text: 't;glmwrn;', style: 'sinhalaHeader', colSpan: 3, alignment: 'center' }, '', '', { text: 'User Details', style: 'tableHeader', rowSpan: 2, alignment: 'center' }])
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

  function buildTable2Body(data, columns){
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

  function table2(data, columns){
    return {
      table: {
        widths: ['20%', '40%', '20%', '20%'],
        headerRows: 1,
        body: buildTable2Body(data, columns)
      }
    }
  }

  ////////////////////////////////////////

  var docDefinition = {
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
      },
      sinhalaHeader: {
        font: 'AMS_Arunalu',
        bold: false,
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
  pdf.write('pdfs/twoTables-new.pdf');

  console.log(new Date() - now);
}

collectData();