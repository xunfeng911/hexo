function Jsonp(src) {
    function getData(data) {
      return data;
    }
    _src = src + '?callback=getData';
    var _script = document.createElement("script");
    _script.src = _src;
    document.body.appendChild(_script);
}
Jsonp('localhost:3040/?username=aa')
console.log( Jsonp('https://api.weibo.com/2/statuses/home_timeline.json'))