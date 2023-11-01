//La fonction editNav permet de gérer la navigation responsive 
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// Fonction pour afficher le message d'erreur
function afficherErreur(element, message) {
  const elementErreur = document.createElement('div');
  elementErreur.textContent = message;
  elementErreur.classList.add('formData-error');
  elementErreur.style.color = 'red';
  elementErreur.style.fontSize = '12px';
  element.parentNode.insertBefore(elementErreur, element.nextSibling);
}
// Fonction pour supprimer le message d'erreur
function supprimerErreur(element) {
  const elementSuivant = element.nextSibling;
  if (elementSuivant && elementSuivant.classList.contains('formData-error')) {
    elementSuivant.remove();
  }
}
// Fonction de validation du formulaire
function validerFormulaire() {
  const prenom = document.getElementById('first');
  const nom = document.getElementById('last');
  const email = document.getElementById('email');
  const dateNaissance = document.getElementById('birthdate');
  const quantite = document.getElementById('quantity');
  const lieu = document.querySelector('input[name="location"]:checked');
  const checkbox1 = document.getElementById('checkbox1');
  const checkbox2 = document.getElementById('checkbox2');
  // Réinitialiser les erreurs précédentes
  const elementsErreur = document.querySelectorAll('.formData-error');
  elementsErreur.forEach((elementErreur) => elementErreur.remove());
  // Valider le prénom
  if (prenom.value.trim() === '') {
    afficherErreur(prenom, 'Prénom requis');  }

  // Valider le nom
  if (nom.value.trim() === '') {
    afficherErreur(nom, 'Nom requis');
  }

  // Valider l'email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email.value)) {
    afficherErreur(email, 'Email invalide');
  }

  // Valider la date de naissance
  if (dateNaissance.value === '') {
    afficherErreur(dateNaissance, 'Date de naissance requise');
  }

  // Valider la quantité
  if (isNaN(quantite.value) || quantite.value < 0 || quantite.value > 99) {
    afficherErreur(quantite, 'Nombre invalide');
  }

  // Valider le lieu
  if (!lieu) {
    afficherErreur(document.querySelector('.formData label[for="location6"]'), 'Ville requise');
  }

  // Valider la checkbox1
  if (!checkbox1.checked) {
    afficherErreur(checkbox1.nextElementSibling, 'Conditions d\'utilisation requises');
  }

  // Supprimer l'erreur "Tournois requis" lorsqu'un tournoi est sélectionné
  if (checkbox2.checked) {
    supprimerErreur(document.querySelector('.formData label[for="checkbox2"]'));
  }

  // S'il y a des erreurs, empêcher la soumission du formulaire
  if (document.querySelectorAll('.formData-error').length > 0) {
    return false;
  }

  // Si pas d'erreurs, soumission du formulaire réussie
  return true;
}

// Écouteur d'événement pour la soumission du formulaire
const formulaire = document.forms['reserve'];
const modalSuccess = document.createElement('div'); // Nouvelle div pour le message de succès
modalSuccess.classList.add('modal-success'); // + classe CSS à cette div
formulaire.insertAdjacentElement('beforebegin', modalSuccess); // Insérer la nouvelle div juste avant le formulaire
formulaire.addEventListener('submit', (e) => {
  e.preventDefault(); // Nécessaire pour soumettre manuellement par la suite
  if (validerFormulaire()) {
    // Cacher le formulaire
    formulaire.style.display = 'none'; // On change la propriété CSS à none pour le rendre invisible

    // Créer une nouvelle div avant le texte qui tourne
    const divAvant = document.createElement('div');
    divAvant.style.height = '320px'; // Définir la hauteur à 320 pixels pour correspondre parfaitement 
    modalSuccess.insertAdjacentElement('beforebegin', divAvant); // Insérer la nouvelle div avant le message de succès

    modalSuccess.textContent = 'Formulaire soumis avec succès'; // Mettre à jour le message de succès
    modalSuccess.style.color = 'red'; // Appliquer la couleur rouge
    modalSuccess.style.fontSize = '24px'; // Taille de la police en grande lettre

    // Créer une nouvelle div après le texte qui tourne
    const divApres = document.createElement('div');
    divApres.style.height = '320px'; // Définir la hauteur à 320 pixels pour correspondre parfaitement
    modalSuccess.insertAdjacentElement('afterend', divApres); // Insérer la nouvelle div après le message de succès

    // Appliquer la rotation autour de l'axe X en utilisant la propriété transform
    let rotationAngle = 0;
    const rotationInterval = setInterval(() => {
      modalSuccess.style.transform = `rotateX(${rotationAngle}deg`;
      rotationAngle += 12;
    }, 50);

    formulaire.reset();

    // Supprimer le message de succès après 4 secondes (4000 millisecondes)
    setTimeout(() => {
      clearInterval(rotationInterval);
      modalSuccess.style.transform = '';
      modalSuccess.textContent = '';

      // Supprimer les divs ajoutées
      divAvant.remove();
      divApres.remove();

      // Afficher à nouveau le formulaire
      formulaire.style.display = 'block';
    }, 4000);
  }
});

// Écouteur d'événement pour l'ouverture du formulaire
const modalBtn = document.querySelectorAll('.modal-btn');
const modalBg = document.querySelector('.bground');
modalBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    modalBg.style.display = 'block';
  });
});

// Écouteur d'événement pour la fermeture de la fenêtre modale avec le bouton "Fermer"
const modalClose = document.querySelector('.close');
modalClose.addEventListener('click', () => {
  modalBg.style.display = 'none';
  //formulaire.reset();
});

// Écouteur d'événement pour la fermeture de la fenêtre modale avec la touche ESC
document.addEventListener('keydown', (e) => { 
  if (e.key === 'Escape') {
    modalBg.style.display = 'none';
    //formulaire.reset();
  }
});