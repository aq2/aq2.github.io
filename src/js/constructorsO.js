// candy constructor !!
function CandyO(candidate, x, y, nPeers, parentDiv) {
  // console.log('candy created')
  
  this.candidate = candidate
  this.x = x
  this.y = y
  this.nPeers = nPeers
  this.parentDiv = parentDiv

  // this.parent(parentDiv)

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
                  .parent(this.candyRowObj)
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


function Candy(candidate, x, y, nPeers, parentDiv) {
  // console.log('candy created')
  
  this.candidate = candidate
  this.x = x
  this.y = y
  this.nPeers = nPeers
  this.parentDiv = parentDiv

  // this.parent(parentDiv)

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
                  .parent(this.candyRowObj)
                  .position(this.x, this.y)
                  .mousePressed(this.showName)
                  .mouseOut(this.clearTooltip)
                  .mouseOver(this.showTooltip)

    this.span = select('#candy' + this.id)
                .parent(select('#paretoDiv'))

    this.siz = this.span.size()
    // this.candyWidth = this.newSpan.offsetWidth

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



// each CandyRow is member of a CandyFront

function CandyRow(rowPeersIDs) {


  // blah


}



/*
    candyFront contains an array candyRows
    each cRow contains an array of candies
    put each candy into the row until it gets too long
    start filling up next row until all candys are used up
    result: cRow1 = [first lot of candidates]
            cRow2 = [second lot of candidates] etc...
*/
function CandyFront(peers, paretoId, y ) {
  this.peers = peers          //  all IDs of candys in front  
  this.paretoId = paretoId
  this.y = y
  this.CandyRows = []

  // should this be this.candyRows
  // useful if accessing them from elsewhere...hmm
  // let candyRows = [], widthSoFar = 0, candidate, candID, peer,
  //     peersL = peers.length, pId, p, candidates = G_D.candidates,
  //     // candy, rowsSoFar, candyW, 

  
  // start with initial candyRow
  // let rowsSoFar = 0
  // let    CandyRows[rowsSoFar] = []
  // let   CandysInRow = []

  bucketFill(peers, 10, 1600)

  // plonk all the candys into a first row
  // if too much width, halve them then remeasure
  // if still to much, halve them again




  // // for each peer candy, stick it in row
  // for (p=0; p<peersL; p++) {
  //   pId = peers[p]      // eg pId = 47
  //   peer = candidates[pId]
  //   candy = new Candy(peer)
  //   candyW = candy.candyWidth
  //   widthSoFar += candyW

  //   while(widthSoFar < canvasW/0.75) {
  //     candyInRow.push(candy)
  //   }
    
  //   rowsSoFar++

    // hang about we don't know how many rows we're going to need


  // }

  // for this front, build up rows

  // number of cRows depends on width of candys in row
  
  // depending on amount of candys in a front



}

// returns rows?
function bucketFill(peers, minWidth, canvasWidth) {
  // recieves peers of unknown width
  // splits into individual rows (objects) of target width

  // calc canvasW, sigmaW, delta, spacing, peersL

  // plonk them all down, measure width

  let p, peer, peersL = peers.length, pId, widthSoFar = 0
  let candidates = G_D.candidates

  for (p=0; p<peersL; p++) {
    pId = peers[p]
    peer = candidates[pId]

    candy = new Candy(peer)
    candy.display()
    candyW = candy.candyWidth
    console.log('cW', candyW)
    
    widthSoFar += candyW
  }
  console.log('wSF', widthSoFar)

}