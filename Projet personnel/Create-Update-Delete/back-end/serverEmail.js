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

const Messages = []

//envoie les messages dans la liste Message avec les données (User, Receiver et message)
app.post('/SendMessage', (req, res) => {
    console.log(req.body) // .User .receiver .message
    Messages.push(req.body)
    res.status(200).send("Message envoyé")
})

//sert à récuperer les messages de l'utilisateur (envoyés et reçu)
app.post('/RecupMessage', (req, res) => {
    console.log(req.body)
    const listMessages = []
    for (let i = 0; i < Messages.length; i++) {
        if (Messages[i].receiver === req.body.Email || Messages[i].User.Email === req.body.Email) {
            listMessages.push(Messages[i])
        }
    }
    res.status(200).send(listMessages)
})

app.listen(4000, () => {
    console.log("Le serveur est actif sur le port 4000")
})