# Condorcet

[![CircleCI](https://circleci.com/gh/jean-smaug/condorcet/tree/master.svg?style=svg)](https://circleci.com/gh/jean-smaug/condorcet/tree/master)
[![codecov](https://codecov.io/gh/jean-smaug/condorcet/branch/master/graph/badge.svg)](https://codecov.io/gh/jean-smaug/condorcet)

## But

Condorcet est un projet ayant pour but la comparaison de différents systèmes de vote.

- [x] Scrutin de Condorcet
- [x] Scrutin uninominal à 1 tour
- [ ] Scrutin uninominal à 2 tours
- [ ] Scrutin à la De Borda
- [ ] Vote alternatif

Ce projet à premièrement une visée pédagogique. S'il existe, c'est pour faire découvrir au plus grand nombre, qu'une prise de décision collective, via un scrutin, ne repose pas uniquement sur les choix des joueurs, mais aussi sur les règles du jeu.

## Initialisation

Commence par lancer un

```
yarn setup
```

Ensuite, créé un projet Firebase depuis la [console](https://console.firebase.google.com/)

Enfin il faut copier les informations de configuration du projet Firebase dans le fichier `.env`

Tu peux aussi prendre le contenu du fichier `.env.test`

## Contribuer

Si l'envie te prends de faire une PR, pense à jeter un oeil au [guide de contribution](CONTRIBUTING.md) 😄

## Scripts

```bash
yarn dev # Compiles and hot-reloads for development
yarn build # Compiles and minifies for production
yarn test:unit # Run your unit tests
yarn lint # Lints and fixes files
```

## Customizer la configuration

Regardez la [configuration de référence](https://cli.vuejs.org/config/).
