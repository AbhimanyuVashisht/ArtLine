/*$(document).ready(
	function () {
    $('p:first').attr('id','isShowing');
    $('h1:first').attr('id', 'isshowing');
    var img_slidejs = $(".slide");
    var text_slidejs=$(".h-align");
    var slide_elem = img_slidejs.toArray();
    var Item_len = slide_elem.length;      
    var current_item=0;
    var f=0;
    $('.left-arrow').click(function(){
    	f=1;
    	if(current_item===0)
    	{
    	    var itemCurrent=slide_elem[current_item];
            $(".slide--current").find('.slide__mover').animate({ opacity: 0}, 1000);
            
    		$(".slide--current").find(".h-align").removeClass("slidet");
    		$(slide_elem[current_item]).addClass("slide--current").css({height: 0,weight: 0});
    		current_item=slide_elem.length-1;
    		$(slide_elem[current_item]).addClass("slide--current").css({visibility: "visible", opacity: 1});
    		$(".slide--current").find(".h-align").addClass("slidet");
    		

    	}
    	else{
            var itemCurrent=slide_elem[current_item];
            $(slide_elem[current_item]).addClass("slide--current").css({height: 555,weight: 555});
            dynamics.animate(itemCurrent, { opacity: 0, translateX:  itemCurrent.offsetWidth/2, rotateZ: 10 }, {
            type: dynamics.spring,
            duration: 2000,
            friction: 600,
            complete: function() {
                dynamics.css(itemCurrent, { opacity: 0, visibility: 'hidden' });
            }
        });
    		$(".slide--current").find(".h-align").removeClass("slidet");
            //$(slide_elem[current_item]).removeClass("slide");
    		$(slide_elem[current_item]).removeClass("slide--current");
            
    		current_item--;
    		$(slide_elem[current_item]).addClass("slide--current");
             //$(slide_elem[current_item]).addClass("slide");
           // $(slide_elem[current_item]).addClass("slide2");
    		$(".slide--current").find(".h-align").addClass("slidet");


    	}

    	
    })
    $('.right-arrow').click(function(){
    	if(current_item===Item_len-1)
    	{
            var itemCurrent=slide_elem[current_item];
            dynamics.animate(itemCurrent, { opacity: 0, translateX: -1*itemCurrent.offsetWidth/2, rotateZ:- 10 }, {
            type: dynamics.spring,
            duration: 2000,
            friction: 600,
            complete: function() {
                dynamics.css(itemCurrent, { opacity: 0, visibility: 'hidden' });
            }
        });
    		$(".slide--current").find(".h-align").removeClass("slidet");
            //$(slide_elem[current_item]).removeClass("slide2");
    		$(slide_elem[current_item]).removeClass("slide--current");
    		current_item=0;
    		$(slide_elem[current_item]).addClass("slide--current");
           // $(slide_elem[current_item]).addClass("slide");
            //$(slide_elem[current_item]).addClass("slide2");
    		$(".slide--current").find(".h-align").addClass("slidet");
    	}
    	else{
            var itemCurrent=slide_elem[current_item];
            dynamics.animate(itemCurrent, { opacity: 0, translateX: -1* itemCurrent.offsetWidth/2, rotateZ: -10 }, {
            type: dynamics.spring,
            duration: 2000,
            friction: 600,
            complete: function() {
                dynamics.css(itemCurrent, { opacity: 0, visibility: 'hidden' });
            }
        });

             $(".slide--current").find(".h-align").removeClass("slidet"); 
             //$(slide_elem[current_item]).removeClass("slide2");            
             $(slide_elem[current_item]).removeClass("slide--current");
    		   current_item++;
    		 $(slide_elem[current_item]).addClass("slide--current");
            //$(slide_elem[current_item]).addClass("slide");
            //$(slide_elem[current_item]).addClass("slide2");
    		 $(".slide--current").find(".h-align").addClass("slidet");


    	}

    	
    })
    //$('.modal01').click(function(){
    	//$('.form-modal').css("display","block");
    	//$('.jumbotron').addClass("cover-overlay");
    //})
    
       
});
