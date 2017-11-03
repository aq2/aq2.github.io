let savedData,
    nFronts

let COL = {
  // mainColour: $blue,
  blue: '#4682b4',
  pink: '#b44669',
  darkblue: '#4a46b4',
  brown: '#b45d46',
  green: '#9AB446',
  gray: '#112'
}

// sets up html page
function setup() {   // eslint-disable-line
  select('#exTableDiv')
    .hide()

  // show button if saved data found
  if (localStorage.getItem('myData')) {
    let savedString = restoreData()
    savedData = []
      
    for (let s of savedString) {
      savedData.push(s)
    }
    // console.log('data retrieved...')
    // console.table(savedData)
      
    createButton('shortcut to pareto using saved Data')
      .position(400, 30)
      .mousePressed(shortCut)
  }
  
  // setup dropzone
  select('#dz')
    .drop(gotFile)
    .dragOver(highlight)
    .dragLeave(unhighlight)  
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
  
  // rollup the dropzone
  select('#dz')
    .html('file OK')
    .removeClass('wideDz')
    .addClass('narrowDz')    
  // todo disable or change dz event handler
  
  processFile(file.data)            // eslint-disable-line
}

// input: id of page element
// ouput: turns it a yucky brown
function errorMsg(id) {
    select('#' + id)
      .style('background', COL.brown)
}



// radical todo!
// move current setup into preload -> 
// setup then takes control and can act as main
// eg - setup gets rawFile
// passes it to gotFile  (uhoh - it's inside setup) which returns back to main/setup
// then setup passes data to process, which returns something, etc
// dont like passing control by calling functions! pass data between them in main
