var pdfmake = require('../js/index');
var moment = require('moment');

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

var tableData = [
  {
    "subject": "Religion",
    "skills": "",
    "_1st": "A",
    "_2nd": "B",
    "Term_end": "56",
    "_1stRemark": "she has done well, keep it"
  },
  {
    "subject": "Sinhala",
    "skills": [
      {
        "name": "listening",
        "_1st": "A"
      },
      {
        "name": "speech",
        "_1st": "B"
      },
      {
        "name": "reading",
        "_1st": "C"
      },
      {
        "name": "writing",
        "_1st": "A"
      },
      {
        "name": "dictation",
        "_1st": "A"
      }
    ],
    "_1st": "A",
    "_2nd": "C",
    "Term_end": "98",
    "_1stRemark": "she done it well but keep it up"
  },
  {
    "subject": "Tamil",
    "skills": [
      {
        "name": "listening",
        "_1st": "A"
      },
      {
        "name": "speech",
        "_1st": "B"
      },
      {
        "name": "reading",
        "_1st": "C"
      },
      {
        "name": "writing",
        "_1st": "A"
      }
    ],
    "_1st": "D",
    "_2nd": "C",
    "Term_end": "57",
    "_1stRemark": "Good and keep it up"
  },
  {
    "subject": "English",
    "skills": [
      {
        "name": "listening",
        "_1st": "A"
      },
      {
        "name": "speech",
        "_1st": "B"
      },
      {
        "name": "reading",
        "_1st": "C"
      },
      {
        "name": "writing",
        "_1st": "A"
      }
    ],
    "_1st": "B",
    "_2nd": "B",
    "Term_end": "77",
    "_1stRemark": "Better than last year"
  },
  {
    "subject": "Social Development",
    "skills": [
      {
        "name": "listening",
        "_1st": "A"
      },
      {
        "name": "speech",
        "_1st": "B"
      },
      {
        "name": "reading",
        "_1st": "C"
      },
      {
        "name": "writing",
        "_1st": "A"
      },
      {
        "name": "dictation",
        "_1st": "A"
      },
      {
        "name": "speaking",
        "_1st": "B"
      }
    ],
    "_1st": "B",
    "_2nd": "A",
    "Term_end": "90",
    "_1stRemark": "you can be better"
  },
  {
    "subject": "Environment",
    "skills": [
      {
        "name": "reading",
        "_1st": "C"
      },
      {
        "name": "writing",
        "_1st": "A"
      },
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
    "_2nd": "C",
    "Term_end": "11",
    "_1stRemark": "Not good, better be good"
  }
];

function reportGen(){

  var reportName = moment().unix().toString();

  function buildTableBody(data, columns){

      var body = [];
      
      body.push([{text: "subject", style: 'tableHeader'}, {text: "_1st", style: 'tableHeader'}, {text: "_2nd", style: 'tableHeader'}, {text: "term end", style: 'tableHeader'}, {text: "remark", style: 'tableHeader'}]);
      
      data.forEach(function(row) {
        var dataRow = [];

        console.log(row);

        columns.forEach(function(column) {
            dataRow.push(row[column]);
        });

        body.push([{text: '', fillColor: '#DFDFDF'}, {text: '', fillColor: '#DFDFDF'}, {text: '', fillColor: '#DFDFDF'}, {text: '', fillColor: '#DFDFDF'}, {text: '', fillColor: '#DFDFDF'}]);
        
        var skills = row.skills;
        var tempRow = [];

        console.log(skills.length);

        if(skills.length === 0){
          console.log("0 in skills")
          body.push(['', '', '', '', '']);
        } else {
            for(var i=0; i<skills.length; i++){
            var skill = skills[i];
            body.push([skill.name, skill._1st, '', '', '']);
            console.log([skill.name, skill._1st, '', '', '']);
          }
          body.push(dataRow);
        }
    });
      
      return body;    
  }

  function table(data){
      return {
        table: {
          headerRows: 1,
          body: buildTableBody(data, ['subject', '_1st', '_2nd', 'Term_end', '_1stRemark'])
        }
      };
  }


  var dd = {
    content: [
        {text: "complex table"},
        table(tableData)
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