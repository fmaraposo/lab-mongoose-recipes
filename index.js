const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');


//Establishing connection to MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


//DUVIDAS ->
// 1. O UNIQUE: TRUE NÃO FUNCIONA. NA BASE DE DATOS TENHO UMA RECEITA QUE É REPETIDA.
// ITERATION 4 -> O UPDATE DO DURATION NÃO FUNCIONA... JA TENTEI COM FINDONEANDUPDATE E COM UPDATEONE.
// SE FAÇO NODE INDEX.JS NO TERMINAL, OS DADOS DA BASE DE DADOS APAGAM-SE. TENHO QUE VOLTAR A FAZER INDEX.JS PARA QUE APAREÇAM. PORQUE?

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  //Create a Recipe

  Recipe.create({
    title: "Asian Glazed Chicken Thighs",
    level: "Amateur Chef",
    ingredients: [
      "1/2 cup rice vinegar",
      "5 tablespoons honey",
      "1/3 cup soy sauce (such as Silver Swan®)",
      "1/4 cup Asian (toasted) sesame oil",
      "3 tablespoons Asian chili garlic sauce",
      "3 tablespoons minced garlic",
      "salt to taste",
      "8 skinless, boneless chicken thighs"
    ],
    cuisine: "Asian",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    duration: 40,
    creator: "Chef LePapu"
  }).then((response) => {
    console.log(`A recipe was created ${response.title}` , response);
  }).catch((err) => {
    console.log('error ocurred', err);
  }); 


  // Insert Multiple Recipes

  Recipe.insertMany(data)
    .then((response) =>{
      response.forEach(item => {
        console.log(`${item.title} has been inserted`);
      });
    }).catch((err) => {
      console.log('error occured', err);
    });
  
  // Update Recipe

   Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration: 100})
    .then((updateRecipe) => {
    console.log(`${updateRecipe.title} duration has been updated to ${updateRecipe.duration}`);
  }).catch((err) => {
    console.log('error ocurred', err);
  }); 

  //Remove Recipe
  
  Recipe.deleteOne({title: "Carrot Cake"})
    .then((deleteRecipe) => {
      console.log(`${deleteRecipe.title} has been deleted`);
    })
    .catch((err) => {
      console.log('Houston we have a problem', err);
    });

    //Close Connection

    mongoose.connection.close()
      .then((response) => {
        console.log('Database is closed', response);
      }).catch((err) => {
        console.log('error occured', err);
      });


