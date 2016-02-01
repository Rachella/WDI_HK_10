// Implicit Binding... is Implicitly Lost
function eat() {
  console.log("I am eating " + this.food);
}

var willie = {
  food: "ramen",
  eat: eat
};

var eat = willie.eat;  // function reference/alias only

var food = "sushi";

eat(); // what are you eating?




