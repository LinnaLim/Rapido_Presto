/**
 * Jeu : LesHamburgers
 * INTRODUCTION DU JEU
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

LesHamburgers.IntroJeu = function () {};
LesHamburgers.IntroJeu.prototype = {
    init: function () {
        LesHamburgers.sonAmbiance = null;
    }, // fin init

    create: function () {
        //Image d'into
        this.add.image(0, 0, "arrierePlan");

        //Son d'intro
        //Le son joue en boucle - s'il n'avait jamais été instancié
        if (LesHamburgers.sonAmbiance == null) {
            //console.log("MUSIQUE");
            LesHamburgers.sonAmbiance = this.add.audio("sonAmbiance");
            //LesHamburgers.sonAmbiance.play();
            LesHamburgers.sonAmbiance.loopFull(0.5);
        }

        //Titre
        this.titreJeu = this.add.bitmapText(this.game.width / 2, this.game.height / 5, "fonteTitre", "(RAPIDO-PRESTO)", 99);
        this.titreJeu.anchor.set(0.5);
        this.titreJeu.tint = 0x423627;

        //Bouton
        var boutonJouer = this.add.button(-this.game.width, this.game.height / 2 + 30, "jouerBtn", this.allerEcranJeu, this, 1, 0, 2, 0);
        boutonJouer.anchor.set(0, 0.5);

        var boutonInstruction = this.add.button(-this.game.width * 3, (this.game.height / 2) + boutonJouer.height, "instructionBtn", this.allerEcranInstruction, this, 1, 0, 2, 0);
        boutonJouer.anchor.set(0, 0.5);

        //Animation
        var animBtnJouer = this.add.tween(boutonJouer).to({
            x: this.game.width - (boutonJouer.width * 1.75)
        }, 700, Phaser.Easing.Linear.None, true, 0, 0, false);

        var animBtnInstruction = this.add.tween(boutonInstruction).to({
            x: this.game.width - (boutonJouer.width * 1.75)
        }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);

        animBtnInstruction.onComplete.add(this.animerPainBas, this);

        //Hamburger
        this.painBas = this.add.sprite(this.game.width / 4, -this.game.height, "burger-sprite", 6);
        this.painBas.anchor.set(0.5);

        this.painDessus = this.add.image(this.game.width / 4, -this.game.height, "painDessus", 6);
        this.painDessus.anchor.set(0.5);

        this.ingredient = [];
        this.animIngredient = [];
        for (var i = 0; i < 6; i++) {
            this.ingredient[i] = this.add.sprite(this.game.width / 4, -this.game.height, "burger-sprite", i);
            this.ingredient[i].anchor.set(0.5);

            this.animIngredient[i] = this.add.tween(this.ingredient[i]);
            this.animIngredient[i].to({
                y: ((LesHamburgers.HAUTEUR_INGREDIENT / 1.75) * (i + 1)) + this.game.height / 2.35
            }, 400, Phaser.Easing.Bounce.Out);

        }

    },


    /**
     * function permettant s'animer le pain du bas pour le scene d'introduction
     */
    animerPainBas: function () {
        //console.log("BURGER");
        var animPainBas = this.add.tween(this.painBas).to({
            y: this.game.height - this.painBas.height
        }, 800, Phaser.Easing.Bounce.Out, true, 0, 0, false);

        this.nbIngredient = 6;

        animPainBas.onComplete.add(this.animerIngredient, this);
    },

    /**
     * function permettant s'animer le pain du bas pour le scene d'introduction
     */
    animerIngredient: function () {
        this.nbIngredient--;
        if (this.nbIngredient > 0) {
            this.animIngredient[this.nbIngredient].start();
            this.animIngredient[this.nbIngredient].onComplete.add(this.animerIngredient, this);
        } else if (this.nbIngredient == 0) {
            this.animIngredient[this.nbIngredient].start();
            this.animIngredient[this.nbIngredient].onComplete.add(this.animerPainDessus, this);
        }

    },

    /**
     * function permettant s'animer le pain du bas pour le scene d'introduction
     */
    animerPainDessus: function () {
        //console.log("BURGER");
        var animPainDessus = this.add.tween(this.painDessus).to({
            y: this.game.height / 2 - LesHamburgers.HAUTEUR_INGREDIENT
        }, 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false);
    },


    /**
     * function permettant d'accéder à l'écran de jeu
     */
    allerEcranJeu: function () {
        this.add.audio("sonMenu", 1).play();
        this.state.start("Jeu"); //Démarrer l'écran du jeu
    },

    /**
     * function permettant d'accéder à l'écran des instruction
     */
    allerEcranInstruction: function () {
        //Son de Menu
        this.add.audio("sonMenu", 1).play();
        
        this.state.start("Instruction"); //Démarrer l'écran du d'instruction
    }
}; //Fin LesHamburgers.IntroJeu
