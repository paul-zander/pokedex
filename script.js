let allPokemonNames = [];
let stats = [];
let isModalVisible = false;
let isLoading = true;
let offset = 0;
// let limit = 172;
let limit = 50;
let startIndex = 0;
// let endIndex = 151;
let endIndex = 50;
// let isScrolledToBottom;

const maxStatValues = {
  hp: 250,
  attack: 150,
  defense: 180,
  specialAttack: 160,
  specialDefense: 120,
  speed: 100,
};

function renderPokemon(startIndex, endIndex) {
  //   document.getElementById("container-pokemon").innerHTML = "";
  for (let i = startIndex; i < endIndex; i++) {
    let mainPokemonType = stats[i]["types"][0]["type"]["name"];
    let pokemon = stats[i];
    let pokemonImg =
      pokemon["sprites"]["other"]["official-artwork"]["front_default"];
    let pokemonName =
      allPokemonNames[i].charAt(0).toUpperCase() + allPokemonNames[i].slice(1);
    document.getElementById("container-pokemon").innerHTML +=
      /*html*/
      renderPokemonHTML(mainPokemonType, i, pokemonImg, pokemonName);
  }
}

function showPokemonDetails(i) {
  let pokemon = stats[i];
  let pokemonName =
    allPokemonNames[i].charAt(0).toUpperCase() + allPokemonNames[i].slice(1);
  let types = [];
  stats[i]["types"].forEach((value) => types.push(value.type["name"]));
  isModalVisible === false && toggleModal();
  document.getElementById("modal-content").innerHTML = "";
  document.getElementById("modal-content").innerHTML +=
    /*html*/ showPokemonDetailsHTML(pokemon, pokemonName, i, types);
  setBackgroundColor(i);
  removeSwitchButtons(i);
  renderStats(i);
  setColorOfStats(i);
}

function checkEvolutions(evolutionChainAsJSON) {
  if (evolutionChainAsJSON["chain"]["evolves_to"].length === 0) {
    zeroEvolutions(evolutionChainAsJSON);
  } else if (
    evolutionChainAsJSON["chain"]["evolves_to"][0]["evolves_to"].length === 0
  ) {
    twoEvolutions(evolutionChainAsJSON);
  } else if (
    evolutionChainAsJSON["chain"]["evolves_to"][0]["evolves_to"].length === 1
  ) {
    threeEvolutions(evolutionChainAsJSON);
  }
}

function zeroEvolutions(evolutionChainAsJSON) {
  let babyEvolution = evolutionChainAsJSON["chain"]["species"]["name"];
  document.getElementById("stats-content").innerHTML =
    renderZeroEvolutions(babyEvolution);
}

function twoEvolutions(evolutionChainAsJSON) {
  let babyEvolution = evolutionChainAsJSON["chain"]["species"]["name"];
  let midEvolution =
    evolutionChainAsJSON["chain"]["evolves_to"][0]["species"]["name"];
  let firstEvolutionLvl =
    evolutionChainAsJSON["chain"]["evolves_to"][0]["evolution_details"][0][
      "min_level"
    ];
  document.getElementById("stats-content").innerHTML = renderTwoEvolutions(
    babyEvolution,
    midEvolution,
    firstEvolutionLvl
  );
}

function threeEvolutions(evolutionChainAsJSON) {
  let babyEvolution = evolutionChainAsJSON["chain"]["species"]["name"];
  let midEvolution =
    evolutionChainAsJSON["chain"]["evolves_to"][0]["species"]["name"];
  let finalEvolution =
    evolutionChainAsJSON["chain"]["evolves_to"][0]["evolves_to"][0]["species"][
      "name"
    ];

  let firstEvolutionLvl =
    evolutionChainAsJSON["chain"]["evolves_to"][0]["evolution_details"][0][
      "min_level"
    ];
  let secondEvolutionLvl =
    evolutionChainAsJSON["chain"]["evolves_to"][0]["evolves_to"][0][
      "evolution_details"
    ][0]["min_level"];

  document.getElementById("stats-content").innerHTML = renderThreeEvolutions(
    babyEvolution,
    midEvolution,
    finalEvolution,
    firstEvolutionLvl,
    secondEvolutionLvl
  );
}

function showNextPokemon(i) {
  isModalVisible === true;
  i < allPokemonNames.length && showPokemonDetails(i + 1);
}

function showPreviousPokemon(i) {
  isModalVisible === true;
  i > 0 && showPokemonDetails(i - 1);
}

function removeSwitchButtons(i) {
  if (i === 0) {
    document.getElementById("btn-show-previous-pokemon").style.opacity = 0;
    document.getElementById("btn-show-previous-pokemon").style.pointerEvents =
      "none";
  } else {
    document.getElementById("btn-show-previous-pokemon").style.opacity = 1;
    document.getElementById("btn-show-previous-pokemon").style.pointerEvents =
      "auto";
  }

  if (i === allPokemonNames.length - 1) {
    document.getElementById("btn-show-next-pokemon").style.opacity = 0;
    document.getElementById("btn-show-next-pokemon").style.pointerEvents =
      "none";
  } else {
    document.getElementById("btn-show-next-pokemon").style.opacity = 1;
    document.getElementById("btn-show-next-pokemon").style.pointerEvents =
      "auto";
  }
}

function renderAbout(i) {
  document.getElementById("stats").classList.remove("active-tab");
  document.getElementById("evolutions").classList.remove("active-tab");
  document.getElementById("about").classList.add("active-tab");
  let height = (stats[i]["height"] * 0.1).toFixed(1);
  let weight = (stats[i]["weight"] * 0.1).toFixed(1);
  let baseExperience = stats[i]["base_experience"];
  let content = document.getElementById("stats-content");
  content.innerHTML = "";
  content.innerHTML = /*html*/ renderAboutHTML(height, weight, baseExperience);
}

function calcBarLength(value, maxValue) {
  return (value / maxValue) * 100;
}

function renderStats(i) {
  // toggleTabs();
  document.getElementById("stats").classList.add("active-tab");
  document.getElementById("evolutions").classList.remove("active-tab");
  document.getElementById("about").classList.remove("active-tab");
  let [hp, attack, defense, specialAttack, specialDefense, speed] = stats[i][
    "stats"
  ].map((stat) => stat["base_stat"]);
  // Calculation for the length of the filling of the bars. Reference is the pokemon with the highest value of every stat. Find stats in maxStatValues object.
  let hpForBar = calcBarLength(hp, maxStatValues.hp);
  let attackForBar = calcBarLength(attack, maxStatValues.attack);
  let defenseForBar = calcBarLength(defense, maxStatValues.defense);
  let specialAttackForBar = calcBarLength(
    specialAttack,
    maxStatValues.specialAttack
  );
  let specialDefenseForBar = calcBarLength(
    specialDefense,
    maxStatValues.specialDefense
  );
  let speedForBar = calcBarLength(speed, maxStatValues.speed);
  let content = document.getElementById("stats-content");
  content.innerHTML = "";
  content.innerHTML = /*html*/ renderStatsHTML(
    i,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    hpForBar,
    attackForBar,
    defenseForBar,
    specialAttackForBar,
    specialDefenseForBar,
    speedForBar
  );
  setColorOfStats(i);
}

function toggleModal() {
  const modalOverlay = document.getElementById("modal-overlay");
  modalOverlay.classList.toggle("d-none");
  isModalVisible = !modalOverlay.classList.contains("d-none");
  toggleScrollButton();
  preventScrolling();
}

function toggleScrollButton() {
  document
    .getElementById("scroll-up-btn")
    .classList.toggle("d-none", isModalVisible);
}

// Prevent scrolling when modal is open
function preventScrolling() {
  document.body.style.overflow = isModalVisible ? "hidden" : "auto";
}

// Filter for Pokemon
const searchBar = document.getElementById("search-query");
const cards = document.getElementsByClassName("card");

searchBar.addEventListener("keyup", (e) => {
  const term = e.target.value.toLowerCase();
  Array.from(cards).forEach((card) => {
    const name = card.textContent.toLowerCase();
    if (name.indexOf(term) !== -1) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});

// Loading Screen
function loadingScreen() {
  if (isLoading === true) {
    document.getElementById("loading-screen").style.display = "flex";
  } else if (isLoading === false) {
    document.getElementById("loading-screen").style.display = "none";
  }
}

function doNotClose(event) {
  event.stopPropagation();
}

window.onscroll = function () {
  // Höhe des sichtbaren Bereichs des Dokuments im Browserfenster
  const windowHeight = window.innerHeight;

  // Gesamthöhe des Dokuments, einschließlich des nicht sichtbaren Bereichs
  const documentHeight = document.documentElement.scrollHeight;

  // Wie weit das Dokument bisher gescrollt wurde
  const scrolled = window.scrollY;

  // Überprüfen, ob bis zum Ende gescrollt wurde (eine kleine Toleranz wird hier verwendet)
  if (scrolled + windowHeight >= documentHeight) {
    if (limit < 151) {
      offset = offset + 50;
      limit = limit + 50;
      startIndex = startIndex + 50;
      endIndex = endIndex + 50;
      loadMorePokemon();
      console.log("offset", offset);
      console.log("limit", limit);
      console.log("startIndex", startIndex);
      console.log(("endIndex", endIndex));
    } else {
      console.log("limit reached");
    }

    // isScrolledToBottom = true;
    // Fügen Sie hier Ihren Code ein, der bei Erreichen des Endes ausgeführt werden soll
  }
};

async function loadMorePokemon() {
  isLoading = true;
  loadingScreen();
  await loadAllPokemonNames(limit, offset);
  console.log(allPokemonNames);
  await loadStats();
  renderPokemon(startIndex, endIndex);
  isLoading = false;
  loadingScreen();
}
