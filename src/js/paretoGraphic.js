/*global G_D*/

function drawParetoOLD() {
  let candidate,
      f = 0,
      fronts = G_D.fronts,
      nFronts = fronts.length,
      cands = G_D.candidates,
      canvasW = windowWidth-150,   // take into account sidebar
      canvasH = windowHeight-210,
      nodeHeight = floor(canvasH/nFronts)/2,
      cId, 
      len,
      i, widthSoFar, xx, y, mycandy, spacing,
      paretoDiv,
      pD,
      foo
    
  // console.groupCollapsed('drawPareto')
  //   console.log(G_D)
  // console.groupEnd()
  
  // remove div if already exists
  if (!(paretoDiv == select('#paretoDiv'))) {
    removePareto()
  } 

  let graphicDiv = $('#graphicDiv')
    .position(150, 150)
    .size(canvasW, canvasH)

  // create parent div to hold candy 'nodes'
  paretoDiv = createDiv('')
        .id('paretoDiv')
        .position(160,150)  // todo magic numbers
        .size(canvasW, canvasH)
        .parent('#graphicDiv')
  //
  
  // loop over each front and display candies
  for (f; f<nFronts; f++) {
    i = 0
    widthSoFar = 0
    xx = 0
    y = nodeHeight * (f+1)
    
    // if x > canvasWidth, put on next row?

    for (cId of fronts[f]) {
      len = fronts[f].length
      mycandy = new Candy(G_D.candidates[cId], xx, y-nodeHeight/2, len)
      mycandy.display()
      xx += mycandy.candyWidth
      i++
    }
  }
}


// draw the whole graphic
function drawPareto() {
  let paretoDiv,
      fronts = G_D.fronts,
      nFronts = fronts.length,
      canvasW = windowWidth-50,   // magic
      canvasH = windowHeight-160,
      nodeHeight = 32,            // based on span textsize?
      frontH, mainDiv,
      f, x, y, c,
      peers, peersLength,
      widthSoFar = 0, // width of candies in a row
      candy, candidate, candyRow, candyFronts=[],
      foo

  // console.groupCollapsed('drawPareto')
  //   console.log(G_D)
  // console.groupEnd()
  
  // mainDiv = document.getElementsByTagName('main')
  // console.log('mD', mainDiv)
  

  // remove 'canvas' div if already exists
  if (!(paretoDiv == select('#paretoDiv'))) {
    removePareto()
  }

  let graphicDiv = select('#graphicDiv')
  
  // create parent div to hold candy fronts which have rows, which have'nodes'
  paretoDiv = createDiv('')
                .id('paretoDiv')
                .position(0,200)  // magic //todo proper grid!
                .size(canvasW, canvasH)
                .parent(graphicDiv)
  //

  // divide canvas into rows for each front
  // might have to do similar remargining trick for rows?
  // but for now, split canvas into strips
  frontH = Math.floor(canvasH / nFronts)
  // console.log(nFronts, canvasH, frontH)
  
  // we're going to need a candyRow for each front,
  // may as well stick them in candyRows[]

  // // for each front! qq
  for (f=0; f<1; f++) {
    peers = fronts[f]
    candyFronts[f] = new CandyFront(peers, f, f*frontH)
  }



}


function removePareto() {
  select('#paretoDiv')
  .remove() 
}


function calcMargin(minSpacing, canvasW) {
  let span,
    sigmaW = 0,
    spacing,
    margin,
    mySpans = document.getElementsByTagName("span"),
    spansN = mySpans.length

    // qq mySpans should only get spans in this row
    mySpans = document.getElementById('row0').getElementsByTagName('span')
    
  for (span of mySpans) {
    sigmaW += span.offsetWidth
  }

  spacing = (canvasW - sigmaW) / mySpans.length
  margin = Math.floor(spacing / 2) // - 0.05

  console.log('cW, sW, sp, ma, sn', canvasW, sigmaW, spacing, margin, spansN)
  
  return margin
}

function changeWidth(margin) {
  let i = 0,
    mySpans = document.getElementsByTagName("span"),
    length = mySpans.length

  for (i; i < length; i++) {
    mySpans[i].setAttribute("style", "margin: 0 " + margin + "px")
  }
}
