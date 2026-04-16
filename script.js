//LocalStaorage clear après chargement de la page Preferences

window.addEventListener('load', function() {
    if (window.location.pathname.endsWith('preferences.html')) {
        localStorage.clear();
        console.log('localStorage vidé');
    }
});

//Enregistrer préférences profile

function saveProfile(){
    let mode = document.getElementById('themeSelector').value
    let affichage = document.querySelector('input[name="displayChoice"]:checked').value
    console.log(mode,affichage)
    localStorage.setItem('mode', mode)
    localStorage.setItem('affichage', affichage)
    alert("Préférences enregistrées !")
    displayMode(mode)
}

//Dark Theme sur toute les pages

    const getStoredTheme = localStorage.getItem('mode')
    console.log(getStoredTheme)

    function displayMode(mode) {
    if (mode === 'Dark') {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else if (mode === 'Light') {
        document.documentElement.setAttribute('data-bs-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
    }
}
displayMode(getStoredTheme);

//Affichage liste/carte préférences

    const getStoredDisplay = localStorage.getItem('affichage')
    console.log(getStoredDisplay)

    function displayType(affichage) {
    if (affichage === 'Cards') {
        document.getElementById('listTable').style.display = 'none';
        document.getElementById('cardsContainer').style.display = '';
    } else if (affichage === 'List'){
        document.getElementById('listTable').style.display = '';
        document.getElementById('cardsContainer').style.display = 'none';
    } else {
        document.getElementById('listTable').style.display = ''
    } 
}
displayType(getStoredDisplay);



//Tableau JSON

fetch('promo.json').then(reponse => reponse.json()).then(promo => afficheData(promo))

let tableauLigne = []

function afficheData(promo) {

        //initialiser
        console.log(promo.apprenant)
        tableauLigne = promo.apprenant;
        console.log(tableauLigne)
        const tbody = document.getElementById('apprenantsTableau');
        

        tableauLigne.forEach((promo) => {
            const ligne = document.createElement('tr');
            console.log(ligne)

            //colonne nom

            const nom = document.createElement('td');
            nom.innerText = promo.nom;
            ligne.appendChild(nom);
            console.log(nom)

            //colonne prenom

            const prenom = document.createElement('td');
            prenom.innerText = promo.prenom;
            ligne.appendChild(prenom);
            console.log(prenom)

            //colonne ville

            const ville = document.createElement('td');
            ville.innerText = promo.ville;
            ligne.appendChild(ville);
            console.log(ville)

            //colonne détails
            const tdAction = document.createElement("td");
            const btnDetails = document.createElement("button");
            btnDetails.innerText = "Détails";
            btnDetails.classList.add("btn", "btn-sm", "btn-info");
            btnDetails.addEventListener("click", () => {
            alert(`Détails : ${promo.prenom} ${promo.nom} ${promo.ville}`);
            // Modale
            });
            tdAction.appendChild(btnDetails);
            ligne.appendChild(tdAction);

            tbody.appendChild(ligne);
        
    });
    }

        afficheData();

