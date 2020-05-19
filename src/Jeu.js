/**
 * Jeu : LesHamburgers
 * JEU
 * @author Linna Lim
 * @version 2017-05-25
 */

//Utiliser un mode strict
"use strict";

//Création ou récupération de l'espace de nom pour le jeu : LesHamburgers
var LesHamburgers = LesHamburgers || {};

/**
 * Classe permettant de définir l'écran (state)
 * pour la scène de jeu
 */

LesHamburgers.Jeu = function () {
    //Propriété de la classe
    this.tempsRestant; // Temps restant pour le jeu
    this.tempsTxt; // Champ de texte de type BitmapText pour l'affichage du temps restant
    this.scoreTxt; // Champ de texte de type BitmapText pour l'affichage du score
};
LesHamburgers.Jeu.prototype = {
    init: function () {
        //Initialiser le temps restant
        this.tempsRestant = LesHamburgers.TEMPS_JEU;
        //Initialiser le score
        LesHamburgers.score = 0;
        this.scoreJoueur = 0; //Score du Joueur

        this.nbBonIngredient = 0; //Le nombre de bon ingrédient que le joueur a eu
        this.nbHamburgerParfait = 0 //Le nombre de Hamburger qu le Joueur a réussit à faire sans erreur
        this.nbIngredientDansLeTableauJoueur = 0; //Le nombre d'ingrédients que le joueur a mis sur le hamburger
        this.nbIngredientDuHamburger = 0; //Le nombre d'ingrédient dans le hamburger généré
        this.lesIndexDesIngredientATrouver = []; //Les index des ingrédients à trouver...
        this.tableauHamburgerAFaire = []; //tableau qui contient les différentes pièce de l'hamburger à faire

        this.tableauIndexDuJoueur = []; //tableau qui ontient les index du hamburgers du joueur
        this.tableauHamburgerJoueur = []; //tableau qui contient les différentes pièce de l'hamburger du Joueur

    },

    create: function () {
        //Afficher les éléments pour l'interface générale du jeu et faire jouer le son d'ambiance
        this.afficherInterfaceDuJeu();
        this.genererHamburgerAFaire();
        this.mettrePainBasDuJoueur();

        //Texte
        this.scoreTxt = this.add.bitmapText(this.game.width / 1.3, this.game.height - 5, "fonteTexte", "ARGENT: " + LesHamburgers.score.toString() + "$", 50);
        this.scoreTxt.anchor.set(0, 1);
        this.scoreTxt.tint = 0x423627;

        this.tempsTxt = this.add.bitmapText(10, this.game.height - 5, "fonteTexte", "Temps restant: " + this.tempsRestant, 50);
        this.tempsTxt.anchor.set(0, 1);
        this.tempsTxt.tint = 0x423627;

        this.minuterieTemps = this.time.events.loop(Phaser.Timer.SECOND, this.diminuerTemps, this);

    },

    /**
     * function permettant d'augmenter le temps affiché
     */
    diminuerTemps: function () {
        //console.log(this.tempsRestant);
        this.tempsRestant--;
        this.tempsTxt.text = "Temps restant: " + this.tempsRestant;

        if (this.tempsRestant == 0) {
            this.allerEcranFin();
        }
    }, // Fin diminuerTemps

    /**
     * function permettant d'afficher l'interface générale du jeu
     * Boutons, sons, etc.
     */
    afficherInterfaceDuJeu: function () {
        //Image d'into
        this.add.image(0, 0, "arrierePlan");

        //Les boutons du haut
        var posX = this.game.width;
        var posY = 0;


        //Placer le bouton pour le mode en plein écran - pour Android et desktop
        if (!this.game.device.iOS) {

            var boutonPleinEcran = this.add.button(posX, posY, "boutonPleinEcranImg", this.gererPleinEcran, this);
            boutonPleinEcran.anchor.set(1.5, 0);
            boutonPleinEcran.scale.setTo(1.5, 1.5);
            this.world.bringToTop(boutonPleinEcran);
            //Mettre la bonne image selon que le jeu est déjà ou non en mode plein-écran
            (!this.scale.isFullScreen) ? boutonPleinEcran.frame = 0: boutonPleinEcran.frame = 1;
        }

        var boutonPauseJeu = this.add.button(posX, posY, "boutonPauseImg", this.gererPauseJeu, this);
        boutonPauseJeu.anchor.set(3, 0);
        boutonPauseJeu.scale.setTo(1.5, 1.5);
        this.world.bringToTop(boutonPauseJeu);

        //Le bouton pour la pause du son - on ajuste son image si le son avait déjà été créé et arrêté
        var boutonPauseSon = this.add.button(posX, posY, "boutonSonImg", this.gererPauseSon, this);
        boutonPauseSon.anchor.set(4.5, 0);
        boutonPauseSon.scale.setTo(1.5, 1.5);
        this.world.bringToTop(boutonPauseSon);
        var sonDejaEnPause = this.sonAmbiance != null && !this.sonAmbiance.isPlaying;
        (!sonDejaEnPause) ? boutonPauseSon.frame = 0: boutonPauseSon.frame = 1;

        this.afficherBtnIngredient();

    },

    /**
     * Génère les boutons des ingredients
     */
    afficherBtnIngredient: function () {
        var posX = this.game.width;
        var decalageBas = (this.game.height - (LesHamburgers.NB_INGREDIENT * 30) - ((LesHamburgers.NB_INGREDIENT - 1) * 30)) / 2;
        var posY, lesIngredientBtn = [];

        for (var i = 1; i < LesHamburgers.NB_INGREDIENT + 1; i++) {

            posY = decalageBas + ((30 + 30) * i);

            lesIngredientBtn[i] = this.add.button(posX, posY, "ingredientBtn", this.mettreIngredient, this);
            lesIngredientBtn[i].frame = i;
            lesIngredientBtn[i].anchor.set(1);
        }

        var finiHamburgerBtn = this.add.button(posX, decalageBas, "ingredientBtn", this.finirHamburgerJoueur, this);
        finiHamburgerBtn.anchor.set(1);

        var poubelleBtn = this.add.button(posX, decalageBas + ((30 + 30) * (LesHamburgers.NB_INGREDIENT + 1)), "poubelleImg", this.effacerHamburgerJoueur, this);
        poubelleBtn.anchor.set(1);
    },

    /**
     * met les ingredient selon le bouton appuyé
     * @param {object} boutonIngredient Le bouton sur lequel le joueur a cliqué
     */
    mettreIngredient: function (boutonIngredient) {
        var posX = this.game.width - this.game.width / 4;
        var decalageBas = this.game.height - LesHamburgers.HAUTEUR_INGREDIENT;

        if (this.nbIngredientDansLeTableauJoueur > 5) {
            this.finirHamburgerJoueur();

        } else {
            //Son
            this.add.audio("sonFrappe", 1).play();

            var indexJoueur = boutonIngredient.frame - 1;
            this.tableauIndexDuJoueur[this.nbIngredientDansLeTableauJoueur] = indexJoueur;

            var posY = decalageBas - (LesHamburgers.HAUTEUR_INGREDIENT) * (this.nbIngredientDansLeTableauJoueur + 1);

            this.tableauHamburgerJoueur[this.nbIngredientDansLeTableauJoueur] = this.add.sprite(posX, posY, "burger-sprite", indexJoueur);
            this.tableauHamburgerJoueur[this.nbIngredientDansLeTableauJoueur].anchor.set(0.5);

            this.nbIngredientDansLeTableauJoueur++;
        }

    },

    /**
     * Met le pain du dessus du Joueur
     * Appel l'animation de sortie des Hamburgers
     * Vérifie le hamburger pour le pointage
     * @param {object} boutonIngredient Le bouton sur lequel le joueur a cliqué
     */
    finirHamburgerJoueur: function () {
        //Son
        this.sonArgent = this.add.audio("sonArgent", 1).play();

        //painHaut du Joueur
        this.mettrePainHautDuJoueur();
        this.animerLesHamburgers();

        //Vérifier les ingrédients du Hamburgers
        this.verifierHamburgerDuJoueur();
        this.nbIngredientDansLeTableauJoueur = 0;

    },
    /**
     * Effacer le amburger du Joueur
     */
    effacerHamburgerJoueur: function () {
        //Son
        this.add.audio("sonPoubelle", 1).play();

        for (var i = 0; i < this.tableauHamburgerJoueur.length; i++) {
            this.tableauHamburgerJoueur[i].destroy();
        }
        this.nbIngredientDansLeTableauJoueur = 0;
        this.tableauHamburgerJoueur = [];
        this.tableauIndexDuJoueur = [];
        this.mettrePainBasDuJoueur();
    },

    /**
     *   Génère le Hamburger qui doit être dupliqué par le joueur
     */
    genererHamburgerAFaire: function () {
        //this.lesIndexDesIngredientATrouver
        this.nbIngredientDuHamburger = Math.floor(Math.random() * ((LesHamburgers.NB_INGREDIENT - 1) - 2 + 1) + 2);

        var decalageBas = this.game.height - LesHamburgers.HAUTEUR_INGREDIENT;
        var indexHasard, posY;
        for (var i = 0; i < this.nbIngredientDuHamburger; i++) {
            indexHasard = Math.floor(Math.random() * LesHamburgers.NB_INGREDIENT + 1);
            posY = decalageBas - (LesHamburgers.HAUTEUR_INGREDIENT) * (i + 1);

            // À cause du +1 dans le indexHasard. Donne plus de chance d'avoir de la viande, car un hamburger a besoin de viande!
            if (indexHasard > LesHamburgers.NB_INGREDIENT - 1) {
                indexHasard = 4
            }

            this.tableauHamburgerAFaire[i] = this.add.sprite(this.game.width / 4, posY, "burger-sprite", indexHasard);
            this.tableauHamburgerAFaire[i].anchor.set(0.5);
            this.lesIndexDesIngredientATrouver[i] = indexHasard;
        }

        var painBas = this.add.sprite(this.game.width / 4, this.game.height - LesHamburgers.HAUTEUR_INGREDIENT, "burger-sprite", 6);
        this.tableauHamburgerAFaire.push(painBas);
        painBas.anchor.set(0.5);

        var painHaut = this.add.image(this.game.width / 4, decalageBas - (LesHamburgers.HAUTEUR_INGREDIENT) * (this.nbIngredientDuHamburger + 1), "painDessus", 6);
        this.tableauHamburgerAFaire.push(painHaut);
        painHaut.anchor.set(0.5);

    },

    /**
     * affiche le pain du haut du joueur
     */
    mettrePainHautDuJoueur: function () {
        var painHautJoueur = this.add.image(this.game.width - this.game.width / 4, this.game.height - LesHamburgers.HAUTEUR_INGREDIENT - (LesHamburgers.HAUTEUR_INGREDIENT) * (this.nbIngredientDansLeTableauJoueur + 1), "painDessus", 6);
        painHautJoueur.anchor.set(0.5);
        this.tableauHamburgerJoueur.push(painHautJoueur);
    },

    /**
     * affiche le pain du haut du joueur
     */
    mettrePainBasDuJoueur: function () {
        var painBasJoueur = this.add.sprite(this.game.width - this.game.width / 4, this.game.height - LesHamburgers.HAUTEUR_INGREDIENT, "burger-sprite", 6);
        painBasJoueur.anchor.set(0.5);
        this.tableauHamburgerJoueur.push(painBasJoueur);
    },

    /**
     * anime les hamburger pour qu'ils sortent de l'écran
     */
    animerLesHamburgers: function () {
        //console.log("ANIMATION");
        //Hamburger à Faire
        var animIngredientDeHamburgerAFaire = [];
        for (var i = 0; i < this.tableauHamburgerAFaire.length; i++) {
            animIngredientDeHamburgerAFaire[i] = this.add.tween(this.tableauHamburgerAFaire[i]).to({
                x: -this.game.width
            }, 500, Phaser.Easing.Bounce.Outtrue, true, 0, 0, false);
        }

        //Hamburger du Joueur
        var animIngredientDeHamburgerJoueur = [];
        for (var i = 0; i < this.tableauHamburgerJoueur.length; i++) {
            animIngredientDeHamburgerJoueur[i] = this.add.tween(this.tableauHamburgerJoueur[i]).to({
                x: -this.game.width
            }, 500, Phaser.Easing.Bounce.Outtrue, true, 0, 0, false);
        }
        animIngredientDeHamburgerJoueur[0].onComplete.add(this.réinitialiserLeJeu, this);
    },

    /**
     * Mettre un autre burger et un autre painBasJouer
     */
    verifierHamburgerDuJoueur: function () {
        //console.log(this.lesIndexDesIngredientATrouver.length);
        //console.log(this.nbIngredientDuHamburger);
        this.nbBonIngredient = 0;
        this.scoreDeCeHamburger = 0;
        for (var i = 0; i < this.lesIndexDesIngredientATrouver.length; i++) {
            if (this.lesIndexDesIngredientATrouver[i] == this.tableauIndexDuJoueur[i]) {
                this.nbBonIngredient++;
                this.scoreJoueur++;
                this.scoreDeCeHamburger++;

                if (this.nbBonIngredient == this.nbIngredientDuHamburger && this.nbIngredientDansLeTableauJoueur == this.lesIndexDesIngredientATrouver.length) {
                    this.nbHamburgerParfait++;
                    this.scoreJoueur += 10;
                    this.scoreDeCeHamburger += 10;
                }
            }
        }
        this.afficherLeScore();
        var pointageTxt = new PointBitmap(this.game, this.input.x - 40, this.input.y, "fonteTexte", this.scoreDeCeHamburger.toString(), 48);
        pointageTxt.tint = 0x423627;
        pointageTxt.anchor.set(1, 0.5);
        //console.log(this.nbIngredientDuHamburger);
        //console.log(this.nbBonIngredient);
        //console.log(this.nbHamburgerParfait);
        //console.log(this.scoreJoueur);
    },

    /**
     * Mettre un autre burger et un autre painBasJouer
     *Réinitialiser les variables essentielles
     */
    réinitialiserLeJeu: function () {
        this.nbIngredientDuHamburger = 0;
        this.scoreDeCeHamburger = 0;
        this.tableauIndexDuJoueur = [];
        this.lesIndexDesIngredientATrouver = [];
        this.mettrePainBasDuJoueur();
        this.genererHamburgerAFaire();
    },


    /**
     * Afficher le Score du Joueur
     */
    afficherLeScore: function () {
        LesHamburgers.score = this.scoreJoueur;
        this.scoreTxt.text = "ARGENT: " + LesHamburgers.score.toString() + "$";
    },

    /**
     * Gère le mode plein-écran (fullScreen) - le met ou l'enlève...
     * @param {Phaser.Button} boutonPleinEcran Le bouton sur lequel le joueur a cliqué
     */
    gererPleinEcran: function (boutonPleinEcran) {
        //Si le jeu n'est pas en plein écran on le met en plein écran et vice-versa
        //console.log("gererPleinEcran", this.scale.isFullScreen);
        if (!this.game.scale.isFullScreen) {
            Ecran.mettrePleinEcran();
            boutonPleinEcran.frame = 1;
        } else {
            Ecran.enleverPleinEcran();
            boutonPleinEcran.frame = 0;

        }

        //Si on est sur un périphérique mobile Android on va blocquer l'orientation si c'est possible, soit si l'API Orientation est disponible
        if (!this.game.device.desktop) {
            Ecran.verrouillerEcran(Ecran.PAYSAGE);
        }
    },

    /**
     * Gère la pause ou non du son
     * @param {object} boutonPauseSon Le bouton sur lequel le joueur a cliqué
     */
    gererPauseSon: function (boutonPauseSon) {
        //Si le son d'ambiance joue on le met en pause et vice-versa
        //console.log("gererPauseSon", this.sonAmbiance.isPlaying);
        if (LesHamburgers.sonAmbiance.isPlaying) {
            LesHamburgers.sonAmbiance.stop();
            boutonPauseSon.frame = 1;
        } else {
            LesHamburgers.sonAmbiance.loopFull(0.5);
            boutonPauseSon.frame = 0;
        }
    },

    /**
     * Gère la pause totale du jeu (arrêt des sons des méthodes update, etc.)
     * @param {Phaser.Button} boutonPauseJeu Le bouton sur lequel le joueur a cliqué
     */
    gererPauseJeu: function (boutonPauseJeu) {
        //On met le jeu en pause
        this.game.paused = true;
        
        var leRectangle= this.add.graphics(0,0);
        leRectangle.lineStyle(5, 0xE07015);
        leRectangle.beginFill(0xFFE385);
        leRectangle.drawRect(0, this.game.height / 12, this.game.width, 175);
        //leRectangle.anchor.set(0.5);

        //Déplacer le Rectangle x:450, y:150
//        leRectangle.x=450;
//        leRectangle.y=150;
        
        //On affiche un texte
        var pauseTxt = this.add.bitmapText(this.game.width / 2, this.game.height / 5, "fonteTexte", "Le jeu est en pause.\n\n Cliquer sur l'ecran pour reprendre la partie.", 50);
        pauseTxt.anchor.set(0.5);
        pauseTxt.tint = 0x423627;

        //Si on clique dans l'écran on enlève la pause et on détruit le texte
        this.input.onDown.addOnce(function () {
            pauseTxt.destroy();
            leRectangle.destroy();
            this.game.paused = false;
        }, this);
    },

    /**
     * function qui nous met à l'écran de fin
     */
    allerEcranFin: function () {
        this.time.events.remove(this.minuterieTemps);
        this.state.start("FinJeu");
    } // Fin de allerEcranFin
}; //Fin LesHamburgers.Jeu
