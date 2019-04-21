const PubSub = require('../helpers/pub_sub.js');

class SelectView {

  constructor(data) {
    this.element = document.querySelector('#pokemon')
  };

  bindEvents() {
    PubSub.subscribe('Pokemon:all-pokemon-ready', (evt) => {
      const pokemonData = evt.detail.results;
      this.populate(pokemonData);

      this.element.addEventListener('change', (evt) => {
        const selectedIndex = event.target.value;
        PubSub.publish('SelectView:change', selectedIndex);
      })
    })
  }

  populate(data) {

    data.forEach((pokemon, index) => {
      const option = document.createElement('option');
      option.textContent = pokemon.name;
      option.value = index;
      this.element.appendChild(option);
    })


  }
}

module.exports = SelectView;
