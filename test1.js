var arr = ['a', 'b', 'c', '1', 0, 'c', 1, '', 1, 0];

// function unique(arr){
//   let isUnique = [];

//   arr.map(val => {
//     if (isUnique.indexOf(val) === -1) {
//       isUnique.push(val);
//     }
//   })

//   return isUnique;
// }; 

// console.log(unique(arr));
// console.log('====================================');
// console.log(Array.prototype);
// console.log('====================================');
var indexOf = [].indexOf ?
function (arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      return i;
    } else {
      return -1;
    }
  };
}

function unique(arr) {
  var isUnique = [];

  arr.map(val => {
    if (indexOf(isUnique, val) === -1) {
      isUnique.push(val);
    }
  });
  return isUnique;
}