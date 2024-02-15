var express = require('express');
var router = express.Router();
// Créer une instance de Scategorie.
const SCategorie = require('../models/scategorie');
const article = require('../models/article');
router.get('/', async (req,res)=>{
    try { const scat = await SCategorie.find({}, null, {sort: {'_id': -1}}).populate("categorieID") // populate pour retourner tous l'objet categorie et non pas seulement le IDCategorie
     res.status(200).json(scat); 
    } catch (error) {
         res.status(404).json({ message: error.message }); }
});
router.get('/:scategorieId',async(req, res)=>{ 
    try { const scat = await SCategorie.findById(req.params.scategorieId);
         res.status(200).json(scat); } 
catch (error) { 
    res.status(404).json({ message: error.message }); 
} });
router.post('/', async (req,res)=>{
    const { nomscategorie, imagescat,categorieID} = req.body;
     const newSCategorie = new SCategorie({nomscategorie:nomscategorie, imagescat:imagescat,categorieID:categorieID }) ;
     try { await newSCategorie.save();
         res.status(200).json(newSCategorie); } 
    catch (error) { res.status(404).json({ message: error.message }); } }
);
router.put('/:IdSCategorie', async (req,res)=>{
try {
    const cat=await SCategorie.findByIdAndUpdate(req.params.IdSCategorie,{$set:req.body},{new:true});
    res.status(200).json(cat);
} catch (error) {
    res.status(404).json({message: error.message});
}
});
router.delete('/:IdSCategorie',async (req,res)=>{
    try {
        const cat=await SCategorie.findByIdAndDelete(req.params.IdSCategorie);
        res.status(200).json({message: "suppression avec succés "});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});
module.exports=router;