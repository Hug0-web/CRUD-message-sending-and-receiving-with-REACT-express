import React, {useState, useEffect} from "react"
import axios from "axios"

function Message({setMessaging, User}) {
  console.log("message", User)
  const [message, SetMessage] = useState("")
  const [receiver, SetReceiver] = useState("")
  const [listMessage, SetListMessage] = useState([])

  const MessageChange = (event) => {
    event.preventDefault()
    SetMessage(event.target.value)
  }

  const ReceiverChange = (event) => {
    event.preventDefault()
    SetReceiver(event.target.value)
  }

  const EnvoieMessage = (event) => {
    event.preventDefault()
    axios
        .post("http://localhost:4000/SendMessage", {User: User, Receiver: receiver, Message: message})
        .then((response) => {
          console.log(response.status, response.data)
          RecupMessage()
        })
        .catch((error) => {
            console.log(error)
            alert("Erreur " + error.response.status + " : " + error.response.data.message)
        })
  }

  const RecupMessage = () => { // récupère les messages de l'utilisateur (envoyés et reçus)
    axios
        .post("http://localhost:4000/RecupMessage", User)
        .then((response) => {
          console.log(response)
          SetListMessage(response.data)
        })
        .catch((error) => {
            console.log(error)
            alert("Erreur " + error.response.status + " : " + error.response.data.message)
        })
  }
  //initialise RecupMessage au début et pour chaque message envoyé
  useEffect(() => {
    RecupMessage()
  }, [])

  

  return (
    <div>
        <button onClick={() => setMessaging(false)}>Retour</button>

        <div>
            <label>Envoyer à :</label><br></br>
            <input type="text" value={receiver} onChange={ReceiverChange} /><br></br>
            <label>Message :</label><br></br>
            <input type="text" value={message} onChange={MessageChange} /><br></br>
            <button onClick={EnvoieMessage}>Envoyez le message</button>
        </div>

        <h1>Liste des messages</h1>
            {listMessage.map((message, index) => (
                <div key={index}>
                    <p>De : {message.User.Email}</p>
                    <p>À : {message.Receiver}</p>
                    <p>Message : {message.Message}</p>
                </div>
            ))}
    </div>
  )
}

export default Message;
