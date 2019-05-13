const functions = require('firebase-functions');

const express = request('express');

const cons = require('consolidate');

const app = express()

app.engine('hsb', cons.handlesbar);
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/forum', function(req, res) {
	res.render('home')
})

exports.app = function.https.onRequest(app);