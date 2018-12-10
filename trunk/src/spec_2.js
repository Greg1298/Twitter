const Tweets = require("./tweet.js");


function TagPlusPopulaire(){
var TousleshashTags =  new Map();   

allTweets = Tweets.getAllTweets();

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
		if(unhashtagduntweet != ''){

				//On vérifie que le HashTag n'est pas déjà présent dans le tableau TousleshashTags
				TousleshashTags.forEach(function(value, key){
					//Si on trouve une correspondance
					if(key.toLowerCase().indexOf(unhashtagduntweet.toLowerCase()) != -1){

						//On modifie la variable pour dire que le HashTag existe déjà dans le tableau, on ne le rajoutera donc pas une nouvelle fois
						contain = true;

					}
				});

				//Si on n'a pas trouvé de correspondance on ajoute le HashTag étudié à la liste des HashTags associés au HashTag dont on cherche les relations
				if(contain === false){
			  		TousleshashTags.set(unhashtagduntweet.toLowerCase(),num_retweet);
				}

				//si le Hashtag est déjà dans ajouté dans la liste des Hashtags, on ajoute des numbres de retweet
				else{
					//initialiser
					if (TousleshashTags.get(unhashtagduntweet.toLowerCase()) === undefined)
						TousleshashTags.set(unhashtagduntweet.toLowerCase(), 0) ;
					TousleshashTags.set(unhashtagduntweet.toLowerCase(), TousleshashTags.get(unhashtagduntweet.toLowerCase()) + num_retweet);
				}

			}
		});
		};
// On cherche le hashtag le plus populaire
var max = 0
var maxtag = "";

TousleshashTags.forEach(function(value, key){
	if(value > max){
		max = value;
		maxtag = key;
	}
},TousleshashTags);

return maxtag;
}


function get10TweetPopulaireAvecTagPopulaire(maxtag){
//chercher 10 tweet plus populaire
//recrire la function sert a function sort()
function objectSort(property)
{
return function(a,b){
	return b[property] - a[property];
}
}


//initialiser
var resultats = new Array();
var tweetavecmaxtag = new Array();

//met tous les tweet ayant le tag plus populaire dans le tableau
for(var k = 0; k < allTweets.length; k++){

	ht = allTweets[k].hashtags;
	if(ht === maxtag){
		tweetavecmaxtag.push(allTweets[k]);
	}

}
//sort
tweetavecmaxtag.sort(objectSort('retweet_count'));

//choisi les 10 plus populaire dans le resultat
for(var i = 0; i <= 9; i++){
	resultats[i] = tweetavecmaxtag[i];
}
//console.log(resultats);

return resultats;
}

module.exports.get10TweetPopulaireAvecTagPopulaire = get10TweetPopulaireAvecTagPopulaire;
module.exports.TagPlusPopulaire = TagPlusPopulaire;

		