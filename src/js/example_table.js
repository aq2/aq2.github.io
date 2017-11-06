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
      
  G_D.catData = {cats: categories, rankables: [], maxis: [], idCat: -1, iDn: ''}

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
      if (isNaN(Number(val))) {
        G_D.alphaField = i
      }
      myHtml += '<td>' + val + '</td>'
    }
    i++
    myHtml += '<th></th></tr>'
  }

  // show rankables row
  myHtml += '<tr id="measRow"><td>select rankable criteria</td>'
  for (c in categories) {
    myHtml += "<td><input type='checkbox' checked id='cat" + c + "'>"
  }
  myHtml += "<td id='catBtnPos'></td></tr>"

  // make other rows, empty for now
  myHtml += "<tr id='minmaxRow'></tr>"
  myHtml += "<tr id='idRow'></tr>"
  // for instructions and error
  myHtml += "<tr><td colspan='" + (c+2) +"' id='outputCell' class='green'>"
  myHtml += "select categories to rank by, need at least two - don't select names etc!"
  myHtml += "</td></tr>"

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

  select('#measRow').class('dark')

  getMaxis()
}


function getMaxis() {
  let i = 0,
      length = G_D.catData.cats.length,
      html = '<td>high value is better</td>'

  // for each measurable, add checkbox
  for (i; i<length; i++) {
    html += "<td>"
    if (G_D.catData.rankables.indexOf(i) != -1) {
      html += "<input type='checkbox' id='max" + i + "'>"
    } 
    html += "</td>"
  }
  html += "<td id='minmaxBtnPos'></td></tr>"

  select('#minmaxRow')
    .html(html)
    .class('light')

  select('#outputCell').html('default is lower values are better')

  makeOKButton('#minmaxBtnPos', getID)
}


function getID() {
  let i = 0,
      length = G_D.catData.cats.length,
      html = "<td>select one id field</td>"

  select('#minmaxRow').class('dark')

  select('#idRow').class('light')

  // for each category max checkbox, add to maxis[] if checked, and build iD row
  for (i; i<length; i++) {
    html += "<td><input type='radio' name='iD' value='" + i + "' id=radio" + i + "></td>"
    if (G_D.catData.rankables.indexOf(i) != -1) {
      if (select('#max' + i).checked()) {
        G_D.catData.maxis.push(i)
      } 
    }
  }

  html += "<td id='idBtnPos'></td></tr>"

  select('#idRow').html(html)

  // check alphafield radio button - choose alpha by default
  // todo yuck
  document.getElementsByName("iD")[G_D.alphaField].checked = true
  
  select('#outputCell')
    .html('choose a category to use as identifier - eg name')

  makeOKButton('#idBtnPos', makeData) // !!
}


function makeData() {
  let numb,
      prop,
      i = 1,
      j = 0,
      rawCand,
      propname,
      candidate = {},
      someData = G_D.rawData.split('\n'),
      len = someData.length,
      the1 = document.querySelector('input[name="iD"]:checked').value
  
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

  select('#critBox')
    .html('criteria')
    .removeClass('wideDz')
    .addClass('narrow')

  select('#chooseViz')
    .style('opacity', 1)
    .removeClass('trans')
    .style('visibility', 'visible')
    .html(html)
  
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
