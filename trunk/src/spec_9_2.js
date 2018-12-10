const Tweets = require("./tweet.js");
const fs = require('fs');

let AllTweets = Tweets.getAllTweets();
let TabHashTags = Tweets.getAllHashTags(AllTweets);
let HashTagsRTCount = [];
let tabHashTagsduntweet = [];
let max = 0;
let maxtag = "";
let stresult = "";

function vizualizeTopTweets(){
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
    
    
    stresult = stresult.concat("<!DOCTYPE html><head><title>Visualisation meilleurs HashTags</title><meta charset=\"utf-8\"><script src=\"https://cdn.jsdelivr.net/npm/vega@4.3.0/build/vega.js\"></script><script src=\"https://cdn.jsdelivr.net/npm/vega-lite@3.0.0-rc10/build/vega-lite.js\"></script><script src=\"https://cdn.jsdelivr.net/npm/vega-embed@3.24.1/build/vega-embed.js\"></script><style media=\"screen\">.vega-actions a {margin-right: 5px;}</style></head><body><h1>Visualisation des 10 HashTags les plus retweetés</h1><div id=\"vis\"></div><script>var vlSpec = {\"$schema\": \"https://vega.github.io/schema/vega-lite/v3.json\",\"data\": {\"values\": [");
    
    for(var i = 0; i <= 9; i++){
        trouve = true;
        max = 0;
        while(trouve){
            trouve = false;
            TabHashTags.forEach((hashtag) => {
                if(HashTagsRTCount[hashtag.toLowerCase()] > max){
                    max = HashTagsRTCount[hashtag.toLowerCase()];
                    maxtag = hashtag.toLowerCase();
                    trouve = true;
                    HashTagsRTCount[maxtag] = 0;
                }
            });
        }
        stresult = stresult.concat("{\"a\": \"" + maxtag + "\", \"b\": " + max + "},");
    }
    
    stresult = stresult.substring(0,stresult.length-1);
    stresult = stresult.concat("]},\"mark\": \"bar\", \"height\": \"600\", \"encoding\": {\"x\": {\"field\": \"a\",\"type\": \"nominal\",\"axis\": {\"title\": \"HashTags\"},\"scale\": {\"rangeStep\": 30}, \"sort\": []},\"y\": {\"aggregate\": \"average\",\"field\": \"b\",\"type\": \"quantitative\",\"axis\": {\"title\": \"Nombre de retweets\"}}},\"config\": {\"axisY\": {\"minExtent\": 30}}};vegaEmbed(\"#vis\", vlSpec);</script></body></html>");
    
    fs.writeFile('./results/visuTopHashTag.html', stresult, function (err) {
        if (err) throw err;
        console.log("Une page HTML (visuTopHashTag.html) comportant le résultat de la requête a été générée !");
    });
}

module.exports.vizualizeTopTweets = vizualizeTopTweets;