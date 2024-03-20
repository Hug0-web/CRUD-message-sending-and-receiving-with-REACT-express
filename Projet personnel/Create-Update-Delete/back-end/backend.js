const express = require("express");
const cors = require("cors");
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Le serveur est connecté");
});

const User = [];

app.post('/GetUser', (req, res) => { // connexion
    console.log(req.body)
    console.log(User)
    for (let i = 0; i < User.length; i++) { // check si l'utilisateur existe
        if (User[i].Email === req.body.Email && User[i].Password === req.body.Password) {
            res.status(200).json(User[i])
            return
        }
    }
    res.status(401).json({ message: 'Utilisateur non trouvé' })
    
})

app.post('/NewUser', (req, res) => { // création d'un utilisateur
    console.log(req.body);
    // check si l'email est déjà pris
    for (let i = 0; i < User.length; i++) {
        if (User[i].Email === req.body.Email) {
            res.status(401).json({ message: "l'utilisateur existe déjà" });
            return
        }
    }
    
    User.push(req.body);
    res.status(200).json({ message: "réussite de la création de l'utilisateur" });
});

app.put('/UpdateUser', (req, res) => {
    console.log(req.body) // l'utilisateur avec la modification, ex : [User, {Nom: "toto"}]
    for (let i = 0; i<User.length; i++){
        if (User[i].Email === req.body[0].Email && User[i].Password === req.body[0].Password){
            // {Nom: "toto"} => User[i].Nom = "toto"
            User[i][Object.keys(req.body[1])[0]] = Object.values(req.body[1])[0]
            res.status(200).json(User[i])
            return
        }
    }
    res.status(401).json({ message: 'Utilisateur non trouvé' })
})

app.put('/DeleteUser', (req, res) => {
    console.log(req.body)
    for (let i = 0; i < User.length; i++) {
        if (User[i].Email === req.body.Email) {
            User.splice(i, 1) // supprime l'utilisateur
            res.status(200).json({ message: 'Suppression du compte réussie' });
            return
        }
            
    }
    res.status(401).json({message: 'Utilisateur non trouvé'})
})

app.listen(3000, () =>{
    console.log("Le serveur est actif sur le port 3000");
});