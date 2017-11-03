function pareto() {                   // eslint-disable-line
  // let candidates = buildcandidates()


  // add dominates, dominatesby, front object props
  for (cand of candidates) {
    cand.dominates = []
    cand.dom_by = []
    cand.front = -1
  }

  // var uniData = buildUniData(csvUnis)  // include categories and dom data
  findAllFronts()
  // findAllFronts(candidates)

  // console.groupCollapsed('pareto')
  //   console.table(candidates)
  //   console.log(catData)
  // console.groupEnd()
}


// function saveData(data) {
//   localStorage.setItem('myData', JSON.stringify(data));
// }

// function restoreData() {
//   return JSON.parse(localStorage.getItem('myData'))
// }



// main loop - recieves all candidates including dominance
function findAllFronts() {
  var categories = catData.cats
  var rankables = catData.rankables
  var unis = candidates              // ALL unis - fields but no dom data yet
   
  var currentFront = 0  
  var domUnis = contest(deepClone(unis), rankables) // All unis + dom
  var unisLeft = deepClone(domUnis)                  // TEMP uni + dom - we'll trim it away

  // console.groupCollapsed('faf')
  //   console.log('fAf cats ' + categories)
  //   console.table(candidates)
  //   console.log(catData)
  //   console.log('unisLeft: ')
  //   console.table(unisLeft)
  // console.groupEnd()


  // main loop
  while (unisLeft.length) {
    currentFront++
    // console.log('front:' + currentFront)
    var paretoUnis = getParetoFront(unisLeft)

    for (var paretoUni of paretoUnis) {
      // update front data -> get uni from key and update?
      var frontUni = domUnis.find(u => u.key === paretoUni)
      frontUni.front = currentFront
                  
      // remove from unisLeft
      unisLeft = unisLeft.filter(u => u.key != paretoUni)
      
      for (var uni of unisLeft) {
        // if pareto uni exists in dom_by, remove it
        if (uni.dom_by.indexOf(paretoUni) != -1) {
          uni.dom_by = uni.dom_by.filter(u => u != paretoUni)
        }
      }
    }
    // console.log(' ')
  }
  // console.log('maxFront = ' + currentFront)
  nFronts = currentFront
  // all done
  // console.log('end of fAf')
  // console.table(domUnis)

  finalCandidates = domUnis
  saveData(domUnis)
  console.log('unis saved')

  let savedString = restoreData()
  let savedData = []
  for (let s of savedString) {
    savedData.push(s)
  }
  console.log('retrieved...')
  // console.table(savedData)

  // start building graphic
  buildParetoGraphic(domUnis)
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
      // todo rewrite using rankables rather than cats
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


  var comparisons = []
  for (var category of rankables) {
    // if (category.measurable) {
      // var catName = category.name
      var catName = catData.cats[category]
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


// pinched from interwebs
function deepClone(o) {
   var output, v, key
   output = Array.isArray(o) ? [] : {}
   for (key in o) {
       v = o[key]
       output[key] = (typeof v === "object") ? deepClone(v) : v
   }
   return output
}


function shortCut() {
  console.log('shortie pressed')
  
  let savedString = restoreData(),
      savedData = []
    
  for (let s of savedString) {
    savedData.push(s)
  }

  console.group()
    console.log('data restored:' + savedData)
    console.table(savedData)
  console.groupEnd()

  buildParetoGraphic(savedData)
}



