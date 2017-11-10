let G_D = {
    fronts: [],
    catData: {},
    candidates: [],
    vizTypes: ['pareto', 'parallel']
}

// sets up html page, shows dropzone
function setup() {   // eslint-disable-line
   $('#cats')
    .hide()

  $('#viz')
    .hide()

  $('#dfile')
    .position(0, 80)
  
  $('#dataInst')
   .position(180, 65)
  
  $('#browseFile')
    .addClass('throbit')

  $('#browseLabel')
    .addClass('throbit')

  $('#browseFile').elt
   .addEventListener('change', readInFile, false)

  $('#catsInst')
    .hide()
 
  $('#maxisInst')
    .hide() 
  
  $('#idInst')
    .hide() 

  $('#vizInst')
    .hide() 
  // show button if saved data found
  if (localStorage.getItem('myData')) {
    createButton('shortcut to pareto using saved object')
      .position(400, 1)
      .mousePressed(shortCut)
  }
}


function readInFile(evt) {
  let r,
      f = evt.target.files[0]
  
  if (f= evt.target.files[0]) {
    r = new FileReader()
    r.onload = function(e) { 
      var contents = e.target.result
      // console.log('con', contents)
      gotFile(contents)
    }
    r.readAsText(f)
  } else { 
    alert("Failed to load file")
  }
}


function gotFile(filedata) {
  G_D.rawData = filedata
  
  $('#cats').show().position(0, 150)
      
  $('#dataInst').hide()
  $('#catsInst').show()
    .position(180, 65)

    select('#exTableDiv')
    // show/hide()?
    .style('visibility', 'visible')
    .position(180, 300)

    $('#browseFile')
    .removeClass('throbit')
    .addClass('blueborder')

    $('#browseLabel')
    .removeClass('throbit')
    .addClass('blueborder')

  // make html for table and stick it in    
  let tableHtml = makeExampleTableHtml(filedata)  // !!

  select('#exTable')
    .html(tableHtml)

  select('#measRow')
    .addClass('light')   
 
 //qq - great callback example - could actually pass data here for less spaghetti
  makeOKButton('#catBtnPos', getRankables)
}


function shortCut() {
  select('#dataInst')
    .hide()

  let savedString = loadData()
  G_D = restoreData(savedString)
  
  drawPareto()
}
