<template>
  <div class="edit-recipe-form col mt-2">
    <form @submit.prevent="saveRecipe" class="form-inline">
      <input
        type="text"
        class="form-control-sm recipeName-input"
        placeholder="Recipe Name"
        v-model="activeRecipe.name"
        required
      />
      <input
        type="number"
        class="form-control-sm portions-input ml-1"
        placeholder="Portions"
        v-model="activeRecipe.portions"
        min="0"
        required
      />
      <input
        type="number"
        class="form-control-sm portionS-input ml-1"
        placeholder="Portion Size"
        v-model="activeRecipe.portionSize"
        min="0"
        step=".5"
        required
      />
      <select
        class="form-control custom-select-sm portionU-input ml-1"
        v-model="activeRecipe.portionUnit"
        required
      >
        <option disabled value="">Unit</option>
        <option value="OZ">OZ</option>
        <option value="EA">EA</option>
      </select>
      <!-- <select class="form-control custom-select-sm side-input ml-1" v-model="activeRecipe.side" required>
            <option disabled value="">Side</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select> -->
      <select
        class="form-control custom-select-sm station-input ml-1"
        v-model="activeRecipe.station"
        required
      >
        <option disabled value="">Choose Station</option>
        <option value="Breakfast Bar">Breakfast Bar</option>
        <option value="Chef's Choice">Chef's Choice</option>
        <option value="Deli">Deli</option>
        <option value="General">General</option>
        <option value="Global">Global</option>
        <option value="Grill">Grill</option>
        <option value="Hot Entree">Hot Entree</option>
        <option value="Pizza">Pizza</option>
        <option value="Salad Bar">Salad Bar</option>
        <option value="Soup">Soup</option>
        <option value="Southwest">Southwest</option>
        <option value="Sushi">Sushi</option>
      </select>
      <input
        type="number"
        class="form-control-sm calories-input ml-1"
        placeholder="Calories"
        v-model="activeRecipe.calories"
        min="0"
        required
      />
      <input
        type="text"
        class="form-control-sm allergens-input ml-1"
        placeholder="Allergens"
        v-model="activeRecipe.allergens"
        min="0"
        required
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "EditRecipeForm",
  data() {
    return {};
  },
  computed: {
    activeRecipe() {
      return this.$store.state.activeRecipe;
    },
  },
};
</script>

<style scoped>
.form-inline {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-control-sm,
.form-control {
  margin: 3px 1.5px;
}

p {
  color: white;
  font-size: 2rem;
}

.recipeName-input,
.allergens-input {
  min-width: 16rem;
  text-align: center;
}

.portions-input,
.portionS-input {
  max-width: 7rem;
  text-align: center;
}

.portionU-input {
  max-width: 4.4rem;
  text-align: center;
}

/* .side-input {
    max-width: 5rem;
    text-align: center
  } */

.station-input {
  max-width: 9rem;
  text-align: center;
  /* align: center; */
}

.calories-input {
  max-width: 6rem;
  text-align: center;
}
</style>
