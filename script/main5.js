System.registerModule("main.js", [], function(require) {
  "use strict";
  var $__7 = $traceurRuntime.initTailRecursiveFunction(deleteElem);
  var $__3 = $traceurRuntime.initGeneratorFunction(deleteElem);
  var __moduleName = "main.js";
  $("#sort").submit(function() {
    var i,
        check;
    check = $(".check");
    event.preventDefault();
    for (var i = 0; i < check.length; i++) {
      if (check[i].checked) {
        gen.sort.push(check[i].value);
      }
      ;
    }
    ;
    $("#sort").animate({top: "20px"}, 1000, function() {
      $("#sort").toggle('fast');
      $("#starting").toggle('fast');
      gen.speed = $('select#speed').val();
      createElem($('input#number').val());
    });
    return false;
  });
  (function() {
    var trigger = false;
    $("#start").click(function() {
      if (trigger)
        return false;
      for (var i = 0; i < gen.sort.length; i++) {
        var iter = gen.sort[i];
        gen[iter] = gen.iter[iter](iter, +gen.speed);
        gen[iter].next();
      }
      ;
      trigger = true;
    });
    $("#reset").click(function() {
      trigger = false;
      $("#starting").toggle('fast');
      cleanConteiner();
      gen.sort = [];
    });
  })();
  function createElem(amount) {
    var i,
        value,
        cont,
        parent,
        elem,
        cls,
        width,
        elemWidth;
    width = 10;
    for (i = 0; i < gen.sort.length; i++) {
      cont = gen.sort[i];
      $("#" + cont + "cont").toggle('fast');
    }
    ;
    while (amount) {
      value = Math.round(Math.random() * 100);
      parent = $(".row");
      for (i = 0; i < gen.sort.length; i++) {
        cont = $("#" + gen.sort[i]);
        cls = Math.round(Math.random() * 10000);
        elem = '<div value="' + value + '" class="' + cls + '">' + value + '</div>';
        cont.append(elem);
      }
      ;
      elemWidth = $('.' + cls).css('width');
      width += +(elemWidth.slice(0, -2)) + 14;
      parent.css('width', width + 'px');
      amount--;
    }
    ;
  }
  ;
  function cleanConteiner() {
    var contName,
        i,
        trigger;
    for (i = 0; i < gen.sort.length; i++) {
      contName = gen.sort[i];
      if (i === (gen.sort.length - 1))
        trigger = true;
      gen.removeIter[contName] = deleteElem(contName, trigger);
      gen.removeIter[contName].next();
    }
    ;
  }
  ;
  var gen = {
    removeIter: {},
    sort: [],
    iter: {}
  };
  function changePlace(a, b, iterName, speed) {
    var aPosition = a.offset();
    var bPosition = b.offset();
    var j = b.clone();
    var c = a.clone();
    a.css({'background-color': 'red'}).animate({top: "-20px"}, (speed / 2)).animate({left: (bPosition.left - aPosition.left)}, speed).animate({top: (bPosition.top - aPosition.top)}, (speed / 2));
    b.css({'background-color': 'red'}).animate({top: "-20px"}, (speed / 2)).animate({left: (aPosition.left - bPosition.left)}, speed).animate({top: (aPosition.top - bPosition.top)}, (speed / 2), function() {
      a.css({'background-color': 'black'});
      b.css({'background-color': 'black'});
      a.replaceWith(j);
      b.replaceWith(c);
      gen[iterName].next();
    });
  }
  function ligthElems(a, b, iterName, speed) {
    a.css({'background-color': 'red'}).animate({top: 0}, (speed));
    b.css({'background-color': 'red'}).animate({top: 0}, (speed), function() {
      a.css({'background-color': 'black'});
      b.css({'background-color': 'black'});
      gen[iterName].next();
    });
  }
  gen.iter.stupid = $traceurRuntime.initGeneratorFunction($traceurRuntime.initTailRecursiveFunction(function $__1(iterName, speed) {
    return $traceurRuntime.call(function(iterName, speed) {
      var arr,
          elem,
          elem2,
          counter,
          trigger,
          i;
      return $traceurRuntime.continuation($traceurRuntime.createGeneratorInstance, $traceurRuntime, [$traceurRuntime.initTailRecursiveFunction(function($ctx) {
        return $traceurRuntime.call(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                arr = document.getElementById(iterName).children;
                elem, elem2;
                counter = 0;
                $ctx.state = 26;
                break;
              case 26:
                trigger = arr.length;
                $ctx.state = 23;
                break;
              case 23:
                i = 0;
                $ctx.state = 21;
                break;
              case 21:
                $ctx.state = (i < (arr.length - 1)) ? 17 : 19;
                break;
              case 6:
                i++;
                $ctx.state = 21;
                break;
              case 17:
                elem = $(arr[i]);
                elem2 = $(arr[i + 1]);
                $ctx.state = 18;
                break;
              case 18:
                $ctx.state = (elem2) ? 15 : 6;
                break;
              case 15:
                $ctx.state = (+elem.attr('value') > +elem2.attr('value')) ? 7 : 13;
                break;
              case 7:
                changePlace(elem, elem2, iterName, speed);
                trigger--;
                $("#" + iterName + "counter").text(++counter);
                $ctx.state = 8;
                break;
              case 8:
                $ctx.state = 2;
                return;
              case 2:
                $ctx.maybeThrow();
                $ctx.state = 19;
                break;
              case 13:
                ligthElems(elem, elem2, iterName, speed);
                $ctx.state = 14;
                break;
              case 14:
                $ctx.state = 10;
                return;
              case 10:
                $ctx.maybeThrow();
                $ctx.state = 6;
                break;
              case 19:
                $ctx.state = (trigger !== arr.length) ? 26 : -2;
                break;
              default:
                return $traceurRuntime.continuation($ctx.end, $ctx, []);
            }
        }, this, arguments);
      }), $__1, this]);
    }, this, arguments);
  }));
  gen.iter.bubble = $traceurRuntime.initGeneratorFunction($traceurRuntime.initTailRecursiveFunction(function $__2(iterName, speed) {
    return $traceurRuntime.call(function(iterName, speed) {
      var arr,
          trigger,
          elem,
          elem2,
          counter,
          i;
      return $traceurRuntime.continuation($traceurRuntime.createGeneratorInstance, $traceurRuntime, [$traceurRuntime.initTailRecursiveFunction(function($ctx) {
        return $traceurRuntime.call(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                arr = document.getElementById(iterName).children;
                elem, elem2;
                counter = 0;
                $ctx.state = 24;
                break;
              case 24:
                trigger = arr.length;
                $ctx.state = 21;
                break;
              case 21:
                i = 0;
                $ctx.state = 19;
                break;
              case 19:
                $ctx.state = (i < (arr.length - 1)) ? 15 : 17;
                break;
              case 4:
                ++i;
                $ctx.state = 19;
                break;
              case 15:
                elem = $(arr[i]);
                elem2 = $(arr[i + 1]);
                $ctx.state = 16;
                break;
              case 16:
                $ctx.state = (elem2) ? 13 : 4;
                break;
              case 13:
                $ctx.state = (+elem.attr('value') > +elem2.attr('value')) ? 5 : 11;
                break;
              case 5:
                changePlace(elem, elem2, iterName, speed);
                trigger--;
                $("#" + iterName + "counter").text(++counter);
                $ctx.state = 6;
                break;
              case 6:
                $ctx.state = 2;
                return;
              case 2:
                $ctx.maybeThrow();
                $ctx.state = 4;
                break;
              case 11:
                ligthElems(elem, elem2, iterName, speed);
                $ctx.state = 12;
                break;
              case 12:
                $ctx.state = 8;
                return;
              case 8:
                $ctx.maybeThrow();
                $ctx.state = 4;
                break;
              case 17:
                $ctx.state = (trigger !== arr.length) ? 24 : -2;
                break;
              default:
                return $traceurRuntime.continuation($ctx.end, $ctx, []);
            }
        }, this, arguments);
      }), $__2, this]);
    }, this, arguments);
  }));
  function deleteElem(iterName, trigger) {
    return $traceurRuntime.call(function(iterName, trigger) {
      var arr,
          elem;
      return $traceurRuntime.continuation($traceurRuntime.createGeneratorInstance, $traceurRuntime, [$traceurRuntime.initTailRecursiveFunction(function($ctx) {
        return $traceurRuntime.call(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                arr = document.getElementById(iterName).children;
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = (arr.length) ? 5 : 7;
                break;
              case 5:
                elem = $(arr[0]);
                elem.stop(true, true);
                elem.animate({top: "-20px"}, 100, function() {
                  elem.remove();
                  gen.removeIter[iterName].next();
                });
                $ctx.state = 6;
                break;
              case 6:
                $ctx.state = 2;
                return;
              case 2:
                $ctx.maybeThrow();
                $ctx.state = 9;
                break;
              case 7:
                ;
                $("#" + iterName + "cont").toggle('fast');
                if (trigger)
                  $("#sort").toggle().animate({top: "30%"}, 1000);
                $("p.counter").text('0');
                $ctx.state = -2;
                break;
              default:
                return $traceurRuntime.continuation($ctx.end, $ctx, []);
            }
        }, this, arguments);
      }), $__3, this]);
    }, this, arguments);
  }
  return {};
});
System.get("main.js" + '');
