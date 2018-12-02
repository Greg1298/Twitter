const Tweets = require("./tweet.js");
const program = require('caporal');

exports.module = require('caporal')

	.command("getLocatedTweets", "Retourne le nombre de Tweets ayant été postés depuis la localisation saisie.")
	.argument("<location>", "Entrez une localisation pour connaître le nombre de Tweets postés depuis celle-ci. Ex : England")

	.action(function (args, options, logger){
		console.log(getLocatedTweets(args.location) + " tweets ont été postés depuis \"" + args.location + "\"");
	})

program.parse(process.argv);


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
