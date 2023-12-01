function renderPokemonHTML(mainPokemonType, i, pokemonImg, pokemonName) {
    return /*html*/ `
    <div class="card ${mainPokemonType}" class="" id="pokemon${i}" onclick="showPokemonDetails(${i})">
        <div class="pokemon-id">#${stats[i]['id']}</div>
        <img class="pokemon-img" src="${pokemonImg}" alt="">
        <img class="pokeball-background" src="./img/pokeball-background.png" alt="">
        <div class="pokemoncard-name">
            <h3 id="pokemoncard-name">${pokemonName.toUpperCase()}</h3>
        </div>
    </div>
`;
}

function showPokemonDetailsHTML(pokemon, pokemonName, i, types) {
    let typeHTML = types.map(type => `
        <div class="types">
            <img class="type-icons" src="./type-icons/${type}.svg" alt="">
            ${type.toUpperCase()}
        </div>
    `).join('');
    
    return /*html*/ `
    <img class="close-btn" src="./img/close.png" alt="close-button" onclick="toggleModal()">
    <div class="pokemon-id-details">#${stats[i]['id']}</div>
    <div class="modal-top">
    <div class="pokemon-name">${pokemonName}</div>
    <div class="all-types">${typeHTML}</div>
        <img class="pokeball-white" src="./img/pokeball-background.png" alt="">
        <div class="switch-pokemon">
            <img class="switch-btn" id="btn-show-previous-pokemon" onclick="showPreviousPokemon(${i})" src="./img/double-arrow-left.png" alt="">
            <img class="modal-pokemon-img" src="${pokemon['sprites']['other']['official-artwork']['front_default']}" alt="">
            <img class="switch-btn" id="btn-show-next-pokemon" onclick="showNextPokemon(${i})" src="./img/double-arrow-right.png" alt="">
        </div>
    </div>
    
    <div class="modal-bottom">
        <div class="stats-options">
            <div class="stats-btn" id="about" onclick="renderAbout(${i})"><b>ABOUT</b></div>
            <div class="stats-btn" id="stats" onclick="renderStats(${i})"><b>STATS</b></div>
            <div class="stats-btn" id="evolutions" onclick="renderEvolutions(${i})"><b>EVOLUTIONS</b></div>
        </div>
        <div class="stats-content" id="stats-content"></div>
    </div>
  `
}

function renderStatsHTML(i, hp, attack, defense, specialAttack, specialDefense, speed, hpForBar, attackForBar, defenseForBar, specialAttackForBar, specialDefenseForBar, speedForBar) {
return /*html*/ `
        <table>
            <tr>
                <td>HP</td>
                <td class="td-bar">
                    <div class="progress-bar" id="progress-bar${i}">
                        <div class="progress-fill" id="progress-fill${i}" style="width: ${hpForBar}%"></div>
                        <span class="progress-text" id="progress-text${i}">${hp}</span>
                    </div>
                </td> 
                <!-- Hier noch statt nur der Zahl einen Balken entsprechend der Länge und Zahl auf Balken  -->
            </tr>
            <tr>
                <td>ATTACK</td>
                <td class="td-bar">
                    <div class="progress-bar" id="progress-bar${i}">
                        <div class="progress-fill" id="progress-fill${i}" style="width: ${attackForBar}%"></div>
                        <span class="progress-text" id="progress-text${i}">${attack}</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td>DEFENSE</td>
                <td class="td-bar">
                    <div class="progress-bar" id="progress-bar${i}">
                        <div class="progress-fill" id="progress-fill${i}" style="width: ${defenseForBar}%"></div>
                        <span class="progress-text" id="progress-text${i}">${defense}</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td>SPECIAL-ATTACK</td>
                <td class="td-bar">
                    <div class="progress-bar" id="progress-bar${i}">
                        <div class="progress-fill" id="progress-fill${i}" style="width: ${specialAttackForBar}%"></div>
                        <span class="progress-text" id="progress-text${i}">${specialAttack}</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td>SPECIAL-DEFENSE</td>
                <td class="td-bar">
                    <div class="progress-bar" id="progress-bar${i}">
                            <div class="progress-fill" id="progress-fill${i}" style="width: ${specialDefenseForBar}%"></div>
                            <span class="progress-text" id="progress-text${i}">${specialDefense}</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td>SPEED</td>
                <td class="td-bar">
                    <div class="progress-bar" id="progress-bar${i}">
                        <div class="progress-fill" id="progress-fill${i}" style="width: ${speedForBar}%"></div>
                        <span class="progress-text" id="progress-text${i}">${speed}</span>
                    </div>
                </td>
            </tr>
        </table>

`
}

function renderAboutHTML(height, weight, baseExperience) {
 return /*html*/ `
        <table>
            <tr>
                <td>HEIGHT:</td>
                <td>${height} m</td>
            </tr>
            <tr>
                <td>WEIGHT:</td>
                <td>${weight} kg</td>
            </tr>
            <tr>
                <td>BASE EXPERIENCE:</td>
                <td>${baseExperience}</td>
            </tr>
        </table>
    `
}

function renderZeroEvolutions(babyEvolution) {
    return /*html*/ `
    <div class="evolution-container-1">
        <span>${babyEvolution.charAt(0).toUpperCase() + babyEvolution.slice(1)} does not evolve.</span>
        <img class="evolution-pokemon-img" src="${stats[allPokemonNames.indexOf(babyEvolution)]['sprites']['other']['official-artwork']['front_default']}" alt="">
    </div>
`
}

function renderTwoEvolutions(babyEvolution, midEvolution, firstEvolutionLvl) {
    return /*html*/ `
            <div class="evolution-container-2">
                <img class="evolution-pokemon-img" src="${stats[allPokemonNames.indexOf(babyEvolution)]['sprites']['other']['official-artwork']['front_default']}" alt="">
                <div class="level-up">
                    <img class="right-arrow" src="./img/right-arrow.png" alt="">
                    <span>(Level ${firstEvolutionLvl})</span>
                </div>
                <img class="evolution-pokemon-img" src="${stats[allPokemonNames.indexOf(midEvolution)]['sprites']['other']['official-artwork']['front_default']}" alt="">
            </div>
        `
}

function renderThreeEvolutions(babyEvolution, midEvolution, finalEvolution, firstEvolutionLvl, secondEvolutionLvl) {
    return /*html*/ `
            <div class="evolution-container-3">
                <img class="evolution-pokemon-img" src="${stats[allPokemonNames.indexOf(babyEvolution)]['sprites']['other']['official-artwork']['front_default']}" alt="">
                <div class="level-up">
                    <img class="right-arrow" src="./img/right-arrow.png" alt="">
                    <span>(Level ${firstEvolutionLvl})</span>
                </div>
                <img class="evolution-pokemon-img" src="${stats[allPokemonNames.indexOf(midEvolution)]['sprites']['other']['official-artwork']['front_default']}" alt="">
                <div class="level-up">
                    <img class="right-arrow" src="./img/right-arrow.png" alt="">
                    <span>(Level ${secondEvolutionLvl})</span>
                </div>
                <img class="evolution-pokemon-img" src="${stats[allPokemonNames.indexOf(finalEvolution)]['sprites']['other']['official-artwork']['front_default']}" alt="">
            </div>
        `;
}