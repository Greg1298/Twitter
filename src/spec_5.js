const Tweets = require("./tweet.js");


function getLocatedTweets(location){
    let nbtweets = 0;
    allTweets = Tweets.getAllTweets();
    allTweets.forEach(tweet => {
        loc = tweet.user_location;
        sp = loc.split(", ");
        sp.forEach(element => {
            if(element.toLowerCase().indexOf(location.toLowerCase()) != -1){
                nbtweets++;
            }
        });
    });
    return nbtweets;
}


module.exports.getLocatedTweets = getLocatedTweets;
