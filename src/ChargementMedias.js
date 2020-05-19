/**
 * Jeu : LesHamburgers
 * CHARGEMENT DES MÉDIAS
 * @author Linna Lim
 * @version 2017-05-18
 */

//Utiliser un mode strict
"use strict";

//Création ou récupération de l'espace de nom pour le jeu : LesHamburgers
var LesHamburgers = LesHamburgers || {};


/**
 *COPYRIGHT ET SOURCES DES MÉDIAS
 *Toutes images et sprites ont été fait par Linna Lim
 *Tous les sons ont été pris sur le site https://www.freesound.org/, donc libre de droit
 */



/**
 * Classe permettant de définir l'écran (state)
 * pour le chargement des médias
 */

LesHamburgers.ChargementMedias = function () {};

LesHamburgers.ChargementMedias.prototype = {
    init: function () {
        //Créer et afficher le texte
        this.pourcentTxt = this.add.text(this.game.width / 2, this.game.height / 2, "0 %", {
            font: "bold 64px Arial",
            fill: "#FE9102",
            align: "center"
        });
        this.pourcentTxt.anchor.set(0.5, -1);
    },

    preload: function () {
        //Chemin commun à toutes les images
        this.load.path = "medias/img/";
        //Chargement des feuilles de sprite
        this.load.spritesheet("burger-sprite", "burger-sprite.png", 320, 75);
        this.load.spritesheet("instructionBtn", "bouton-instruction.png", 385, 83);
        this.load.spritesheet("jouerBtn", "bouton-jouer.png", 273, 83);
        this.load.spritesheet("ingredientBtn", "bouton-ingredient.png", 60, 60);
        this.load.spritesheet("boutonPleinEcranImg", "boutonPleinEcran.png", 32, 32);
        this.load.spritesheet("boutonPauseImg", "boutonPause.png", 32, 32);
        this.load.spritesheet("boutonSonImg", "boutonSon.png", 32, 32);
        //Chargement des images
        this.load.image("painDessus", "pain-dessus.png");
        this.load.image("poubelleImg", "poubelleImg.png");
        this.load.image("arrierePlan", "image-arriere-plan.png");
        this.load.image("instructionImg", "instructionImg.png");
        this.load.image("finImg", "finImg.png");

        //Chemin commun aux fontes bitmap
        this.load.path = "medias/fontes/";
        //Chargement des fontes bitmap
        this.load.bitmapFont("fonteTitre", "titre.png", "titre.fnt");
        this.load.bitmapFont("fonteTexte", "font.png", "font.fnt");

        //Chemin commun aux sons
        this.load.path = "medias/sons/";
        //Chargement des fichiers sonores
        this.load.audio("sonAmbiance", ["son_ambiance.mp3", "son_ambiance.mp3"]);
        this.load.audio("sonMenu", ["menu.mp3", "menu.ogg"]);
        this.load.audio("sonFrappe", ["sonFrappe.mp3", "sonFrappe.ogg"]);
        this.load.audio("sonPoubelle", ["poubelle.mp3", "poubelle.ogg"]);
        this.load.audio("sonArgent", ["cha-ching.mp3", "cha-ching.ogg"]);
        this.load.audio("sonFinJeu", ["yay.mp3", "yay.ogg"]);
        
        //Afficher les images de la barre de chargement
			var barreLimite = this.add.sprite(0, this.game.height/2, "limiteImg");
            barreLimite.anchor.set(0,0.5);
            barreLimite.x = (this.game.width - barreLimite.width)/2;
			
			var barreChargement = this.add.sprite(0, this.game.height/2, "barreImg");
            barreChargement.anchor.set(0,0.5);
            barreChargement.x = (this.game.width - barreChargement.width)/2;
            
            this.load.setPreloadSprite(barreChargement);
			
			//Afficher le pourcentage chargé après le chargement de chaque média
    		this.load.onFileComplete.add(this.afficherPourcentage, this);

    },
    
    /**
		* Pour afficher le pourcentage de téléchargement des médias
		* @param {Integer} progression Chiffre compris entre 1 et 100 (inclusivement) et représente le    pourcentage du chargement réalisé.
		*/		
		afficherPourcentage: function(progression){
            this.pourcentTxt.text = progression + " %"
	
		},

    create: function () {
        //Quand les ajustements sont faits - on charge les médias
        this.game.state.start("IntroJeu");
    }
}; //Fin LesHamburgers.ChangementMedias
