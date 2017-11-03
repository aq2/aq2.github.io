function buildParetoGraphic(cands) {
  let candidate,
      cFront,
      fronts = []

  // select('#dz')
  //   .hide()

  // console.groupCollapsed('buildGraphic')
  //   console.table(cands)
  // console.groupEnd()

  // for each front, make a new column of 'nodes'

  
  // need to get all fronts, with dominates data
  // key, name, dominates, front
  // let paretoData = cands.map

  console.log('nF ' + nFronts)
  for (let front=1; front<=nFronts; front++) {
    let thisFront = []
    for (candidate of cands) {
      // get front
      cFront = candidate.front
      if (cFront == front) {
        thisFront.push(candidate.key)
      }
    }
    fronts.push(thisFront)
  }
  console.log(fronts)

  drawGraphic(cands, fronts)


}


function drawGraphic(cands, fronts) {
  let cWidth = windowWidth-50,
      cHeight = windowHeight-210,
      nodeHeight = floor(cHeight/nFronts),
      nodeWidth,     // width of each node - depends on max nodes per front 
      maxNodesOnFront = 0,
      m, newNode,
      nodeH = 40,
      nodeW = 40

      console.table('fronts ' + fronts)

  
  // console.table(cands)

  for (let front = 1; front < nFronts; front++) {
    m = 0
    for (let c of cands) {
      if (c.front == front) {
        m++
        // console.log(c.name + ' on front ' + front)
      }
    }
    if (m > maxNodesOnFront) {
      maxNodesOnFront = m
    }
  }
  // console.log('maxnodes on front ' + maxNodesOnFront)
  nodeWidth = floor(cWidth / maxNodesOnFront)

  console.log('node size ' + nodeWidth + ', ' + nodeHeight)

  createCanvas(cWidth, cHeight)
    .position(30,200)
  background(COL.pink)
  draw()

  function draw() {

  for (let f=0; f<nFronts; f++) {
    let y = nodeHeight * (f+1)
    // line(0, y, cWidth, y)
    let i = 0
    for (let c of fronts[f]) {

      // build a node object for the uni
      // needs key - all else can be inferred
      newNode = makeNode(c)

      // let myEl = createDiv(c)
                  // .position(nodeWidth*i, y-nodeHeight/2) 

      let myR = rect(nodeWidth*i, y-nodeHeight/2, nodeW, nodeH)
      
      // myR.mouseOver(showInfo)
      
      text(c, 5 + nodeWidth * i , y - nodeHeight/2 + nodeH/2 )


      i++
    }
  }
  }

}

function showInfo(x) {
  console.log('show Info' + x)
}


function makeNode(cand) {
  let node = {
    key: cand.key,
    name: cand.name,  // todo shouldn't be name - should refer to id field
    dominates: cand.dominates,
    front: cand.front
  }
}
