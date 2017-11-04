function setup() {

}



function buildParetoGraphic() {
  let candidate,
      cFront,
      fronts = [],
      nFronts = G_D.nFronts
      // cands = G_D.candidates

  console.groupCollapsed('buildParetoGraphic')
    console.table(G_D.candidates)
    console.log('nF ' + nFronts)
  console.groupEnd()


  for (let front=1; front<=nFronts; front++) {
    let thisFront = []
    for (candidate of G_D.candidates) {
      // get front
      cFront = candidate.front
      if (cFront == front) {
        thisFront.push(candidate.key)
      }
    }
    fronts.push(thisFront)
  }
  console.log(fronts)

  drawParetoGraphic(fronts)


}

let myB

function drawParetoGraphic(fronts) {   // qq
  let cands = G_D.candidates
  // let fronts = 

  let cWidth = windowWidth-50,
      cHeight = windowHeight-210,
      nFronts = G_D.nFronts,
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

  // put into setup()?
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
        // newNode = makeNode(c)

        // let myEl = createDiv(c)
                    // .position(nodeWidth*i, y-nodeHeight/2) 

        myB = createButton(c)
                    .position(35+nodeWidth*i, y-nodeHeight/2 + 150)
                    .value(c)
                    // .mouseOver(showInfo)
                    .mousePressed(showInfo)
        

        // let v = myB.elt.v
        // console.table('v ' + v)

        // text(c, 5 + nodeWidth * i , y - nodeHeight/2 + nodeH/2 )

        i++
      }
    }
  }

}

function showInfo(evt) {
  // console.log('info ' + evt)
  // console.table(evt)
  let candidateKey = evt.srcElement.value
  // let candidate = name of candidate with that key
  let uni = G_D.candidates[candidateKey]
  let uniname = uni.name

  console.log('name of ' + candidateKey + ' is ' + uniname)

}


// function makeNode(cand) {
//   let node = {
//     key: cand.key,
//     name: cand.name,  // todo shouldn't be name - should refer to id field
//     dominates: cand.dominates,
//     front: cand.front
//   }
// }
