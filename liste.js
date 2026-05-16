// --- 1. HANDLING INSCRIPTION ---
const inscriptionForm = document.getElementById('inscriptionForm');
if (inscriptionForm) {
    inscriptionForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const etudiant = {
            id: Date.now(), // Famantarana manokana hamafana azy avy eo
            nom: document.getElementById('nom').value,
            prenom: document.getElementById('prenom').value,
            date_naiss: document.getElementById('date_naiss').value,
            adresse: document.getElementById('adresse').value,
            email: document.getElementById('email').value,
            parcours: document.getElementById('parcours').value,
            date_insc: new Date().toLocaleDateString('fr-FR')
        };

        let db = JSON.parse(localStorage.getItem('emit_db')) || [];
        db.push(etudiant);
        localStorage.setItem('emit_db', JSON.stringify(db));

        alert("Inscription validée avec succès !");
        window.location.href = "liste.html";
    });
}

// --- 2. HANDLING LISTE (Misy Delete sy Search) ---
function chargerListe() {
    const tableBody = document.getElementById('corpsTableau');
    if(!tableBody) return;

    let db = JSON.parse(localStorage.getItem('emit_db')) || [];
    renderTable(db);
}

// Fonction mampiseho ny tabilao
function renderTable(data) {
    const tableBody = document.getElementById('corpsTableau');
    tableBody.innerHTML = "";

    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nom.toUpperCase()} ${item.prenom}</td>
            <td>${item.adresse}</td>
            <td>${item.email}</td>
            <td style="color: #00a8ff; font-weight:bold">${item.parcours}</td>
            <td>${item.date_insc}</td>
            <td>
                <button onclick="supprimerEtudiant(${item.id})" style="background: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                    Supprimer
                </button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Fonction hamafana olona
function supprimerEtudiant(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
        let db = JSON.parse(localStorage.getItem('emit_db')) || [];
        db = db.filter(etudiant => etudiant.id !== id);
        localStorage.setItem('emit_db', JSON.stringify(db));
        chargerListe(); // Havaozina ny tabilao
    }
}

// Fonction hikarohana anarana
function filtrerListe() {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();
    let db = JSON.parse(localStorage.getItem('emit_db')) || [];
    
    const dataFiltrer = db.filter(etudiant => 
        etudiant.nom.toLowerCase().includes(searchValue) || 
        etudiant.prenom.toLowerCase().includes(searchValue)
    );
    
    renderTable(dataFiltrer);
}