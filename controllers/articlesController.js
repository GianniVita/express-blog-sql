const articles = require("../data/articles");
const connection = require('../database/db');



function index(req, res) {
    // prepariamo la query
    const sql = 'SELECT * FROM articles';
    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
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


function destroy(req, res){
    const { id } = req.params;
    connection.query('DELETE FROM articles WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json ({ error:'Failed to delete Article'});
        res.sendStatus(204)

    })
}


module.exports = { index, show, store, update, modify, destroy };