const Tweets = require("./tweet.js");
const fs = require('fs');

let AllTweets = Tweets.getAllTweets();
let TabHashTags = Tweets.getAllHashTags(AllTweets);
let HashTagsRTCount = [];
let tabHashTagsduntweet = [];

function getHashTagRT(hashtag){
    if(TabHashTags.includes(hashtag.toLowerCase())){
        TabHashTags.forEach(element => {
            element = element.toLowerCase();
            HashTagsRTCount[element] = 0;
        });
        HashTagsRTCount = HashTagsRTCount.sort();

        AllTweets.forEach(element => {
            ht = element.hashtags;
            tabHashTagsduntweet = ht.split(" ");

            tabHashTagsduntweet.forEach(function(unhashtagduntweet) {
                HashTagsRTCount[unhashtagduntweet.toLowerCase()] = HashTagsRTCount[unhashtagduntweet.toLowerCase()] + parseInt(element.retweet_count);
            });
        });
        console.log("Le HashTag " + hashtag + " a été retweeté " + HashTagsRTCount[hashtag.toLowerCase()] + " fois.");
        if(HashTagsRTCount[hashtag.toLowerCase()] < 5){
            console.log("Le succès n'est pas garanti...");
        }
        else if(HashTagsRTCount[hashtag.toLowerCase()] < 10){
          console.log("Le succès sera mitigé");
        }
        else{
            console.log("Ça va marcher c'est sur !");
        }
    }
    else{
        console.log("Ce HashTag n'a jamais été utilisé, bonne chance !");
    }
}


module.exports.getHashTagRT = getHashTagRT;
