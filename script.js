const inscriptionForm = document.getElementById('inscriptionForm');

if (inscriptionForm) {
    inscriptionForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Maka ny sanda avy amin'ny formulaire
        const nouvelInscrit = {
            nom: document.getElementById('nom').value,
            prenom: document.getElementById('prenom').value,
            date_naissance: document.getElementById('date_naiss').value,
            lieu_naissance: document.getElementById('lieu').value,
            email: document.getElementById('email').value,
            parcours: document.getElementById('parcours').value,
            date_inscription: new Date().toLocaleDateString('fr-FR')
        };

        // Mitahiry ao amin'ny LocalStorage
        let base = JSON.parse(localStorage.getItem('base_inscriptions')) || [];
        base.push(nouvelInscrit);
        localStorage.setItem('base_inscriptions', JSON.stringify(base));

        // Hafatra fahombiazana
        alert("Félicitations " + nouvelInscrit.prenom + ", ton inscription est validée !");
        
        // Mandefa any amin'ny pejy liste
        window.location.href = "liste.html";
    });
}