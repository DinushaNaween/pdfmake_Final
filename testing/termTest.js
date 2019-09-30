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

var tableData = {
  "studentName": "Dinusha Naween",
  "class": "Grade 7A",
  "admissionNo": "112209",
  "noOfStudentsInClass": 40,
  "classTeacher": "Mrs. Saparamadhu",
  "marks": [
    {
      "subject": "commerce",
      "terms": [
        {
          "term": 1,
          "marks": "23",
          "average": "67",
          "grade": "B"
        },
        {
          "term": 2,
          "marks": 34,
          "average": 55,
          "grade": "C"
        },
        {
          "term": 3,
          "marks": "ab",
          "average": "ex",
          "grade": "ex"
        }
      ]
    },
    {
      "subject": "history",
      "terms": [
        {
          "term": 1,
          "marks": "53",
          "average": "68",
          "grade": "B"
        },
        {
          "term": 2,
          "marks": "90",
          "average": "99",
          "grade": "A"
        },
        {
          "term": 3,
          "marks": "27",
          "average": "79",
          "grade": "B"
        }
      ]
    },
    {
      "subject": "tamil",
      "terms": [
        {
          "term": 1,
          "marks": "53",
          "average": "47",
          "grade": "C"
        },
        {
          "term": 2,
          "marks": "84",
          "average": "85",
          "grade": "A"
        }, 
        {
          "term": 3,
          "marks": "55",
          "average": "60",
          "grade": "B"
        }
      ]
    }
  ], 
  "statistics": [
    {
      "term": 1,
      "total": 678,
      "studentAverage": 77,
      "classAverage": 78,
      "positionInClass": 4
    },
    {
      "term": 2,
      "total": 778,
      "studentAverage": 87,
      "classAverage": 88,
      "positionInClass": 3
    }, 
    {
      "term": 3,
      "total": 888,
      "studentAverage": 67,
      "classAverage": 98,
      "positionInClass": 1
    }
  ]
}

var pdfmake = require('../js/index');
pdfmake.setFonts(fonts);

function repoortGen(){

  function buildTableBody(data){
    var body = [];
    var termsLength = 0;
    var totalTerm1 = tableData.statistics[0].total;
    var totalTerm2 = tableData.statistics[1].total;
    var totalTerm3 = tableData.statistics[2].total;
    var noOfSubjectsTerm1 = 0;
    var noOfSubjectsTerm2 = 0;
    var noOfSubjectsTerm3 = 0;
    var studentAverageTerm1 = tableData.statistics[0].studentAverage;
    var studentAverageTerm2 = tableData.statistics[1].studentAverage;
    var studentAverageTerm3 = tableData.statistics[2].studentAverage;
    var classAverageTerm1 = tableData.statistics[0].classAverage;
    var classAverageTerm2 = tableData.statistics[1].classAverage;
    var classAverageTerm3 = tableData.statistics[2].classAverage;
    var positionInClass = 0;
    var bottomRow = [];
    var totalRow = [];
    var studentAverageRow = [];
    var classAverageRow = [];
    var positionInClassRow = [];

    if(data[1].terms.length === 1){
      
      termsLength = 1;
      totalRow.push({ text: 'Total', style: 'specialText' }, { text: totalTerm1, colSpan: 3 }, '', '');
      studentAverageRow.push({ text: 'Student Average', style: 'specialText' }, { text: studentAverageTerm1, colSpan: 3 }, '', '');
      classAverageRow.push({ text: 'Class Average', style: 'specialText' }, { text: classAverageTerm1, colSpan: 3 }, '', '');
      body.push([{ text: 'Subject', rowSpan: 2, style: 'tableHeader' }, { text: '1st Term Test', colSpan: 3, style: 'tableHeader' }, ' ', ' '])
      body.push([' ', { text: 'Marks', style: 'tableHeader' }, { text: 'Class Average', style: 'tableHeader' }, { text: 'Position Grading', style: 'tableHeader' }])
    
    } else if(data[1].terms.length === 2){

      termsLength = 2;
      totalRow.push({ text: 'Total', style: 'specialText' }, { text: totalTerm1, colSpan: 3 }, '', '', { text: totalTerm2, colSpan: 3 }, '', '');
      studentAverageRow.push({ text: 'Student Average', style: 'specialText' }, { text: studentAverageTerm1, colSpan: 3 }, '', '', { text: studentAverageTerm2, colSpan: 3 }, '', '');
      classAverageRow.push({ text: 'Class Average', style: 'specialText' }, { text: classAverageTerm1, colSpan: 3 }, '', '', { text: classAverageTerm2, colSpan: 3 }, '', '');
      body.push([{ text: 'Subject', rowSpan: 2, style: 'tableHeader' }, { text: '1st Term Test', colSpan: 3, style: 'tableHeader' }, ' ', ' ', { text: '2nd Term Test', colSpan: 3, style: 'tableHeader' }, ' ', ' '])
      body.push([' ', { text: 'Marks', style: 'tableHeader' }, { text: 'Class Average', style: 'tableHeader' }, { text: 'Position Grading', style: 'tableHeader' }, { text: 'Marks', style: 'tableHeader' }, { text: 'Class Average', style: 'tableHeader' }, { text: 'Position Grading', style: 'tableHeader' }])
    
    } else if(data[1].terms.length === 3){

      termsLength = 3;
      totalRow.push({ text: 'Total', style: 'specialText' }, { text: totalTerm1, colSpan: 3 }, '', '', { text: totalTerm2, colSpan: 3 }, '', '', { text: totalTerm3, colSpan: 3 }, '', '');
      studentAverageRow.push({ text: 'Student Average', style: 'specialText' }, { text: studentAverageTerm1, colSpan: 3 }, '', '', { text: studentAverageTerm2, colSpan: 3 }, '', '', { text: studentAverageTerm3, colSpan: 3 }, '', '');
      classAverageRow.push({ text: 'Class Average', style: 'specialText' }, { text: classAverageTerm1, colSpan: 3 }, '', '', { text: classAverageTerm2, colSpan: 3 }, '', '', { text: classAverageTerm3, colSpan: 3 }, '', '');
      body.push([{ text: 'Subject', rowSpan: 2, style: 'tableHeader' }, { text: '1st Term Test', colSpan: 3, style: 'tableHeader' }, ' ', ' ', { text: '2nd Term Test', colSpan: 3, style: 'tableHeader' }, ' ', ' ', { text: '3rd Term Test', colSpan: 3, style: 'tableHeader' }, ' ', ' '])
      body.push([' ', { text: 'Marks', style: 'tableHeader' }, { text: 'Class Average', style: 'tableHeader' }, { text: 'Position Grading', style: 'tableHeader' }, { text: 'Marks', style: 'tableHeader' }, { text: 'Class Average', style: 'tableHeader' }, { text: 'Position Grading', style: 'tableHeader' }, { text: 'Marks', style: 'tableHeader' }, { text: 'Class Average', style: 'tableHeader' }, { text: 'Position Grading', style: 'tableHeader' }])
    }

    for(var i=0; i<data.length; i++){
      var tempRow = [];
      tempRow.push(data[i].subject)

      for(var j=0; j<termsLength; j++){

        // switch (data[i].terms[j].term) {
        //   case 1:
        //       noOfSubjectsTerm1++;   
        //       totalTerm1 += data[i].terms[j].marks
        //     break;

        //   case 2:
        //       noOfSubjectsTerm2++;   
        //       totalTerm2 += data[i].terms[j].marks
        //     break;

        //   case 3:
        //     noOfSubjectsTerm3++;   
        //     totalTerm3 += data[i].terms[j].marks
        //   break;
        
        //   default:
        //     break;
        // }
          
        tempRow.push({ text: data[i].terms[j].marks, style: 'tableData' }, { text: data[i].terms[j].average, style: 'tableData' }, { text: data[i].terms[j].grade, style: 'tableData' })    
      }
      console.log(tempRow);
      body.push(tempRow);
    }

    body.push(totalRow);
    body.push(studentAverageRow);
    body.push(classAverageRow);
    
    // studentAverageTerm1 = totalTerm1/noOfSubjects;

    // console.log(studentAverage);
    // console.log(totalTerm1);
    // console.log(totalTerm2);
    // console.log(totalTerm3);

    // body.push(bottomRow);

    return body;
  }

  function widths(data){
    if(data[1].terms.length === 1){
      return ['75%', '7%', '7%', '7%']
    } else if(data[1].terms.length === 2){
      return ['55%', '7%', '7%', '7%', '7%', '7%', '7%']
    } else if(data[1].terms.length === 3){
      return ['35%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%']
    }
  }

  function table(data){
    return {
      table: {
        widths: widths(data),
        headerRows: 2,
        body: buildTableBody(data)
      }, fontSize: 8
    }
  }

  var reportName = moment().unix().toString();

  var dd = {
    content: [
      { text: 'Student Term Marks', style: 'TableTitle' },
      { text: ' ' },
      table(tableData.marks)
    ], 
    styles: {
      tableHeader: {
        bold: true,
        alignment: 'center',
        fillColor: '#FFF0C0'
      },
      TableTitle: {
        fontSize: 15,
        bold: true
      },
      tableData: {
        alignment: 'center'
      }, 
      specialText: {
        fontSize: 9,
        bold: true
      }
    }
  }

  var now = new Date();

  var pdf = pdfmake.createPdf(dd);
  pdf.write('pdfs/'+reportName+'.pdf');

  console.log(new Date() - now);
}

repoortGen();