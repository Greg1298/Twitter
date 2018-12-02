var Papa = require('./parser.js');
let fs = require('fs');

let Alltweets = [];
let pathOfTweets = ["donneesSujetA/Fri Mar 23/tweets.csv", 
					"donneesSujetA/Mon Mar 19/tweets.csv",
					"donneesSujetA/Mon Mar 26/tweets.csv",
					"donneesSujetA/Sat Mar 17/tweets.csv",
					"donneesSujetA/Sat Mar 24/tweets.csv",
					"donneesSujetA/Sun Mar 18/tweets.csv",
					"donneesSujetA/Thu Mar 22/tweets.csv",
					"donneesSujetA/Tue Mar 20/tweets.csv",
					"donneesSujetA/Wed Mar 21/tweets.csv"];


//Sépare tous les Tweets d'un fichier et les met dans le tableau Alltweets
function parseTweets(fichierDeTweet){
	var results = Papa.parse(fs.readFileSync(fichierDeTweet,'utf8'), {
		header: true,
		complete: function(results) {
			tweets = results.data;

			for(var i = 0; i<tweets.length; i++){
				Alltweets.push(tweets[i]);
			}
		}
	});
}

//Itère sur tous les fichiers de Tweet déclarés dans la variable pathOfTweets
function getAllTweets(){
	for(var j = 0; j<pathOfTweets.length; j++){
		parseTweets(pathOfTweets[j]);
	}
	return Alltweets;
}

//Retourne un tableau comportant tous les HashTags différents de tous les Tweets
function getAllHashTags(tableaudetweets){

	let TousleshashTags = [];
	let tabHashTagsduntweet = [];

	for(var k = 0; k < tableaudetweets.length; k++){
		ht = tableaudetweets[k].hashtags;
		tabHashTagsduntweet = ht.split(" ");
		tabHashTagsduntweet.forEach(function(unhashtagduntweet) {
			contain = false;
			TousleshashTags.forEach(function(entree){
				if(entree.toLowerCase().indexOf(unhashtagduntweet.toLowerCase()) != -1){
					contain = true;
				}
			});
			if(contain == false && unhashtagduntweet != ""){
		  		TousleshashTags.push(unhashtagduntweet);
			}
		});
	}
	return TousleshashTags;
}

module.exports.getAllTweets = getAllTweets;
module.exports.getAllHashTags = getAllHashTags;