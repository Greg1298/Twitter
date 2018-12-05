const Tweets = require("./tweet.js");
const fs = require('fs');
const spec_3 = require('./spec_3.js');
const spec_2 = require('./spec_2.js');
let stresult = "";


stresult = stresult.concat("<!DOCTYPE html><head><title>Visualisation tweets</title><meta charset=\"utf-8\"><script src=\"https://cdn.jsdelivr.net/npm/vega@4.3.0/build/vega.js\"></script><script src=\"https://cdn.jsdelivr.net/npm/vega-lite@3.0.0-rc10/build/vega-lite.js\"></script><script src=\"https://cdn.jsdelivr.net/npm/vega-embed@3.24.1/build/vega-embed.js\"></script><style media=\"screen\">.vega-actions a {margin-right: 5px;}</style></head><body><h1>La visualisation des 10 auteurs les plus influents</h1><div id=\"vis\"></div><script>var vlSpec = {\"$schema\": \"https://vega.github.io/schema/vega-lite/v3.json\",\"data\": {\"values\": [");

rs = spec_3.getAuteurPopulaireAvecTagPopulaire(spec_2.TagPlusPopulaire());

rs.forEach(function(value, key)  {
    stresult = stresult.concat("{\"a\": \"" + key + "\", \"b\": " + value + "},");
});

stresult = stresult.substring(0,stresult.length-1);
stresult = stresult.concat("]},\"mark\": \"bar\",\"encoding\": {\"x\": {\"field\": \"a\",\"type\": \"nominal\",\"axis\": {\"title\": \"Auteurs influents\"}},\"y\": {\"aggregate\": \"average\",\"field\": \"b\",\"type\": \"quantitative\",\"axis\": {\"title\": \"Nombre de tweets\"}}},\"config\": {\"axisY\": {\"minExtent\": 30}}};vegaEmbed(\"#vis\", vlSpec);</script></body></html>");

fs.writeFile('visuTweets.html', stresult, function (err) {
    if (err) throw err;
    console.log("Une page HTML comportant le résultat de la requête a été générée !");
});