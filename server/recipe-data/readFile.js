var connection = require('../db/dbconfig')
var RecipeService = require('../Services/RecipeService')


let fs = require('fs')

let rData = fs.readFileSync("recipe.json")
let iData = fs.readFileSync("ingredient.json")
var recipe = JSON.parse(rData.toString());
var ingredient = JSON.parse(iData.toString());


class Recipe {
  constructor(rData) {
    // console.log(iData)
    try {
      if (!rData.name || !rData.station) {
        throw new Error("MISSING NAME or STATION")
      }
      this.name = rData.name
      if (rData.station == "Salad") {
        rData.station = "Salad Bar"
      }
      this.recipeIngredients = rData.recipeIngredients || []
      this.station = rData.station
      this.portions = rData.portions || 0
      if (rData.portionUnit == "Grams") {
        this.portionUnit = "OZ"
        this.portionSize = rData.portionSize * 0.035274
      } else {
        this.portionUnit = rData.portionUnit || "OZ"
        this.portionSize = rData.portionSize || 0
      }
      this.side = rData.side || 'No'
      this.costPerRecipe = rData.costPerRecipe || 0
      this.calories = rData.calories || 0
      this.allergens = rData.allergens || []
      this.siteId = "5d63f5351b746556dc60cce6"
      this.salesPrice = rData.salesPrice || 0
    } catch (e) {
      console.error(e)
    }
  }
}
class Ingredient {
  constructor(iData) {
    try {
      this.name = iData.name
      this.itemName = iData.itemName
      this.quantity = iData.quantity
      this.brand = iData.brand || 'Unknown'
      this.packageSize = iData.packageSize || ''
      this.packageCost = iData.packageCost || ''
      if (iData.unit == '#N/A' || 'SL') {
        this.unit = 'OZ'
      } else {
        this.unit = iData.unit || 'OZ'
      }
      if (iData.itemCost == '#N/A') {
        this.itemCost = 0
      } else {
        this.itemCost = iData.itemCost || 0
      }
      if (iData.category == 'storeroom' || 'bakery' || 'frozen' || 'produce' || 'meat' || 'dairy') {
        this.category = iData.category || 'storeroom'

      }

      // name	itemName	quantity	brand	packageSize	packageCost	unit	itemCost

    } catch (error) {
      console.error(error)
    }
  }
}

var recipeData = recipe.map(f => new Recipe(f))
var ingredientData = ingredient.map(i => new Ingredient(i))
recipeData.forEach(Recipe => mapToArray(Recipe, ingredientData))
var service = new RecipeService()

connection.once('open', () => {
  console.log("Connected to DB");
  createFood()
})
function mapToArray(Recipe, ingredientData) {
  for (let i = 0; i < ingredientData.length; i++) {
    let ing = ingredientData[i]
    if (Recipe.name == ing.name && ing.quantity > 0) {
      if (ing.itemName) {
        Recipe.recipeIngredients.push({ itemName: ing.itemName, quantity: ing.quantity, brand: ing.brand, packageSize: ing.packageSize, packageCost: ing.packageCost, unit: ing.unit, itemCost: ing.itemCost, category: ing.category })
      }
    }
  }
  // name	itemName	quantity	brand	packageSize	packageCost	unit	itemCost

}
async function createFood() {
  try {
    console.log("STARTING DB WRITES");
    console.log(ingredientData)
    console.log(recipeData)
    // Need to map or foreach ingredients if the recipe name = the recipe name ingredient
    var docs = recipeData.map(f => {

      //   console.log(ingredientData)
      //   if (ingredientData.name == recipeData.name) {

      // this.recipeIngredients = recipeData.forEach(function (ingredient) {

      // })
      // }
      return service.repository.create(f)
    })


    var recipeDocs = await Promise.all(docs)
    console.log(recipeDocs)
    console.log("IT IS DONE");
  } catch (e) {
    console.error(e)
  }
}

