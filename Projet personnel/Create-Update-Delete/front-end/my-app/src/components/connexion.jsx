import React, { useState, useEffect } from "react"
import axios from 'axios'

function Connexion({SetConnected}) {
    const [Email, SetEmail] = useState("")
    const [Password, SetPassword] = useState("")
  
    const UserSubmit = (event) => {
      event.preventDefault()
      const User = {Email: Email, Password: Password}

      console.log("User : ", User)
      axios
        .post("http://localhost:3000/GetUser", User)
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            SetConnected(response.data)
            alert("Vous êtes connecté")
          }
        })
        .catch((error) => {
            alert("Erreur " + error.response.status + " : " + error.response.data.message)
        })
    }
    return (
      <React.Fragment>
        <h1>Formulaire de connexion</h1>
        <form onSubmit={UserSubmit}>
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
  
          <button type="submit">Se connecter</button>
        </form>
      </React.Fragment>
    );
  }
  
  export default Connexion;