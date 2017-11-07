let G_D = {
    vizTypes: ['pareto', 'parallel'],
    catData: {},
    candidates: [],
    fronts: []
}

let COL = {
  // mainColour: $blue,
  blue: '#4682b4',
  pink: '#b44669',
  darkblue: '#4a46b4',
  brown: '#b45d46',
  green: '#9AB446',
  gray: '#112'
}


// sets up html page, shows dropzone
function preload() {   // eslint-disable-line
  // setup dropzone
  select('#dz')
    .drop(gotFile)
    .dragOver(highlight)
    .dragLeave(unhighlight)

  // show button if saved data found
  if (localStorage.getItem('myData')) {
    createButton('shortcut to pareto using saved Data')
      .position(400, 30)
      .mousePressed(shortCut)
  }
}


// input: raw file from dragndrop
// processing: checks file suitability
// output: calls processFile - todo return it rather than call file???
function gotFile(file) {
  if (file.type != 'text') {
    errorMsg('dzText')
    return
  }

  if (file.size > 10000) {
    errorMsg('dzSize')
    return
  }
  // todo file should have at least three lines, header, cand1, cand2
  
  G_D.rawData = file.data
  
  // rollup the dropzone
  select('#dz')
    .html('file OK')
    .removeClass('widest')
    .addClass('narrow')
    .style('filter', 'brightness(1.0)')
  // todo disable or change dz event handler
  
  // show example data table
  select('#critBox')
    .html('select rankable criteria using the table below')
    .style('visibility', 'visible')

  select('#exTableDiv')
    .position(20, 180)
    .style('visibility', 'visible')

  // make html for table and stick it in    
  let tableHtml = makeExampleTableHtml(file.data)  // !!
  
  select('#exTable')
    .html(tableHtml)

  select('#measRow')
    .addClass('light')   
 
 //qq - great callback example 
  makeOKButton('#catBtnPos', getRankables)
}


// input: id of page element
// ouput: turns it a yucky brown
function errorMsg(id) {
    select('#' + id)
      .style('background', COL.brown)
    select('#dz')
      .style('filter', 'brightness(1.0)')
}


function highlight(evt) {
  this.style('filter', 'brightness(1.25)')
  evt.preventDefault()
}

function unhighlight(evt) {
  this.style('filter', 'brightness(1.0)')
  evt.preventDefault()
}

function shortCut() {
  // console.log('shortie pressed')
  select('#dz')
    .hide()

  let savedString = loadData()
  G_D = restoreData(savedString)
  
  buildParetoGraphic()
}
