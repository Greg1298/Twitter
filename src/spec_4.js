const Tweets = require("./tweet.js");

function getRelatedHashtags(tag) {

	allTweets = Tweets.getAllTweets();
	let TousleshashTags = [];

	for(var k = 0; k < allTweets.length; k++){

		//On récupère les HashTags d'un Tweet dans une variable
		ht = allTweets[k].hashtags;

		//On sépare tous les HashTags et les range dans un tableau
		tabHashTagsduntweet = ht.split(" ");

		contain = false;

		//On réalise l'opération pour tous les HashTags d'un Tweet
		tabHashTagsduntweet.forEach(function(unhashtagduntweet) {
			//On vérifie si le HashTag étudié est le HashTag dont on cherche les relations
			if(tag.toLowerCase().indexOf(unhashtagduntweet.toLowerCase()) != -1){
				//On vérifie que ce n'est pas une chaine de caractère vide
				if(unhashtagduntweet != ""){

					//Cela veut dire que ce Tweet comporte le HashTag dont on cherche les relations
					contain = true;

				}
				else{
					contain = false;
				}
			}
		});

		//Si les HashTags du Tweet étudiés comportent le HashTag dont on cherche les relations
		if(contain == true){

			//On réalise l'opération pour tous les HashTags du Tweet
			tabHashTagsduntweet.forEach(function(unhashtagduntweet) {

				//On effectue les opérations qui suivent uniquement si ce n'est pas le HashTag dont on cherche les relations
				if(tag.toLowerCase().indexOf(unhashtagduntweet.toLowerCase()) == -1){

					contain = false;

					//On vérifie que le HashTag n'est pas déjà présent dans le tableau TousleshashTags
					TousleshashTags.forEach(function(entree){
						//Si on trouve une correspondance
						if(entree.toLowerCase().indexOf(unhashtagduntweet.toLowerCase()) != -1){

							//On modifie la variable pour dire que le HashTag existe déjà dans le tableau, on ne le rajoutera donc pas une nouvelle fois
							contain = true;

						}
					});

					//Si on n'a pas trouvé de correspondance on ajoute le HashTag étudié à la liste des HashTags associés au HashTag dont on cherche les relations
					if(contain == false){
						TousleshashTags.push(unhashtagduntweet);
					}

				}
			});
		}
	}
	return TousleshashTags;
}

module.exports.getRelatedHashtags = getRelatedHashtags;