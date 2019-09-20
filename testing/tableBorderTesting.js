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

function borderGenerator(data){
  if(data){
    return [true, true, true, true]
  } else {
    return [false, false, false, false]
  }
}

async function collectData(){
  const noteData = await getNoteData(url.allNotes);
  
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

  var dd = {
    content: [
      { text: 'Data from note server...', style: 'header' },
      table1(noteData)
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
    }
  }
  
  var now = new Date();

  var pdf = pdfmake.createPdf(dd);
  pdf.write('pdfs/tabletest.pdf');

  console.log(new Date() - now);
}

collectData();