function A(a){
    this.varA = a;
  }
  
  // 以上函数 A 的定义中，既然 A.prototype.varA 总是会被 this.varA 遮蔽，
  // 那么将 varA 加入到原型（prototype）中的目的是什么？
  A.prototype = {
    varA : null,  
  /*
  既然它没有任何作用，干嘛不将 varA 从原型（prototype）去掉 ? 
  也许作为一种在隐藏类中优化分配空间的考虑 ?
  https://developers.google.com/speed/articles/optimizing-javascript 
  如果varA并不是在每个实例中都被初始化，那这样做将是有效果的。
  */
    doSomething : function(){
      // ...
      console.log('a')  
    }
  }
  
  function B(a, b){
    A.call(this, a);
    this.varB = b;
  }
  B.prototype = Object.create(A.prototype, {
    varB : {
      value: null, 
      enumerable: true, 
      configurable: true, 
      writable: true 
    },
    doSomething : { 
      value: function(){ // override
        A.prototype.doSomething.apply(this, arguments); 
        // call super
        // ...
      },
      enumerable: true,
      configurable: true, 
      writable: true
    }
  });
  B.prototype.constructor = B;
  
  var b = new B('a','b');
b.doSomething();