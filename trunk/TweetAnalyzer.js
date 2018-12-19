const spec_1 = require("./src/spec_1.js");
const spec_2 = require("./src/spec_2.js");
const spec_3 = require("./src/spec_3.js");
const spec_4 = require("./src/spec_4.js");
const spec_5 = require("./src/spec_5.js");
const spec_6 = require("./src/spec_6.js");
const spec_7 = require("./src/spec_7.js");
const spec_8 = require("./src/spec_8.js");
const spec_9_1 = require("./src/spec_9_1.js");
const spec_9_2 = require("./src/spec_9_2.js");
const spec_10 = require("./src/spec_10.js");
const program = require('caporal');
const fs = require('fs');
const Tweets = require("./src/tweet.js");
let stresult = "";

exports.module = require('caporal')


	//spec_1
	.command("getTweetsHT", "Retourne les tweets et leur nombre comportant le HashTag choisi.")
	.argument("<hashtag>", "Entrez un HashTag dont vous voulez connaître le nombre de Tweet.")
    .argument("<dateDebut>", "Entrer la date du début de la période recherchée au format AAAA/MM/JJ/HH/mm/ss.")
    .argument("<dateFin>", "Entrer la date de fin de la période recherchée au format AAAA/MM/JJ/HH/mm/ss.")
	.action(function (args, options, logger){
		rs = spec_1.getNbTweet(args.hashtag, args.dateDebut, args.dateFin);
		console.log("Le nombre de Tweets associés au HashTag \"" + args.hashtag + "\" entre le "+ args.dateDebut +" et "+ args.dateFin + " sont :");
		for(var i=0;i<rs.length;i++){console.log(rs[i]);console.log("\n")}
		console.log("Il y a " + rs.length + " tweets");

	})

	//spec_2
	.command("get10TweetPopulaireAvecTagPopulaire", "Consulter le top 10 des Tweets comportant le HashTag ayant été le plus retweeté")
	.action(function (args, options, logger){
		rs = spec_2.get10TweetPopulaireAvecTagPopulaire(spec_2.TagPlusPopulaire());
		console.log(rs);

		let stresult = "Les 10 Tweets associés au HashTag le plus populaire \"" + spec_2.TagPlusPopulaire() + "\" sont :";
		rs.forEach(element => {
			stresult = stresult.concat("\r\n");
			stresult = stresult.concat(element.tweet_url);
			//stresult = stresult.concat(",");
			//stresult = stresult.concat(element.retweet_count);
			//stresult = stresult.concat(",");
		});

		fs.writeFile('./results/10TweetPopulaireAvecTagPopulaire.txt', stresult, function (err) {
			if (err) throw err;
			console.log("Un fichier (10TweetPopulaireAvecTagPopulaire.txt) comportant le résultat de la requête a été généré !");
		});
	})

	//spec_3
	.command("getAuteurPopulaireAvecTagPopulaire", "Consulter le top 10 des auteurs de Tweets comportant le HashTag ayant été le plus retweeté")
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

		fs.writeFile('./results/10AuteursPopulaireAvecTagPopulaire.txt', stresult, function (err) {
			if (err) throw err;
			console.log("Un fichier (10AuteursPopulaireAvecTagPopulaire.txt) comportant le résultat de la requête a été généré !");
		});
	})

    //spec_4
	.command("getRelatedHashtags", "Retourne une liste de HashTags ayant été liés au HashTag recherché.")
	.argument("<hashtag>", "Entrez un HashTag dont vous cherchez les relations. Ex : eaw18")

	.action(function (args, options, logger){
		rs = spec_4.getRelatedHashtags(args.hashtag);
		if(rs.length>0){
			rs.sort();
			console.log("Les HashTags associés au HashTag \"" + args.hashtag + "\" sont :");
			console.log(rs);

			let stresult = "Les HashTags associés au HashTag \"" + args.hashtag + "\" sont :";
			rs.forEach(element => {
				stresult = stresult.concat("\r\n", element, ",");
			});
			stresult = stresult.substring(0,stresult.length-1);

			fs.writeFile('./results/relatedHashtags.txt', stresult, function (err) {
				if (err) throw err;
				console.log("Un fichier (relatedHashtags.txt) comportant le résultat de la requête a été généré !");
			});
		}
		else{
			console.log("Le hashtag donné ne correspond à aucun tweet, le fichier n'a pas été créé");
			try{
				fs.unlinkSync('./results/relatedHashtags.txt');
			}
			catch(e){}
		}
    })

    //spec_5
	.command("getLocatedTweets", "Retourne le nombre de Tweets ayant été postés depuis la localisation saisie.")
	.argument("<location>", "Entrez une localisation pour connaître le nombre de Tweets postés depuis celle-ci. Ex : England")

	.action(function (args, options, logger){
		console.log(spec_5.getLocatedTweets(args.location) + " Tweets ont été postés depuis \"" + args.location + "\"");
	})

	//spec_6
	.command("getListeTweets", "Consulter les Tweets classés par HashTag")
	.action(function (args, options, logger){
		rs = spec_6.getListeTweets();
		console.log("Le liste des Tweets rangés par HashTags :");
		var allTweet = Tweets.getAllTweets();
		var allHash = Tweets.getAllHashTags(allTweet);
		for(var k = 0; k < allHash.length; k++){
			console.log("\nHashTags : " + allHash[k] + "\n");
			for(var i=0;i<rs[k].length;i++){
				console.log('\x1b[1;35m%s\x1b[0m',rs[k][i]);
				console.log();
			}
			//console.log(rs[k]);
		}
	})

	//spec_7
	.command("getTweet", "Retourne les Tweets correspondant aux critères.")
	.argument("[hashtag]", "Entrer un HashTag ou X pour ne pas rentrer de Hashtag.")
  .argument("[dateDebut]", "Entrer la date du début de la période recherchée au format AAAA/MM/JJ/HH/mm/ss ou X pour ne pas rentrer de date.")
  .argument("[dateFin]", "Entrer la date de fin de la période recherchée au format AAAA/MM/JJ/HH/mm/ss ou X pour ne pas rentrer de date.")
  .argument("[auteur]", "Entrer l'auteur ou X pour ne pas rentrer d'auteur.")
	.action(function (args, options, logger){
		rs = spec_7.getTweet(args.hashtag, args.dateDebut, args.dateFin, args.auteur);
		console.log("Les Tweets associés au HashTag \"" + args.hashtag + "\" entre le "+ args.dateDebut + " et "+ args.dateFin + " et écrit par " + args.auteur +" sont :");
		console.log(rs);
        let stresult = "Les Tweets qui corespondent :";
		rs.forEach(element => {
			stresult = stresult.concat("\r\n");
			stresult = stresult.concat(element.tweet_url);
			stresult = stresult.concat(",");
			stresult = stresult.concat("\r\n");
			stresult = stresult.concat("===========================");
		});

		fs.writeFile('./results/tweetsCorrespondant.txt', stresult, function (err) {
			if (err) throw err;
			console.log("Un fichier (tweetsCorrespondant.txt) comportant le résultat de la requête a été généré !");
		});


	})


	//spec_8
	.command("getListeTweetSurFichier", "Création d'un fichier texte où sont répertoriés les Tweets")
	.action(function (args, options, logger){
		allTweets = Tweets.getAllTweets();
		allTweet = spec_8.getListeTweetSurFichier();
		//console.log("Le liste des Tweets dans un format structuré :");
		//console.log(allTweets);

		let stresult = "Le liste des Tweets dans un format structuré :";
		stresult = stresult.concat("\r\n" + allTweet);

		fs.writeFile('./results/listeTweets.txt', stresult, function (err) {
			if (err) throw err;
			console.log("Un fichier (listeTweets.txt) comportant le résultat de la requête a été généré !");
		});
	})


	//spec_9
	.command("visualize10AuteurPopAvecTagPop", "Visualise le top 10 des auteurs de Tweets comportant le HashTag ayant été le plus retweeté")
	.action(function (args, options, logger){

	stresult = stresult.concat("<!DOCTYPE html><head><title>Visualisation Tweets</title><meta charset=\"utf-8\"><script src=\"https://cdn.jsdelivr.net/npm/vega@4.3.0/build/vega.js\"></script><script src=\"https://cdn.jsdelivr.net/npm/vega-lite@3.0.0-rc10/build/vega-lite.js\"></script><script src=\"https://cdn.jsdelivr.net/npm/vega-embed@3.24.1/build/vega-embed.js\"></script><style media=\"screen\">.vega-actions a {margin-right: 5px;}</style></head><body><h1>La visualisation des 10 auteurs les plus influents</h1><div id=\"vis\"></div><script>var vlspec = {\"$schema\": \"https://vega.github.io/schema/vega-lite/v3.json\",\"data\": {\"values\": [");

	rs = spec_3.getAuteurPopulaireAvecTagPopulaire(spec_2.TagPlusPopulaire());

	rs.forEach(function(value, key)  {
	    stresult = stresult.concat("{\"a\": \"" + key + "\", \"b\": " + value + "},");
	});

	stresult = stresult.substring(0,stresult.length-1);
	stresult = stresult.concat("]},\"mark\": \"bar\",\"encoding\": {\"x\": {\"field\": \"a\",\"type\": \"nominal\",\"axis\": {\"title\": \"Auteurs influents\"}},\"y\": {\"aggregate\": \"average\",\"field\": \"b\",\"type\": \"quantitative\",\"axis\": {\"title\": \"Nombre de tweets\"}}},\"config\": {\"axisY\": {\"minExtent\": 30}}};vegaEmbed(\"#vis\", vlspec);</script></body></html>");

	fs.writeFile('./results/visuAuteurs.html', stresult, function (err) {
	    if (err) throw err;
	    console.log("Une page HTML (visuAuteurs.html) comportant le résultat de la requête a été générée !");
	})

	})

	.command("get10TagPopulaire", "Consulter le top 10 des HashTags ayant été le plus retweeté")
	.action(function (args, options, logger){
		rs = spec_9_1.get10TagPopulaire(spec_2.TagPlusPopulaire());
		console.log(rs);

		let stresult = "Le top 10 des HashTags ayant été le plus retweeté :";
		rs.forEach(function(value, key)  {
			stresult = stresult.concat("\r\n");
			stresult = stresult.concat(key);
			stresult = stresult.concat(",");
			stresult = stresult.concat(value);
			stresult = stresult.concat(",");

		});

		fs.writeFile('./results/10TagPopulaire.txt', stresult, function (err) {
			if (err) throw err;
			console.log("Un fichier (10TagPopulaire.txt) comportant le résultat de la requête a été généré !");
		});
	})

	.command("visualize10TagPop", "Visualise le top 10 des HashTags ayant été le plus retweeté")
	.action(function (args, options, logger){
		spec_9_2.vizualizeTopTweets();
	})



	//spec_10
	.command("getConseil", "Donne une petite indication pour savoir si le HashTag que vous comptez utiliser va marcher.")
	.argument("<hashtag>", "Entrez le HashTag que vous comptez utiliser. Ex : eaw18")
	.action(function (args, options, logger){
		spec_10.getHashTagRT(args.hashtag);
	})

program.parse(process.argv);
