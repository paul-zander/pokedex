async function start() {
  try {
    loadingScreen();
    await loadAllPokemonNames(limit, offset);
    console.log(allPokemonNames);
    await loadStats();
    console.log(stats);
    console.log(isLoading);
    renderPokemon(startIndex, endIndex);
    console.log(isLoading);
    isLoading = false;
    console.log(isLoading);
    loadingScreen();
  } catch (err) {
    // console.error(err);
  }
}

async function loadGen(loadLimit, renderStart, renderEnd) {
  try {
    allPokemonNames = [];
    // stats = [];
    offset = 0;
    limit = loadLimit;
    isLoading = true;
    loadingScreen();
    await loadAllPokemonNames(limit, offset);
    await loadStats();
    console.log(stats);
    await renderPokemon(renderStart, renderEnd);
    isLoading = false;
    loadingScreen();
  } catch (err) {
    console.error(err);
  }
}

async function loadAllPokemonNames(limit, offset) {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    for (let i = 0; i < responseAsJson["results"].length; i++) {
      allPokemonNames.push(responseAsJson["results"][i]["name"]);
    }
  } catch (err) {
    console.error(err);
  }
}

async function loadStats() {
  try {
    for (let i = stats.length; i < allPokemonNames.length; i++) {
      // loop starts at stats.length to only add new pokemon
      let pokemonName = allPokemonNames[i];
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      let response = await fetch(url);
      let responseAsJson = await response.json();
      stats.push(responseAsJson);
    }
  } catch (err) {
    console.error(err);
  }
}

async function renderEvolutions(i) {
  await loadEvolution(i);
}

async function loadEvolution(i) {
  document.getElementById("stats").classList.remove("active-tab");
  document.getElementById("evolutions").classList.add("active-tab");
  document.getElementById("about").classList.remove("active-tab");
  let url = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}`;
  let response = await fetch(url);
  let responseAsJson = await response.json();

  let evolutionChainURL = responseAsJson.evolution_chain.url;
  let evolutionChainResponse = await fetch(evolutionChainURL);
  let evolutionChainAsJSON = await evolutionChainResponse.json();

  checkEvolutions(evolutionChainAsJSON);
}
