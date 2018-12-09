const spec_2 = require("./spec_2.js");
const Tweets = require("./tweet.js");



function get10TagPopulaire(maxtag){
var RetweetPourChaqueTags = new Map();
for(var k = 0; k < allTweets.length; k++){

	//On récupère les HashTags d'un Tweet dans une variable
	ht = allTweets[k].hashtags;

	// On récupère les nombres de retweet dans cette variable
	num_retweet = parseInt(allTweets[k].retweet_count);
	//console.log(num_retweet);

	//On sépare tous les HashTags et les range dans un tableau
	tabHashTagsduntweet = ht.split(" ");

	contain = false;

	//On réalise l'opération pour tous les HashTags du Tweet
	tabHashTagsduntweet.forEach(function(unhashtagduntweet) {
		if(unhashtagduntweet === maxtag){

				//On vérifie que le HashTag n'est pas déjà présent dans le tableau TousleshashTags
				RetweetPourChaqueTags.forEach(function(value, key){
					//Si on trouve une correspondance
					if(key.indexOf(ht) != -1){

						//On modifie la variable pour dire que le HashTag existe déjà dans le tableau, on ne le rajoutera donc pas une nouvelle fois
						contain = true;

					}
				});

				//Si on n'a pas trouvé de correspondance on ajoute le HashTag étudié à la liste des HashTags associés au HashTag dont on cherche les relations
				if(contain === false){
			  		RetweetPourChaqueTags.set(ht,num_retweet);
				}

				//si le Hashtag est déjà dans ajouté dans la liste des Hashtags, on ajoute des numbres de retweet
				else{
					//initialiser
					if (RetweetPourChaqueTags.get(ht) === undefined)
						RetweetPourChaqueTags.set(ht, 0) ;
					RetweetPourChaqueTags.set(ht, RetweetPourChaqueTags.get(ht) + num_retweet);
				}

			}
		});
		};

var Tagtop10 = new Map();
for(var i = 0; i <= 9 ; i++){
	maxpop = 0;
	maxtagpop ="";
RetweetPourChaqueTags.forEach(function(value, key){
	if(value > maxpop){
		maxpop = value;
		maxtagpop = key;
	}
});
Tagtop10.set(maxtagpop,maxpop);
RetweetPourChaqueTags.delete(maxtagpop);
}

return Tagtop10;
}

module.exports.get10TagPopulaire = get10TagPopulaire;


	

		