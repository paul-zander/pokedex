// Sets color of stats according to the type of the pokemon
function setColorOfStats(i) {
    let mainPokemonType = stats[i]['types'][0]['type']['name'];
    progressbar = document.getElementsByClassName('progress-fill');

    // Remove all colors before adding new ones to avoid creating multiple colors
    for (let element of progressbar) {
        element.classList.remove(
            'grass2', 'fire2', 'water2', 'bug2', 'normal2',
            'poison2', 'electric2', 'ground2', 'fairy2', 'fighting2', 'psychic2', 'rock2', 'ghost2', 'ice2', 'dragon2', 'dark2', 'steel2'
        );
        
        // Adding the new color of stats according to the main type of the Pokemon
        switch (mainPokemonType) {
            case 'grass':
                element.classList.add('grass2');
                break;
            case 'fire':
                element.classList.add('fire2');
                break;
            case 'water':
                element.classList.add('water2');
                break;
            case 'bug':
                element.classList.add('bug2');
                break;
            case 'normal':
                element.classList.add('normal2');
                break;
            case 'poison':
                element.classList.add('poison2');
                break;
            case 'electric':
                element.classList.add('electric2');
                break;
            case 'ground':
                element.classList.add('ground2');
                break;
            case 'fairy':
                element.classList.add('fairy2');
                break;
            case 'fighting':
                element.classList.add('fighting2');
                break;
            case 'psychic':
                element.classList.add('psychic2');
                break;
            case 'rock':
                element.classList.add('rock2');   
                break;    
            case 'ghost':
                element.classList.add('ghost2');   
                break;
            case 'ice':
                element.classList.add('ice2');   
                break;
            case 'dragon':
                element.classList.add('dragon2');   
                break;
            case 'dark':
                element.classList.add('dark2');   
                break;
            case 'steel':
                element.classList.add('steel2');   
                break;    
            default:
                break;
        }
    }
}

// Sets background color of modal according to the type of the pokemon
function setBackgroundColor(i) {
    let mainPokemonType = stats[i]['types'][0]['type']['name'];
    let modalBackgroundColor = document.getElementById('modal-content');
     // Remove all colors before adding new ones to avoid creating multiple colors
     modalBackgroundColor.classList.remove (
        'grass', 'fire', 'water', 'bug', 'normal',
        'poison', 'electric', 'ground', 'fairy', 'fighting', 'psychic', 'rock', 'ghost', 'ice', 'dragon', 'dark', 'steel'
        );

    // Adding the new background color according to the main type of the Pokemon
    switch (mainPokemonType) {
        case 'grass':
            modalBackgroundColor.classList.add('grass');
            break;
        case 'fire':
            modalBackgroundColor.classList.add('fire');
            break;
        case 'water':
            modalBackgroundColor.classList.add('water');
            break;
        case 'bug':
            modalBackgroundColor.classList.add('bug');
            break;
        case 'normal':
            modalBackgroundColor.classList.add('normal');
            break;
        case 'poison':
            modalBackgroundColor.classList.add('poison');
            break;
        case 'electric':
            modalBackgroundColor.classList.add('electric');
            break;
        case 'ground':
            modalBackgroundColor.classList.add('ground');
            break;
        case 'fairy':
            modalBackgroundColor.classList.add('fairy');
            break;
        case 'fighting':
            modalBackgroundColor.classList.add('fighting');
            break;
        case 'psychic':
            modalBackgroundColor.classList.add('psychic');
            break;
        case 'rock':
            modalBackgroundColor.classList.add('rock');
            break;
        case 'ghost':
            modalBackgroundColor.classList.add('ghost');   
            break; 
        case 'ice':
            modalBackgroundColor.classList.add('ice');   
            break;
        case 'dragon':
            modalBackgroundColor.classList.add('dragon');   
            break;
        case 'dark':
            modalBackgroundColor.classList.add('dark');   
            break;
        case 'steel':
            modalBackgroundColor.classList.add('steel');   
            break;   
        default:
            break;
    }
}