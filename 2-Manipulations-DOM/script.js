//~ Le script se déclenchera lorsque la totalité de notre arbre DOM sera chargé et disponible
document.addEventListener("DOMContentLoaded", function() {

	/**
	*
	*	Premier bouton
	*
	**/
	//~ On cible notre premier bouton
	var bouton1 = document.getElementById('bouton1');

	//~ On assigne une fonction à notre bouton lors d'un clic sur celui ci
	bouton1.addEventListener('click', functionBouton1);

	//~ Fonction qui sera appelée lors du clic sur notre bouton
	function functionBouton1(){
		//~ On cible les items de la liste 
		//~ et on stocke l'ensemble dans une variable
		var items = document.getElementsByTagName('li');

		//~ On fait une boucle, 
		//~ nous permettant de parcourir chacun des éléments
		//~ stocké sous la forme d'une collection
		for (var i = 0; i < items.length; i++) {
			//~ A chaque passage de boucle, "items[i]" va nous permettre d'accéder à l'élément courant
			
			//~ On modifie le style 
			items[i].style.backgroundColor = "red";
			items[i].style.textDecoration = "underline";
			items[i].style.color = "#898989";
		}
	}


	/**
	*
	*	Second bouton
	*
	**/
	//~ On cible notre second bouton
	var bouton2 = document.getElementById('bouton2');

	//~ On assigne une fonction à notre bouton lors d'un clic sur celui ci
	bouton2.addEventListener('click', functionBouton2);

	//~ Fonction qui sera appelée lors du clic sur notre bouton
	function functionBouton2(){
		//~ On cible le dernier item
		var dernieritem = document.querySelector('li:last-child');
		
		//~ On modifie le style 
		dernieritem.style.fontWeight = "bold";
		dernieritem.style.textTransform = "uppercase";
	}


	/**
	*
	*	Troisième bouton
	*
	**/
	//~ On cible notre troisième bouton
	var bouton3 = document.getElementById('bouton3');

	//~ On assigne une fonction à notre bouton lors d'un clic sur celui ci
	bouton3.addEventListener('click', functionBouton3);

	//~ Fonction qui sera appelée lors du clic sur notre bouton
	function functionBouton3(){
		//~ On cible le premier item
		var premieritem = document.querySelector('li:first-child');
		
		//~ On modifie le style 
		premieritem.style.display = "none";
	}


	/**
	*
	*	Quatrième bouton
	*
	**/
	//~ On cible notre quatrième bouton
	var bouton4 = document.getElementById('bouton4');

	//~ On assigne une fonction à notre bouton lors d'un clic sur celui ci
	bouton4.addEventListener('click', functionBouton4);

	//~ Fonction qui sera appelée lors du clic sur notre bouton
	function functionBouton4(){
		//~ On cible le second item
		//~ Ainsi, on va d'abord récupérer la totalité de la liste des items
		var items = document.getElementsByTagName('li');

		//~ Pour accéder au second item dans notre tableau, il suffit de spécifier 
		//~ son occurence (N - 1)
		//~ En effet, les occurences débutent à 0 et non à 1. Ainsi, pour accéder à 
		//~ notre second item, la valeur sera 2-1 soit... 1 !
		var seconditem = items[1];

		//~ Afin de déplacer notre item, il nous faut pointer 
		//~ sur l'élément après lequel il sera présent
		var dernieritem = document.querySelector('li:last-child');

		//~ Maintenant que nous avons nos éléments, on procède aux manipulations !
		dernieritem.after(seconditem);
	}
	
});