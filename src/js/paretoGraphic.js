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
      nodeHeight = floor(canvasH/nFronts),
      nodeWidth,     // width of each node - depends on max nodes per front 
      maxNodesOnFront = 0,
      m, newNode,
      nodeH = 40,
      nodeW = 40,
      front,
      foo

  // console.log('fronts ', fronts)
  // console.table(cands)

  // do we need this - calculates maxNodesperFront
  for (let front = 1; front < nFronts; front++) {
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
  
  nodeWidth = floor(canvasW / maxNodesOnFront)


  // so how do we calculate width of node?
  // all nodes have same width = easy
  // if width*nodesOnFront > canvaswidth, then double up



  // console.log('node size ' + nodeWidth + ', ' + nodeHeight)

  // put into setup()?
  // let cnv = createCanvas(canvasW, canvasH)
  //   .position(30,200)
  // background(COL.pink)

  fill(100)
  stroke(50)
  textSize(16)

  // rect(200,200,100,100)

  // let candy = new Candy(G_D.candidates[36], 130, 140)
  
  // candy.mouseOver(showName2)
  
  // candy.display()
  draw()

  


  console.groupCollapsed('dPG')
    console.table(G_D.candidates)
    console.log(G_D.catData)
  console.groupEnd()


function draw() {
  // let candy
  // candy = new Candy(G_D.candidates[36], 130, 140)
  
  // candy.display()
    

  for (let f=0; f<nFronts; f++) {
    let y = nodeHeight * (f+1)
    // line(0, y, canvasW, y)
    let i = 0
    for (let c of fronts[f]) {
      mycandy = new Candy(G_D.candidates[c], 35+nodeWidth*i, y-nodeHeight/2 + 150)
      mycandy.display()
      i++
    }
  }


  // candy.mousePressed(showName2)
}

}


// candy constructor !!
function Candy(candidate, x, y) {
  this.candidate = candidate
  this.x = x
  this.y = y

  this.id = candidate.key
  this.front = candidate.front

  // todo yuck
  let idField = G_D.catData.idCat
  let fieldName =  G_D.catData.cats[idField]
  this.name = candidate[fieldName]
  console.log('name ', this.name)

  this.showName = () => {
    console.log('this name ', this.name)
  }

  this.display = () => {
    this.newSpan = createSpan(this.name)
                  .id('candy' + this.id)
                  .position(this.x, this.y)
                  .mousePressed(this.showName)
                  .mouseOut(this.clearTooltip)
                  .mouseOver(this.showNameTooltip)
  }

  this.showNameTooltip = () => {
    // todo rank and nss shouldnae be hard-coded
    let text = 'rank ' + this.candidate.rank + ' nss ' +this.candidate.nss

    this.size = select('#candy' + this.id)
                .size()

    this.tooltip = createSpan(text)
                    .addClass('tooltip')
                    .position(this.x + this.size.width + 5, this.y)
  }
  
  this.clearTooltip = () => {
    this.tooltip.hide()
  } 

  // return this // ??

}


