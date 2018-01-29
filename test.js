var par = document.getElementById("parent");
par.addEventListener("click",function (e) {
  console.log(e)
  console.log(e.currentTarget)
  console.log(e.target.innerHTML)
})