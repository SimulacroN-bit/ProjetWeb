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

//Affichage général

const storedDisplay = localStorage.getItem('affichage');
console.log('Préférence stockée :', storedDisplay);

function displayType(affichage) {
    const listTable = document.getElementById('listTable');
    const cardsContainer = document.getElementById('cardsContainer');
    
    if (affichage === 'Cards') {
        listTable.style.display = 'none';
        cardsContainer.style.display = '';  
    } else if (affichage === 'List') {
        listTable.style.display = '';
        cardsContainer.style.display = 'none';
    }
}
const radioButtons = document.querySelectorAll('input[name="displayChoiceHome"]');

function displayTypeHome(affichageHome) {
    const listTable = document.getElementById('listTable');
    const cardsContainer = document.getElementById('cardsContainer');
    
    if (affichageHome === 'Cards') {
        listTable.style.display = 'none';
        cardsContainer.style.display = '';
    } else if (affichageHome === 'List') {
        listTable.style.display = '';
        cardsContainer.style.display = 'none';
    }
}

function onDisplayChange() {
    const selectedRadio = document.querySelector('input[name="displayChoiceHome"]:checked');
    
    if (selectedRadio) {
        displayTypeHome(selectedRadio.value);
    }
}

if (localStorage.getItem('theme')) {
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
} else {
    if (storedDisplay) {
        displayType(storedDisplay);
    }
    if (storedDisplay === 'Cards') {
        const cardsRadio = document.querySelector('input[name="displayChoiceHome"][value="Cards"]');
        if (cardsRadio) cardsRadio.checked = true;
    } else if (storedDisplay === 'List') {
        const listRadio = document.querySelector('input[name="displayChoiceHome"][value="List"]');
        if (listRadio) listRadio.checked = true;
    }
    radioButtons.forEach(radio => {
        radio.addEventListener('change', onDisplayChange);
    });
    
    onDisplayChange();
}


// //Tableau JSON

fetch('promo.json').then(reponse => reponse.json()).then(promo => {
    afficheData(promo) 
    displayCards(promo)
})


function afficheData(promo) {

        //initialiser
        let tableauLigne = promo.apprenant;
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
            });
            tdAction.appendChild(btnDetails);
            ligne.appendChild(tdAction);

            tbody.appendChild(ligne);
        
    });
    }

    afficheData();


    function displayCards(promo) {
        let tableauCards = promo.apprenant;
        console.log(tableauCards)
        const container = document.getElementById('cardsContainer');

        tableauCards.forEach(apprenant => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.width = '18rem';

        card.innerHTML = `
        <img src="images/avatar.png" style="width: 5em;" class="card-img-top" alt="Photo">
        <div class="card-body">
            <h5 class="card-title">${apprenant.nom} ${apprenant.prenom}</h5>
            <p class="card-text">${apprenant.ville}</p>
            <a href="#" class="btn btn-primary">Détails</a>
        </div>
        `;

        // bouton Détails
        const btn = card.querySelector('.btn-primary');
        btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`Détails : ${apprenant.prenom} ${apprenant.nom} - ${apprenant.ville}`);
        });

        container.appendChild(card);
    });
}

    displayCards();
