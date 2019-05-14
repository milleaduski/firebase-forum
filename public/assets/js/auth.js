var auth = firebase.auth();

function login() {
	var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {

	  alert("Successfully logged in..");
	}).catch(function(error) {
	  console.log(error)
	});
}