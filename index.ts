import express from "express";
import {Customer, Message, Group} from "./types.ts";

//een voorbeeld klant
let customer:Customer = {
  name:"Electronica Experts BV",
  bearerToken:"4fsd6f54s6df54sdf",
  credits: 100
};

//express setup
const app = express();
app.set("port", 3000);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended:true}));

//bericht versturen
app.post("/sendMessage"), (req,res) => {
  const message:Message = req.body.message;

  //credits aftrekken van creditstand van klant
  customer.credits--;

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${customer.bearerToken}`
    },
    body: JSON.stringify({
      typing_time: 0,
      to: message.recipient,
      body: JSON.stringify(message.body)
    })
  };
  
  fetch('https://gate.whapi.cloud/messages/text', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

//groepen creëren
app.post("createGroup"), (req,res) => {
  const group:Group = req.body.group;

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${customer.bearerToken}`
    },
    body: JSON.stringify({subject: group.name, participants: group.participants})
  };
  
  fetch('https://gate.whapi.cloud/groups', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
}
app.listen(app.get("port"), async () => {

});

//bericht verwijderen
app.delete("/deleteMessage"), (req,res) => {
  const messageId = req.body.messageId;
  const options = {
    method: 'DELETE',
    headers: {accept: 'application/json', authorization: `Bearer ${customer.bearerToken}`}
  };
  
  fetch(`https://gate.whapi.cloud/messages/${messageId}`, options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
}


/*
TO DO: 
- instance bepalen, wie bericht stuurt
*/