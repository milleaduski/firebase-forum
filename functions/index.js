const functions = require('firebase-functions');
const express = require('express');
const hbs = require('express-handlebars');
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

// Prev tutorials
app.engine('hbs', cons.handlebars);

//USE NEW TUTORIAL PART 16
// app.engine('hbs', hbs({
// 	extname: 'hbs',
// 	partialsDir: __dirname + '/views/partials'
// }));

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

		// Load replies
		var replies=[]
		db.collection('forums').doc(forum.id).collection('replies').get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					replies.push({
						data: doc.data(),
						id:doc.id
					})
				})
				res.render('forum-detail', {forum:forum, replies:replies})
			}).catch(function(err) {
				console.log("There is something wrong")
			})
	}).catch(err => {
		console.log(err)
	})
});

exports.app = functions.https.onRequest(app);