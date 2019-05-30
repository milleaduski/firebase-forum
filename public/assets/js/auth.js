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
