const Tweets = require("./tweet.js");


function getListeTweets(){

	var allTweets = Tweets.getAllTweets();
	var allHashTags =  Tweets.getAllHashTags(allTweets);
	var listeOrdonnée = [];

	for(var k = 0; k < allHashTags.length; k++){
		
		iterate = 0;
		ptiteListe = [];

		allTweets.forEach(function(tweet){

			//On récupère les HashTags d'un Tweet dans une variable
			ht = tweet.hashtags.split(" ");

			//on affiche le tweet si il possède le hashtag 'k'
			if(ht.includes(allHashTags[k])){
				ptiteListe[iterate] = tweet.text;
				iterate++;
			}
			
		});

		listeOrdonnée[k] = ptiteListe;
	}
	return listeOrdonnée;
}

module.exports.getListeTweets = getListeTweets;
