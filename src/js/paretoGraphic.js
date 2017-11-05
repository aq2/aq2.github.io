/*global G_D*/

function setup() {
}


function buildParetoGraphic() {
  let candidate,
      f,        // loooping var
      thisFront,
      fronts = [],      // front[0] = [18,47...] keys of cands in front
      nFronts = G_D.nFronts   // number of fronts

  // console.groupCollapsed('buildParetoGraphic')
  //   console.table(G_D.candidates)
  //   console.log('nF ' + nFronts)
  // console.groupEnd()

  // loop through candidates, assigning key to fronts[]
  for (f=1; f<=nFronts; f++) {
    thisFront = []
    for (candidate of G_D.candidates) {
      if (candidate.front == f) {
        thisFront.push(candidate.key)
      }
    }
    fronts.push(thisFront)
  }
  // console.log(fronts)

  drawParetoGraphic(fronts)
}


function drawParetoGraphic(fronts) {   // qq
  let cands = G_D.candidates,
      canvasW = windowWidth-50,
      canvasH = windowHeight-210,
      nFronts = G_D.nFronts,
      nodeHeight = floor(canvasH/nFronts)/2,
      maxNodesOnFront = 0,
      m,
      front,
      f = 0,
      cId, len,
      foo

  // do we need this - calculates maxNodesperFront
  for (front = 1; front < nFronts; front++) {
    m = 0
    for (let c of cands) {
      if (c.front == front) {
        m++
      }
    }
    if (m > maxNodesOnFront) {
      maxNodesOnFront = m
    }
  }
  // console.log('maxnodes on front ' + maxNodesOnFront)
  

  fill(100)
  stroke(50)

  draw()

  console.groupCollapsed('dPG')
    console.table(G_D.candidates)
    console.log(G_D.catData)
  console.groupEnd()

  // does this need to be inner function?
  function draw() {
    let i, widthSoFar, xx, y, mycandy, spacing

    for (f; f<nFronts; f++) {
      i = 0
      widthSoFar = 0
      xx = 0
      y = nodeHeight * (f+1)

      for (cId of fronts[f]) {
        len = fronts[f].length
        mycandy = new Candy(G_D.candidates[cId], xx, y-nodeHeight/2 + 150, len)
        mycandy.display()
        xx += mycandy.candyWidth
        i++
      // let canvasLeft = canvasW - xx
      // let spacing = canvasLeft/(len - 1)
      // let newX = mycandy.x + (spacing * i)
      // // mycandy.x = newX
      // console.log(newX)
      // // mycandy.span.hide()
      // let mycandy2 = new Candy(G_D.candidates[cId], newX, y-nodeHeight/2 + 200, len)
      // mycandy2.display()
      }
      // if (xx > canvasW * .75) {
      //   // man - iterate over front again with
      // }
    }


  // candy.mousePressed(showName2)
}

}


// candy constructor !!
function Candy(candidate, x, y, nPeers) {
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


  this.showName = () => {
    console.log('this name ', this.name)
  }

  this.display = () => {

    this.textSize = 10
    this.newSpan = createSpan(this.name.substr(0,6))
                  .id('candy' + this.id)
                  .position(this.x, this.y)
                  .mousePressed(this.showName)
                  .mouseOut(this.clearTooltip)
                  .mouseOver(this.showTooltip)

    this.span = select('#candy' + this.id)
    
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
  }
  
  this.clearTooltip = () => {
    //
    this.tooltip.hide()
  } 

  // return this // ??

}


