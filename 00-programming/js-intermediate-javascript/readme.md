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
The default binding is the catch-all of all rules. It means that, when none of them other rules apply, this is what JavaScript will fall back to. Here is a simple example:

```javascript
function eat() {
  console.log("I am eating " + this.food);
}

var food = "an apple";

eat();  // should print "I am eating an apple"
```

Inside the `eat` function, there is no explicit `this` value defined so JavaScript falls back to use the default one, which is the global context (the `windows` object).

### Implicit Binding

### Explicit Binding

### Hard Binding

## The New Operator

## Closures

## Object Constructor and Prototype: The Simple Approach

