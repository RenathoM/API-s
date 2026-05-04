# Site de APIs Públicas — Exemplo

Este pequeno projeto demonstra 3 seções que consomem APIs públicas diferentes usando `fetch` + `.then()`.

Seções:
- Random User: `https://randomuser.me/api/`
- PokéAPI: `https://pokeapi.co/`
- The Cocktail DB: `https://www.thecocktaildb.com/`

Como abrir:
1. Abra o arquivo [index.html](index.html) no seu navegador.

Opcional — rodar servidor local (recomendado):

```bash
# Python 3
python -m http.server 8000
# então abra http://localhost:8000/
```

Arquivos principais:
- [index.html](index.html)
- [styles.css](styles.css)
- [script.js](script.js)

Feito para exercício — cada seção exibe dados na tela retirados de uma API pública.