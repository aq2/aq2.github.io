/*global G_D*/

function drawParetoOLD() {
  let candidate,
      f = 0,
      fronts = G_D.fronts,
      nFronts = fronts.length,
      cands = G_D.candidates,
      canvasW = windowWidth-50,
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

  // create parent div to hold candy 'nodes'
  paretoDiv = createDiv('')
        .id('paretoDiv')
        .position(0,150)  // todo magic numbers
        .size(canvasW, canvasH)
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
      frontH,
      f, x, y, c,
      currentFront, currentFrontLength,
      widthSoFar = 0, // width of candies in a row
      candy, candidate,
      foo


  // setup 'canvas'
  
  console.groupCollapsed('drawPareto')
    console.log(G_D)
  console.groupEnd()
  
  // remove div if already exists
  if (!(paretoDiv == select('#paretoDiv'))) {
    removePareto()
  } 
  
  // create parent div to hold candy 'nodes'
  paretoDiv = createDiv('')
                .id('paretoDiv')
                .position(0,150)  // magic //todo proper grid!
                .size(canvasW, canvasH)
  //
  

  // divide canvas into rows for each front
  // might have to do similar remargining trick for rows?
  // but for now, split canvas into strips
  frontH = Math.floor(canvasH / nFronts)
  // console.log(nFronts, canvasH, frontH)
  

  // draw each row/front
  for (f=0; f<nFronts; f++) {
    widthSoFar = 0
    currentFront = fronts[f]
    console.log('front', f, currentFront)
    currentFrontLength = currentFront.length

    for (c=0; c<currentFrontLength; c++) {   // each c will be a candidate id
      let candID = currentFront[c]
      candidate = G_D.candidates[candID]
      
      x = widthSoFar
      // y = nodeHeight * (f+1) //
      y = f * canvasH / nFronts
      candy = new Candy(candidate, x, y, currentFrontLength)
      candy.display()
      widthSoFar += candy.candyWidth
      console.log('candidate', candID, candy.name)
   }

  }


}












function removePareto() {
  select('#paretoDiv')
  .remove() 
}


// candy constructor !!
function Candy(candidate, x, y, nPeers) {
  // console.log('candy created')
  
  this.candidate = candidate
  this.x = x
  this.y = y
  this.nPeers = nPeers

  this.id = candidate.key
  this.front = candidate.front

  // todo yuck
  let idField = G_D.catData.idCat
  let fieldName =  G_D.catData.cats[idField]
  this.name = candidate[fieldName]

  // todo too many this-es?
  this.showName = () => {
    console.log('this name ', this.name)
  }

  this.display = () => {
    // console.log('display')
    
    this.textSize = 12
    this.newSpan = createSpan(this.name)
                  .id('candy' + this.id)
                  .addClass('candy')
                  .position(this.x, this.y)
                  .mousePressed(this.showName)
                  .mouseOut(this.clearTooltip)
                  .mouseOver(this.showTooltip)

    this.span = select('#candy' + this.id)
                .parent(select('#paretoDiv'))

    this.siz = this.span.size()
    this.candyWidth = this.newSpan.offsetWidth

    this.candyWidth = document.getElementById('candy'+this.id).offsetWidth


    // this.textSize = (windowWidth-500)/9/this.nPeers
    // if (this.textSize > 24) {
    //   this.textSize = 24
    // }    

    this.span.style('font-size', this.textSize + 'pt')
  }

  this.showTooltip = () => {
    // todo rank and nss shouldnae be hard-coded
    let text = this.name

    this.tooltip = createSpan(text)
                    .addClass('tooltip')
                    .position(this.x + this.candyWidth + 5, this.y)
                
      return false
  }
  
  this.clearTooltip = () => {
    //
    this.tooltip.remove()
  } 
}
