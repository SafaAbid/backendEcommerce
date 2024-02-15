/*const express=require("express");
const router =express.Router();
const article =require('../models/article');
const Scategorie=require("../models/scategorie");
router.get('/', async(req,res)=>{
try {
    const art= await article.find({},null, {sort: {'_id': -1}});
    res.status(200).json(art); 
} catch (error) {
    res.status(404).json({ message: error.message });
}
 })
router.get('/:id', async(req,res)=>{
try {
    const art= await article.findById(req.params.id);
    res.status(200).json(art); 
} catch (error) {
    res.status(404).json({ message: error.message });
}
 })
 router.post('/', async(req,res)=>{
    try {
       const art=new article(req.body);
       art.save();
       res.status(200).json({art})
    } catch (error) {
        res.status(404).json({message : error.message});
    }
 });
 router.put('/:articleId', async (req, res)=> {
    try {
        const cat1 = await article.findByIdAndUpdate(
        req.params.articleId,
        { $set: req.body },
        { new: true }
        );
        res.status(200).json(cat1);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});
router.delete('/:idArticle',async (req,res)=>{
    try {
        await article.findByIdAndDelete(req.params.idArticle);
        res.status(200).json({message: "suppression avec succés "});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});
router.get('/scat/:scategorieID',async(req, res)=>{
     try { const art = await article.find({ scategorieID: req.params.scategorieID}).exec();
      res.status(200).json(art); } 
catch (error) { 
    res.status(404).json({ message: error.message }); } });

     // chercher un article par cat
      router.get('/cat/:categorieID', async (req, res) => { try { 
        // Recherche des sous-catégories correspondant à la catégorie donnée
         const sousCategories = await Scategorie.find({ categorieID: req.params.categorieID }).exec(); 
         // Initialiser un tableau pour stocker les identifiants des sous-catégories trouvées 
         const sousCategorieIDs = sousCategories.map(scategorie => scategorie._id);
          // Recherche des articles correspondant aux sous-catégories trouvées 
          const articles = await Article.find({ scategorieID: { $in: sousCategorieIDs } }).exec();
           res.status(200).json(articles); } catch (error) { res.status(404).json({ message: error.message }); 
        } });

// afficher la liste des articles par page 
router.get('/art/pagination', async(req, res) => { //si get('/pagination') et on a au dessus de cette route une autre route qui demande un id get('/:id') express comprend que pagination est un id 
     const page = req.query.page ||1 
    // Current page
     const limit = req.query.limit ||5; 
     // Number of items per page 
     // Calculez le nombre d'éléments à sauter (offset) 
     const offset = (page - 1) * limit; try { 
        // Effectuez la requête à votre source de données en utilisant les paramètres de pagination
         const articlesTot = await article.countDocuments(); 
         const articles = await article.find( {}, null, {sort: {'_id': -1}}) .skip(offset) .limit(limit) 
         res.status(200).json({articles:articles,tot:articlesTot}); } catch (error) { res.status(404).json({ message: error.message }); } });
module.exports=router*/
const express = require("express");
const router=express.Router();
const Article=require("../models/article");
const Scategorie=require("../models/scategorie");
router.get('/', async (req,res)=>{
    try {
       const articles= await Article.find({},null,{sort: {'-id':-1}}) ;
       res.status(200).json(articles);
    } catch (error) {
      res.status(404).json({"message": error.message});  
    }
});

router.get('/:id', async(req,res)=>{
try {
    const art=await Article.findById(req.params.id);
    res.status(200).json(art);
} catch (error) {
    res.status(404).json({"message": error.message});
}
})
router.post('/', async(req,res)=>{
    try {
        const art=new Article(req.body);
        art.save();
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({"message": error.message});
    }
    });
    
router.put('/:id', async(req,res)=>{
try {
    res.status(200).json( await Article.findByIdAndUpdate(req.params.id,{$set: req.body},{new :true}));
} catch (error) {
    res.status(404).json({"message": error.message});
}
    });
router.delete('/:id', async(req,res)=>{
        try {
            const artSup=await Article.findById(req.params.id);
            await Article.findByIdAndDelete(req.params.id);
            res.status(200).json(artSup);
        } catch (error) {
            res.status(404).json({"message": error.message});
        }
            });
            router.get('/scat/:idScategorie',async(req,res)=>{
                try {
                    const articles= await Article.find({'scategorieID': req.params.idScategorie},null,{sort:{'_id':-1
                }});
                res.status(200).json(articles);
                } catch (error) {
                    res.status(404).json({"message": error.message});  
                }
             
            })
           /* router.get('/cat/:idcategorie',async(req,res)=>{
                try {
                    const sousCat= await Scategorie.find({categorieID : req.params.idcategorie});
                    const sousCategories=sousCat.map(item =>item._id);
                    const articles= await Article.find({scategorieID: {$in :sousCategories}},null,{sort:{'_id':-1
                }});
                res.status(200).json(articles);
                } catch (error) {
                    res.status(404).json({"message": error.message});  
                }
             
            })*/
     router.get('/cat/:categorieID', async (req, res) => {
                try {
                // Recherche des sous-catégories correspondant à la catégorie donnée
                const sousCategories = await Scategorie.find({ categorieID:
                req.params.categorieID }).exec();
                // Initialiser un tableau pour stocker les identifiants des souscatégories trouvées
                const sousCategorieIDs = sousCategories.map(scategorie => scategorie._id);
                // Recherche des articles correspondant aux sous-catégories trouvées
                const articles = await Article.find({ scategorieID: { $in:
                sousCategorieIDs } }).exec();
                res.status(200).json(articles);
                } catch (error) {
                res.status(404).json({ message: error.message });
                }
                });
           
           router.get('/art/pagination', async(req, res) => { //si get('/pagination') et on a au dessus de cette route une autre route qui demande un id get('/:id') express comprend que pagination est un id 
            const page = req.query.page ||1 // Current page
            const limit = req.query.limit ||5; // Number of items per page 
            // Calculez le nombre d'éléments à sauter (offset) 
            const offset = (page - 1) * limit; try { 
               // Effectuez la requête à votre source de données en utilisant les paramètres de pagination
                const articlesTot = await Article.countDocuments(); 
                const articles = await Article.find( {}, null, {sort: {'_id': -1}}) .skip(offset) .limit(limit) 
                res.status(200).json({articles:articles,tot:articlesTot}); } catch (error) { res.status(404).json({ message: error.message }); } });     

module.exports=router;