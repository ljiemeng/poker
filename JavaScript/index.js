window.onload = function(){
  // var kaiguan=false;
  var start=document.getElementById('start');
  start.onmousedown=function(){
    start.style.webkitTransform='scale3d(0.9,0.9,0.9)';
    
  };
  start.onmouseup=function(){
      overup.style.display='none';
    }

 
    var pai=document.getElementsByClassName('poker');
    var sence=document.getElementById('sence');
    var moveRight=document.getElementById('move-to-right'),
    moveLeft=document.getElementById('move-to-left'),
    leftSet=document.getElementById('left-set'),
    rightSet=document.getElementById('right-set');
    var previous;
    var isWin = function(){
    var pyramids = document.getElementsByClassName('pyramid');
      if(pyramids.length == 0){
        return true;
      }
      //TODO
      return false;
    };
    var isFree = function(el){
      var x = Number( el.id.split('_')[0] ),
          y = Number( el.id.split('_')[1] ),
          childLeftId = (x + 1) + '_' + y,
          childRightId = (x + 1) + '_' + ( y + 1 );
      if( document.getElementById(childLeftId) || document.getElementById(childRightId) ) return false;
      return true;
    };
    sence.onclick = function(e){
      var el = e.target;
      if (el == this || el==moveLeft
          || el == moveRight || el.hasAttribute('id') && !isFree(el) ){
        if(previous){
          previous.style.border = 'none';
          previous = null;
        }
        return;
      }
      if( el.getAttribute('data') == '13'){
        el.parentElement.removeChild(el);
        return;
      }
      if( previous &&
          Number(previous.getAttribute('data')) +
          Number(el.getAttribute('data')) == 13 ){
            previous.parentElement.removeChild(previous);
            el.parentElement.removeChild(el);
            return;
          }
      if(previous){
        previous.style.border = 'none';
      }
      el.style.border = '2px solid rgba(0,199,227,0.8)';
      previous = el;
  };
  moveRight.onclick  = function(){
      if( !leftSet.children.length) {return;}
      rightSet.appendChild(leftSet.lastElementChild);
  };
  moveLeft.onclick = (function(){
      var count = 0;
      return function(){
        if( count == 3 || leftSet.children.length != 0) return;
        while(rightSet.children.length){
          leftSet.appendChild(rightSet.lastElementChild);
      }
        count++;
      };
  })();
 
  sence.onmousedown = function(e){e.preventDefault();};

  var generatePoker = function(){
    var colors = ['ac','ad','ah','as'],
        dict  = {}, poker = [];
    while( poker.length !== 52 ){
      var  color  =  colors[ Math.floor(Math.random()*4) ];
      var  number =  Math.floor( Math.random()*13 + 1 );
      var key = color + number;
      if( !dict[key] ){
        poker.push( {color:color,number:number} );
        dict[key] = true;
      }
    }
    return poker;
  };
 
  var fn=function(){
    var index = 0, poker = generatePoker(), el,guize = {1:'A',11:'J',12:'Q',13:'K'};
    for ( var i = 0;  i < 7;  i++){
      for ( var j = 0;  j < i+1;  j++){
        el = document.createElement('div');
        el.setAttribute('class','poker pyramid');
        el.setAttribute('id',i + '_' + j );
        el.setAttribute('data',poker[index].number);
        el.style.top = 50*i + 'px';
        el.style.left = (6-i)*60 + j*120 + 'px';
        el.innerHTML = guize[ poker[index].number ]?
          guize[poker[index].number]:poker[index].number;
        el.style.backgroundImage = 'url(./images/p_'+
          poker[index++].color + '.png)';
        sence.appendChild(el);
      }
    }
    for ( var i = 0;  i < 24;  i++){
      el = document.createElement('div');
      el.setAttribute('class','poker remain-poker ');
      el.setAttribute('data',poker[index].number);
      el.innerHTML = guize[ poker[index].number ]?
        guize[poker[index].number]:poker[index].number;
      el.style.backgroundImage = 'url(./images/p_'+
        poker[index++].color + '.png)';
      leftSet.appendChild(el);
    }
  }();
  while(pai.length==0){
    overup.style.display='block';
    guize.style.display='none';
    start.style.display='none';
    gameover.style.display='block';
  }

    
    

};
