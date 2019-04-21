const Pokemon = require('./models/pokemon.js');
const PokemonInfoView = require('./views/pokemon_info_view.js');
const SelectView = require('./views/select_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log("jsLoaded");

  const selectView = new SelectView();
  selectView.bindEvents();

  const pokemon = new Pokemon();
  pokemon.getData();
  pokemon.getPokemon();

  const pokemonInfoView = new PokemonInfoView();
  pokemonInfoView.bindEvents();
})
