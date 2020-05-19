/**
 * Jeu : LesHamburgers
 * @author Linna Lim
 * @version 2017-05-18
 */

//Utiliser un mode strict
"use strict";

//Création ou récupération de l'espace de nom pour le jeu : LesHamburgers
var LesHamburgers = LesHamburgers || {};

//Propriétés et/ou constantes pour le jeu
LesHamburgers = {
    //CONSTANTE pour le jeu 
    NOM_LOCAL_STORAGE: "scoreLesHamburgers", //Sauvegarde du meilleur score
    HAUTEUR_INGREDIENT: 75,
    LARGEUR_INGREDIENT: 320,
    NB_INGREDIENT: 6,
    TEMPS_JEU: 30,

    //Variables pour le jeu 
    score: 0, // Le score du jeu
    meilleurScore: 0, //Meilleur score antérieur enregistré
    sonAmbiance: null //Son d'ambiance qui début à l'écran d'intro et continu jusqu'à la fin
};

//On crééra le jeu quand la page HTML sera chargée
window.addEventListener("load", function (pEvt) {
    //Création du jeu
    var leJeu = new Phaser.Game(960, 640);

    //Ajout des états du jeu
    leJeu.state.add("Demarrage", LesHamburgers.Demarrage);
    leJeu.state.add("ChargementMedias", LesHamburgers.ChargementMedias);
    leJeu.state.add("IntroJeu", LesHamburgers.IntroJeu);
    leJeu.state.add("Instruction", LesHamburgers.Instruction);
    leJeu.state.add("Jeu", LesHamburgers.Jeu);
    leJeu.state.add("FinJeu", LesHamburgers.FinJeu);

    //Vérification d'un meilleur score antérieur enregistré
    LesHamburgers.meilleurScore = localStorage.getItem(LesHamburgers.NOM_LOCAL_STORAGE) == null ? 0 : localStorage.getItem(LesHamburgers.NOM_LOCAL_STORAGE);

    //Définir l'écran au démarrage
    leJeu.state.start("Demarrage");

}, false);
