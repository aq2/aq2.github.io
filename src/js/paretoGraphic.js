/*global G_D*/

function setup() {
}


function buildParetoGraphic() {
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
      foo
    
  console.groupCollapsed('dPG')
    console.log(G_D)
    console.log(G_D.catData)
    // console.table(G_D.candidates)
  console.groupEnd()
      
  // set up p5 variables - setup()?
  fill(100)
  stroke(50)
  // do it
  draw()


  // qq need to be inner function? yes if want scope
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
      }
      let myTest = createSpan('i wonder how long this is?')
      .style('opacity', '0')
      // console.log(myTest.size())
      // console.log(myTest.position())
    }
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
                  .addClass('candy')
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

}


