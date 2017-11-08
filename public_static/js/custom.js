
$(document).ready(
  function () {
    $('p:first').attr('id','isShowing');
    $('h2:first').attr('id', 'isshowing');
    
//      $('.clothes-pics img').each(function(i){
//      setTimeout(function(){
//        $('.clothes-pics img').eq(i).addClass('is-showing');
//      }, 150 * (i+1));
//    });
   
  });
      
      
 $(window).scroll(function(){

var wScroll = $(this).scrollTop();
     if(wScroll > ($('.blog-post').offset().top) - $(window).height()){

    var offset = (Math.min(0, wScroll - $('.blog-post').offset().top +$(window).height() - 350)).toFixed();

    $('.post1').css({'transform': 'translate('+ offset +'px, '+ Math.abs(offset * 0.2) +'px)'});

    $('.post3').css({'transform': 'translate('+ Math.abs(offset) +'px, '+ Math.abs(offset * 0.2) +'px)'});
     }
 });
         
////    if(wScroll > $('.clothes-pics').offset().top - ($(window).height() / 1.2)) {
////
////    
////
////  }
//
//}
// });
//      
//    flag=1;
//    $("#next").click(function(){
//       if(flag==0)
//        {
//            $("#side1").css("z-index","99");
//            $("#side2").css("z-index","9");
//            $("#side3").css("z-index","9");
//            $("#side1").css("transform","translateX(0px) scale(2.25)");
//            $("#side2").css("transform","translateX(-100px) scale(1.75)");
//            $("#side3").css("transform","translateX(100px) scale(1.75)");
//            flag=1;
//        }
//        else if(flag==1)
//        {
//            $("#side3").css("z-index","99");
//            $("#side2").css("z-index","9");
//            $("#side1").css("z-index","9");
//            $("#side3").css("transform","translateX(0px) scale(2.25)");
//            $("#side1").css("transform","translateX(-100px) scale(1.75)");
//            $("#side2").css("transform","translateX(100px) scale(1.75)");
//            
//            flag=2;
//        }
//        else if(flag==2)
//        {
//            $("#side2").css("z-index","99");
//            $("#side3").css("z-index","9");
//            $("#side1").css("z-index","9");
//            $("#side2").css("transform","translateX(0px) scale(2.25)");
//            $("#side3").css("transform","translateX(-100px) scale(1.75)");
//            $("#side1").css("transform","translateX(100px) scale(1.75)");
//            flag=0;
//        }
//    });
//    $("#previous").click(function(){
//       if(flag==0)
//        {
//            $("#side3").css("z-index","999");
//            $("#side2").css("z-index","9");
//            $("#side1").css("z-index","9");
//            $("#side3").css("transform","translateX(0px) scale(2.25)");
//            $("#side1").css("transform","translateX(-100px) scale(1.75)");
//            $("#side2").css("transform","translateX(100px) scale(1.75)");
//            flag=2;
//        }
//        else if(flag==1)
//        {
//            $("#side2").css("z-index","999");
//            $("#side3").css("z-index","9");
//            $("#side1").css("z-index","9");
//            $("#side2").css("transform","translateX(0px) scale(2.25)");
//            $("#side3").css("transform","translateX(-100px) scale(1.75)");
//            $("#side1").css("transform","translateX(100px) scale(1.75)");
//            flag=0;
//        }
//        else if(flag==2)
//        {
//            $("#side1").css("z-index","999");
//            $("#side2").css("z-index","9");
//            $("#side3").css("z-index","9");
//            $("#side1").css("transform","translateX(0px) scale(2.25)");
//            $("#side2").css("transform","translateX(-100px) scale(1.75)");
//            $("#side3").css("transform","translateX(100px) scale(1.75)");
//            flag=1;
//        }
//    });    
//});
//     var img_slidejs = $(".slide");
//     var text_slidejs=$(".h-align");
//     var slide_elem = img_slidejs.toArray();
//     var Item_len = slide_elem.length;      
//     var current_item=0;

// // console.log($(slide_elem).length);
//     $('.left-arrow').click(function(){
//         navigatescroll('left');
//     });
//     $('.right-arrow').click(function(){
//         navigatescroll('right');
//     });

//     function navigatescroll(dir)
//     {
//         var itemCurrent=slide_elem[current_item],
//         currentEl=$(itemCurrent).find('.slide__mover');
//         //this is the text
//         if(dir=='right')
//         {
//             current_item = current_item > Item_len-1 ? 0 : current_item+1;
//         }
//         else
//         {
//             current_item = current_item < 0 ? Item_len-1 :current_item-1;
//         }
//         var itemNext=slide_elem[current_item];
//         nextEl=$(itemNext).find('.slide__mover');
//         //animating the currentEl out
//         $(currentEl).velocity({ opacity: 0 , translateX: (dir == 'right') ? -1 * $(currentEl).outerWidth() : $(currentEl).outerWidth(), rotateZ: (dir == 'right') ? 0 : 0 },
//             {
//                 easing: "linear",
//                 duration: 1000,
//                 complete: function() {
//                 //$(currentEl).css({translateX:dir === 'right' ? nextEl.outerWidth/2 : -1*nextEl.outerWidth/2, rotateZ: dir === 'right' ? -10 : 10});
//                 $(itemCurrent).css( { opacity: 0, visibility: 'hidden'});//making it hidden
//             }
//         });
//         $(itemNext).css( { opacity: 1, visibility: 'visible' });
//         $(nextEl).css({ opacity: 0, translateX:  (dir == 'right') ? -1*$(nextEl).outerWidth() :$(nextEl).outerWidth() , rotateZ: (dir == 'right') ? -10 : 10});
//      // $(nextEl).css({rotateZ: 0});
      
        
//         // animating the next element in
//         $(nextEl).velocity({ opacity: 1, translateX: 0 }, {
//             easing : "linear",
//             duration: 1000,
            
//         });
//            $(itemCurrent).removeClass('slide--current');
//         $(itemNext).addClass('slide--current');

//     }




