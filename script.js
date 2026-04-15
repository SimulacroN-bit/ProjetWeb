//LocalStaorage clear après chargement de la page Preferences

window.addEventListener('load', function() {
    if (window.location.pathname.endsWith('preferences.html')) {
        localStorage.clear();
        console.log('localStorage vidé');
    }
});

//Enregistrer profile

function saveProfile(){
    let mode = document.getElementById('themeSelector').value
    let affichage = document.querySelector('input[name="displayChoice"]:checked').value
    console.log(mode,affichage)
    localStorage.setItem('mode', mode)
    localStorage.setItem('affichage', affichage)
    alert("Préférences enregistrées !")
}


//Tableau JSON

fetch('promo.json').then(reponse => reponse.json()).then(apprenants => afficheData(apprenants))

function afficheData(apprenants){
    console.log(apprenants)
}


