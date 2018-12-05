const SPEC_2 = require("./spec_2.js")
const SPEC_3 = require("./spec_3.js")
const spec_4 = require("./spec_4.js");
const spec_5 = require("./spec_5.js");
const program = require('caporal');
const fs = require('fs');

exports.module = require('caporal')


	//SPEC_2
	.command("get10TweetPopulaireAvecTagPopulaire", "Consulter le top 10 des tweets comportant le hashtag ayant été le plus retweeté")
	.action(function (args, options, logger){
		rs = SPEC_2.get10TweetPopulaireAvecTagPopulaire(SPEC_2.TagPlusPopulaire());
		console.log(rs);

		let stresult = "Les 10 tweets associés au HashTag le plus populaire \"" + SPEC_2.TagPlusPopulaire() + "\" sont :";
		rs.forEach(element => {
			stresult = stresult.concat("\r\n");
			stresult = stresult.concat(element.tweet_url);
			stresult = stresult.concat(",");
			stresult = stresult.concat(element.retweet_count);
			stresult = stresult.concat(",");
		});

		fs.writeFile('10TweetPopulaireAvecTagPopulaire.txt', stresult, function (err) {
			if (err) throw err;
			console.log("Un fichier comportant le résultat de la requête a été généré !");
		});
	})

	//SPEC_3
	.command("getAuteurPopulaireAvecTagPopulaire", "Consulter le top 10 des auteurs de tweets comportant le hashtag ayant été le plus retweeté")
	.action(function (args, options, logger){
		rs = SPEC_3.getAuteurPopulaireAvecTagPopulaire(SPEC_2.TagPlusPopulaire());
		console.log(rs);
		
		let stresult = "Les auteurs associés au HashTag le plus populaire \"" + SPEC_2.TagPlusPopulaire() + "\" sont :";
		rs.forEach(function(value, key)  {
			stresult = stresult.concat("\r\n");
			stresult = stresult.concat(key);
			stresult = stresult.concat(",");
			stresult = stresult.concat(value);
			stresult = stresult.concat(",");
	
		});

		fs.writeFile('10AuteursPopulaireAvecTagPopulaire.txt', stresult, function (err) {
			if (err) throw err;
			console.log("Un fichier comportant le résultat de la requête a été généré !");
		});
	})

    //SPEC_4
	.command("getRelatedHashtags", "Retourne une liste de HashTags ayant été liés au HashTag recherché.")
	.argument("<hashtag>", "Entrez un HashTag dont vous cherchez les relations.")

	.action(function (args, options, logger){
		rs = spec_4.getRelatedHashtags(args.hashtag);
		rs.sort();
		console.log("Les HashTags associés au HashTag \"" + args.hashtag + "\" sont :");
		console.log(rs);

		let stresult = "Les HashTags associés au HashTag \"" + args.hashtag + "\" sont :";
		rs.forEach(element => {
			stresult = stresult.concat("\r\n", element, ",");
		});

		fs.writeFile('relatedHashtags.txt', stresult, function (err) {
			if (err) throw err;
			console.log("Un fichier comportant le résultat de la requête a été généré !");
		});
    })
    

    //SPEC_5
	.command("getLocatedTweets", "Retourne le nombre de Tweets ayant été postés depuis la localisation saisie.")
	.argument("<location>", "Entrez une localisation pour connaître le nombre de Tweets postés depuis celle-ci. Ex : England")

	.action(function (args, options, logger){
		console.log(spec_5.getLocatedTweets(args.location) + " tweets ont été postés depuis \"" + args.location + "\"");
	})

program.parse(process.argv);