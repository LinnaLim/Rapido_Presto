/**
 * Jeu : LesHamburgers
 * FIN DU JEU
 * @author Linna Lim
 * @version 2017-05-18
 */

//Utiliser un mode strict
"use strict";

//Création ou récupération de l'espace de nom pour le jeu : LesHamburgers
var LesHamburgers = LesHamburgers || {};

/**
 * Classe permettant de définir l'écran (state)
 * pour la scène d'introduction du jeu
 */

LesHamburgers.Instruction = function () {};
LesHamburgers.Instruction.prototype = {
    create: function () {
        //Image d'into
        this.add.image(0, 0, "instructionImg");

        //Bouton pour jouer au jeu
        var boutonJouer = this.add.button(50, this.game.height - 5, "jouerBtn", this.allerEcranJeu, this, 1, 0, 2, 0);
        boutonJouer.anchor.set(0, 1);

    },

    /**
     * function permettant d'accéder à l'écran de jeu
     */
    allerEcranJeu: function () {
        //Son de Menu
        this.add.audio("sonMenu", 1).play();

        this.state.start("Jeu"); //Démarrer l'écran du jeu
    },

}; //Fin LesHamburgers.IntroJeu
