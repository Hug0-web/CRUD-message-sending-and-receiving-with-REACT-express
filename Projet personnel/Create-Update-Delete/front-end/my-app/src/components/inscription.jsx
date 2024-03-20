import React, { useState, useEffect } from "react"
import axios from 'axios'

function Inscription({toggleInscription}) {
  const [Nom, SetNom] = useState("");
  const [Age, SetAge] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  
//incription d'un utilisateur en cliquant sur un bouton
  const UserSubmit = (event) => {
    event.preventDefault();
    const NewUser = { Nom: Nom, Age: Age, Email: Email, Password: Password};
    console.log("NewUser : ", NewUser);
    axios
      .post("http://localhost:3000/NewUser", NewUser)
      .then((response) => {
        console.log(response)
        toggleInscription()
        alert("Votre compte à bien été crée")
      })
      .catch((error) => {
        alert("Erreur " + error.response.status + " : " + error.response.data.message)
      })
  }
  return (
    <React.Fragment>
      <h1>Formulaire d'inscription</h1>
      <form onSubmit={UserSubmit}>
        <div>
          <label>Entrez votre nom : </label>
          <input
            type="text"
            value={Nom}
            onChange={(event) => SetNom(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Entrez votre age : </label>
          <input
            type="number"
            value={Age}
            onChange={(event) => SetAge(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Entrez votre email : </label>
          <input
            type="email"
            value={Email}
            onChange={(event) => SetEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Entrez votre mot de passe : </label>
          <input
            type="password"
            value={Password}
            onChange={(event) => SetPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit">S'inscrire</button>
      </form>
    </React.Fragment>
  );
}

export default Inscription;
