var auth = firebase.auth();

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
		console.log(result)
	  alert("Successfully logged in..");
	}).catch(function(error) {
	  console.log(error)
	});
}

function logout() {
	auth.signOut().then(function() {
		alert("Successfully logged out..");
	});
}