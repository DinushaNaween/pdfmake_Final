var fetch = require('node-fetch');
var url = require('../url');
var pdfmake = require('../js/index');

var fonts = {
  kaputaunicode: {
    normal: 'fonts/kaputa2004.ttf',
    bold: 'fonts/kaputa2004.ttf',
    italics: 'fonts/kaputa2004.ttf',
    bolditalics: 'fonts/kaputa2004.ttf'
  },
  iskpota: {
    normal: 'fonts/iskpota.ttf',
    bold: 'fonts/iskpota.ttf',
    italics: 'fonts/iskpota.ttf',
    bolditalics: 'fonts/iskpota.ttf'
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

var dd = {
  content: [
    {text: '\u0db4', style: 'sinhala'},
  ], 
  styles: {
    sinhala: {
      font: 'iskpota'
    }, 
    kaputa: {
      font: 'kaputaunicode'
    }
  }
  
}

var now = new Date();

var pdf = pdfmake.createPdf(dd);
pdf.write('pdfs/test.pdf');

console.log(new Date() - now);



