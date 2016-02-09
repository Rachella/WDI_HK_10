# Intermediate JavaScript

### Objectives
*After this lesson, students will be able to:*

- Understand the basics of Default Binding and Implicit Binding of the `this` value in JavaScript functions.
- Use the 4 basic binding rules to determine the correct value of `this`.
- Use Explicit Binding of the `this` value while using Callback function, such as `forEach` in `Array`.
- Explain the behind-the-scene actions performed by the `new` operator.
- Explain how a function can use `closures` to maintain a scope reference to where it was originally declared.
- Create objects using Object Constructor functions and define behaviors of objects using `prototype`.

### Preparation

*Before this lesson, students should already be able to:*

- Create and manipulate variables with JavaScript
- Create functions and call them properly in JavaScript
- Understand parameter passing in JavaScript functions

The Mysteries of THIS
=====

## What is THIS, really?

### The True Face of THIS
`this` is a special identifier keyword automatically defined in the scope of every function. But what it exactly refers to could be very confusing, even to experienced JavaScript developers. The value of `this` is actually determined by a set of binding rules and sometimes its value can be manipulated on purpose. To better understand how `this` works, it will take some trails and errors initially and when in doubt, always use `console.log(this);` to find out what it is referring to.

## The 4 Basic Binding Rules

### Default Binding
The default binding is the catch-all of all rules. It means that, when none of the other rules apply, this is what JavaScript will fall back to. Here is a simple example:

```javascript
function eat() {
  console.log("I am eating " + this.food);
}

var food = "an apple";

eat();  // "I am eating an apple"
```

Inside the `eat` function, there is no explicit `this` value defined so JavaScript falls back to use the default one, which is the global context (the `windows` object). The variable `food` defined in the global scope is the *exact* same global object property with the same name (try `window.food` if you are running this code in Chrome Dev Tool).

### Implicit Binding

If a function is called *as a function of* a context object, then the `this` value inside the function will refer to this object. Here is a simple example:

```javascript
function eat() {
  console.log("I am eating " + this.food);
}

var willie = {
  food: "ramen",
  eat: eat
};
willie.eat();  // "I am eating ramen"
```

Inside the `eat` function, there is still no explicit `this` value defined. But this time, `eat` was called as a function of the object `willie`, so JavaScript *implicitly* used the `willie` as the `this` value. So in this case, `this.food` is effectively `willie.food`.

Let's extend the previous example with the following code snippet:

```javascript
var sarah = {
  food: "sushi",
  husband: willie
}
sarah.husband.eat(); // "I am eating ramen"
```
Even though the last statement begins with another object `sarah`, it is in fact the `eat` function of `sarah.husband` which is called. Since `sarah.husband` is just another reference to the `willie` object, so the result of this new code snippet is the same as the previous.

#### How to lose a binding implicitly?

The key concept about Implicit Binding is how a function is called. If a function is called without a context object, then *Default Binding* will be used. Take a look at the example below:

```javascript
function eat() {
  console.log("I am eating " + this.food);
}

var willie = {
  food: "ramen",
  eat: eat
};

var lunch = willie.eat;  // function reference/alias only

var food = "sushi";

lunch(); // "I am eating sushi"
```

When we run the `lunch` function, it shows `I am eating sushi` rather than `I am eating ramen`. The reason is that even though we have run this line `var lunch = willie.eat;`, both `lunch` and `willie.eat` are simply two references pointing to the same function, `eat`. `lunch` does not refer to any part of the `willie` object so when we run `lunch()` as a standalone function, the `this` value inside is refer to the global context. In the global scope, there is a varaible called `food` defined with a value of `sushi`. That's why we are seeing "I am eating sushi" instead.

#### Lost in the callback

A common pitfall of relying on the Implicit Binding of the `this` value is that it will get lost inside a callback function. Consider the following example:

```javascript
function eat() {
  this.food.forEach(function(food){
    console.log(this.name + " is eating " + food);
  });
}

var willie = {
  name: 'Willie',
  food: ["Shoyu Ramen", "Kitakata Ramen", "Miso Ramen", "Tonkotsu Ramen"],
  eat: eat
};

willie.eat(); // Who's having the ramens?
```

If you run the code, the result will look like this
```
undefined is eating Shoyu Ramen
undefined is eating Kitakata Ramen
undefined is eating Miso Ramen
undefined is eating Tonkotsu Ramen
```

Apparently, the `this` inside the callback function of `forEach` is no longer `willie`. When a callback function is run, JavaScript *cannot* implicitly determine the value of `this` so it falls back to use the global context. *BE CAREFUL*!! There are actually two `this` in the function `eat`. `this.food` still works because the `eat` function is called from the `willie` object so for `this.food` the Implicit Binding still applies.

To fix this problem, we can *assign* the `this` value to `forEach` as an optional parameter:
```javascript
function eat() {
  this.food.forEach(function(food){
    console.log(this.name + " is eating " + food);
  }, this);   // Explicitly assign the value of this!!!
}
```

### Explicit Binding

Explicit Binding is very straightforward. You just tell JavaScript exactly which object it should use as the `this` value. No more ambiguoity.

```javascript
function eat(food) {
  console.log(this.name + " is eating " + food);
}

// The lunch function can take any number of paramers 
// To do this, we can the parameter using the hidden variable 'arguments'
function lunch() {
  var food = [];
  for (var i in arguments) {
    food.push(arguments[i]);
  }
  food.forEach(eat, this);
}

var willie = {
  name: 'Willie'
};
var sarah = {
  name: 'Sarah'
};
var ramens = ["Shoyu Ramen", "Kitakata Ramen", "Miso Ramen", "Tonkotsu Ramen"];

// using sarah as 'this' in 'eat'
eat.call(sarah, "sushi");
eat.apply(sarah, ["milkshake"]);

// using willie as 'this' in 'eat'
lunch.apply(willie, ramens);
lunch.call(willie, "Shoyu Ramen", "Kitakata Ramen", "Miso Ramen", "Tonkotsu Ramen");

```
In JavaScript, you can use `apply` and `call` to run a function and explicitly mention which object you want to use as the value of `this`, i.e. the context. The main difference between `apply` and `call` is that `call` can take an arbitrary number of parameters and `apply` take an array of parameters.

When we use functions that take a callback function as a parameter, such as `forEach`, sometimes we need to pass in `this` as an optional parameter too. In the above example, since we are passing `eat` as a callback and inside `eat` we are referring to `this.namr`, so in this case, we also need to pass in `this` (which is either `willie` or `sarah` in the example) othetwise we will get an `undefined` value.

#### Hard Binding
**Hard Binging** is just a variation of **Explicit Binding** where the binding can be enforced as a function. In the example below, we can invoke the function `eat` using `eat.call()` and set `sarahChoice` as the context so that `sarah` can eat sushi. To force `sarah` to pick ramen, we can invoke the function `eat` and set `willieChoice` as the context instead. Or we can invoke `eat.call()` from within a function. 

Inside `willieChooseLunch`, the context to `eat.call()` is **HARD** bound to `willieChoice`. Therefore, even though we set th context of calling `willieChooseLunch` as `sarahChoice`, the result is still `Sarah eats Ramen`. 

```javascript
// Hard Binding
var willieChoice = {
  food: "Ramen"
}

function eat(person) {
  console.log(person + " eats " + this.food);
}

eat.call(willieChoice, "Willie");  // Willie eats Ramen

var sarahChoice = {
  food: "Sushi"
}  
eat.call(sarahChoice, "Sarah");  // Sarah eats Sushi

// How can Willie force Sarah to have ramen with him?
function willieChooseLunch(person) {
  eat.call(willieChoice, person);
}

willieChooseLunch.call(sarahChoice, "Sarah");  // Sarah eats Ramen
```

### The new Binding

The `new` operator in JavaScript is used to creat objects from an Object Constructor function and it is the fourth form of `this` value binding in JavaScript. 

```javascript
var Person = function(option) {
  this.firstName = option.f;
  this.lastName = option.l;
};

var willie = new Person({
  f: "Willie",
  l: "Tong"
});
```

In this example, we have a Object Constructor function called `Person`. It is just a regular function and the usual convention is to give it a name with the first letter capitalised. Again, this is just a naming convention but not required by the JavaScript syntax. When the `new` operator is used in conjuction with an Object Constructor function, this is what happened behind the scene:
1. A brand new object is created (constructed). Think: `{}` an empty object.
1. The newly constructed object is set as the value of `this` in the function call.
1. Inside the Object Constructor fucntion, we are actually setting properties to the newly constructed object.
1. Unless the Object Constructor function returnes an alternate object, the `new`-invoked function call with return the newly constructed object.

### And One More Thing...

Before we go, it is worth mentioning that the **Default Binding** has the lowest priority of the 4 rules we have discussed. So whenever you are reading JavaScript code and are wondering what does the `this` value mean, always think about the other 3 rules first. If none of the 3 applies, then apply the **Defauly Binding**.

## Object Constructor and Prototype: The Simple Approach

## Closures

