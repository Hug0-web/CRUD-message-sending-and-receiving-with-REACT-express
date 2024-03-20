import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Components
import Inscription from './components/inscription.jsx'
import Connexion from './components/connexion.jsx'
import PageUser from './components/pageUser.jsx'

// Styles & Assets
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [Connected, SetConnected] = useState(null) // détermine si l'utilisateur est connecté ou non
  const [IsInscription, SetIsInscription] = useState(true) // affiche la page d'inscription par défaut

  const toggleInscription = () => {
    SetIsInscription(!IsInscription)
  }

  useEffect(() => { //test de connexion pour voir si il est fonctionnel
    axios.get("http://localhost:3000/")
    .then(response => {
      console.log(response.status, response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, [])
  /*conditions qui demande si Connected == true, si true il affiche la page User,
  sinon il renvoie à la page d'inscription avec une autre condition si inscription == false,
  il faut s'inscrire, si true il renvoie à la page de connexion*/
  return (
    <React.Fragment>
      {Connected ?
      <PageUser Connected={Connected} SetConnected={SetConnected}/>
      :
      <div>
        <button onClick={toggleInscription}>{IsInscription ?  "Déjà inscrit ?" : "Pas encore inscrit ?"}</button>
        {IsInscription ?
          <Inscription toggleInscription={toggleInscription}/>
          :
          <Connexion SetConnected={SetConnected}/>
        }
      </div>
      }
    </React.Fragment>
  )
}

export default App;