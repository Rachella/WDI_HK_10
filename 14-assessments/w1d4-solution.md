## CSS
1. Inline, ID, Class, Tag
1. 1)
1. `!important` at the end of css
1. Margin, Border, Padding, Content
1. `inline` will display elements side by side without contrains. `block` will display elements by stacking on top of each other. `inline-block` will display elements first side by side untill the parent element cannot fit any more, then it will stack below the first level and so on.
1. Relative is relative to it an element's original position. Absolute is relative to an element's parent element.
1. This element would not move because top right bottom left will not affect an element's position in `position: static`

## JS
1. String, Integer, Float, Boolean
1. `Math.pow(2, 2)` and `Math.sqrt(4)`
1. `Math.floor(n)` and `Math.ceil(n)`
1. `.indexOf()`, `.length`, `.split()` more at [here](http://www.w3schools.com/jsref/jsref_obj_string.asp)
1. `.length()`, `.join()` more at [here](http://www.w3schools.com/jsref/jsref_obj_array.asp)
1. `undefined` means that a value was not declared, while `null` is defined specifically to equal to nothing.

## Bonus

```js
var cuteAnimals = ["cat", "dog", "hedgehog"]

// forEach
cuteAnimals.forEach(function(animal){
  console.log("I love " + animal);
})

// Classic for loop
for (var i=0; i<cuteAnimals.length; i++){
  console.log("I love " + cuteAnimals[i]);
}
```