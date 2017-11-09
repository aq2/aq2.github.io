let G_D = {
    vizTypes: ['pareto', 'parallel'],
    catData: {},
    candidates: [],
    fronts: [],
    dataFiles: ['countries.csv', 'gug2009.csv', 'mini-gug2009']
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
  let dz = select('#dz')
    .position(200, 200)
    .size(800, 400)
    .drop(gotFile)
    .dragOver(highlight)
    .dragLeave(unhighlight)
    
    // make filechooser buttons
    for (let df of G_D.dataFiles) {
      createButton(df)
        .mousePressed(gotButtonFile(df))
        .parent(select('#dzFiles'))
      // makeAButton(df, '#dzFiles', gotButtonFile)
      // .mousePressed(gotButtonFile(this.id))
    }
    
    let fileBtn = select('#browseFile').elt
    // .onchange(foo)
    
   document.getElementById('browseFile')
    addEventListener('change', readSingleFile, false)


  // show button if saved data found
  if (localStorage.getItem('myData')) {
    createButton('shortcut to pareto using saved object')
      .position(400, 30)
      .mousePressed(shortCut)
  }
}

function makeAButton(label, parentId, callback) {
  createButton(label)
    .parent(select(parentId)) // qq
    .mousePressed(callback)
    
}


function gotBrowse(file) {
  console.log('got browse')
  console.log(file[0])
  
}

function gotButtonFile(bf) {
  return function() {
    console.log('bf', bf)
    fetch("../data/" + bf)
    .then(response => {
      console.log(response)
      let fn = response.url
      console.log('fn', fn)
      let x = fn.xml()
      console.log('x', x)
      
    })
    // .then(data => {
    //   console.log(data)
    // })
  }
}


function gotButtonFile3(bf) {
  return function() {
    console.log('bf', bf)
    fetch("../data/" + bf)
    .then(response => {
      console.log('resp', response)
      console.log('resp.u', response.url)
      fn = response.url
      // f = 

      if (f) {
        var r = new FileReader();
        r.onload = function(e) { 
          var contents = e.target.result;
          alert( "Got the file.n" 
                +"name: " + f.name + "n"
                +"type: " + f.type + "n"
                +"size: " + f.size + " bytesn"
                + "starts with: " + contents.substr(0, 10)
          );  
        }
        r.readAsText(f);
      } else { 
        alert("Failed to load file");
      }
    })
  }
}


function gotButtonFile2(f) {
  return function() {
    console.log('fn', f)

    let file ="/data/" + f

     if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
        var contents = file.contents;
        alert( "Got the file.n" 
              +"name: " + f.name + "n"
              +"type: " + f.type + "n"
              +"size: " + f.size + " bytesn"
              + "starts with: " + contents.substr(0, 10)
        );  
      }
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }



  }
  
  // var f = evt.target
  
    // if (f) {
    //   var r = new FileReader();
    //   r.onload = function(e) { 
    //     var contents = e.target.result;
    //     alert( "Got the file.n" 
    //           +"name: " + f.name + "n"
    //           +"type: " + f.type + "n"
    //           +"size: " + f.size + " bytesn"
    //           + "starts with: " + contents.substr(0, 10)
    //     );  
    //   }
    //   r.readAsText(f);
    // } else { 
    //   alert("Failed to load file");
    // }
}


function foo() {
  console.log('foo')
  
}



function setup() {
}




function readSingleFile(evt) {
  //Retrieve the first (and only!) File from the FileList object
  var f = evt.target.files[0]

  if (f) {
    var r = new FileReader();
    r.onload = function(e) { 
      var contents = e.target.result;
      console.log('con', contents)
     
      // alert( "Got the file.n" 
      //       +"name: " + f.name + "n"
      //       +"type: " + f.type + "n"
      //       +"size: " + f.size + " bytesn"
      //       + "starts with: " + contents.substr(0, 10)
      // );  
      gotFile(contents)
    }
    r.readAsText(f);
  } else { 
    alert("Failed to load file");
  }
  // console.log('c', contents)
  
}



// input: raw file from dragndrop
// processing: checks file suitability
// output: calls processFile - todo return it rather than call file???
function gotFile(file) {
  console.log('gF', file)
  
  //   if (file.type != 'text/csv') {
  //   errorMsg('dzText')
  //   return
  // }

  // if (file.size > 10000) {
  //   errorMsg('dzSize')
  //   return
  // }
  // todo file should have at least three lines, header, cand1, cand2
  
  G_D.rawData = file
  console.log('f, f.d', file, )
  console.log('f, f.c', file, )
  

  // rollup the dropzone
  select('#dz')
    .html('file OK')
    .removeClass('widest')
    .addClass('narrow')
    .style('filter', 'brightness(1.0)')
    .mouseOver(showDzHover)
    .mouseOut(hideDzHover)
    .mousePressed(newDz)
    // todo could dispense with tooltip, and change the html/object-state instead!

  // show example data table
  select('#critBox')
    .html('select rankable criteria using the table below')
    .style('visibility', 'visible')

  select('#exTableDiv')
    .position(20, 180)
    .style('visibility', 'visible')

  // make html for table and stick it in    
  let tableHtml = makeExampleTableHtml(file)  // !!
  
  select('#exTable')
    .html(tableHtml)

  select('#measRow')
    .addClass('light')   
 
 //qq - great callback example - could actually pass data here for less spaghetti
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
  
  drawPareto()
}


function showDzHover() {
  createSpan('click to drop another file')
    .addClass('tooltip')
    .id('dzTooltip')
    .position(100, 100)
  
  // prevent multiple tooltips
  return false
}

function hideDzHover() {
  select('#dzTooltip')
    .remove()
  
  return false
}

function newDz() {
  // todo
}