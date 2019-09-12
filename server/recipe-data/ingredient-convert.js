let xlsxj = require("xlsx-to-json");
xlsxj({
  input: "ingredients.xlsx",
  output: "ingredient.json"
}, function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});