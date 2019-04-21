const PubSub = require('../helpers/pub_sub.js');


class PokemonInfoView {
  constructor() {
    this.container = document.querySelector('#pokemon-information');
    this.tableContainer = document.querySelector('#pokedex-info');
    this.statsTableContainer = document.querySelector('#poke-stats')
    this.evolutionContainer = document.querySelector('#evolution-container')
  }
  bindEvents() {
    PubSub.subscribe('Pokemon:specific-pokemon-ready', (event) => {
      const pokemonInfo = event.detail;
      this.render(pokemonInfo);
      PubSub.subscribe('Pokemon:poke-evolution-chain', (event) => {
        const pokemonEvoInfo = event.detail;
        this.renderEvo(pokemonInfo, pokemonEvoInfo);
      })
    })

  }
  render(pokemon) {
    // clear page for new entry
    this.container.innerHTML = ''
    this.tableContainer.innerHTML = ''
    this.statsTableContainer.innerHTML = ''
    // display pokemon sprite
    const pokemonImg = document.createElement('img')
    pokemonImg.className = 'sprite'
    pokemonImg.src = pokemon.sprites.front_default
    this.container.appendChild(pokemonImg);
    // title above information table
    const title1 = document.createElement('h1');
    title1.textContent = 'Pokédex data';
    this.tableContainer.appendChild(title1);
    // call function to create data table
    this.makePokedexTable(pokemon);
    // title above stats container
    const title2 = document.createElement('h1');
    title2.textContent = 'Base Stats';
    this.statsTableContainer.appendChild(title2);
    // call function to create stats table
    this.makeStatsTable(pokemon);


  }

  makePokedexTable(pokemon) {
    // create table
    const table = document.createElement('table');
    table.id = 'pokedex-table';
    this.tableContainer.appendChild(table);
    this.table = document.querySelector('#pokedex-table');

    //create first table rows with specific classes
    const tableRow1 = document.createElement('tr');
    tableRow1.id = 'poke-national-no';
    this.table.appendChild(tableRow1);

    const tableRow2 = document.createElement('tr');
    tableRow2.id = 'poke-types';
    this.table.appendChild(tableRow2);

    const tableRow3 = document.createElement('tr');
    tableRow3.id = 'poke-height';
    this.table.appendChild(tableRow3);

    const tableRow4 = document.createElement('tr');
    tableRow4.id = 'poke-weight';
    this.table.appendChild(tableRow4);

    const tableRow5 = document.createElement('tr');
    tableRow5.id = 'poke-abilities';
    this.table.appendChild(tableRow5);
    // set rows as querySelector
    this.tableRow1 = document.querySelector('#poke-national-no');
    this.tableRow2 = document.querySelector('#poke-types');
    this.tableRow3 = document.querySelector('#poke-height');
    this.tableRow4 = document.querySelector('#poke-weight');
    this.tableRow5 = document.querySelector('#poke-abilities');
    // add content to table
    // row1
    const natNo = document.createElement('th');
    natNo.textContent = 'National No.';
    this.tableRow1.appendChild(natNo);
    const natNoValue = document.createElement('td');
    let number = pokemon.id;
    if (number < 10) {
      number = '00' + number;
    } else if (number < 100) {
      number = '0' + number;
    }
    natNoValue.textContent = '#' + number;
    this.tableRow1.appendChild(natNoValue);
    // row2
    const type = document.createElement('th');
    type.textContent = 'Type';
    this.tableRow2.appendChild(type);
    const typeValue = document.createElement('td');
    typeValue.id = 'poke-specific-type';
    this.tableRow2.appendChild(typeValue);
    this.typeValue = document.querySelector('#poke-specific-type');

    for (var i = (pokemon.types.length - 1); i > -1; i--) {
      let type = document.createElement('a');
      type.textContent = pokemon.types[i].type.name;
      type.className += "type-icon";
      type.className += " ";
      type.className += `type-${pokemon.types[i].type.name}`;
      this.typeValue.appendChild(type);
    }
    // row3
    const height = document.createElement('th');
    height.textContent = 'Height';
    this.tableRow3.appendChild(height);
    const heightValue = document.createElement('td');
    const heightFormat = pokemon.height / 10;
    heightValue.textContent = `${heightFormat}m`;
    this.tableRow3.appendChild(heightValue);
    // row4
    const weight = document.createElement('th');
    weight.textContent = 'Weight';
    this.tableRow4.appendChild(weight);
    const weightValue = document.createElement('td');
    const weightFormat = pokemon.weight / 10;
    weightValue.textContent = `${weightFormat}kg`;
    this.tableRow4.appendChild(weightValue);
    // row5
    const abilities = document.createElement('th');
    abilities.textContent = 'Abilities';
    this.tableRow5.appendChild(abilities);
    const abilityValue = document.createElement('td');
    abilityValue.id = 'poke-specific-ability';
    this.tableRow5.appendChild(abilityValue);
    this.abilityValue = document.querySelector('#poke-specific-ability');

    for (var i = (pokemon.abilities.length - 1); i > -1; i--) {
      let hidden = pokemon.abilities[i].is_hidden;
      let name = pokemon.abilities[i].ability.name;
      name = name.charAt(0).toUpperCase() + name.slice(1);
      if (hidden == true) {
        var ability = document.createElement('small');
        ability.textContent = `${name} (hidden ability)`;
      } else {
        var ability = document.createElement('a');
        ability.textContent = name;
      };
      this.abilityValue.appendChild(ability);
      if (i > -1) {
        let newLine = document.createElement('br');
        this.abilityValue.appendChild(newLine);
      };
    };
  };

  makeStatsTable(pokemon) {

    const table2 = document.createElement('table');
    table2.id = 'pokestats-table';
    this.statsTableContainer.appendChild(table2);
    this.table2 = document.querySelector('#pokestats-table');

    for (var i = (pokemon.stats.length - 1); i > -1; i--) {
      const row = 1;

      const tableRow = document.createElement('tr');
      tableRow.id = `poke-stat-${pokemon.stats[i].stat.name}`
      this.table2.appendChild(tableRow);
      this.tableRow = document.querySelector(`#poke-stat-${pokemon.stats[i].stat.name}`);


      const stat = document.createElement('th');
      const statInput = pokemon.stats[i].stat.name;
      const statFormat = this.statFormat(statInput);
      stat.textContent = statFormat;
      this.tableRow.appendChild(stat);
      const statValue = document.createElement('td');
      statValue.textContent = pokemon.stats[i].base_stat;
      this.tableRow.appendChild(statValue);
    }
  }

  statFormat(stat) {
    if (stat == 'speed' || stat == 'attack' || stat == 'defense') {
      return stat.charAt(0).toUpperCase() + stat.slice(1) + ':';
    } else if (stat == 'hp') {
      return stat.toUpperCase() + ':';
    } else if (stat == 'special-attack') {
      return 'Sp. Atk:';
    } else {
      return 'Sp. Def:';
    }
  }

  renderEvo(pokemon, information) {
    this.evolutionContainer.innerHTML = ''

    const evolutionTitle = document.createElement('h1');
    evolutionTitle.textContent = 'Evolution Chain';
    this.evolutionContainer.appendChild(evolutionTitle);

    const grid = document.createElement('div');
    grid.id = 'evolution-grid-container';
    this.evolutionContainer.appendChild(grid);
    this.grid = document.querySelector('#evolution-grid-container');
    // show current pokemon
    const gridItem1 = document.createElement('div');
    gridItem1.id = 'grid-item-1';
    this.grid.appendChild(gridItem1);
    this.gridItem1 = document.querySelector('#grid-item-1');

    const pokeImg = document.createElement('img');
    pokeImg.className = 'small-sprite'
    pokeImg.src = pokemon.sprites.front_default
    this.gridItem1.appendChild(pokeImg);

    const natNo = document.createElement('p');
    let number = pokemon.id;
    if (number < 10) {
      number = '00' + number;
    } else if (number < 100) {
      number = '0' + number;
    }
    natNo.textContent = '#' + number;
    this.gridItem1.appendChild(natNo);

    const pokeName = document.createElement('p');
    pokeName.className = 'bold';
    let name = pokemon.forms[0].name
    name = name.charAt(0).toUpperCase() + name.slice(1);
    pokeName.textContent = name;
    this.gridItem1.appendChild(pokeName)

    const pokeTypes = document.createElement('a');
    pokeTypes.id = 'poke-evo-type';
    this.gridItem1.appendChild(pokeTypes);
    this.pokeTypes = document.querySelector('#poke-evo-type');

    for (var i = (pokemon.types.length - 1); i > -1; i--) {
      let type = document.createElement('a');
      type.textContent = pokemon.types[i].type.name;
      type.className += "type-icon";
      type.className += " ";
      type.className += `type-${pokemon.types[i].type.name}`;
      this.pokeTypes.appendChild(type);
    }
    // check if pokemon is able to evolve
    if (information.chain.evolves_to.length === 1) {
      // add arrow and needed lvl
      const gridArrow1 = document.createElement('div');
      gridArrow1.id = 'grid-arrow-1';
      this.grid.appendChild(gridArrow1);
      this.gridArrow1 = document.querySelector('#grid-arrow-1');

      const arrowImg = document.createElement('img');
      arrowImg.id = 'arrow-img';
      arrowImg.src = '../images/arrow.png'
      this.gridArrow1.appendChild(arrowImg);

      const lvlNo = document.createElement('p');
      let lvl = information.chain.evolves_to[0].evolution_details[0].min_level;
      lvlNo.textContent = `(level ${lvl})`;
      this.gridArrow1.appendChild(lvlNo);
      // add next evolution step




      const gridItem2 = document.createElement('div');
      gridItem2.id = 'grid-item-2';
      this.grid.appendChild(gridItem2);
      this.gridItem2 = document.querySelector('#grid-item-2');

      const pokeImg = document.createElement('img');
      pokeImg.className = 'small-sprite'
      pokeImg.src = pokemon.sprites.front_default

      PubSub.subscribe('Pokemon:get-pokemons-1st-evo', (event) => {
        const pokemonInfo = event.detail;



        console.log(pokeInfo);
        this.gridItem2.appendChild(pokeImg);

        const natNo = document.createElement('p');
        let number = pokemon.id;
        if (number < 10) {
          number = '00' + number;
        } else if (number < 100) {
          number = '0' + number;
        }
        natNo.textContent = '#' + number;
        this.gridItem2.appendChild(natNo);

        const pokeName = document.createElement('p');
        pokeName.className = 'bold';
        let name = pokemon.forms[0].name
        name = name.charAt(0).toUpperCase() + name.slice(1);
        pokeName.textContent = name;
        this.gridItem2.appendChild(pokeName)

        const pokeTypes = document.createElement('a');
        pokeTypes.id = 'poke-evo-type';
        this.gridItem2.appendChild(pokeTypes);
        this.pokeTypes = document.querySelector('#poke-evo-type');

        for (var i = (pokemon.types.length - 1); i > -1; i--) {
          let type = document.createElement('a');
          type.textContent = pokemon.types[i].type.name;
          type.className += "type-icon";
          type.className += " ";
          type.className += `type-${pokemon.types[i].type.name}`;
          this.pokeTypes.appendChild(type);
        }
      })

    }
  }
}

module.exports = PokemonInfoView;
