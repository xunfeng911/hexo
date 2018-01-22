// process.nextTick(function A() {
//     console.log(1);
//     process.nextTick(function B() { console.log(2); });
//     setTimeout(() => {
//         console.log(4);
//     }, 0);
// });

// console.log(3)

setImmediate(function() {
    console.log(6);
    setImmediate(function(){console.log(7);});
});
  
setTimeout(function() {
    console.log(5)
}, 0);


