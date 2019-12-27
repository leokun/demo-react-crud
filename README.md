Projet de test React

## Description du projet

Ce projet rapide est composé en deux services __docker__.    

* Le premier un serveur de dev __nodejs__ pour le code __React__ sur le port __3000__.   
* Le second un serveur d'__api__ en __python__ executé sur le port __8000__

## commandes

### make up

Installe les composants nécéssaires avec `yarn install` et execute les services docker

### make install

Installe les composants nécéssaires avec `yarn install`

### make add 

Ajoute un package npm au projet existant

A utiliser sous cette forme : `make add PACKAGE=[nom-du-package]`

### make build

Construit le projet affin de le déployer

### make serve

Execute un serveur web qui n'utilisera que les fichiers du __build__