const articles = require("../data/articles");

const index = (req, res) => {
    const { tag } = req.query;

    if (tag) {
        const filteredArticles = articles.filter(article => article.tags.includes(tag));
        return res.status(200).json(filteredArticles);
    }

    // In caso tag non sia definito facciamo restituire tutti gli articoli
    return res.status(200).json(articles);

};


const show = (req, res) => {
    const id = Number(req.params.id);
    const foundArticle = articles.find(article => article.id === id);
    //console.log(foundArticle);
    

    if (!foundArticle) {
        return res.status(404).json({ 
          error: true ,
          message: 'Articolo non trovato'
        });
    }
    res.json(foundArticle);
};


const store = (req, res) => {
    const newId = articles[articles.length - 1].id +1;
        console.log(newId);
   
   // Creiamo il nuovo articolo(oggetto)
    const newArticle = {
        id: newId,
        titolo: req.body.titolo,
        contenuto: req.body.contenuto,
        immagine: req.body.immagine,
        tags: req.body.tags
        
    }
    // aggiungiamo ilnuovo articolo alla lista già esistente
    articles.push(newArticle);
   
    //restituiamo lo status corretto e l'articolo appena creato 
    res.status(201);
    res.json(newArticle);
};


const update = (req, res) => {
    const id = parseInt(req.params.id)
    const article = articles.find(article => article.id === id);
    
    if(!article){
        return res.status(404).json({
            error: "Not Found",
             message:'Articolo non trovato'
        });
    }
    articles.titolo = req.body.titolo;
    articles.contenuto = req.body.contenuto;
    articles.immagine = req.body.immagine;
    articles.tags = req.body.tags;

    console.log("Articolo aggiornato:", article);
    

    res.status(200).json(articles);
};


const modify = (req, res) => {
    res.send('Modifica parziale degli articoli ' + req.params.id);
};


const destroy = (req, res) => {
    const id = parseInt(req.params.id);
    const articleIndex = articles.findIndex(article => article.id === id);

    if (!articleIndex) {
        return res.status(404).json
        ({ error: true,
            message: 'Articolo non trovato'
         });
    }
    articles.splice(articles.indexOf(articleIndex), 1);
   
    res.sendStatus(204)

};


module.exports = { index, show, store, update, modify, destroy };