let CAP = 0
enemies = [
    {
        name: "enemyDestoryer",
        health: 25,
    },

    {
        name: "enemyCruiser",
        health: 50,
    },

    {
        name: "enemyBattleship",
        health: 150,
    },

    {
        name: "enemyCarrier",
        health: 100
    }
]

console.log(enemies[0])
console.log(enemies[1])
console.log(enemies[2])
console.log(enemies[3])


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
    instructions.textContent = "In this game you will be playing as a aircraft carrier in the pacific theater of world war 2. You will be tasked with completing the objectives given in the brefing of each level, maniging your aircraft and health will be critical to your sugcess, the controls are through text inputs and clickable text. you can only move by a value of 5 in each x and y plans Good Luck and Fair Seas"
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
        
    }
    else if(cv==="Yorktown"){
        carrier.name = "USS Yorktown"
        carrier.fighters = 25
        carrier.divebomers = 36
        carrier.torpedobombers=12
        carrier.health = 100
    }

    else if(cv==="Akagi"){
        carrier.name = "IJN Akagi"
        carrier.fighters = 21
        carrier.divebomers = 18
        carrier.torpedobombers= 27
        carrier.health = 100
    }

     else if(cv==="Kaga"){
        carrier.name = "IJN Kaga"
        carrier.fighters = 18
        carrier.divebomers = 27
        carrier.torpedobombers= 27
        carrier.health = 100  
    }

    else if(cv==="Illustrious"){
        carrier.name = "HMS Illustrious"
        carrier.fighters = 15
        carrier.torpedobombers= 18
        carrier.health = 100
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
    briefing.textContent = "You are the Captain of the " + carrier.name + " the war began three months ago with the attacks on our bases everywhere by unknown hostiles, you have been deployed Northeast of Wake Island your objectives are simple: 1. Attack any hostile fleets in the area 2. Collect intel on what if any defenses are being built on the island 3. Keep Your Carrier afloat submarines aren't expected in the area but stay frosty...Good luck Captain!"
    space.appendChild(message)
    space.appendChild(briefing)
     let start = document.createElement("button")
     start.textContent = "Start Level"
      start.onclick = startLevel1
     space.appendChild(start)
}



function level2Briefing(){}
 document.getElementById("levelSelect").remove()
    let space = document.createElement("div")
    space.id = "level2Briefing"
    document.body.appendChild(space)
    let message = document.createElement("h1")
    let briefing = document.createElement("p")
    message.textContent = "Level 2 Briefing"
    briefing.textContent = "You are the Captain of the " + carrier.name + " the war began six months ago with the attacks on our bases everywhere by unknown hostiles, you are to make for the Solomons and support the surface fleets and landing Marines...Good luck Captain!"
    space.appendChild(message)
    space.appendChild(briefing)
     let start = document.createElement("button")
     start.textContent = "Start Level"
      start.onclick = startLevel2
     space.appendChild(start)

function level3Briefing(){
     document.getElementById("levelSelect").remove()
    let space = document.createElement("div")
    space.id = "level3Briefing"
    document.body.appendChild(space)
    let message = document.createElement("h1")
    let briefing = document.createElement("p")
    message.textContent = "Level 3 Briefing"
    briefing.textContent = "You are the Captain of the " + carrier.name + " the war began nine months ago with the attacks on our bases everywhere by unknown hostiles, you are now to head to the Phillapenes Sea and along with other groups prepare the area for the coming troops...Good luck Captain!"
    space.appendChild(message)
    space.appendChild(briefing)
     let start = document.createElement("button")
     start.textContent = "Start Level"
      start.onclick = startLevel3
     space.appendChild(start)
}

function startLevel1(){
    document.getElementById("level1Briefing").remove()
    let space = document.createElement("div")
    space.id = "level1"
    document.body.appendChild(space)
    let message = document.createElement("p")
    message.textContent = "Captain We are on station in the AO, should we head to Wake Island or attack the enemy fleet first?"
    space.appendChild(message)
    let input = document.createElement("input")
    space.appendChild(input)
   input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const command = parseCommand(input.value);
    move(command);
    input.value = "";
  }
});
    let rooms = {
  start: {
    exits: { enemyfleet: "enemyfleet", wakeisland:"wakeisland" }
  },
  enemyfleet:{description: "a small fleet of enemy ships... we could strike them now",
    exits:{wakeisland:"wakeisland", endlevel:"endlevel"}
  },

  wakeisland:{description: "Wake Island...we should send aircraft to scout the enemy presence here",
    exits:{enemyfleet:"enemyfleet"}, endlevel:"endlevel"}
};

let currentRoom = "start";
   function move(direction) {
  const room = rooms[currentRoom];
  

  if (room.exits && room.exits[direction]) {
    currentRoom = room.exits[direction];
    const newRoom = rooms[currentRoom];
    message.textContent = newRoom.description;
  } else {
    alert("There is nothing of importance that way.");
  }
}
 
function parseCommand(input) {
  input = input.toLowerCase();

  if (input.includes("enemy")) return "enemyfleet";
  if (input.includes("wake")) return "wakeisland";

  return input.replace(/\s+/g, "");
}
}

function startLevel2(){
    document.getElementById("level2Briefing").remove()
    let space = document.createElement("div")
    space.id = "level2"
    document.body.appendChild(space)
     let message = document.createElement("p")
    message.textContent = "Captain We are on station in the AO"
    space.appendChild(message)
}

function startLevel3(){
    document.getElementById("level3Briefing").remove()
    let space = document.createElement("div")
    space.id = "level3"
    document.body.appendChild(space)
    let message = document.createElement("p")
    message.textContent = "Captain We are on station in the AO"
    space.appendChild(message)
}

