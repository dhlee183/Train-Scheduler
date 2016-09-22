// Initialize Firebase
var config = {
	apiKey: "AIzaSyAl9EFNpn314Fh1PJytmpc5raPzvlksYdI",
	authDomain: "train-scheduler-42a88.firebaseapp.com",
	databaseURL: "https://train-scheduler-42a88.firebaseio.com",
	storageBucket: "",
	messagingSenderId: "44203733054"
};
firebase.initializeApp(config);

var database = firebase.database();

$('#submitButton').on('click', function() {
	var trName = $('#trainName').val().trim();
	var dest = $('#destination').val().trim();
	var trTime = $('#trainTime').val().trim();
	var freq = $('#frequency').val().trim();

	database.ref().push({
		TrainName: trName,
		Destination: dest,
		TrainTime: trTime,
		Frequency: freq
	});

	return false;
});

database.ref().on('child_added', function(snapshot) {
	var info = snapshot.val();
	console.log(info);

	$('#stats').prepend('<tr><td>' + info.TrainName + '</td><td>' 
	+ info.Destination + '</td><td>' 
	+ info.Frequency + '</td></tr>');
	
	}, function (errorObject) {
		console.log('The read failed: ' + errorObject.code);
});