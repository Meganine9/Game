let CAP = 0
function startGame(){
    document.getElementById("instructions").remove()
    let space = document.createElement("div")
    space.id = "carrierSelect"
    document.body.appendChild(space)
    let message = document.createElement("h1")
    let options = document.createElement("select")
    let defult = document.createElement("option")
    let cv1 = document.createElement("option")
    let cv2 = document.createElement("option")
    let cv3 = document.createElement("option")
    let cv4 = document.createElement("option")
    let cv5 = document.createElement("option")
    let select = document.createElement("button")
    select.textContent = "Select"
    message.textContent = "Choose A Aircraft Carrier"
    defult.textContent = "Select Carrier"
    cv1.textContent = "USS Lexington"
    cv2.textContent = "USS Yorktown"
    cv3.textContent = "IJN Akagi"
    cv4.textContent = "IJN Kaga"
    cv5.textContent = "HMS Illustrious"
    cv1.value = "Lexington"
    cv2.value = "Yorktown"
    cv3.value = "Akagi"
    cv4.value = "Kaga"
    cv5.value = "Illustrious"
    options.id = "carrierType"
    space.appendChild(message)
    space.appendChild(options)
    options.appendChild(defult)
    options.appendChild(cv1)
    options.appendChild(cv2)
    options.appendChild(cv3)
    options.appendChild(cv4)
    options.appendChild(cv5)
    space.appendChild(select)
    select.onclick = choseCarrier;
}

function instructions(){
    document.getElementById("start").remove()
    let space = document.createElement("div")
    space.id = "instructions"
    document.body.appendChild(space)
    let message = document.createElement("h1")
    let instructions = document.createElement("p")
    let back = document.createElement("button")
    message.textContent = "Instructions"
    instructions.textContent = "In this game you will be playing as a aircraft carrier in the pacific theater of world war 2. You will be tasked with completing the objectives given in the brefing of each level, maniging your aircraft and health will be critical to your sugcess, the controls are through text inputs and clickable text. Good Luck and Fair Seas"
    space.appendChild(message)
    space.appendChild(instructions)
    back.textContent = "Continue"
    space.appendChild(back)
    back.onclick = startGame;
}

let carrier = {}
function choseCarrier(){
    let cv = document.getElementById('carrierType').value
    console.log(cv)
    if(cv==="Lexington"){
        carrier.name = "USS Lexington"
        carrier.fighters = 18
        carrier.divebomers = 36
        carrier.torpedobombers=13
        carrier.health = 100
        carrier.damageControl = 2
    }
    else if(cv==="Yorktown"){
        carrier.name = "USS Yorktown"
        carrier.fighters = 25
        carrier.divebomers = 36
        carrier.torpedobombers=12
        carrier.health = 100
        carrier.damageControl = 2
    }

    else if(cv==="Akagi"){
        carrier.name = "IJN Akagi"
        carrier.fighters = 21
        carrier.divebomers = 18
        carrier.torpedobombers= 27
        carrier.health = 100
        carrier.damageControl = 1
    }

     else if(cv==="Kaga"){
        carrier.name = "IJN Kaga"
        carrier.fighters = 18
        carrier.divebomers = 27
        carrier.torpedobombers= 27
        carrier.health = 100
        carrier.damageControl = 1   
    }

    else if(cv==="Illustrious"){
        carrier.name = "HMS Illustrious"
        carrier.fighters = 15
        carrier.torpedobombers= 18
        carrier.health = 100
        carrier.damageControl = 3
    }
    console.log(carrier)
    let select = document.createElement("button")
    select.textContent = "Continue"
    select.id = "selectCarrierBtn"
    document.body.appendChild(select)
    select.onclick = levelSelect;
}





function levelSelect(){
    document.getElementById("carrierSelect").remove()
    document.getElementById("selectCarrierBtn").remove()
    let space = document.createElement("div")
    space.id = "levelSelect"
    document.body.appendChild(space)
    let message = document.createElement("h1")
    let levels = document.createElement("ol")
    message.textContent = "Level Select"
    let level1 = document.createElement("li")
    level1.textContent = "Level 1"
    let level2 = document.createElement("li")
    level2.textContent = "Level 2"
    let level3 = document.createElement("li")
    level3.textContent = "Level 3"
    space.appendChild(message)
    space.appendChild(levels)
    levels.appendChild(level1)
    levels.appendChild(level2)
    levels.appendChild(level3)
    level1.onclick = level1Briefing
    level2.onclick = level2Briefing
    level3.onclick = level3Briefing
}

function level1Briefing(){
    document.getElementById("levelSelect").remove()
    let space = document.createElement("div")
    space.id = "level1Briefing"
    document.body.appendChild(space)
    let message = document.createElement("h1")
    let briefing = document.createElement("p")
    message.textContent = "Level 1 Briefing"
    briefing.textContent = "You are the Captain of the " + carrier.name + "the war began three months ago with the attacks on our bases everywhere by unknown hostiles, you have been deployed Northeast of Wake Island your objectives are simple: 1. Attack any hostile fleets in the area 2. Collect intel on what if any defenses are being built on the island 3. Keep Your Carrier afloat submarines aren't expected in the area but stay frosty...Good luck Captain!"
    space.appendChild(message)
    space.appendChild(briefing)
     let start = document.createElement("button")
     start.textContent = "Start Level"
      start.onclick = startLevel1
     space.appendChild(start)
}



function level2Briefing(){}


function level3Briefing(){}



function airCombat(){
   
let defendingFighters=document.getElementById("CAP").value;
attackingFighters=document.getElementById("Escort").value;
}

function diveBomb(){
let divebomberNumber=document.getElementById("diveBombers")

}

function torpedoBomb(){
let torpedobomberNumber=document.getElementById("torpedoBombers")
}

function damageControl(){

}