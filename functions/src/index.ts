import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
admin.initializeApp(functions.config().firebase);
const app = express();
const main = express();
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

// Create
app.post('/contacts', (req, res) => {
    return admin.database().ref('/contacts')
        .push(req.body).then(snapshot => res.status(200).send('Create finished'));
})

// Get
app.get('/contacts', (req, res) => {
    return admin.database().ref('/contacts')
        .once('value').then(snapshot => res.status(200).send(snapshot))
})

// GetItem
app.get('/contacts/:contactId', (req, res) => {
    return admin.database().ref('/contacts/' + req.params.contactId)
        .once('value').then(snapshot => res.status(200).send(snapshot))
})

// Update new contact
app.patch('/contacts/:contactId', (req, res) => {
    return admin.database().ref('/contacts/' + req.params.contactId)
        .update(req.body).then(snapshot => res.status(200).send('Update finished'))
})

//Delete
app.delete('/contacts/:contactId', (req, res) => {
    return admin.database().ref('/contacts/' + req.params.contactId)
        .remove().then(snapshot => res.status(200).send('Delete finished'))
})


// webApi is your functions name, and you will pass main as 
// a parameter
export const webApi = functions.https.onRequest(main);