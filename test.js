// function lengthOfLongestSubstring(s) {
//     const map = {};
//     var left = 0;
    
//     return s.split('').reduce((max, v, i) => {
//         left = map[v] >= left ? map[v] + 1 : left;
//         map[v] = i;
//         return Math.max(max, i - left + 1);
//     }, 0);
// }

// let a = lengthOfLongestSubstring('pwwkew')
// console.log(lengthOfLongestSubstring('pwwkew'))

// var numbers = [15.5, 2.3, 1.1, 4.7];
// function getSum(total, num) {
//     return total + num;
// }
// console.log(numbers.reduce(getSum))


var findMedianSortedArrays = function(nums1= [], nums2 = []) {
    let b = nums1.concat(nums2).sort(sortNum), res = 0;
    console.log(b)
    let is = b.length % 2;
    if (is === 0) {
        res = (b[len - 1] + b[len]) / 2;
    } else {
        res = b[parseInt(len)]
    }
    return res;
};
function sortNum(a, b) {
    return a - b;
}
let nums1 = [1]
let nums2 = [2,3,4,5,6,7,8,9,10]

console.log(findMedianSortedArrays(nums1, nums2));