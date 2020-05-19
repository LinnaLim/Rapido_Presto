/**
 * Classe  PointBitmap  
 * @author Linna Lim
 * @version 2017-05-24
 */

(function () { //IFFE
	//Usage d'un mode strict
	"use strict";

	/**
	 * Crée une instance de PointBitmap
	 * 
	 * @class PointBitmap
	 * @extends Phaser.BitmapText
	 * @constructor
	 * @param {Phaser.Game} leJeu	L'instance du jeu en cours
	 * @param {Number} posX			La position de l'instance sur l'axe des x
	 * @param {Number} posY			La position de l'instance sur l'axe des y
	 * @param {String} cle			La clé pour récupérer la fonte bitmap chargée
	 * @param {String} texte		Le texte à afficher
	 * @param {Integer} taille		La taille en pixels pour l'affichage du texte
	 */
	function PointBitmap(leJeu, posX, posY, cle, texte, taille) {
		//Appel du constructeur parent pour cet instance
		//Phaser.BitmapText(game, x, y, font, text, size, align)
		Phaser.BitmapText.call(this, leJeu, posX, posY, cle, texte, taille);

		//Ajuster le point d'ancrage
		this.anchor.set(0.5);

		//Échelle initiale
		this.scale.setTo(0);

		//Mettre ce point dans l'affichage du jeu
		leJeu.add.existing(this);

		//Animer ce point
		this.animerPoint();
	};

	//Ajustements pour l'héritage
	PointBitmap.prototype = Object.create(Phaser.BitmapText.prototype);
	PointBitmap.prototype.constructor = PointBitmap;

	//Méthodes d'instance

	/**
	 * Anime l'instance avec les propriétés scale et alpha
	 */
	PointBitmap.prototype.animerPoint = function () {

		//Animation de l'alpha
		this.game.add.tween(this).to({
			alpha: 0.1
		}, 500, Phaser.Easing.Linear.None, true);

		//Animation de l'échelle	
		var animEchelle = this.game.add.tween(this.scale).to({
			x: 2.0,
			y: 2.0
		}, 500, Phaser.Easing.Bounce.Out, true);

		//Quand l'animation de l'échelle est terminée, on détruit le point
		animEchelle.onComplete.add(this.detruirePoint, this);

	};

	/**
	 * Détruit l'instance quand son animation est terminée
	 */
	PointBitmap.prototype.detruirePoint = function () {
		this.destroy();
		console.log('Bye Bye point');
	};

	//Rendre la classe publique
	window.PointBitmap = PointBitmap; //Ou return PointBitmap;

})(); //Fin IIFE
