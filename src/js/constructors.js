/*
    candyFront contains an array candyRows
    each cRow contains an array of candies
    put each candy into the row until it gets too long
    start filling up next row until all candys are used up
    result: cRow1 = [first lot of candidates]
            cRow2 = [second lot of candidates] etc...
*/
function CandyFront(peers, paretoId, y) {
  this.peers = peers          //  all IDs of candys in front  
  this.paretoId = paretoId
  this.y = y
  this.candyRows = []
  this.peersL = peers.length

  let canvasW = windowWidth-200   // magic
  let minSpacing = 10  // min candy spacing - don't want them too squeezed up
  let candidates = G_D.candidates
  let p, pId, peer, candy
  let rowsSoFar = 0, widthSoFar = 0

  // recieves a front of peers
  // decides how many rows needed, of full width or target width 
  // for each row, lay them out at correct y, and animate?

  let rowDiv = createDiv('')
                .id('row' + rowsSoFar)
                .parent('#paretoDiv')
                .addClass('slider')
  
       

  for (p=0; p<this.peersL; p++) {
    pId = peers[p]
    peer = candidates[pId]

    candy = new Candy(peer, rowDiv)
    widthSoFar += candy.candyWidth
  }
  console.log('wSF', widthSoFar)


  if (widthSoFar < canvasW) {
    // then it's only one row    
    let margin = calcMargin(minSpacing, canvasW)
    changeWidth(margin)
  }

}


function CandyRow() {

}



// // returns rows?
// function bucketFill(peers, minSpacing, canvasW) {
//   // recieves peers of unknown width
//   // splits into individual rows (objects) of target width

//   // calc canvasW, sigmaW, delta, spacing, peersL

//   // plonk them all down, measure width

//   let p, peer, peersL = peers.length, pId, widthSoFar = 0
//   let candidates = G_D.candidates

//   for (p=0; p<peersL; p++) {
//     pId = peers[p]
//     peer = candidates[pId]

//     candy = new Candy(peer)
//     // candy.display()
//     candyW = candy.candyWidth
//     // console.log('cW', candyW)
    
//     widthSoFar += candyW
//   }
//   console.log('wSF', widthSoFar)

// }


function Candy(candidate, parentRow) {
  this.candidate = candidate
  // this.parentRow = parentRow
  // this.parentDiv = parentDiv
  this.id = candidate.key
  this.front = candidate.front

  // todo yuck
  let idField = G_D.catData.idCat
  let fieldName =  G_D.catData.cats[idField]
  this.name = candidate[fieldName]
  
  // p5 element - access DOM elt by .elt
  let spanner = createSpan(this.name)    
                  .id('candy' + this.id)
                  .addClass('candy')
                  .parent(parentRow)

  
  this.candyWidth = spanner.elt.offsetWidth



  console.log('cW', this.candyWidth)
    
 
}