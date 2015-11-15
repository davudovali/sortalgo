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
                                                                                   
