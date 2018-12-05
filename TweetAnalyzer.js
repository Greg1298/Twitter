const spec_4 = require("./spec_4.js");
const spec_5 = require("./spec_5.js");
const program = require('caporal');
const fs = require('fs');

exports.module = require('caporal')


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