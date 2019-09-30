var pdfmake = require('../js/index');
var moment = require('moment');

var fonts = {
  FM_Malithi: {
		normal: 'fonts/FM-Malithi.ttf',
		bold: 'fonts/FM-Malithi.ttf',
		italics: 'fonts/FM-Malithi.ttf',
		bolditalics: 'fonts/FM-Malithi.ttf'
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

var tableData = [
  {
    "subject": "Religion",
    "skills": [
      {
        "name": "dictation",
        "_1st": "A"
      },
      {
        "name": "speaking",
        "_1st": "B"
      }
    ],
    "_1st": "A",
    "_2nd": "B",
    "Term_end": "56",
    "_1stRemark": "she has done well, keep it"
  },
//   {
//     "subject": "Sinhala",
//     "skills": [
//       {
//         "name": "listening",
//         "_1st": "A"
//       },
//       {
//         "name": "speech",
//         "_1st": "B"
//       },
//       {
//         "name": "reading",
//         "_1st": "C"
//       },
//       {
//         "name": "writing",
//         "_1st": "A"
//       },
//       {
//         "name": "dictation",
//         "_1st": "A"
//       }
//     ],
//     "_1st": "A",
//     "_2nd": "C",
//     "Term_end": "98",
//     "_1stRemark": "she done it well but keep it up"
//   },
//   {
//     "subject": "Tamil",
//     "skills": [
//       {
//         "name": "listening",
//         "_1st": "A"
//       },
//       {
//         "name": "speech",
//         "_1st": "B"
//       },
//       {
//         "name": "reading",
//         "_1st": "C"
//       },
//       {
//         "name": "writing",
//         "_1st": "A"
//       }
//     ],
//     "_1st": "D",
//     "_2nd": "C",
//     "Term_end": "57",
//     "_1stRemark": "Good and keep it up"
//   },
//   {
//     "subject": "English",
//     "skills": [
//       {
//         "name": "listening",
//         "_1st": "A"
//       },
//       {
//         "name": "speech",
//         "_1st": "B"
//       },
//       {
//         "name": "reading",
//         "_1st": "C"
//       },
//       {
//         "name": "writing",
//         "_1st": "A"
//       },
//       {
//         "name": "reading",
//         "_1st": "C"
//       },
//       {
//         "name": "writing",
//         "_1st": "A"
//       },
//       {
//         "name": "dictation",
//         "_1st": "A"
//       },
//       {
//         "name": "speaking",
//         "_1st": "B"
//       }
//     ],
//     "_1st": "B",
//     "_2nd": "B",
//     "Term_end": "77",
//     "_1stRemark": "Better than last year"
//   },
//   {
//     "subject": "Social Development",
//     "skills": [
//       {
//         "name": "listening",
//         "_1st": "A"
//       },
//       {
//         "name": "speech",
//         "_1st": "B"
//       },
//       {
//         "name": "reading",
//         "_1st": "C"
//       },
//       {
//         "name": "writing",
//         "_1st": "A"
//       },
//       {
//         "name": "dictation",
//         "_1st": "A"
//       },
//       {
//         "name": "speaking",
//         "_1st": "B"
//       }
//     ],
//     "_1st": "B",
//     "_2nd": "A",
//     "Term_end": "90",
//     "_1stRemark": "like Aldus PageMaker includi leap th the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
//   },
//   {
//     "subject": "Environment",
//     "skills": [
//       {
//         "name": "reading",
//         "_1st": "C"
//       },
//       {
//         "name": "writing",
//         "_1st": "A"
//       },
//       {
//         "name": "dictation",
//         "_1st": "A"
//       },
//       {
//         "name": "speaking",
//         "_1st": "B"
//       }
//     ],
//     "_1st": "A",
//     "_2nd": "C",
//     "Term_end": "11",
//     "_1stRemark": "Not good, better be good"
//   }
];

function reportGen(){

  var reportName = moment().unix().toString();

  function buildTableBody(data, columns){
    var body = [];

    body.push([{text: "subject", style: 'tableHeader'}, {text: "_1st", style: 'tableHeader'}, {text: "_2nd", style: 'tableHeader'}, {text: "term end", style: 'tableHeader'}, {text: "remark", style: 'tableHeader'}]);

    for(var i=0; i<data.length; i++){
      var dataRow = [];
      // console.log(data[i]);

      var subjectName = { text: data[i].subject, style: 'tableHeader', decoration: 'underline' };
      dataRow.push(subjectName);
      dataRow.push(data[i]._1st);
      dataRow.push(data[i]._2nd);
      dataRow.push(data[i].Term_end);

      var spanCells = { text: data[i]._1stRemark, rowSpan: data[i].skills.length+1, dontBreakRows: true }
      dataRow.push(spanCells);

      body.push(dataRow);
      // console.log(dataRow);

      for(var j=0; j<data[i].skills.length; j++){

        var skillRow = [];
        skillRow.push(data[i].skills[j].name);
        skillRow.push(data[i].skills[j]._1st);
        skillRow.push(' ');
        skillRow.push(' ');
        skillRow.push(' ');

        body.push(skillRow);
      }
      
    }

    // console.log(body);
    return body;
  }

  function buildTableBody2(data, columns){
    // console.log(data);
    // console.log(columns);

    var body = [];
    var tempRow = [];

    body.push([{text: "subject", style: 'tableHeader'}, {text: "_1st", style: 'tableHeader'}, {text: "_2nd", style: 'tableHeader'}, {text: "term end", style: 'tableHeader'}, {text: "remark", style: 'tableHeader'}]);

    tempRow.push(data.subject);
    tempRow.push(data._1st);
    tempRow.push(data._2nd);
    tempRow.push(data.Term_end);
    var rowSpanValue = { text: data._1stRemark, rowSpan: data.skills.length+1, dontBreakRows: true }
    tempRow.push(rowSpanValue);

    body.push(tempRow);

    for(var i=0; i<data.skills.length; i++){
      var skillRow = [];
      skillRow.push(data.skills[i].name);
      skillRow.push(data.skills[i]._1st);
      skillRow.push(' ');
      skillRow.push(' ');
      skillRow.push(' ');

      body.push(skillRow);
    }

    console.log(body)
    return body;
  }

  function table(data){
    // console.log('table method');
    return {
        table: {
          // dontBreakRows: true,
          // widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
          // headerRows: 1,
          body: buildTableBody2(data, ['subject', '_1st', '_2nd', 'Term_end', '_1stRemark'])
        },pageBreakBefore: true,
    };
  }

  function returnValues(data){
    // console.log(data);
    // console.log(table(data));
    return table(data);
  }

  function multipleTable(){
    tableData.forEach(function(dataSet) {
      // console.log(returnValues(dataSet));
      return returnValues(dataSet);
    })
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
        image: './Images/school-logo-transparent-outline.png',
        alignment: 'center',
        width: 50,
        absolutePosition: { x: 45, y: 60 }
			},
			{ text: ' ' },
			{ text: ' ' },
        multipleTable()
    ], 
    styles: {
      tableHeader: {
        bold: true,
        fontSize: 13
      }
    }
  };

  var now = new Date();

  var pdf = pdfmake.createPdf(dd);
  pdf.write('pdfs/'+reportName+'.pdf');

  console.log(new Date() - now);
}

reportGen()