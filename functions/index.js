const functions = require('firebase-functions');
const express = require('express');
const cons = require('consolidate');


// Require firebase-admin
const admin = require('firebase-admin');

var serviceAccount = require("private-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://forum-firebase-b3205.firebaseio.com"
});
// end setting

const db = admin.firestore();
const app = express();

app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/forum', function(req, res) {

	db.collection('forums').orderBy('updated_at', 'desc').get()
	.then(snapshot => {
		snapshot.forEach(doc => {
			forums.push(doc.data())
		})
	}).catch(err => {
		console.log(err)
	})
	res.render('home')
});
exports.app = functions.https.onRequest(app);