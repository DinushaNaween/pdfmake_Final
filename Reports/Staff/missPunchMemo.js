var fetch = require('node-fetch');
var url = require('../../url');

const getStaffData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return (json.data);
  } catch (error) {
    console.log(error);
  }
};

function sortByEmployee(key, data){
  var tempArray = [];
  console.log(data);
  console.log(key);

  for(var i=0; i<data.length; i++){

    if(key == data[i].fingerprintId){
      tempArray.push(data[i]);
    } else {
      continue
    }
    // console.log(tempArray);  
  }
  // console.log(tempArray);
  return tempArray;
}

function keyElementArrayCheck(keyElements, tempKey, isAvailable){  

  for(var j=0; j<keyElements.length; j++){
      
    if(keyElements[j] == tempKey){ 
      isAvailable = true;
    } else {
      continue
    }
  }
  return
}

async function generateReport() {
  const reportData = await getStaffData(url.allAttendance);
  // console.log(reportData);
  var data = reportData;

  var keyElements = [];

  for(var i=0; i<data.length; i++){
    var tempKey = data[i].fingerprintId;
    keyElements.push(tempKey);
    // console.log(tempKey);
    // console.log(keyElements);
    var isAvailable = false;
    
    keyElementArrayCheck(keyElements, tempKey, isAvailable)

    if(isAvailable == false){
      var answerArray = sortByEmployee(tempKey, data)
    }
  }
}

generateReport();