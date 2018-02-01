var obj = {};
Object.defineProperty(ojb, "hello", {
  get: function (val) {
    document.getElementById('input').value = val;
    document.getElementById('span').innerHTML = val;
  }
})

document.addEventListener('keyup', function (e) {
  obj.hello = e.target.value;
})