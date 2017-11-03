// start point for the app

let savedData,
    nFronts

function preload() {   // eslint-disable-line
  select('#exTableDiv')
    .hide()
}


function setup() {    // eslint-disable-line
  if (localStorage.getItem('myData')) {
    // console.log('data found')
    savedString = restoreData()
    savedData = []
    for (let s of savedString) {
      savedData.push(s)
    }
    // console.log('data retrieved...')
    // console.table(savedData)
    
    createButton('shortcut to pareto using saved Data')
    .position(400, 30)
    .mousePressed(shortCut)
    // .mouseOver(foo)

    // createButton('download data')
    // .position(400, 30)
    // .mousePressed(shortCut)

    createA('../data/gug2009.csv', 'download data')
      .position(400, 55)

  } else {
    console.log('no data')
  }
  // setup dropzone
  select('#dz')
    .drop(gotFile)
    .dragOver(highlight)
    .dragLeave(unhighlight)


    
}

function foo() {
  console.log('foo')
}

function highlight(evt) {
  this.style('filter', 'brightness(1.15)')
  evt.preventDefault()
}


function unhighlight(evt) {
  this.style('filter', 'brightness(1.0)')
  evt.preventDefault()
}


function errorMsg(id) {
  // let iid = '#' + id
  select('#' + id)
  .style('background', COL.brown)
}


function gotFile(file) {
  // todo file should have at least three lines, header, cand1, cand2
 
  if (file.type != 'text') {
    errorMsg('dzText')
    return
  }

  if (file.size > 10000) {
    errorMsg('dzSize')
    return
  }
 
  select('#dz')
    .html('file OK')
    .removeClass('wideDz')
    .addClass('narrowDz')
  
  // todo disable or change dz event handler
  
  select('#critBox')
    .style('opacity', '1')

  select('#exTableDiv')
    .position(20, 180)
    .show()

  // processFile belongs in process_file.js
  processFile(file.data)            // eslint-disable-line
}

function saveData(data) {
  localStorage.setItem('myData', JSON.stringify(data));
}

function restoreData() {
  return JSON.parse(localStorage.getItem('myData'))
}
