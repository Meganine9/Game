const root = document.createElement("div");
root.id = "game";
let carrier = null
let repairCooldown = 0;
console.log(repairCooldown)
function startGame() {
  if (!document.getElementById("game")) {
    document.body.appendChild(root);
  }

  goToScene(instructionsScene);

  let startBtn = document.getElementById("start");
  if (startBtn) startBtn.remove();
}

function goToScene(sceneFn) {
  root.innerHTML = "";
  sceneFn(root);
}

function instructionsScene(root) {
  let title = document.createElement("h1");
  title.textContent = "Instructions";

  let text = document.createElement("p");
  text.textContent = "In this game you command an aircraft carrier in 2 diffrent levels, using text input to move, attack, and recover/heal";

  let btn = document.createElement("button");
  btn.textContent = "Continue";
  btn.onclick = () => goToScene(carrierSelectScene);

  root.append(title, text, btn);
}

function carrierSelectScene(root) {
  let title = document.createElement("h1");
  title.textContent = "Choose Carrier";

  let select = document.createElement("select");

  let carriers = [
    {
      name: "USS Lexington",
      value: "Lexington",
      fighters: 18,
      dive: 36,
      torp: 13,
    },
    {
      name: "USS Yorktown",
      value: "Yorktown",
      fighters: 25,
      dive: 36,
      torp: 12,
    },
    { name: "IJN Akagi", value: "Akagi", fighters: 21, dive: 18, torp: 27 },
    { name: "IJN Kaga", value: "Kaga", fighters: 18, dive: 27, torp: 27 },
    {
      name: "HMS Illustrious",
      value: "Illustrious",
      fighters: 15,
      dive: 0,
      torp: 18,
    },
  ];

  carriers.forEach((c) => {
    let opt = document.createElement("option");
    opt.value = c.value;
    opt.textContent = c.name;
    select.appendChild(opt);
  });

  let btn = document.createElement("button");
  btn.textContent = "Confirm";

  btn.onclick = () => {
    let chosen = carriers.find((c) => c.value === select.value);

    carrier = {
      name: chosen.name,
      fighters: chosen.fighters,
      divebombers: chosen.dive,
      torpedobombers: chosen.torp,
      maxFighters: chosen.fighters,
      maxDivebombers: chosen.dive,
      maxTorpedobombers: chosen.torp,
      health: 100,
      crew: 100,
      supplies: 100,
    };

    goToScene(levelSelectScene);
  };

  root.append(title, select, btn);
}

function levelSelectScene(root) {
  let title = document.createElement("h1");
  title.textContent = "Level Select";

  let l1 = document.createElement("button");
  l1.textContent = "Level 1";
  l1.onclick = () => goToScene((root) => playLevel(root, level1));

  let l2 = document.createElement("button");
  l2.textContent = "Level 2";
  l2.onclick = () => goToScene((root) => playLevel(root, level2));

  

  root.append(title, l1, l2);
}

function playLevel(root, config) {
  let message = document.createElement("p");
  let input = document.createElement("input");
  let stats = document.createElement("div");
  let log = document.createElement("div");

  log.style.border = "1px solid black";
  log.style.padding = "10px";
  log.style.height = "150px";
  log.style.overflowY = "auto";

  root.append(message, stats, log, input);

  message.textContent = config.intro;

  let currentRoom = config.startRoom;
  message.textContent = config.intro + "\n\n" + (config.rooms[currentRoom].description || "");
  let currentEnemies = [];
  let repairCooldown = 0;
  let objectives = structuredClone(config.objectives);
  function addLog(text) {
    let entry = document.createElement("div");
    entry.textContent = text;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
  }

  function updateStats() {
    stats.innerHTML = `
        <h3>${carrier.name}</h3>
        <p>Health: ${carrier.health}</p>

        <p>Fighters: ${carrier.fighters}/${carrier.maxFighters}</p>
        <p>Dive Bombers: ${carrier.divebombers}/${carrier.maxDivebombers}</p>
        <p>Torpedo Bombers: ${carrier.torpedobombers}/${carrier.maxTorpedobombers}</p>

        <p>Crew: ${carrier.crew}</p>
        <p>Supplies: ${carrier.supplies}</p>

        <h4>Commands</h4>
          <ul>
              <li>Move: enter the name of the room you would like to move to</li>
              <li>Attack: Attack enemies using the formmat: index of enemy you want to focas on # of fighters # of dive bombers and # of torpedo bombers ex: attack 0 10 5 5, can only be done in enemy room </li>
              <li>Scout/Support: enter scout in the wake room of level one or support in the landing room of level 2</li>
              <li>repair:heald the ship and gives you some aircraft back</li>
          </ul>

        <h4>Objectives</h4>
        ${config.renderObjectives(objectives)}

        <h4>Enemies</h4>
        ${
          currentEnemies.length
            ? currentEnemies
                .map((e, i) => `<p>${i}: ${e.name} (${e.health})</p>`)
                .join("")
            : "<p>None</p>"
        }
    `;
  }
function repairCarrier() {
  if (carrier.supplies < 10 || carrier.crew < 5) {
    addLog("❌ Not enough crew/supplies!");
    return;
  }

  let heal = Math.floor(Math.random() * 10) + 10;

  // Ship repair
  carrier.health = Math.min(100, carrier.health + heal);

  // Aircraft restoration
  let fighterRepair = Math.floor(Math.random() * 5) + 1;
  let diveRepair = Math.floor(Math.random() * 5) + 1;
  let torpRepair = Math.floor(Math.random() * 5) + 1;

  carrier.fighters = Math.min(
    carrier.maxFighters,
    carrier.fighters + fighterRepair
  );

  carrier.divebombers = Math.min(
    carrier.maxDivebombers,
    carrier.divebombers + diveRepair
  );

  carrier.torpedobombers = Math.min(
    carrier.maxTorpedobombers,
    carrier.torpedobombers + torpRepair
  );

  carrier.supplies -= 10;
  carrier.crew -= 5;

  addLog(
    `🛠️ Repairs complete (+${heal} HP)\n` +
    `✈️ Aircraft restored: +${fighterRepair} Fighters, ` +
    `+${diveRepair} Dive Bombers, ` +
    `+${torpRepair} Torpedo Bombers`
  );

  updateStats();
}

  function move(cmd) {
    let room = config.rooms[currentRoom];
    console.log("MOVE CALLED:", cmd);
      if (room.exits[cmd]) {
      currentRoom = room.exits[cmd];
    } else {
      addLog("❌ Invalid command");
      return;
    }

    if (currentRoom === "end") {
      if (config.checkWin(objectives)) {
        goToScene(levelCompleteScene);
      } else {
        addLog("❌ Objectives incomplete!");
      }
      return;
    }

    let newRoom = config.rooms[currentRoom];
    message.textContent = newRoom.description || "";

    if (newRoom.enemies) {
      if (!newRoom._init) {
        newRoom.enemies = newRoom.enemies.map((e) => ({ ...e }));
        newRoom._init = true;
      }
      currentEnemies = newRoom.enemies;
    } else {
      currentEnemies = [];
    }

    updateStats();
  }

  function rollDamage(base, variance = 0.3) {
    let min = base * (1 - variance);
    let max = base * (1 + variance);
    let r = Math.random();

    if (r < 0.1) return Math.floor(max * 1.5);
    if (r > 0.9) return Math.floor(min * 0.5);

    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getSmartTarget() {
    let valid = currentEnemies
      .map((e, i) => ({ e, i }))
      .filter((v) => v.e.health > 0);

    if (!valid.length) return null;

    return valid[Math.floor(Math.random() * valid.length)].i;
  }

  function attackEnemy(target, f, d, t) {
    if (!currentEnemies.length) {
      addLog("❌ No enemies here!");
      return;
    }

    if (!currentEnemies[target]) {
  addLog("❌ Invalid target!");
  return;
}

    if (
  f > carrier.fighters ||
  d > carrier.divebombers ||
  t > carrier.torpedobombers
) {
  addLog("❌ Not enough planes!");
  input.value = "";
  return;
}

  const estimatedDamage = {
  fighters: 1,
  divebombers: 3,
  torpedobombers: 5
};

    let damageReport = new Array(currentEnemies.length).fill(0);

    addLog(`✈️ Strike: ${f}F / ${d}D / ${t}T`);

    function handlePlane(type, count, base, aaMod) {
  for (let i = 0; i < count; i++) {

    let possibleTargets = currentEnemies
      .map((e, idx) => ({ e, idx }))
      .filter(v =>
        v.e.health - damageReport[v.idx] > 0
      );

    if (!possibleTargets.length) break;

    let preferred =
      currentEnemies[target] &&
      currentEnemies[target].health - damageReport[target] > 0;

    let idx;

    if (Math.random() < 0.6 && preferred) {
      idx = target;
    } else {
      idx = possibleTargets[
        Math.floor(Math.random() * possibleTargets.length)
      ].idx;
    }

    let enemy = currentEnemies[idx];

    if (Math.random() < enemy.aa * aaMod) {
      carrier[type]--;
      addLog(`💥 ${type} lost to AA (${enemy.name})`);
      continue;
    }

    let dmg = rollDamage(base);

    enemy.health -= dmg;
    damageReport[idx] += dmg;
  }
}

    handlePlane("fighters", f, 1, 1.0);
    handlePlane("divebombers", d, 3, 0.8);
    handlePlane("torpedobombers", t, 5, 1.2);

    for (let i = currentEnemies.length - 1; i >= 0; i--) {
      let e = currentEnemies[i];

      if (damageReport[i] > 0) {
        addLog(`💥 ${e.name} took ${damageReport[i]} damage!`);
      }

      if (e.health <= 0) {
        addLog(`🔥 ${e.name} destroyed`);
        currentEnemies.splice(i, 1);
        objectives.enemiesDestroyed++;
      }
    }
   
    updateStats();
    if (currentEnemies.length) enemyTurn();
  }

  function enemyTurn() {
    let dmg = rollDamage(currentEnemies.length * 5);
    carrier.health -= dmg;

    addLog(`⚠️ Enemy hits for ${dmg}`);

    if (carrier.health <= 0) {
      goToScene(gameOverScene);
    }
    repairCooldown = Math.max(0, repairCooldown - 1);
    updateStats();
  }

  input.addEventListener("keydown", (e) => {
     let text = input.value.toLowerCase().trim();
    if (e.key !== "Enter") return;
    console.log("INPUT:", text);
    if (text.startsWith("attack")) {
      {
  let parts = text.split(" ");

  if (parts.length !== 5) {
    addLog("❌ Use: attack target fighters dive torp");
    input.value = "";
    return;
  }

  let target = parseInt(parts[1]);
  let f = parseInt(parts[2]);
  let d = parseInt(parts[3]);
  let t = parseInt(parts[4]);

  if ([target, f, d, t].some(isNaN)) {
    addLog("❌ Invalid numbers");
    input.value = "";
    return;
  }

  

  attackEnemy(target, f, d, t); 
}
    } else if (text.startsWith("go ")) {
      move(text.split(" ")[1]);
    }
    else if (text === "repair") {
  repairCarrier();
}
    else if (config.commands[text]) {
      config.commands[text]({
        carrier,
        objectives,
        currentRoom,
        addLog,
        updateStats,
      });
        updateStats();
    } else {
      move(text);
    }

    input.value = "";
  });
}

const level1 = {
  intro: "Scout Wake or attack fleet?...commands: to move enter the name of where you want to go either wake or enemy, to attack be in the enemy room and enter attack , to scout move to the wake room and enter scout, good luck!",
  startRoom: "start",

  objectives: {
    enemiesDestroyed: 0,
    requiredKills: 3,
    scouted: false,
  },

  renderObjectives: (o) => `
        <p>Kills: ${o.enemiesDestroyed}/${o.requiredKills}</p>
        <p>Scouted: ${o.scouted}</p>
    `,

  checkWin: (o) => o.enemiesDestroyed >= o.requiredKills && o.scouted,

  rooms: {
    start: { exits: { enemy: "enemyfleet", wake: "wake" } },

    enemyfleet: {
      description: "Enemy fleet!",
      enemies: [
        { name: "cruiser", health: 50, aa: 0.25 },
        { name: "destroyer", health: 25, aa: 0.4 },
        { name: "destroyer", health: 25, aa: 0.4 },
      ],
      exits: { wake: "wake", end: "end" },
    },

    wake: {
      description: "Wake Island",
      exits: { enemy: "enemyfleet", end: "end" },
    },
  },

  commands: {
    scout: ({ objectives, currentRoom, addLog }) => {
      if (currentRoom !== "wake") {
        addLog("❌ Not here");
        return;
      }

      if (Math.random() < 0.7) {
        objectives.scouted = true;
        addLog("✅ Scouted");
      } else {
        addLog("❌ Failed scout");
        carrier.divebombers--
        updateStats();
      }
    },
  },
};

const level2 = {
  intro: "should we Support troops or attack enemeies first?...commands: to move enter the name of where you want to go either landings or enemy, to attack be in the enemy room and enter attack index of enemy you want to focas on # of fighters # of dive bombers and # of torpedo bombers ex: attack 0 10 5 5, to support move to the landings room and enter support, good luck!",
  startRoom: "start",

  objectives: {
    enemiesDestroyed: 0,
    requiredKills: 5,
    supported: false,
  },

  renderObjectives: (o) => `
        <p>Kills: ${o.enemiesDestroyed}/${o.requiredKills}</p>
        <p>Supported: ${o.supported}</p>
    `,

  checkWin: (o) => o.enemiesDestroyed >= o.requiredKills && o.supported,

  rooms: {
    start: { exits: { enemy: "enemyfleet", landings: "landings" } },

    enemyfleet: {
      description: "Enemy fleet!",
      enemies: [
        { name: "Battleship", health:100, aa:0.5},
        { name: "cruiser", health: 50, aa: 0.25 },
        { name: "cruiser", health: 50, aa: 0.25 },
        { name: "destroyer", health: 25, aa: 0.4 },
        { name: "destroyer", health: 25, aa: 0.4 },
      ],
      exits: { landings: "landings", end: "end" },
    },

    landings: {
      description: "The landings",
      exits: { enemy: "enemyfleet", end: "end" },
    },
  },

  
  commands: {
    support: ({ objectives, currentRoom, addLog }) => {
      if (currentRoom !== "landings") {
        addLog("❌ Not here");
        return;
      }

      if (Math.random() < 0.5) {
        objectives.supported = true;
        addLog("✅ landings supported");
      } else {
        addLog("❌ Failed suport");
        carrier.divebombers--
      }
      updateStats();
    },
  },
};

const level3 = {
  intro: "A large enmey fleets awaits captiain!...commands: to move enter enemy, to attack be in the enemy room and enter attack index of enemy you want to focas on # of fighters # of dive bombers and # of torpedo bombers ex: attack 0 10 5 5, good luck!",
  startRoom: "start",

  objectives: {
    enemiesDestroyed: 0,
    requiredKills: 10,
  },

  renderObjectives: (o) => `
        <p>Kills: ${o.enemiesDestroyed}/${o.requiredKills}</p>
    `,

  checkWin: (o) => o.enemiesDestroyed >= o.requiredKills,

  rooms: {
    start: { exits: { enemy: "enemyfleet" } },

    enemyfleet: {
      description: "Enemy fleet!",
      enemies: [
        { name: "carrier", health:100, aa:0.5},
        { name: "carrier", health:100, aa:0.5},
        { name: "battleship", health:150, aa:0.5},
        { name: "battleship", health:150, aa:0.5},
        { name: "cruiser", health: 50, aa: 0.25 },
        { name: "cruiser", health: 50, aa: 0.25 },
        { name: "destroyer", health: 25, aa: 0.35 },
        { name: "destroyer", health: 25, aa: 0.35 },
        { name: "destroyer", health: 25, aa: 0.35 },
        { name: "destroyer", health: 25, aa: 0.35 },
      ],
      exits: {end: "end" },
    },

    
  },
};

function levelCompleteScene(root) {
  root.textContent = "Level Complete! Returning to menu in 5...";

  let seconds = 5;
  let interval = setInterval(() => {
    seconds--;
    root.textContent = `Level Complete! Returning in ${seconds}...`;

    if (seconds <= 0) {
      clearInterval(interval);
    }
  }, 1000);

  setTimeout(() => goToScene(carrierSelectScene), 5000);
}

function gameOverScene(root) {
  root.textContent = "Game Over! Returning to menu in 5...";

  let seconds = 5;
  let interval = setInterval(() => {
    seconds--;
    root.textContent = `Game Over! Returning in ${seconds}...`;

    if (seconds <= 0) {
      clearInterval(interval);
    }
  }, 1000);

  setTimeout(() => goToScene(carrierSelectScene), 5000);
}
