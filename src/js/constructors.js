// candy constructor !!
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