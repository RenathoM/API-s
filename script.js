document.addEventListener('DOMContentLoaded', function () {
  var userBtn = document.getElementById('user-btn');
  var pokemonBtn = document.getElementById('pokemon-btn');
  var cocktailBtn = document.getElementById('cocktail-btn');

  userBtn.addEventListener('click', fetchRandomUser);
  pokemonBtn.addEventListener('click', fetchRandomPokemon);
  cocktailBtn.addEventListener('click', fetchRandomCocktail);

  // Carrega uma amostra ao abrir a página
  fetchRandomUser();
  fetchRandomPokemon();
  fetchRandomCocktail();
});

function fetchRandomUser() {
  var result = document.getElementById('user-result');
  result.innerHTML = '<p>Carregando...</p>';

  fetch('https://randomuser.me/api/')
    .then(function (response) {
      if (!response.ok) throw new Error('Erro na rede');
      return response.json();
    })
    .then(function (data) {
      var u = data.results[0];
      var html = '<div class="card">' +
        '<img src="' + u.picture.large + '" alt="Foto">' +
        '<h3>' + u.name.title + ' ' + u.name.first + ' ' + u.name.last + '</h3>' +
        '<p><strong>Email:</strong> ' + u.email + '</p>' +
        '<p><strong>Local:</strong> ' + u.location.city + ', ' + u.location.country + '</p>' +
        '</div>';
      result.innerHTML = html;
    })
    .catch(function (err) {
      result.innerHTML = '<p class="error">Erro: ' + err.message + '</p>';
    });
}

function fetchRandomPokemon() {
  var result = document.getElementById('pokemon-result');
  result.innerHTML = '<p>Carregando...</p>';
  var id = Math.floor(Math.random() * 898) + 1; // 1..898

  fetch('https://pokeapi.co/api/v2/pokemon/' + id)
    .then(function (response) {
      if (!response.ok) throw new Error('Pokémon não encontrado');
      return response.json();
    })
    .then(function (p) {
      var img = (p.sprites && p.sprites.other && p.sprites.other['official-artwork'] && p.sprites.other['official-artwork'].front_default) || p.sprites.front_default || '';
      var types = p.types.map(function (t) { return t.type.name; }).join(', ');
      var stats = p.stats.map(function (s) { return '<li>' + s.stat.name + ': ' + s.base_stat + '</li>'; }).join('');

      var html = '<div class="card">' +
        (img ? '<img src="' + img + '" alt="' + p.name + '">' : '') +
        '<h3>' + capitalize(p.name) + ' (Nº ' + p.id + ')</h3>' +
        '<p><strong>Tipos:</strong> ' + types + '</p>' +
        '<ul class="stats">' + stats + '</ul>' +
        '</div>';

      result.innerHTML = html;
    })
    .catch(function (err) {
      result.innerHTML = '<p class="error">Erro: ' + err.message + '</p>';
    });
}

function fetchRandomCocktail() {
  var result = document.getElementById('cocktail-result');
  result.innerHTML = '<p>Carregando...</p>';

  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(function (response) {
      if (!response.ok) throw new Error('Erro na rede');
      return response.json();
    })
    .then(function (data) {
      var c = data.drinks[0];
      var ingredients = '';
      for (var i = 1; i <= 15; i++) {
        var ing = c['strIngredient' + i];
        var meas = c['strMeasure' + i];
        if (ing) ingredients += '<li>' + (meas ? meas : '') + ' ' + ing + '</li>';
      }

      var html = '<div class="card">' +
        (c.strDrinkThumb ? '<img src="' + c.strDrinkThumb + '" alt="' + c.strDrink + '">' : '') +
        '<h3>' + c.strDrink + '</h3>' +
        '<p><strong>Categoria:</strong> ' + (c.strCategory || '—') + '</p>' +
        '<p><strong>Instruções:</strong> ' + (c.strInstructions || '') + '</p>' +
        '<h4>Ingredientes</h4>' +
        '<ul>' + ingredients + '</ul>' +
        '</div>';

      result.innerHTML = html;
    })
    .catch(function (err) {
      result.innerHTML = '<p class="error">Erro: ' + err.message + '</p>';
    });
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }