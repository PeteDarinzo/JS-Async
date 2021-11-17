const pokemonUrl = "https://pokeapi.co/api/v2"

/******************************************************************************* 
Figure out how to make a single request to the Pokemon API to get names and URLs for every pokemon in the database.

Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, store the name of the pokemon in a variable and then make another request, this time to that pokemon’s species URL. Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English. If you find one, console.log the name of the pokemon along with the description you found.
*********************************************************************************/

async function getThreePokemon() {
    const res = await axios.get(`${pokemonUrl}/pokemon/?limit=1118`)

    // generate three random numbers which are used to select a pokemon
    // does not take into account identical generated numbers
    const p1 = Math.floor(Math.random() * 1119);
    const p2 = Math.floor(Math.random() * 1119);
    const p3 = Math.floor(Math.random() * 1119);

    // retreive the three pokemon
    const firstPokemon = res.data.results[p1];
    const secondPokemon = res.data.results[p2];
    const thirdPokemon = res.data.results[p3];

    let pokemon = await Promise.all([
        axios.get(`${firstPokemon.url}`),
        axios.get(`${secondPokemon.url}`),
        axios.get(`${thirdPokemon.url}`),
    ]);

    pokemon.forEach(async p => {
        const name = p.data.name;
        const speciesUrl = p.data.species.url;
        const res = await axios.get(`${speciesUrl}`)
        const entries = res.data.flavor_text_entries
        let entryNum = 0;
        while ((entries[entryNum].language.name) !== "en") {
            entryNum++;
        }
        console.log(`${name}: ${entries[entryNum].flavor_text}`)
    });
}








