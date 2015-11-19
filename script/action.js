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
    $('#counters').toggle('fast');
  });
  return false;                                                                    
});                                                                                

(function() {

  var trigger = false;
  
  $("#start").click(function() {
    if(trigger) return false;
    setTimers();
    for( var i = 0; i < gen.sort.length; i++) {
      var iter = gen.sort[i];
      gen.ready[iter] = gen.iter[iter](iter, +gen.speed); 
      gen.ready[iter].next();                                                               
    };
    trigger = true;
  });

  $("#reset").click(function() {
    trigger = false;
    $('#counters').hide('fast');
    $("#starting").hide('fast');
    clearInterval(gen.timer);
    gen.time=[0,0];
    $("div > p:last-child").text('00 : 00').attr({'class':'time'});
    for(var i in gen.ready) {
      gen.ready[i] = {};
    };
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

function setTimers() {
  var zero, zero1;
  zero = '', zero1 = '';
  gen.timer = setInterval(function() {
    gen.time[1] += 1;
    if(gen.time[1] == 60) {
      gen.time[0] += 1;
      gen.time[1] = 0;
    };
    if(gen.time[1] < 10) { 
      zero1 = '0';
    } else {
      zero1 = '';
    };
    if(gen.time[0] < 10) { 
      zero = '0';
    } else {
      zero = '';
    };
    var timeString = zero + gen.time[0] + ' : ' +  zero1 + gen.time[1]; 
    $(".time").text(timeString);
  }, 1000);
};

var gen = {                                                                        
  removeIter: {},
  sort: [],
  iter: {},
  ready: {},
  time: [ 0, 0],
  timer: {}
};                                                                                 
                                                                                   
