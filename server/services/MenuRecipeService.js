var mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let _ingredientSchema = new Schema({
  itemName: { type: String, required: true },
  category: { type: String, enum: ['bakery', 'dairy', 'frozen', 'meat', 'produce', 'storeroom'] },
  brand: { type: String },
  productNumber: { type: String },
  quantity: { type: Number },
  unit: { type: String, enum: ['OZ', 'EA'] },
  itemCost: { type: Number },
  // packageSize: { type: String },
  // packageCost: { type: String },
  distributor: []
  // otherOrderList: { type: ObjectId, ref: 'Inventory', required: true },
  // mainOrderList: { type: ObjectId, ref: 'Inventory', required: true }
})

let _subRecipeSchema = new Schema({
  station: { type: String, enum: ['Global', 'Grill', 'Salad Bar', 'Hot Entree', 'Deli', 'Soup', 'Breakfast Bar', 'Sushi', 'Southwest', 'Pizza', 'Chef\'s Choice', 'General'], required: true },
  // side: { type: String, enum: ['Yes', 'No'] },
  name: { type: String, required: true },
  portions: { type: Number, required: true },
  portionSize: { type: Number },
  portionUnit: { type: String, enum: ['OZ', 'EA'] },
  recipeIngredients: [_ingredientSchema],
  costPerRecipe: { type: Number, required: true },
  calories: { type: Number },
  allergens: [],
  siteId: { type: ObjectId, ref: 'Site', required: true },
  salesPrice: { type: Number, required: true },
  menuDescription: { type: String },
  instructions: { type: String }
  //costPerPortion
})

let _commentsSchema = new mongoose.Schema({
  content: { type: String, required: true },
  authoreId: { type: ObjectId, ref: 'User', required: true }
})

let _menuRecipeSchema = new Schema({
  station: { type: String, enum: ['Global', 'Grill', 'Salad Bar', 'Hot Entree', 'Deli', 'Soup', 'Breakfast Bar', 'Sushi', 'Southwest', 'Pizza', 'Chef\'s Choice', 'General'], required: true },
  // side: { type: String, enum: ['Yes', 'No'] },
  name: { type: String, required: true },
  portions: { type: Number, required: true },
  portionSize: { type: Number },
  portionUnit: { type: String, enum: ['OZ', 'EA'] },
  recipeIngredients: [_ingredientSchema],
  costPerRecipe: { type: Number, required: true },
  calories: { type: Number },
  allergens: [],
  siteId: { type: ObjectId, ref: 'Site', required: true },
  salesPrice: { type: Number, required: true },
  subRecipe: [_subRecipeSchema],
  comments: [_commentsSchema],
  //costPerPortion
})



// export default
class RecipeService {
  get repository() {
    return mongoose.model('MenuRecipe', _menuRecipeSchema)
  }
}
module.exports = RecipeService
