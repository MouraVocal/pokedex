const PokeUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const fetchPokemon = () =>{

    let pokePromises = [];

    for(let i=1; i <= 150; i++){
        pokePromises.push(fetch(PokeUrl(i)).then(response => response.json()));
    }

    Promise.all(pokePromises)
        .then(pokemons =>{
            const pokeList = pokemons.reduce((accumulator, pokemon)=>{
                const types = pokemon.types.map(typeInfo => typeInfo.type.name);

                accumulator += `
                <li class='card ${types[0]}'>
                    <img class='card-image' alt='${pokemon.name}' src="${pokemon.sprites.front_default}"></img>
                    <h2 class='card-title'>${pokemon.id}. ${pokemon.name}</h2>
                    <p class='card-subtitle'>${types.join(' | ')}</p>
                <li/>
                `

                return accumulator
            }, '')

            const container = document.querySelector('[data-js="pokedex"]');
            container.innerHTML = pokeList;
        })
        
}

fetchPokemon();