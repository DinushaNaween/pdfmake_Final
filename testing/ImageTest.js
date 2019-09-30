var fetch = require('node-fetch');
var url = require('../url');

const getNoteData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return(json.data);
  } catch (error) {
    console.log(error);
  }
};

var fonts = {
	FM_Malithi: {
		normal: 'fonts/FM-Malithi.ttf',
		bold: 'fonts/FM-Malithi.ttf',
		italics: 'fonts/FM-Malithi.ttf',
		bolditalics: 'fonts/FM-Malithi.ttf'
	},
  AMS_Arunalu: {
    normal: 'fonts/AMS Arunalu.ttf',
    bold: 'fonts/AMS Arunalu.ttf',
    italics: 'fonts/AMS Arunalu.ttf',
    bolditalics: 'fonts/AMS Arunalu.ttf'
  },
	MouldedSaji: {
		normal: 'fonts/MouldedSaji.ttf',
		bold: 'fonts/MouldedSaji.ttf',
		italics: 'fonts/MouldedSaji.ttf',
		bolditalics: 'fonts/MouldedSaji.ttf'
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

let rectTitle = {	type: 'rect',	x: 0,	y: -30,	w: 516,	h: 30,	r: 2,	lineColor: 'black',	color: '#5B71F3'};
let rectLeft = {	type: 'rect',   x: 0,	y: 10,	w: 210,	h: 70,	r: 10,	lineColor: 'black'	};
let rectRight = {	type: 'rect',	x: 307,	y: -70,	w:210,	h: 70,	r: 10,	lineColor: 'black'	};

let schoolName = 'this is school name';
let schoolDiscription = 'this is school discription';

let customerName = 'customer name';
let className = 'grade 12';
let admissionNo = '4443';

let textBook = 'Good';
let nationalFlag = 'Great';
let nationalAnthem = 'Great';
let remarkComment = 'Good. Keep up! Keep going. You can be the best.';

async function collectData(){
	const noteData = await getNoteData(url.allNotes);

	function buildTable1Body(data){
    console.log(data.length);
    var body = [];

    body.push([{ text: 'Note details from note server...', style: 'tableHeader', colSpan: 3, alignment: 'center', fillColor: '#CDD3F3' }, '', '', { text: 'User Details', style: 'tableHeader', rowSpan: 2, alignment: 'center', fillColor: '#CDD3F3' }])
    body.push([{ text: 'Note ID', style: 'tableHeader', alignment: 'center', fillColor: '#CDD3F3' }, { text: 'Note Topic', style: 'tableHeader', alignment: 'center', fillColor: '#CDD3F3' }, { text: 'Note', style: 'tableHeader', alignment: 'center', fillColor: '#CDD3F3' }, '']);

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
        widths: ['10%', '30%', '51%', '10%'],
        headerRows: 2,
        body: buildTable1Body(data)
      }
    }
  }

	var dd = {
		content: [
			{ canvas: [rectTitle] },
			{ canvas: [rectLeft] },
			{ canvas: [rectRight] },
			{ 
				columns: [{
					width: rectTitle.w,
					noWrap: false,
					maxHeight: rectTitle.h,
					text: schoolName,
					fontSize: 13,
					alignment: 'center'
				}],
				relativePosition: {
					x: rectTitle.x,
					y: rectTitle.h-138
				}	
			},
			{ 
				columns: [{
					width: rectTitle.w,
					noWrap: false,
					maxHeight: rectTitle.h,
					text: schoolDiscription,
					fontSize: 10,
					alignment: 'center',
				}],
				relativePosition: {
					x: rectTitle.x,
					y: rectTitle.h-124
				}	
			},
			{
					table: {
							body: [
										[{text: 'Name'}, {text: ':'}, {text: customerName, decoration: 'underline', decorationStyle: 'dotted' }],
										[{text: 'Class'}, {text: ':'}, {text: className, decoration: 'underline', decorationStyle: 'dotted' }],
										[{text: 'Admission No'}, {text: ':'}, {text: admissionNo, decoration: 'underline', decorationStyle: 'dotted' }]
									]
					}, 
					relativePosition: {
					x: rectLeft.x,
					y: rectLeft.h-136
				},
				layout: {
					defaultBorder: false,
				}
			},
			{
					table: {
							body: [
										[{text: 'No of students'}, {text: ':'}, {text: customerName, decoration: 'underline', decorationStyle: 'dotted' }],
										[{text: 'Attendance'}, {text: ':'}, {text: className, decoration: 'underline', decorationStyle: 'dotted' }],
										[{text: 'Class Teacher'}, {text: ':'}, {text: admissionNo, decoration: 'underline', decorationStyle: 'dotted' }]
									]
					}, 
					relativePosition: {
					x: rectRight.x,
					y: rectRight.h-136
				},
				layout: {
					defaultBorder: false,
				}
			},
			{
					image: '../examples/fonts/school-logo-transparent-outline.png',
					alignment: 'center',
					width: 50,
					absolutePosition: { x: 45, y: 60 }
			},
			{ text: ' ' },
			{ text: ' ' },
			table1(noteData),
			{ text: ' ' },
			{
				table: {
					widths: [300, 50, 100],
					body: [
						[{ text: 'Use of Government Text Books' }, { text: ':', rowSpan: 2 }, { text: textBook, rowSpan: 2 }], 
						[{ text: 'Kjbnrtrb jrtg kjntg kjrtg', style: 'sinhala' }, '', ''],
						[{ text: ' ' }, '', ''],
						[{ text: 'Allegiance to National Flag and School Flag' }, { text: ':', rowSpan: 2 }, { text: nationalFlag, rowSpan: 2 }], 
						[{ text: 'Kjbnrtrb jrtg kjntg kjrtg', style: 'sinhala' }, '', ''],
						[{ text: ' ' }, '', ''],
						[{ text: 'Allegiance to National Anthem and School Anthem' }, { text: ':', rowSpan: 2 }, { text: nationalAnthem, rowSpan: 2 }], 
						[{ text: 'Kjbnrtrb jrtg kjntg kjrtg', style: 'sinhala' }, '', ''],
						[{ text: ' ' }, '', ''],
					]
				},
				layout: {
					defaultBorder: false,
				}
			},
			{
				table: {
					widths: [150, 10, 300],
					body: [
						[{ text: 'General Remarks' }, { text: ':' }, { text: remarkComment }]
					]
				},
				layout: {
					defaultBorder: false,
				}
			},
			{
				table: {
					widths: [150, 10, 300],
					body: [
						[{ text: 'Next Term Begins' }, { text: ':' }, { text: '1/1/2020',decoration: 'underline', decorationStyle: 'dotted' }]
					]
				},
				layout: {
					defaultBorder: false,
				}
			},
			{ text: ' ' },
			{
				table: {
					widths: [150, 150, 150],
					body: [
						[{ text: '........................', alignment: 'center' }, { text: '........................', alignment: 'center' }, { text: '........................', alignment: 'center' }],
						[{ text: 'Class Teacher', alignment: 'center' }, { text: 'Section Head', alignment: 'center' }, { text: 'Principal', alignment: 'center' }]
					]
				},
				layout: {
					defaultBorder: false,
				}
			}
		], 
		styles: {
			sinhala: {
				font: 'FM_Malithi'
			}
		}
	}
	var now = new Date();
	
	var pdf = pdfmake.createPdf(dd);
	pdf.write('pdfs/report1.pdf');
	
	console.log(new Date() - now);	
}

collectData()