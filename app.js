const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");// dotenv pour utiiser les variables de .env
const categorieRouter =require("./routes/categorie.route");
const scategorieRouter =require("./routes/sCategorie.route");
const articleRouter =require("./routes/article.route");
//pour utiliser process.env 
dotenv.config();
//instansier une variable de type express
const app=express();
//pour connaitre req.body
app.use(express.json());

app.get('/', (req,res) =>{
res.send("bonjour");
});
// Connexion à la base données
mongoose.connect(process.env.DATABASECLOUD)
.then(() => {console.log("DataBase Successfully Connected");})
.catch(err => { console.log("Unable to connect to database", err);
process.exit(); });
app.use('/api/categorie' , categorieRouter);
app.use('/api/scategorie' , scategorieRouter);
app.use('/api/article' , articleRouter);
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
});
module.exports=app;