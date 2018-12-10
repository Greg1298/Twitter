= - = Dépendances = - =
- Node.js
- Caporal (Déjà présent dans le zip normalement)


= - = Données fournies = - =
- 11 fichiers de Tweets pour 11 jours différents


= - = Mode d'emploi = - =
1# Décomprésser la totalité de l'archive sur votre ordinateur
2# Lancer un invite de commande et vous rendre dans le dossier comportant les fichiers que vous avez extrait
3# Taper "node TweetAnalyzer.js" pour avoir la liste des commandes disponibles
4# Vous pouvez ensuite taper "node TweetAnalyzer.js <nom_de_la_commande> <eventuels_arguments>" 
   pour éxécuter la commande que vous désirez.

Certaines fonctionnalités génèrent des fichiers .txt ou .html dans le dossier,
vous pouvez les consulter à l'aide de l'explorateur Windows ou Mac.


= - = Ecarts au cahier des charges = - =
La SPEC_10 a été légèrement modifiée :
Les retweets de HashTags sont comptés sur tout l'échantillon des Tweets pour fournir la meilleur estimation possible.