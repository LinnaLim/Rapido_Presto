/**
 * Jeu : LesHamburgers
 * DEMARRAGE DU JEU
 * @author Linna Lim
 * @version 2017-05-18
 */

//Utiliser un mode strict
"use strict";

//Création ou récupération de l'espace de nom pour le jeu : LesHamburgers
var LesHamburgers = LesHamburgers || {};

/**
 * Classe permettant de définir l'écran (state)
 * pour les ajustements au démarrage du jeu
 */

LesHamburgers.Demarrage = function () {};

LesHamburgers.Demarrage.prototype = {
    init: function () {
        //Ajuster l'échelle du jeu et le centrer dans l'écran
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //Couleur de l'écran du jeu
        this.stage.backgroundColor = "#FF4000";

        //Définir qu'il n'y aura qu'un seul point tactile
        this.input.maxPointers = 1;

        //Si on est sur un appareil mobile iOS, on va "verrouiller" l'orientation en mode paysage

        //Ces commandes demeureront actives dans les autres écrans (state) du jeu
        if (!this.game.device.desktop && this.game.device.iOS) {
            this.game.scale.forceOrientation(true, false);
            this.game.scale.enterIncorrectOrientation.add(this.afficherImage, this);
            this.game.scale.leaveIncorrectOrientation.add(this.enleverImage, this);
        }
    },

    afficherImage: function () {
        //console.log("enterIncorrectOrientation");
        document.getElementById("orientation").style.display = "block";
        this.game.paused = true;
    },

    enleverImage: function () {
        //console.log("leaveIncorrectOrientation");
        document.getElementById('orientation').style.display = "none";
        this.game.paused = false;
    },

    preload: function () {
        //Chargement des images pour la barre de chargement
        //URL commun à toutes les images
        this.load.path = "medias/img/";

        this.load.image("barreImg", "barreChargement.png");
        this.load.image("limiteImg", "barreLimite.png");
    },

    create: function () {
        //Quand les ajustements sont faits - on charge les médias
        this.game.state.start("ChargementMedias");
    }
}; //Fin LesHamburgers.Demarrage
