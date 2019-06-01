var auth = firebase.auth();
var db = firebase.firestore();

function login(provider) {
	switch (provider) {
		case 'gmail':
			var provider = new firebase.auth.GoogleAuthProvider(); break;
		case 'fb':
			var provider = new firebase.auth.FacebookAuthProvider(); break;
		case 'twitter':
			var provider = new firebase.auth.TwitterAuthProvider(); break;
		default:
	}

	firebase.auth().signInWithPopup(provider).then(function(result) {
		var token = result.credential.accessToken;
		var user = result.user

		db.collection('users').doc(user.uid).get()
		.then(function(doc) {
			if(doc.exists) {
				console.log("User exists")
			} else {
				db.collection('users').doc(user.uid).set({
					name: user.displayName
				});
				console.log("User successfully registered")
			}
		});
	}).catch(function(error) {
	  console.log(error)
	});
}

function logout() {
	auth.signOut().then(function() {
		alert("Successfully logged out..");
	});
}

var currentUser = null;
auth.onAuthStateChanged(function(user){
	if (user) {
		currentUser = user
		console.log(currentUser)
	}
});

function addTopic() {
	var title  = document.getElementById('title').value
	var desc = document.getElementById('desc').value
	var slug = title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g,'-')

	db.collection('forums').add({
		title		: title,
		slug		: slug,
		desc		: desc.replace("<br />", "\n"),
		created_at 	: new Date(),
		updated_at 	: new Date(),
		user : {
			user_id : currentUser.uid,
			username : currentUser.displayName
		}
	}).then(function(docRef){
		alert("The forum was successfully created")
	}).catch(function(err){
		alert("There was an error adding the forum")
	})
}
