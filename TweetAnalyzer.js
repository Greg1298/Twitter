const spec_1 = require("./spec_1.js");
const spec_2 = require("./spec_2.js");
const spec_3 = require("./spec_3.js");
const spec_4 = require("./spec_4.js");
const spec_5 = require("./spec_5.js");
const spec_7 = require("./spec_7.js");
const spec_6 = require("./spec_6.js");
const spec_8 = require("./spec_8.js");
const spec_9_1 = require("./spec_9_1.js");
const program = require('caporal');
const fs = require('fs');
const Tweets = require("./tweet.js");
let stresult = "";

exports.module = require('caporal')


	//spec_1
	.command("getNbTweet", "Retourne le nombre de Tweet comportant le hashtag choisi.")
	.argument("<hashtag>", "Entrez un HashTag dont vous voulez connaître le nombre de Tweet.")
    .argument("<dateDebut>", "Entrer la date du début de la période recherchée au format AAAA/MM/JJ/HH/mm/ss.")
    .argument("<dateFin>", "Entrer la date de fin de la période recherchée au format AAAA/MM/JJ/HH/mm/ss.")
	.action(function (args, options, logger){
		rs = spec_1.getNbTweet(args.hashtag, args.dateDebut, args.dateFin);
		console.log("Le nombre de Tweets associés au HashTag \"" + args.hashtag + "\" entre le "+ args.dateDebut +" et "+ args.dateFin + " sont :");
		console.log(rs);

	})

	//spec_2
	.command("get10TweetPopulaireAvecTagPopulaire", "Consulter le top 10 des tweets comportant le hashtag ayant été le plus retweeté")
	.action(function (args, options, logger){
		rs = spec_2.get10TweetPopulaireAvecTagPopulaire(spec_2.TagPlusPopulaire());
		console.log(rs);

		let stresult = "Les 10 tweets associés au HashTag le plus populaire \"" + spec_2.TagPlusPopulaire() + "\" sont :";
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

	//spec_3
	.command("getAuteurPopulaireAvecTagPopulaire", "Consulter le top 10 des auteurs de tweets comportant le hashtag ayant été le plus retweeté")
	.action(function (args, options, logger){
		rs = spec_3.getAuteurPopulaireAvecTagPopulaire(spec_2.TagPlusPopulaire());
		console.log(rs);
		
		let stresult = "Les auteurs associés au HashTag le plus populaire \"" + spec_2.TagPlusPopulaire() + "\" sont :";
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

    //spec_4
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
    

    //spec_5
	.command("getLocatedTweets", "Retourne le nombre de Tweets ayant été postés depuis la localisation saisie.")
	.argument("<location>", "Entrez une localisation pour connaître le nombre de Tweets postés depuis celle-ci. Ex : England")

	.action(function (args, options, logger){
		console.log(spec_5.getLocatedTweets(args.location) + " tweets ont été postés depuis \"" + args.location + "\"");
	})

	//spec_6
	.command("getListeTweets", "Consulter les tweets classés par hashtag")
	.action(function (args, options, logger){
		rs = spec_6.getListeTweets();
		console.log("Le liste des tweets rangés par hashtags :");
		var allTweet = Tweets.getAllTweets();
		var allHash = Tweets.getAllHashTags(allTweet);
		for(var k = 0; k < allHash.length; k++){
			console.log("\nHashtags : " + allHash[k] + "\n");
			console.log(rs[k]);
		}
	})
	
	//spec_7
	.command("getTweet", "Retourne les tweet correspondant aux critères.")
	.argument("[hashtag]", "Entrez un HashTag ou X pour ne pas rentrer de Hashtag.")
    .argument("[dateDebut]", "Entrer la date du début de la période recherchée au format AAAA/MM/JJ/HH/mm/ss ou X pour ne pas rentrer de date.")
    .argument("[dateFin]", "Entrer la date de fin de la période recherchée au format AAAA/MM/JJ/HH/mm/ss ou X pour ne pas rentrer de date.")
    .argument("[auteur]", "Entrer l'auteur ou X pour ne pas rentrer d'auteur.")
	.action(function (args, options, logger){
		rs = spec_7.getTweet(args.hashtag, args.dateDebut, args.dateFin, args.auteur);
		console.log("Les Tweets associés au HashTag \"" + args.hashtag + "\" entre le "+ args.dateDebut + " et "+ args.dateFin + "et écrit par " + args.auteur +" sont :");
		console.log(rs);
        let stresult = "Les tweets qui corespondent :";
		rs.forEach(element => {
			stresult = stresult.concat("\r\n");
			stresult = stresult.concat(element.tweet_url);
			stresult = stresult.concat(",");
			stresult = stresult.concat("\r\n");
			stresult = stresult.concat("===========================");
		});

		fs.writeFile('TweetsCorrespondant.txt', stresult, function (err) {
			if (err) throw err;
			console.log("Un fichier comportant le résultat de la requête a été généré !");
		});


	})
	

	//spec_8
	.command("getListeTweetSurFichier", "Création d'un fichier textes où son répertoriés les tweets")
	.action(function (args, options, logger){
		allTweets = Tweets.getAllTweets();
		allTweet = spec_8.getListeTweetSurFichier();
		console.log("Le liste des tweets dans un format structuré :");
		console.log(allTweets);		

		let stresult = "Le liste des tweets dans un format structuré :";
		stresult = stresult.concat("\r\n" + allTweet);
		
		fs.writeFile('ListeTweets.txt', stresult, function (err) {
			if (err) throw err;
			console.log("Un fichier comportant le résultat de la requête a été généré !");
		});
	})


	//spec_9
	.command("visualizeAuteurPopAvecTagPop", "Visualise le top 10 des auteurs de tweets comportant le hashtag ayant été le plus retweeté")
	.action(function (args, options, logger){
		
	stresult = stresult.concat("<!DOCTYPE html><head><title>Visualisation tweets</title><meta charset=\"utf-8\"><script src=\"https://cdn.jsdelivr.net/npm/vega@4.3.0/build/vega.js\"></script><script src=\"https://cdn.jsdelivr.net/npm/vega-lite@3.0.0-rc10/build/vega-lite.js\"></script><script src=\"https://cdn.jsdelivr.net/npm/vega-embed@3.24.1/build/vega-embed.js\"></script><style media=\"screen\">.vega-actions a {margin-right: 5px;}</style></head><body><h1>La visualisation des 10 auteurs les plus influents</h1><div id=\"vis\"></div><script>var vlspec = {\"$schema\": \"https://vega.github.io/schema/vega-lite/v3.json\",\"data\": {\"values\": [");

	rs = spec_3.getAuteurPopulaireAvecTagPopulaire(spec_2.TagPlusPopulaire());

	rs.forEach(function(value, key)  {
	    stresult = stresult.concat("{\"a\": \"" + key + "\", \"b\": " + value + "},");
	});

	stresult = stresult.substring(0,stresult.length-1);
	stresult = stresult.concat("]},\"mark\": \"bar\",\"encoding\": {\"x\": {\"field\": \"a\",\"type\": \"nominal\",\"axis\": {\"title\": \"Auteurs influents\"}},\"y\": {\"aggregate\": \"average\",\"field\": \"b\",\"type\": \"quantitative\",\"axis\": {\"title\": \"Nombre de tweets\"}}},\"config\": {\"axisY\": {\"minExtent\": 30}}};vegaEmbed(\"#vis\", vlspec);</script></body></html>");

	fs.writeFile('VisuTweets.html', stresult, function (err) {
	    if (err) throw err;
	    console.log("Une page HTML comportant le résultat de la requête a été générée !");
	})
		
	})

	.command("get10TagPopulaire", "Consulter le top 10 des hashtags ayant été le plus retweeté")
	.action(function (args, options, logger){
		rs = spec_9_1.get10TagPopulaire(spec_2.TagPlusPopulaire());
		console.log(rs);
		
		let stresult = "Le top 10 des hashtags ayant été le plus retweeté :";
		rs.forEach(function(value, key)  {
			stresult = stresult.concat("\r\n");
			stresult = stresult.concat(key);
			stresult = stresult.concat(",");
			stresult = stresult.concat(value);
			stresult = stresult.concat(",");
	
		});

		fs.writeFile('10TagPopulaire.txt', stresult, function (err) {
			if (err) throw err;
			console.log("Un fichier comportant le résultat de la requête a été généré !");
		});
	})

	.command("visualize10TagPop", "Visualise le top 10 des hashtags ayant été le plus retweeté")
	.action(function (args, options, logger){

	stresult = stresult.concat("<!DOCTYPE html><head><title>Visualisation tweets</title><meta charset=\"utf-8\"><script src=\"https://cdn.jsdelivr.net/npm/vega@4.3.0/build/vega.js\"></script><script src=\"https://cdn.jsdelivr.net/npm/vega-lite@3.0.0-rc10/build/vega-lite.js\"></script><script src=\"https://cdn.jsdelivr.net/npm/vega-embed@3.24.1/build/vega-embed.js\"></script><style media=\"screen\">.vega-actions a {margin-right: 5px;}</style></head><body><h1>Le top 10 des hashtags ayant été le plus retweeté sont : </h1><div id=\"vis\"></div><script>var vlSpec = {\"$schema\": \"https://vega.github.io/schema/vega-lite/v3.json\",\"data\": {\"values\": [");

	rs = spec_9_1.get10TagPopulaire(spec_2.TagPlusPopulaire());
	rs.forEach(function(value, key)  {
	    stresult = stresult.concat("{\"a\": \"" + key + "\", \"b\": " + value + "},");
	});
	stresult = stresult.substring(0,stresult.length-1);
	stresult = stresult.concat("]},\"mark\": \"bar\",\"encoding\": {\"x\": {\"field\": \"a\",\"type\": \"nominal\",\"axis\": {\"title\": \"Les hashtags les plus retweetés \"}},\"y\": {\"aggregate\": \"average\",\"field\": \"b\",\"type\": \"quantitative\",\"axis\": {\"title\": \"Nombre de retweets\"}}},\"config\": {\"axisY\": {\"minExtent\": 30}}};vegaEmbed(\"#vis\", vlSpec);</script></body></html>");

	fs.writeFile('VisuHashtagPop.html', stresult, function (err) {
	    if (err) throw err;
	    console.log("Une page HTML comportant le résultat de la requête a été générée !");
	})
	});


	

	
program.parse(process.argv);