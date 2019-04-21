const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

class Pokemon {
  constructor(data) {
    this.data = [];
    this.pokemonData = [];
    this.pokemonSpecies = [];
    this.pokemonEvolution = [];
  }

  getData() {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151';
    const requestHelper = new RequestHelper(url);
    requestHelper.get().then((data) => {
      this.data = data;
      PubSub.publish('Pokemon:all-pokemon-ready', data);
    })
  }

  getPokemon() {
    PubSub.subscribe('SelectView:change', (evt) => {
      const url = `https://pokeapi.co/api/v2/pokemon/${parseInt(evt.detail)+1}/`
      const getPokemon = new RequestHelper(url);
      getPokemon.get().then((data) => {
        this.pokemonData = data;
        PubSub.publish('Pokemon:specific-pokemon-ready', data)
      })
    })

  }

  getEvolutionChain() {
    PubSub.subscribe('SelectView:change', (evt) => {
      const url = `https://pokeapi.co/api/v2/pokemon-species/${parseInt(evt.detail)+1}/`
      const getSpecies = new RequestHelper(url);
      getSpecies.get().then((data) => {
        this.pokemonSpecies = data;
        const evolutionUrl = this.pokemonSpecies.evolution_chain.url;
        const getEvolution = new RequestHelper(evolutionUrl);
        getEvolution.get().then((data) => {
          this.pokemonEvolution = data;
          PubSub.publish('Pokemon:poke-evolution-chain', data);
        })

      })
    })
  }

  getSpecificPokemon() {
    PubSub.subscribe('SelectView:change', (evt) => {
      const url = `https://pokeapi.co/api/v2/pokemon/${parseInt(evt.detail)+2}/`
      const getSpecies = new RequestHelper(url);
      getSpecies.get().then((data) => {
        this.pokemonSpecies = data;
        const evolutionUrl = this.pokemonSpecies.evolution_chain.url;
        const getEvolution = new RequestHelper(evolutionUrl);
        getEvolution.get().then((data) => {
          this.pokemonEvolution = data;
          PubSub.publish('Pokemon:get-pokemons-1st-evo', data);
        })
      })
    })
  }
}



module.exports = Pokemon;
