const spec_2 = require("./spec_2.js");
const Tweets = require("./tweet.js");



function getAuteurPopulaireAvecTagPopulaire(maxtag){
var TagsChanqueAuteur = new Map();
for(var k = 0; k < allTweets.length; k++){

	//On récupère les HashTags d'un Tweet dans une variable
	ht = allTweets[k].hashtags;

	// On récupère les nombres de retweet dans cette variable
	num_retweet = parseInt(allTweets[k].retweet_count);
	//console.log(num_retweet);

	// On récupère le nom des tweet
	auteur = allTweets[k].user_name;
  auteurList = auteur.split(" @");
	auteur = auteurList [0];
	auteurList = auteur.split(" (@");
	auteur = auteurList [0];

	//On sépare tous les HashTags et les range dans un tableau
	tabHashTagsduntweet = ht.split(" ");

	contain = false;

	//On réalise l'opération pour tous les HashTags du Tweet
	tabHashTagsduntweet.forEach(function(unhashtagduntweet) {
		if(unhashtagduntweet === maxtag){

				//On vérifie que le HashTag n'est pas déjà présent dans le tableau TousleshashTags
				TagsChanqueAuteur.forEach(function(value, key){
					//Si on trouve une correspondance
					if(key.indexOf(auteur) != -1){

						//On modifie la variable pour dire que le HashTag existe déjà dans le tableau, on ne le rajoutera donc pas une nouvelle fois
						contain = true;

					}
				});

				//Si on n'a pas trouvé de correspondance on ajoute le HashTag étudié à la liste des HashTags associés au HashTag dont on cherche les relations
				if(contain === false){
			  		TagsChanqueAuteur.set(auteur,num_retweet);
				}

				//si le Hashtag est déjà dans ajouté dans la liste des Hashtags, on ajoute des numbres de retweet
				else{
					//initialiser
					if (TagsChanqueAuteur.get(auteur) === undefined)
						TagsChanqueAuteur.set(auteur, 0) ;
					TagsChanqueAuteur.set(auteur, TagsChanqueAuteur.get(auteur) + num_retweet);
				}

			}
		});
		};

var Auteurtop10 = new Map();
for(var i = 0; i <= 9 ; i++){
		maxpop = 0;
		maxauteur ="";
	TagsChanqueAuteur.forEach(function(value, key){
		if(value > maxpop){
			maxpop = value;
			maxauteur = key;
		}
	});
	Auteurtop10.set(maxauteur,maxpop);
	TagsChanqueAuteur.delete(maxauteur);
}

return Auteurtop10;
}

module.exports.getAuteurPopulaireAvecTagPopulaire = getAuteurPopulaireAvecTagPopulaire;
