//~ Le script se déclenchera lorsque la totalité de notre arbre DOM sera chargé et disponible
document.addEventListener("DOMContentLoaded", function() {

	/*
		On récupère l'élement correspond au bouton "Valider le bon de commande" 
		afin d'y assigner un évènement.
		On utilise alors la méthode monElement.addEventListener()
		Cette méthode accepte trois paramètres (dont le troisième est optionnel) : 
			- nom de l'évènement Javascript qui va déclencher la fonction
			- nom de la fonction qui sera appelée à partir de l'évènement
	*/
	var monBouton = document.getElementById('envoyer');
	monBouton.addEventListener('click', verificationBondeCommande);



	/*
		Cette fonction est appelée lors du clic sur le bouton de 
		validation du bon de commande. 
		Elle regroupe l'ensemble de nos vérifications et de nos traitements.
		Nous allons donc, comme précisé dans les consignes, réaliser dans un
		premier temps une série de test sur les champs du formulaires.
		S'ils s'avèrent concluant, un deuxième traitement se chargera de 
		l'affichage du récapitulatif du bon de commande.
	*/
	function verificationBondeCommande(){
		/*
			Chaque tentative d'envoi va préalablement vider le noeud HTML
			contenant/accueillant les messages d'erreur
		*/
		document.getElementById('error').innerHTML = "";

		/* 
			Nous regroupons dans une seule condition l'ensemble 
			de nos tests sous la forme de fonctions. Ces fonctions pourront à 
			chaque fois retourner deux seuls résultats possibles : 
				- TRUE si la condition est respectée et le test valide
				- FALSE si une erreur de saisie est détectée
		*/
		if(testChampsRenseignes() && testValiditeDate() && testValiditeCouleur()){
			/*
				Les tests ayant été concluant, nous appellons une fonction
				nous permettant d'afficher en dessous de notre formulaire,
				le récapitulatif de nos champs.
			*/
			afficheRecapitulatif();
		}
	}



	/* 
		Cette fonction de test permet de vérifier que chacun
		des champs du formulaire est complété.
		Si le test est concluant, la fonction retournera TRUE.
		Dans le cas contraire, elle retournera FALSE.
	*/
	function testChampsRenseignes(){ 
		/* 
			On récupère l'élement correspondant à la date du bon de commande. 
			Comme celui ci a un "id" attribué, nous allons 
			utiliser la méthode .getElementById().
		*/
		var maDate = document.getElementById('date_commande');
		/* 
			On vérifie que la valeur de l'élement est renseignée, mais aussi différente 
			de la valeur par défaut "JJ/MM/AAAA".
			Si le test est concluant, on continue notre traitement. Sinon, on renvoit
			FALSE pour indiquer un échec dans la vérification des champs
		*/
		if(maDate.value == "" || maDate.value == "JJ/MM/AAAA"){
			//~ Affichage message d'erreur (voir la fonction "showError" en bas de fichier)
			showError("La date n'est pas valide.");
			return false;
		}

		/* 
			On récupère l'élement correspondant à la marque du véhicule. 
			Comme celui ci a un "name" attribué, nous allons 
			utiliser la méthode .getElementsByName(). Attention, cette méthode
			retourne une collection/un tableau d'élements ! 
			Nous savons que dans notre page, un seul élement HTML à un "name = marque"
			d'attribué. Donc nous allons directement le récupérer en spécifiant l'occurence
			de tableau. (Faites l'essai dans votre console avec et sans le [0]).
		*/
		var maMarque = document.getElementsByName('marque')[0];
		/*
			Comme pour la date, on vérifie que la marque a été renseignée afin de continuer
			le traitement. Dans le cas contraire, on retourne un FALSE pour indiquer un échec 
			dans la vérification des champs
		*/
		if(maMarque.value == ""){
			//~ Affichage message d'erreur (voir la fonction "showError" en bas de fichier)
			showError("La marque n'a pas été renseignée.");
			return false;
		}

		/*
			Pour récupérer l'élement correspondant à la couleur, nous avons 
			deux possibilités.
			L'une consiste a utiliser la méthode .getElementsByClassName(). Toutefois,
			cette méthode non valide W3C n'est pas implémentée dans certains (vieux)
			navigateurs.
			Nous allons donc essayer une seconde méthode consistant à récupérer une collection
			d'élements "input". Nous allons ensuite parcourir cette collection et tester les attributs
			de chacun des élements afin d'isoler le input de "type=text" avec une "class=couleur"
		*/
		var collectionInput = document.getElementsByTagName('input');
		/*
			On parcourt les élements de notre collection avec une boucle FOR
		*/
		var tailleCollectionInput = collectionInput.length;
		for(var i = 0; i < tailleCollectionInput; i++){
			if(collectionInput[i].getAttribute('type') == "text" && collectionInput[i].getAttribute('class') == 'couleur'){
				/*
					Maintenant que nous avons notre élement correspondant à la couleur,
					il nous suffit de réaliser un test sur la valeur, sur le même
					principe que pour les champs date et marque
				*/
				if(collectionInput[i].value == ""){
					//~ Affichage message d'erreur (voir la fonction "showError" en bas de fichier)
					showError("Aucune couleur n'est renseignée.");
					return false;
				}
			}
		}

		/* 
			On ne peut visiblement sélectionner qu'une seule option dans la liste.
			Comme spécifié dans les consignes, *tous les champs doivent être renseignés*
			Compte tenu des attributs HTML, nous allons effectuer une vérification sur la liste d'options
			grâce à la méthode .getElementsByName(). 
			Nous allons initialiser une variable "optionCochee = false" avant notre boucle de parcours.
			Cette variable verra sa valeur changée dans notre boucle si une option a été cochée.
			Il ne nous restera donc qu'a vérifier la valeur de cette variable.
		*/
		var collectionOption = document.getElementsByName('option');
		var tailleCollectionOption = collectionOption.length;
		var optionCochee = false;
		for(var i = 0; i < tailleCollectionOption; i++){
			if(collectionOption[i].checked){
				/*
					Si une option a été cochée, nous modifions la valeur de "optionCochee" 
					afin de le signaler
				*/
				optionCochee = true;
			}
		}
		if(optionCochee == false){
			/* 
				Si la valeur de "optionCochee" est toujours égale à FALSE, c'est que la valeur 
				n'a pas été modifiée dans notre boucle (et donc qu'aucun radio n'a été coché).
				Sur le même principe que les précédents champs, nous retournons FALSE
			*/
			//~ Affichage message d'erreur (voir la fonction "showError" en bas de fichier)
			showError("Aucune option n'a été renseignée.");
			return false;
		}

		/*
			Si le traitement est arrivé jusqu'ici, c'est que toutes les vérifications 
			sont correctes. Nous renvoyons donc TRUE pour le signaler
		*/
		return true;
	}



	/*
		Dans cette fonction, nous allons simplement vérifier le format 
		de la date saisie.
		Si le test est concluant, la fonction retournera TRUE.
		Dans le cas contraire, elle retournera FALSE.
	*/
	function testValiditeDate(){
		/* 
			On récupère la valeur de l'élement correspondant à 
			la date du bon de commande. Comme celui ci a un "id" attribué, 
			nous allons utiliser la méthode .getElementById().
		*/
		var maValeurDate = document.getElementById('date_commande').value;

		/* 
			La valeur saisie doit respecter les conditions suivantes : 
			"slash pour séparer les valeurs, deux chiffres pour le jour, 
			deux chiffres pour le mois et quatre chiffres pour l'année".
			Nous allons donc séparer notre valeur en se basant sur le 
			caractère "/". Si le format est correct, nous aurons un 
			tableau à trois occurences, avec la première  et la seconde
			d'une longueur de deux chiffres et la troisième d'une longueur 
			de quatre chiffres.
		*/
		var mesElementsDeDate = maValeurDate.split('/');

		/* On test le nombre d'élements présent dans notre tableau */
		if(mesElementsDeDate.length != 3){	
			//~ Affichage message d'erreur (voir la fonction "showError" en bas de fichier)
			showError("La date n'est pas au format attendu.");
			return false;
		}
		/* On test la taille du premier élement et on vérifie qu'il est composé de chiffres valides */
		if(mesElementsDeDate[0].length != 2 || isNaN(mesElementsDeDate[0])){
			//~ Affichage message d'erreur (voir la fonction "showError" en bas de fichier)
			showError("La date n'est pas au format attendu.");
			return false;
		}
		/* Idem pour le second élement */
		if(mesElementsDeDate[1].length != 2 || isNaN(mesElementsDeDate[1])){
			//~ Affichage message d'erreur (voir la fonction "showError" en bas de fichier)
			showError("La date n'est pas au format attendu.");
			return false;
		}
		/* Idem pour le troisième élement */
		if(mesElementsDeDate[2].length != 4 || isNaN(mesElementsDeDate[2])){
			//~ Affichage message d'erreur (voir la fonction "showError" en bas de fichier)
			showError("La date n'est pas au format attendu.");
			return false;
		}

		/*
			Si le traitement est arrivé jusqu'ici, c'est que toutes les vérifications 
			sont correctes. Nous renvoyons donc TRUE pour le signaler
		*/
		return true;
	}



	/*
		Dans cette fonction, nous allons simplement vérifier le format 
		de la couleur saisie.
		Si le test est concluant, la fonction retournera TRUE.
		Dans le cas contraire, elle retournera FALSE.
	*/
	function testValiditeCouleur(){
		/*
			Pour pointer sur l'élement correspondant à la couleur,
			nous allons utiliser le même procéder utilisé 
			que celui dans la fonction testChampsRenseignes()
		*/
		var collectionInput = document.getElementsByTagName('input');
		var tailleCollectionInput = collectionInput.length;
		for(var i = 0; i < tailleCollectionInput; i++){
			if(collectionInput[i].getAttribute('type') == "text" && collectionInput[i].getAttribute('class') == 'couleur'){
				/*
					Maintenant que nous avons notre élement correspondant à la couleur,
					il nous suffit de réaliser un test sur la valeur afin qu'il 
					respecte la condition "premier caractère est un dièse puis six chiffres et/ou lettres"
					Il y a une multitude de possibilité cette valeur.
					Nous allons utiliser une des plus complexes mais aussi une des plus fiables : 
					l'utilisation d'une expression régulière. 
				*/
				var maCouleur = collectionInput[i].value;
				var reg = new RegExp("^#[a-zA-Z0-9]{6}", "g");
				if(reg.test(maCouleur) == false){
					//~ Affichage message d'erreur (voir la fonction "showError" en bas de fichier)
					showError("La couleur n'est pas au format attendu.");
					return false;
				}
				return true;
			}
		}
	}


	/*
		Permet d'injecter un message d'erreur
	*/
	function showError(message){
		//~ On se positionne sur l'element où l'on va injecter notre message d'erreur
		var elementError = document.getElementById('error');


		//~ On ajoute le nouveau message d'erreur au contenu éventuellement déjà injecté
		elementError.innerHTML += "<br>"+message;

		//~ L'opérateur "+=" nous permet de procéder à une concaténation (ajout du nouveau texte à celui existant)
	}

	/*
		Puisque tous les tests de vérification sont concluants, 
		nous allons récupérer (une nouvelle fois) la valeur de chacun
		des champs pour ensuite l'afficher dans le récapitulatif.
		Pour chacun des champs, nous allons procéder de la même 
		manière : 
			- on cible notre élement dont on veut la valeur
			- on recupère sa valeur
			- on cible l'élement où on va afficher la valeur
			- on affiche la valeur
	*/
	function afficheRecapitulatif(){
		/** Date **/
		var maDate = document.getElementById('date_commande');		//~ On cible la date
		var maDateValeur = maDate.value;							//~ On récupère la valeur de la date
		var cibleDate = document.getElementById('date');			//~ On cible le noeud d'affichage
		cibleDate.innerHTML = maDateValeur;							//~ On insère la valeur dans le noeud

		/* Idem pour les autres élements */

		/** Type **/
		var monType = document.getElementById('type_vehicule');
		var monTypeValeur = monType.innerHTML;
		var cibleType = document.getElementById('type');
		cibleType.innerHTML = monTypeValeur;

		/** Marque **/
		var maMarque = document.getElementsByName('marque')[0];
		var maMarqueValeur = maMarque.value;
		var cibleMarque = document.getElementById('marque');
		cibleMarque.innerHTML = maMarqueValeur;

		/** Couleur **/
		var collectionInput = document.getElementsByTagName('input');
		var tailleCollectionInput = collectionInput.length;
		for(var i = 0; i < tailleCollectionInput; i++){
			if(collectionInput[i].getAttribute('type') == "text" && collectionInput[i].getAttribute('class') == 'couleur'){
				var maCouleur = collectionInput[i];
				var maCouleurValeur = maCouleur.value;
				var cibleCouleur = document.getElementById('couleur');
				cibleCouleur.innerHTML = maCouleurValeur;
			}
		}

		/** Option **/
		var collectionOption = document.getElementsByName('option');
		var tailleCollectionOption = collectionOption.length;
		var optionCochee = false;
		for(var i = 0; i < tailleCollectionOption; i++){
			if(collectionOption[i].checked){
				var monOption = collectionOption[i];
				var monOptionValeur = monOption.value;
				var cibleOption = document.getElementById('options');
				cibleOption.innerHTML = monOptionValeur;
			}
		}
	}

});