//#region GAME DATA
let oreCount = 0

let timeRemaining = 0
let upgradeCycle = 3000
let clockId = 0;

let producers = {
    
    miner: {
        output: 1,
        cost: 10,
        upgrade: 10,
        quantity: 1,
        modifier: 2
        
    },
    conveyor: {
        output: 50,
        cost: 500,
        upgrade: 300,
        quantity: 0,
        modifier: 2
        
    },
    shuttle: {
        output: 200,
        cost: 1000000,
        upgrade: 300000,
        quantity: 0,
        modifier: 2
        
    },
    politician: {
        output: 5,
        cost: 50000,
        upgrade: 100000,
        quantity: 0,
        modifier: 1
    }
}

//#endregion

//#region COUNTDOWN ELEMENTS
function startGame() {
    document.getElementById('start-button').classList.add('hidden')
    document.getElementById('quit-button').classList.remove('hidden')
    document.getElementById('game-controls').classList.remove('hidden')

    startClock()
    setTimeout(stopGame, upgradeCycle)
  }
  
  function startClock(){
    timeRemaining = upgradeCycle
    drawClock()
    clockId = setInterval(drawClock, 1000)
  }
  function stopClock(){
      clearInterval(clockId)
      producers.miner.output = producers.miner.output*producers.miner.modifier;
      producers.conveyor.output = producers.conveyor.output*producers.conveyor.modifier;
      producers.shuttle.output = producers.shuttle.output*producers.shuttle.modifier;
      producers.politician.output = producers.politician.output*producers.politician.modifier;
    console.log("After upgrade your  produces" + producers.miner.output)
  }
  
  function drawClock(){
    let countdownElem = document.getElementById("newResourceCountdown")
    countdownElem.innerText = (timeRemaining / 1000).toString()
    timeRemaining -= 1000
  }
  function stopGame(){
      stopClock()
      startGame()
      draw()
      console.log('New Upgrade Cycle has Begun')
  }

  function quitGame() {
    document.getElementById('game-controls').classList.add('hidden')
    document.getElementById('quit-button').classList.add('hidden')
    document.getElementById('start-button').classList.remove('hidden')
      
  }
//#endregion

//#region RESOURCE GENERATION
function getRawMat() {
    let minerOutput = Math.floor(producers.miner.output)
    let conveyorOutput = Math.floor(producers.conveyor.output)
    let shuttleOutput = Math.floor(producers.shuttle.output)
    let politicianOutput = Math.floor(producers.politician.output)
    oreCount+= Math.floor(minerOutput + 
                        +conveyorOutput
                            +shuttleOutput
                                +politicianOutput)
   console.log(oreCount);
    draw()

}

let oreCountElem = document.getElementById("oreCount")
let minerQuantElem = document.getElementById("minerQuant")
let conveyorQuantElem = document.getElementById("conveyorQuant")
let shuttleQuantElem = document.getElementById("shuttleQuant")
let politicanQuantElem = document.getElementById("politicianQuant")

let minerOutputElem = document.getElementById('miner-output')
let conveyorOutputElem = document.getElementById('conveyor-output')
let shuttleOutputElem = document.getElementById('shuttle-output')
let politicianOutputElem = document.getElementById('politician-output')

let minerCostElem = document.getElementById('miner-cost')
let conveyorCostElem = document.getElementById('conveyor-cost')
let shuttleCostElem = document.getElementById('shuttle-cost')
let politicianCostElem = document.getElementById('politician-cost')


function draw() {
    
    oreCountElem.innerText = oreCount.toString()

    minerQuantElem.innerText = producers.miner.quantity.toString()
    conveyorQuantElem.innerText = producers.conveyor.quantity.toString()
    shuttleQuantElem.innerText = producers.shuttle.quantity.toString()
    politicanQuantElem.innerText = producers.politician.quantity.toString()

    minerOutputElem.innerText = producers.miner.output.toString()
    conveyorOutputElem.innerText = producers.conveyor.output.toString()
    shuttleOutputElem.innerText = producers.shuttle.output.toString()
    politicianOutputElem.innerText = producers.politician.output.toString()

    minerCostElem.innerText = producers.miner.cost.toString()
    conveyorCostElem.innerText = producers.conveyor.cost.toString()
    shuttleCostElem.innerText = producers.shuttle.cost.toString()
    politicianCostElem.innerText = producers.politician.cost.toString()
}

function purchaseResources(capEx) {
    if (oreCount < producers[capEx].cost) {

        console.log(producers[capEx]);
        
        console.log("This "+ capEx+ " is too expensive");
           
    }else {
        oreCount-=producers[capEx].cost;
        if(producers[capEx] == producers.conveyor) {
            producers.conveyor.output+=50
        } else if (producers[capEx] == producers.shuttle) {
            producers.shuttle.output+= 500
        } else if (producers[capEx] == producers.politician){
            producers.politician.output += 1000

        }
        producers[capEx].output++;
        producers[capEx].quantity++

        Math.floor(producers[capEx].cost*=producers[capEx].modifier)

        console.log("This is in our budget")
        console.log("you now have " + producers[capEx].quantity + " " + capEx +"s!")
        console.log("your " + capEx + " now costs " + producers[capEx].cost + " and prouduces " + producers[capEx].output);
        console.log(capEx);

    }
    draw()
    console.log(producers)
}

function upgrade(capEx) {
    console.log(capEx);
    if (oreCount < producers[capEx].cost) {
        console.log(producers[capEx]);
        console.log("This is too expensive");

    }else {
        oreCount-=producers[capEx].upgrade;
        producers[capEx].output++;
        producers[capEx].modifier*=1.2
        
        console.log("This is in our budget")
        console.log("your " + capEx + " now costs" + producers[capEx].upgrade + " to upgrade");
        console.log(producers[capEx]);

    }
    draw()
}

draw()
//#endregion