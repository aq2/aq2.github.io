// process CSV data into more usable form

/*global G_D*/

// make example table, inc select rankables
function makeExampleTableHtml(data) {
  let c,                                      // looping object
      val,                                    // looper value
      myHtml = "<tr><th>criteria:</th>",      // initial string of table html
      exampleData = data.split('\n', 3),      // first 3 lines of data file
      // todo check for headers at ex[0]
      categories = exampleData[0].split(','), // first line
      // add second and third rows for examples
      exCandidates = [exampleData[1].split(','), exampleData[2].split(',')]
      
  G_D.catData = {cats: categories, rankables: [], maxis: [], alphas: [], idCat: -1, iDn: ''}

  // show each category
  for (c of categories) {
    myHtml += '<th>' + c + '</th>'
  }
  myHtml += '<th></th></tr>'

  // show two example candidates
  let i = 0  // todo yuck!
  for (c of exCandidates) {    
    myHtml += '<tr class="cand"><td>example data</td>'
    for (val of c) {
      // if (isNaN(Number(val))) {
      //   G_D.catData.alphas.push(i) // todo - don't work?
      // }
      myHtml += '<td>' + val + '</td>'
    }
    i++
    myHtml += '<th></th></tr>'
  }

  // show rankables row  todo don't include alpha fields
  myHtml += "<tr id='measRow'><td>select rankable criteria</td>"
  for (c in categories) {
      myHtml += "<td><input type='checkbox' name='cat" + c + "' id='cat" + c + "'>"
      myHtml += "<label for='cat" + c + "'><span> </span></label></td>"
    }
  
  myHtml += "<td id='catBtnPos'></td></tr>"

  // make other rows, empty for now
  myHtml += "<tr id='minmaxRow'></tr>"
  myHtml += "<tr id='idRow'></tr>"

  // let measRow = $('#measRow')
  //               .addClass('throbit')
  return myHtml
}


// rankables click handler
function getRankables() {

  let i = 0,
      catLength = G_D.catData.cats.length
  
  // check each checkbox, add to rankables[] if checked
  for (i; i<catLength; i++) {
    if (select('#cat' + i).checked()) {
      G_D.catData.rankables.push(i)
    } 
  }
  
  // if at least two rankables
  if (G_D.catData.rankables.length < 2) {
    // todo error message, wobble button?? 
    return false
  }

  select('#measRow')
    .addClass('dark')
    .removeClass('throbit')

  getMaxis()
}


function getMaxis() {
  let i = 0,
      length = G_D.catData.cats.length,
      html = '<td>high value is better</td>'

  $('#catsInst').hide()
  $('#maxisInst').show()
    .position(180, 65)
    
  // for each measurable, add checkbox
  for (i; i<length; i++) {
    html += "<td>"
    if (G_D.catData.rankables.indexOf(i) != -1) {
      html += "<input type='checkbox' id='max" + i + "'>"
      html += "<label for='max" + i + "'><span> </span></label>"
  } 
    html += "</td>"
  }
  html += "<td id='minmaxBtnPos'></td></tr>"

  select('#minmaxRow')
    .html(html)
    .addClass('light')
    .addClass('throbit')

  makeOKButton('#minmaxBtnPos', getID)
}


function getID() {
  let i = 0,
      length = G_D.catData.cats.length,
      html = "<td>select one id field</td>"

  $('#maxisInst').hide()
  $('#idInst').show()
    .position(180, 65)

  select('#minmaxRow')
  .addClass('dark')
  .removeClass('throbit')

  select('#idRow')
    .addClass('light')
    .addClass('throbit')

  // for each category max checkbox, add to maxis[] if checked, and build iD row
  for (i; i<length; i++) {
    html += "<td><input type='radio' name='iD' value='" + i + "' id=radio" + i 
    // onchange yuck todo add proper event handler
    html += " onchange=makeData(this.value)>"
    html += "<label for='radio" + i + "'><span> </span></label>"
      html += "</td>"
    if (G_D.catData.rankables.indexOf(i) != -1) {
      if (select('#max' + i).checked()) {
        G_D.catData.maxis.push(i)
      } 
    }
  }

  select('#idRow').html(html)
}

function makeData(the1) {
  let numb,
      prop,
      i = 1,
      j = 0,
      rawCand,
      propname,
      candidate = {},
      someData = G_D.rawData.split('\n'),
      len = someData.length
    
  G_D.catData.idCat = the1
  G_D.catData.iDn = G_D.catData.cats[the1]
 
  // now make data table - rawData is still one raw big string
  
  // todo fugly hacky loops going on in here
  // for each rawCandidate, change into formatted candidate
  for (i; i<len-1; i++) {
    candidate = {}
    candidate['key'] = i - 1
    rawCand = someData[i].split(',')
    
    for (prop of rawCand) {
      propname = G_D.catData.cats[j]
      
      // if prop value is alpha, trim it, else just use the numeric val      
      prop = (isNaN(numb=Number(prop))) ? prop.trim() : numb
      
      // fugling hacky
      j = (j == G_D.catData.cats.length - 1) ? -1 : j      
      j++
      // j = (j == catData.cats.length - 1) ? 0 : j++  // why no work
      
      candidate[propname] = prop
    }
    G_D.candidates.push(candidate)
  }
  
  // get rid of rawdata - do we need it?
  delete G_D.rawData
  
  getViz()
}


function getViz() {
  let viz,
      html = 'Select data vizualisation '

  // rollup table
  select('#exTableDiv')
  .style('opacity', '0')
  .hide()

  $('#idInst').hide()
  $('#vizInst').show()
    .position(180, 65)

  select('#chooseViz')
    .show()
    .html(html)
    .position(200, 300)
    .addClass('throbit')
  
  for (viz of G_D.vizTypes) {
    createButton(viz)
      .mousePressed(getButton(viz))
      .parent('#chooseViz')
  }
}

function getButton(viz) {
  // wrapped up in anon fn so can accept args as callback
  return function() {
    switch (viz) {
      case 'pareto':
        findParetoFronts()
        break
  
      default:
        break
    }
  }
}
