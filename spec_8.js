const Tweets = require("./tweet.js");


function getListeTweetSurFichier(){

	var allTweets = Tweets.getAllTweets();
	var listeOrdonnée = [];
	var iterate = 0;
	allTweets.forEach(function(tweet){
		rs = "\r\n\r\n\r\nCoordinates : " + tweet.coordinates;
		rs = rs.concat("\r\nCreated_at : " + tweet.created_at);
		rs = rs.concat("\r\nHashtags : " + tweet.hashtags);
		rs = rs.concat("\r\nMedia : " + tweet.media);
		rs = rs.concat("\r\nUrls : " + tweet.urls);
		rs = rs.concat("\r\nFavorite_count : " + tweet.favorite_count);
		rs = rs.concat("\r\nID : " + tweet.id);
		rs = rs.concat("\r\nLangue : " + tweet.lang);
		rs = rs.concat("\r\nPossibly_sensitive : " + tweet.possibly_sensitive);
		rs = rs.concat("\r\nRetweet_count : " + tweet.retweet_count);
		rs = rs.concat("\r\nRetweet_screen_name : " + tweet.retweet_screen_name);
		rs = rs.concat("\r\nSource : " + tweet.source);
		rs = rs.concat("\r\nText : " + tweet.text);
		rs = rs.concat("\r\ntweet_url : " + tweet.tweet_url);
		rs = rs.concat("\r\nUser_created_at : " + tweet.user_created_at);
		rs = rs.concat("\r\nUser_screen_name : " + tweet.user_screen_name);
		rs = rs.concat("\r\nuser_description : " + tweet.user_description);
		rs = rs.concat("\r\nuser_favourites_count : " + tweet.user_favourites_count);
		rs = rs.concat("\r\nuser_followers_count : " + tweet.user_followers_count);
		rs = rs.concat("\r\nuser_friends_count : " + tweet.user_friends_count);
		rs = rs.concat("\r\nuser_listed_count : " + tweet.user_listed_count);
		rs = rs.concat("\r\nuser_location : " + tweet.user_location);
		rs = rs.concat("\r\nuser_name : " + tweet.user_name);
		rs = rs.concat("\r\nuser_statuses_count : " + tweet.user_statuses_count);
		rs = rs.concat("\r\nuser_time_zone : " + tweet.user_time_zone);
		rs = rs.concat("\r\nuser_urls : " + tweet.user_urls);
		rs = rs.concat("\r\nuser_verified : " + tweet.user_verified);
		listeOrdonnée[iterate] = rs;	
		iterate++;	
	});

	return listeOrdonnée;
}

module.exports.getListeTweetSurFichier = getListeTweetSurFichier;