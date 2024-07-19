document.addEventListener('DOMContentLoaded', () => {
    fetchClassifica();

    function fetchClassifica() {
        const apiUrl = 'URL_API_TUTTOCAMPO'; // Sostituisci con l'URL dell'API di Tuttocampo

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                updateClassificaTable(data);
            })
            .catch(error => console.error('Errore nel recuperare i dati:', error));
    }

    function updateClassificaTable(data) {
        const tableBody = document.querySelector('#classifica-table tbody');
        tableBody.innerHTML = ''; // Pulisce la tabella

        data.forEach((team, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${team.nome}</td>
                <td>${team.punti}</td>
            `;
            tableBody.appendChild(row);
        });
    }
});
