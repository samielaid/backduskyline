const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3015;
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'  
}));

// definition du schema du voiture
const schemadevoiture = new mongoose.Schema({
    ID: Number,
    consommationParLitre: Number,
    kilometrage: Number
}, { collection: 'voitures' });

const Voiture = mongoose.model('voiture', schemadevoiture);



mongoose.connect('mongodb+srv://samielaid26:semsem@cluster0.pblnohb.mongodb.net/skyline')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(err => console.error('Connexion à MongoDB échouée :', err));


app.use(express.json());

// recuperer tout les voiture
app.get('/voitures', async (req, res) => {
    try {
        const voitures = await Voiture.find();
        res.json(voitures);
    } catch (error) {
        console.error("Erreur lors de telechargementvoitures:", error);
        res.status(500).json({ message: "Erreur lors de la recuperation des voitures" });
    }
});

/
app.listen(PORT, () => {
    console.log(`Le serveur fonctoionne sur le port ${PORT}`);
});
 