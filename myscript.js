$(document).ready(function(){

  var canvasS=600;
  if(window.innerWidth > 600 && window.innerHeight > 600){
    if(window.innerWidth < window.innerHeight){
      canvasS=window.innerWidth;
    }else{
      canvasS=window.innerHeight;
    }
  }else{
    canvasS=600;
  }

  $('body').css('padding', (window.innerHeight-canvasS)/2+'px '+(window.innerWidth-canvasS)/2+'px ');
  $(window).on('resize', function(){
    $('body').css('padding', (window.innerHeight-canvasS)/2+'px '+(window.innerWidth-canvasS)/2+'px');
    var bPadTop=parseInt($('body').css('padding-top'));
    var pHeight=$('p#detail').height()+parseInt($('p#detail').css('margin-top'))*2;
    if(bPadTop > pHeight){
      $('body').css('padding-top', (bPadTop-pHeight)+'px');
    }
  });

  $('<p id="detail">The Source Code of this game is available at <a id="source-code" href="https://github.com/ahmedazhar05/cube-space" target="_blank">https://github.com/ahmedazhar05/cube-space</a>, feel free to edit the code and issue a pull request.</p>').appendTo('body');
  $('p#detail').css('font-size',($('body').width()-parseInt($('body').css('padding-left'))*2)/41+'px');
  $('p#detail').css('padding','0 '+canvasS/9+'px');
  var pHeight=$('p#detail').height()+parseInt($('p#detail').css('margin-top'))*2;

  //$(document).scrollTop($('p#detail').height()+parseInt($('p#detail').css('margin-top'))*2);

  var bPadTop=parseInt($('body').css('padding-top'));
  if(bPadTop > pHeight){
    $('body').css('padding-top', (bPadTop-pHeight)+'px');
  }

  $("canvas#defaultCanvas0").focus();
});
