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

LesHamburgers.FinJeu = function () {};
LesHamburgers.FinJeu.prototype = {
    create: function () {
        //Image d'into
        this.add.image(0, 0, "finImg");
        this.add.audio("sonFinJeu", 1).play();

        //Bouton
        var boutonRejouer = this.add.button(50, this.game.height - 5, "jouerBtn", this.allerEcranJeu, this, 1, 0, 2, 0);
        boutonRejouer.anchor.set(0, 1);

        //Vérification et enregistrement du meilleur score
        LesHamburgers.meilleurScore = Math.max(LesHamburgers.score, LesHamburgers.meilleurScore);
        localStorage.setItem(LesHamburgers.NOM_LOCAL_STORAGE, LesHamburgers.meilleurScore);

        var texteFin = "Votre Score: " + LesHamburgers.score + "$\n\n\n";
        texteFin += "Meilleur Score: " + LesHamburgers.meilleurScore + "$";

        var finJeuTxt = this.add.bitmapText(50, this.game.height / 2, "fonteTexte", texteFin, 50);
        //finJeuTxt.anchor.set(0.5);
        finJeuTxt.tint = 0x423627;

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
