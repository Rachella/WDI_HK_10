# Assessment W1/D5
## Bootstap
1. 12
1. col-xs-x, col-sm-x, col-md-x, col-lg-x
1. `.container` is a fixed width container. `.container-fluid` is a full width container which spans the entire width of the viewport.

## JavaScript
1. `x[0]`
1. `x[x.length-1]`
1. `x[(x.length-1)/2]`
1. The code block of a `do-while` loop will be executed at least once even though the loop condition starts out as false. The code block in `while` loop will not be executed at all if the loop condition starts out as false.
1. Replacing for loop with while loop as follow

  ```javascript
   var array = "h,e,l,l,o, ,w,o,r,l,d".split(',');
   var i = 1;
   while (i < array.length) {
     var t = array[i-1];
     array[i-1] = array[i];
     array[i] = t;
     i += 3;
  }
  ```

## Bonus

```javascript
var n = 5;
var result = 1;
while (n > 0) {
  result *= n;
  n--;
}
console.log(result);
```
