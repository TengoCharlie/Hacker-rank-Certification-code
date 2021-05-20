var recipes = require("../recipes.json");
var express = require("express");
var router = express.Router();

router.get("/shopping-list", function (req, res) {
  let ids = req.query.ids || 0;

  if (!ids) {
    return res.status(400).send("Error");
  }
  ids = ids.split(",");
  console.log(ids);
  ids = ids.filter((i) => {
    return Number(i);
  });
  console.log(ids);

  let Ing = ids.filter((j) => {
    let Ing2 = recipes.filter((i) => {
      return i.id === Number(j);
    });
    return Ing2[0];
  });
  let Ing3 = [];
  for (i = 0; i < Ing.length; i++) {
    Ing3[i] = recipes.filter((j) => {
      return j.id === Number(Ing[i]);
    });
  }
  let Ingredient = [];
  let Ing4 = [];
  for (i = 0; i < Ing3.length; i++) {
    Ing4[i] = Ing3[i][0].ingredients;
  }

  if (Ing4.length < 1) {
    return res.status(404).send("NOT_FOUND");
  }
  let k = 0;
  for (i = 0; i < Ing4.length; i++) {
    for (j = 0; j < Ing4[i].length; j++) {
      Ingredient[k] = Ing4[i][j];
      k++;
    }
  }
  console.log(Ingredient);
  res.send(Ingredient);
});

module.exports = router;
