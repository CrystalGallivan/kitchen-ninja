// itemName: { type: String, required: true },
// category: { type: String, enum: ['Bakery', 'Dairy', 'Frozen', 'Meat', 'Produce', 'Storeroom'], required: true },
// brand: { type: String, required: true },
// productNumber: { type: Number, required: true },
// quantity: { type: Number, required: true },
// unit: { type: String, required: true },
// newItemCost: { type: Number, required: true },
// packageSize: { type: String },
// packageCost: { type: String },
// otherOrderList: { type: ObjectId, ref: 'Inventory', required: true },
// mainOrderList: { type: ObjectId, ref: 'Inventory', required: true }
export default class InventoryService {

  get repository() {
    return {}
  }

}