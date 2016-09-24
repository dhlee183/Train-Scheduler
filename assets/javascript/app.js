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
		Frequency: freq,
		FirstTrainTime: trTime,
	});	

	$('#trainName').val("")
	$('#destination').val("");
	$('#trainTime').val("");
	$('#frequency').val("");

	return false;
});

database.ref().on('child_added', function(snapshot) {
	var info = snapshot.val();

	var trainTime = info.FirstTrainTime
	var tFreq = info.Frequency

	var trainTimeConverted = moment(trainTime, 'hh:mm').subtract(1, 'years');

	var diffTime = moment().diff(moment(trainTimeConverted), 'minutes');

	var tRemain = diffTime % tFreq;

	var tMinutesTillTrain = tFreq - tRemain;

	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var arrTime = moment(nextTrain).format('hh:mm A');

	$('#stats').prepend('<tr><td>' + info.TrainName + '</td><td>' 
	+ info.Destination + '</td><td>' 
	+ info.Frequency + '</td><td>' + arrTime + '</td><td>' 
	+ tMinutesTillTrain + '</td></tr>');
	
	}, function (errorObject) {
		console.log('The read failed: ' + errorObject.code);
});