//~ Le script se déclenchera lorsque la totalité de notre arbre DOM sera chargé et disponible
document.addEventListener("DOMContentLoaded", function() {

	/**
	*
	*	Bouton
	*
	**/
	//~ On cible notre bouton
	var bouton = document.getElementById('bouton');

	//~ On assigne une fonction à notre bouton lors d'un clic sur celui ci
	bouton.addEventListener('click', FonctionHello);

	//~ Fonction qui sera appelée lors du clic sur notre bouton
	function FonctionHello(){
		//~ Fenêtre surgissante
		alert('Hello World !')
	}
	
}); 