const functions = require('firebase-functions');
const express = require('express');
const cons = require('consolidate');


// Require firebase-admin
const admin = require('firebase-admin');

var serviceAccount = require("./private-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://forum-firebase-b3205.firebaseio.com"
});

const firestore = admin.firestore();

// Add this magical line of code:
firestore.settings({ timestampsInSnapshots: true });
// end setting

const db = admin.firestore();
const app = express();

app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/forum', function(req, res) {
var forums = [];
	db.collection('forums').orderBy('updated_at', 'desc').get()
	.then(snapshot => {
		snapshot.forEach(doc => {
			forums.push(doc.data())
		})
		res.render('home', {dataForums:forums})
	}).catch(err => {
		console.log(err)
	})
})

app.get('/forum/:slug', function(req, res) {
var forum = null;
	db.collection('forums').where('slug', '==', req.params.slug).get()
	.then(snapshot => {
		snapshot.forEach(doc => {
			forum = doc.data()
			forum.id = doc.id
		})
		res.render('forum-detail', {forum:forum})
	}).catch(err => {
		console.log(err)
	})
});

exports.app = functions.https.onRequest(app);