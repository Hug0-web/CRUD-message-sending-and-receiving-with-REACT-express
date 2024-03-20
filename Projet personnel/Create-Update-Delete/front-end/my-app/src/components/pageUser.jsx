import React, {useState} from "react";
import axios from "axios";

import Message from "./message";

function PageUser({SetConnected, Connected}){ // todo : obtenir le user actuel

  const [User, setUser] = useState(Connected)
  const [Messaging, setMessaging] = useState(false)
  console.log(User)

  const Disconnect = (event) => {
      event.preventDefault();
      alert("Déconnexion réussie !")
      SetConnected(null) // deconnexion
    }

    const DeleteUser = (event) => {
      event.preventDefault();
      axios
        .put("http://localhost:3000/DeleteUser", User)
        .then((response) => {
          console.log(response)
          alert("Suppression réussie !")
          SetConnected(null) // deconnexion
        })
        .catch((error) => {
          alert("Erreur " + error.response.status + " : " + error.response.data.message)
        })
    }
    
    const UpdateUser = (UserModif) =>  {
      axios
        .put("http://localhost:3000/UpdateUser", UserModif)
        .then((response) => {
          console.log(response.status, response.data)
          alert("Modification réussie !")
          setUser(response.data)
        })
        .catch((error) => {
          alert("Erreur " + error.response.status + " : " + error.response.data.message)
        })
    }
     
    //en appuyant sur le bouton de modif, fait apparaitre un prompt dans laquelle on rentre un string qui nous permettra de modifier les données
    const ModifNom = (event) => {
      event.preventDefault();
      let ModifNom = prompt("Modifiez le nom :", User.Nom)
      if (ModifNom ==! null) {
        while(ModifNom === User.Nom) {
          ModifNom = prompt("Modifiez le nom :", User.Nom)
        }
        UpdateUser([User, {Nom: ModifNom}])
      }
    }

    const ModifAge = (event) => {
      event.preventDefault();
      let ModifAge = prompt("Modifiez l'age :", User.Age)
      if (ModifAge ==! null) {
        while(ModifAge === User.Age) {
          ModifAge = prompt("Modifiez l'age :", User.Age)
        }
        UpdateUser([User, {Age: ModifAge}])
      }
    }

    const ModifEmail = (event) => {
      event.preventDefault();
      let ModifEmail = prompt("Modifiez l'email :", User.Email)
      if (ModifEmail ==! null) {
        while(ModifEmail === User.Email) {
          ModifEmail = prompt("Modifiez l'email :", User.Email)
        }
        UpdateUser([User, {Email: ModifEmail}])
      }
    }

    const ModifPassword = (event) => {
      event.preventDefault();
      let ModifPassword = prompt("Modifiez le Password :")
      if (ModifPassword ==! null) {
        while(ModifPassword === User.Password) {
          ModifPassword = prompt("Modifiez le Password :")
        }
        UpdateUser([User, {Password: ModifPassword}])
      }
    }

    return(
      <React.Fragment>
        {Messaging ? <Message setMessaging={setMessaging} User={User}/> : 
        <div>
        <h1>Page Utilisateur</h1>
        <form>
          <div>
            <label>Votre Nom : {User.Nom}</label>
            <button onClick={ModifNom}>Modifiez votre Nom</button>
          </div>
          <div>
            <label>Votre Age : {User.Age}</label>
            <button onClick={ModifAge}>Modifiez votre Age</button>
          </div>
          <div>
            <label>Votre Email : {User.Email}</label>
            <button onClick={ModifEmail}>Modifiez votre Email</button>
          </div>
          <div>
            <label>Votre Password : </label>
            <button onClick={ModifPassword}>Modifiez votre Password</button>
          </div>
          
        </form>
        <button onClick={DeleteUser}>Supprimez votre compte</button>
        <button onClick={Disconnect}>Se deconnecter</button>
        <button onClick={() => setMessaging(true)}>Envoyer un message</button>
        </div>
      }
      </React.Fragment>
    )
}
        
export default PageUser;