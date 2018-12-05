const Tweets = require("./tweet.js");


function getNbTweet(tag, debut, fin){
    
    allTweets = Tweets.getAllTweets();
    
    var tweetDeb = debut.split('/');
    var tweetFin = fin.split('/');
    
    //On convertit les dates en secondes
    var timeSecondDeb = parseInt(tweetDeb[5]) + 60*parseInt(tweetDeb[4]) + 3600*parseInt(tweetDeb[3]) + 86400*parseInt(tweetDeb[2]) + 2628000*parseInt(tweetDeb[1]) + 31540000*parseInt(tweetDeb[0]-2000);
    
    var timeSecondFin = parseInt(tweetFin[5]) + 60*parseInt(tweetFin[4]) + 3600*parseInt(tweetFin[3]) + 86400*parseInt(tweetFin[2]) + 2628000*parseInt(tweetFin[1]) + 31540000*parseInt(tweetFin[0]-2000);
    
    var x = 0;
    var tweetSelected = [];
    
    for ( var i = 0; i < allTweets.length; i++) {
        //On récupère la date de création du tweet et on la converti en seconde
        var tweetCreate = allTweets[i].created_at;
        
        tweetCreate = tweetCreate.split(' ');
        let annee = tweetCreate[5];
        let mois = tweetCreate[1];
        let moisTab = 'Jan/Feb/Mar/Apr/May/Jun/Jul/Aug/Sept/Oct/Nov/Dec';
        moisTab = moisTab.split('/');
        let k=0;
        let moisNum = 0;
        while(mois!=moisTab[k]) {
            k++;
            moisNum=k;
        }
        moisNum++;
        let jour = tweetCreate[2];
        tweetDeHeure = tweetCreate[3].split(':');
        let heure = tweetDeHeure[0];
        let minute = tweetDeHeure[1];
        let seconde = tweetDeHeure[2];
        
        var timeSeconde = parseInt(seconde) + 60*parseInt(minute) + 3600*parseInt(heure) + 86400*parseInt(jour) + 2628000*parseInt(moisNum) + 31540000*parseInt(annee-2000);
        
        var tweetTags = [];
        tweetTags[i] = allTweets[i].hashtags.split(' '); 
        
        //Si le tweet est dans la période définie et possède le hashtag, il va dans tweetSelected 
        var y = 0;
        for(y=0; y<tweetTags[i].length; y++) {
            if (timeSecondDeb<timeSeconde && timeSeconde<timeSecondFin && tweetTags[i][y].toLowerCase()==tag.toLowerCase()) {
            tweetSelected[x] = allTweets[i];
            x++;
            }
        }
        
    }
    
    var nbTweet = tweetSelected.length;
    return nbTweet;
}
module.exports.getNbTweet = getNbTweet;
