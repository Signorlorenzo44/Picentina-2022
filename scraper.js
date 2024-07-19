const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

const url = 'https://www.tuttocampo.it/2023-24/Campania/SA/SecondaCategoria/GironeG/Classifica';

app.get('/api/classifica', async (req, res) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        let classifica = [];

        $('table.classifica tbody tr').each((i, elem) => {
            const posizione = $(elem).find('td').eq(0).text().trim();
            const squadra = $(elem).find('td').eq(1).text().trim();
            const punti = $(elem).find('td').eq(2).text().trim();
            
            classifica.push({ posizione, squadra, punti });
        });

        res.json(classifica);
    } catch (error) {
        console.error(error);
        res.status(500).send('Errore nel recuperare i dati della classifica');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});
