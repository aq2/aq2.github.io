function highlight(evt) {
  this.style('filter', 'brightness(1.15)')
  evt.preventDefault()
}

function unhighlight(evt) {
  this.style('filter', 'brightness(1.0)')
  evt.preventDefault()
}


// todo need to saveall - data.  time for mega global object?
// 
function saveData(data) {
  localStorage.setItem('myData', JSON.stringify(data));
}

function restoreData() {
  return JSON.parse(localStorage.getItem('myData'))
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
    .parent(select(parentId))
    .mousePressed(callback)
}


