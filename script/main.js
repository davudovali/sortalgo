$("#sort").submit(function() {                                                     
  var i, check;
  check = $(".check");
  event.preventDefault();                                                          
 
  for(var i = 0; i < check.length; i++) {
    if(check[i].checked) {
      gen.sort.push(check[i].value);
    };
  };

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
    if(trigger) return false;
    for( var i = 0; i < gen.sort.length; i++) {
      var iter = gen.sort[i];
      gen[iter] = gen.iter[iter](iter, +gen.speed); 
      gen[iter].next();                                                               
    };
    trigger = true;
  });

  $("#reset").click(function() {
    trigger = false;
    $("#starting").toggle('fast');
    cleanConteiner();
    gen.sort = [];
  });
})()
                                                                                   
function createElem(amount) {                                                
  var i, value, cont, parent, elem, cls, width, elemWidth;
  width = 10;
  for(i = 0; i < gen.sort.length; i++) {
    cont = gen.sort[i];
    $("#" + cont + "cont").toggle('fast');
  };

  while(amount) {                                                                  
    value = Math.round(Math.random()*100);                                         
    parent = $(".row");                                                      
    for( i = 0; i < gen.sort.length; i++) {
      cont = $("#" + gen.sort[i]);
      cls = Math.round(Math.random()*10000);                                          
      elem = '<div value="' + value + '" class="' + cls + '">' + value + '</div>';       
      cont.append(elem);                                                           
    };
    elemWidth = $('.' + cls).css('width');
    width += +(elemWidth.slice(0, -2)) + 14;
    parent.css('width', width + 'px' );
    amount--;                                                                      
  };
};

function cleanConteiner() {
  var contName, i, trigger;
  for( i = 0; i < gen.sort.length; i++) {
    contName = gen.sort[i];
    if(i === (gen.sort.length - 1)) trigger = true;
    gen.removeIter[contName] = deleteElem(contName, trigger);
    gen.removeIter[contName].next();
  };
};

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
  a.css({'background-color' : 'red'})                                              
    .animate({top: "-20px"}, ( speed / 2 ))                                        
    .animate({left: (bPosition.left - aPosition.left)}, speed )                    
    .animate({top: (bPosition.top - aPosition.top)}, ( speed / 2 ));               
                                                                                   
  b.css({'background-color' : 'red'})                                              
    .animate({top: "-20px"}, ( speed / 2 ))                                        
    .animate({left: (aPosition.left - bPosition.left)}, speed )                    
    .animate({top: (aPosition.top - bPosition.top)}, ( speed / 2 ), function() {
    a.css({'background-color' : 'black'});                                              
    b.css({'background-color' : 'black'});                                              
    a.replaceWith(j);                                                              
    b.replaceWith(c);                                                              
    gen[iterName].next();                                                          
    });                                                                            
}                                                                                  

function ligthElems(a, b, iterName, speed) {                                      
  a.css({'background-color' : 'red'})                                              
    .animate({top: 0}, ( speed  ));               
                                                                                   
  b.css({'background-color' : 'red'})                                              
    .animate({top: 0}, ( speed  ), function() {
    a.css({'background-color' : 'black'});                                              
    b.css({'background-color' : 'black'});                                              
    gen[iterName].next();                                                          
    });                                                                            
}

gen.iter.stupid = function*(iterName,speed) {                                                    
  var arr, elem, elem2, counter, trigger, i;
  arr = document.getElementById(iterName).children;                            
  elem, elem2;                                                                 
  counter = 0;
  do {                                                                             
    trigger = arr.length;                                                      
    for (i = 0; i < (arr.length - 1); i++) {                                   
     elem = $(arr[i]);                                                             
     elem2 = $(arr[i + 1]);                                                        
      if(elem2) {                                                                   
        if (+elem.attr('value') > +elem2.attr('value')){                           
          changePlace(elem, elem2, iterName, speed);                               
          trigger--;                                                               
          $("#" + iterName + "counter").text(++counter);
          yield;                                                                   
          break;
        } else {
          ligthElems(elem, elem2, iterName, speed);
          yield;
        }                                                                           
      }                                                                             
    }                                                                               
  } while(trigger !== arr.length);                                                 
}                                                                                  

                                                                                   

gen.iter.bubble = function*(iterName, speed) {                                                    
  var arr, trigger, elem, elem2, counter, i;
  arr = document.getElementById(iterName).children;                            
  elem, elem2;                                                                 
  counter = 0;
  do {                                                                             
    trigger = arr.length;                                                      
    for (i = 0; i < (arr.length - 1); ++i) {                                         
     elem = $(arr[i]);                                                             
     elem2 = $(arr[i + 1]);                                                        
      if(elem2) {                                                                   
        if (+elem.attr('value') > +elem2.attr('value')){                           
          changePlace(elem, elem2, iterName, speed);                               
          trigger--;                                                               
          $("#" + iterName + "counter").text(++counter);
          yield;                                                                   
        } else {
          ligthElems(elem, elem2, iterName, speed);
          yield;
        }                                                                           
      }                                                                             
    }                                                                               
  } while(trigger !== arr.length);                                                 
}                                                                                  

                                                                                   
function* deleteElem(iterName, trigger) {                                                       
  var arr = document.getElementById(iterName).children;
  var elem;
  while ( arr.length ) {                                         
    elem = $(arr[0]); 
    elem.stop(true, true);
    elem.animate({top: "-20px"}, 100, function() {
      elem.remove();
      gen.removeIter[iterName].next();
    });                                                                
    yield;                                                                           
  };
  $("#" + iterName + "cont").toggle('fast');
  if(trigger) $("#sort").toggle().animate({top: "30%"}, 1000); 
  $("p.counter").text('0');
}            
