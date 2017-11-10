function findParetoFronts() {                   // eslint-disable-line
  let categories = G_D.catData.cats,
      rankables = G_D.catData.rankables,
      candidates = G_D.candidates,              // ALL unis - fields but no dom data yet
      currentFront = 0, 
      freshCands =addEmptyDominanceData(candidates),
      fronts = []

  $('#vizInst')
    .hide()

  $('#chooseViz')
    .hide()
  
  // console.groupCollapsed('pareto')
  //   console.log('cats ' + categories)
  //   console.table(candidates)
  // console.groupEnd()

  // todo rename all these variables!

  var domCands = contest(freshCands, rankables) // All unis + dom
  var candsLeft = deepClone(domCands)                  // TEMP uni + dom - we'll trim it away

  // main loop
  while (candsLeft.length) {
    currentFront++
    var peers = getParetoFront(candsLeft)
    // console.log(peers)
    fronts.push(peers)
    // console.log(fronts)
    for (var frontCand of peers) {
      // update front data -> get uni from key and update?
      var fCand = domCands.find(f => f.key === frontCand)
      fCand.front = currentFront
                  
      // remove from candsLeft // todo replace by pop()
      candsLeft = candsLeft.filter(f => f.key != frontCand)
      
      for (var c of candsLeft) {
        // if pareto uni exists in dom_by, remove it
        if (c.dom_by.indexOf(frontCand) != -1) {
          c.dom_by = c.dom_by.filter(f => f != frontCand)
        }
      }
    }
  }
  // G_D.nFronts = currentFront
  G_D.candidates = domCands
  G_D.fronts = fronts
  saveData(G_D)
    
  drawPareto()
}


function addEmptyDominanceData(candidates) {
  for (let cand of candidates) {
      cand.dominates = []
      cand.dom_by = []
      cand.front = -1
    }
  return candidates
}


// mega 'tournament' between unis - who dominates who
function contest(unis, rankables) {
  // console.groupCollapsed('contest')
  //   console.log('****** DOING CONTEST *****')
  //   console.log('unis: ')
  //   console.table(unis)
  //   // console.log('cats ' + categories)
  //   console.log('rankbls ' + rankables )
  // console.groupEnd()

  // big compare loop
  var u = unis.length
  // for each uni
  for (var i=0; i<u-1; i++) {
    var uni1 = unis[i]

    // then for each other uni in turn
    for (var j=i+1; j<u; j++) {
      var uni2 = unis[j]
      // compare uni1 with uni2
      // console.log(i, j)
      // todo maxis not taken into account!
      var comparisons = compareUnis(unis[i], unis[j], rankables)

      // todo - too much pushing
        // console.log('i j comps ' + i + ' ' + j + ' ' + comparisons)
      // if at least one 1 and no -1's : uni1>uni2
      if ((comparisons.indexOf(1) > -1) && (comparisons.indexOf(-1) === -1)) {
        // console.log(uni1.name + ' dominates ' + uni2.name + ' ' +  comparisons)
        // console.log(uni2.name + ' dominated by ' + uni1.name + ' ' + comparisons)
        uni1.dominates.push(uni2.key)
        uni2.dom_by.push(uni1.key)
      } else if ((comparisons.indexOf(-1) > -1) && (comparisons.indexOf(1) === -1)) {
        // if at least one -1 and no 1's : uni2>uni1
        // console.log(uni2.name + ' dominates ' + uni1.name + ' ' +  comparisons)
      
        // console.log(uni1.name + ' dominated by ' + uni2.name + ' ' + comparisons)
        uni2.dominates.push(uni1.key)
        uni1.dom_by.push(uni2.key)
      } else if ((comparisons.indexOf(1) === -1) && (comparisons.indexOf(-1) === -1)) {
        // if all zeroes (ie no 1s or -1s, then equal)
        console.log(uni1.name + ' equal to! ' + uni2.name + ' ' + comparisons)
      } else {
        // meh - no dominance = better in some criteria, worse in others
        // console.log(uni1.name + ' meh ' + uni2.name + ' ' + comparisons)
      }      
    }
  }

  // console.groupCollapsed('contest end')
  //   console.log('unis: ')
  //   console.table(unis)
  //   // console.log('cats ' + categories)
  //   // console.log('rankbls ' + rankables )
  // console.groupEnd()

  return unis
}


function getParetoFront(unis) {
  var pareto = []
  // iterate through unis, finding non-dominated
  for (var uni of unis) {
    if (uni.dom_by.length == 0) {
      pareto.push(uni.key)
    }
  }
  // console.table('pareto ' + pareto)
  return pareto
}


// return comparison array [1,0,0,-1 etc]
function compareUnis(uni1, uni2, rankables) {
  // console.group('compare ' + uni1 + ' ' + uni2)
  //   console.log('****** COMPARING *****')
  //   console.log('unis1: ')
  //   console.table(uni1)
  //   console.log('cats ' + categories)
  //   console.log(' ' )
  // console.groupEnd()

  // todo rewrite using alpha codes rather than -1
  // easy to find an alpha in a string
  // eg easy to find 'b' in comparisons='aaaabab'

  var comparisons = []
  for (var category of rankables) {
    // if (category.measurable) {
      // var catName = category.name
      var catName = G_D.catData.cats[category]
      // console.log('comps ' + catName + ' for ' + uni1.name + ':' + uni1[catName] + ' and for ' + uni2.name + ':' + uni2[catName] )
      if (uni1[catName] < uni2[catName]) {
        comparisons.push(1)
      } else if (uni1[catName] == uni2[catName]) {
        comparisons.push(0)
      } else {
        comparisons.push(-1)
      }
    // }
  }
  // console.log('comp ' + comparisons)
  return comparisons
}


