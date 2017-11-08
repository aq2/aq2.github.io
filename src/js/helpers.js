

// todo need to saveall - data.  time for mega global object?
// 
function saveData(data) {
  localStorage.setItem('myData', JSON.stringify(data));
}

function loadData() {
  return JSON.parse(localStorage.getItem('myData'))
}


function restoreData(data) {
  let savedObject = {}
  let savedProps = []

  for (let s in data) {
    savedProps.push(s)
  }

  for (let property of savedProps) {
    let x = data[property]
    // console.log('x ' + x)
    savedObject[property] = data[property]
  }
 
  // console.log('retrieved...props')
  // console.log(savedObject)
  return savedObject
}





// pinched from interwebs
function deepClone(o) {
   var output, v, key
   output = Array.isArray(o) ? [] : {}
   for (key in o) {
       v = o[key]
       output[key] = (typeof v === "object") ? deepClone(v) : v
   }
   return output
}

function makeOKButton(parentId, callback) {
  createButton('OK')
    .parent(select(parentId)) // qq
    .mousePressed(callback)
}


