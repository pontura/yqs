/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function NavToggle(val) {
    var x = document.getElementById("myTopnav");
    var y = document.getElementById("game-header");
    if(val==null){
	    if (x.className === "topnav") {
		x.className += " responsive";
	    } else {
		x.className = "topnav";
	    }

	    if (y.className === "responsive") {
	    	y.className="";
	    }else{
		y.className="responsive";
	    }
    }else if(val){
	x.className = "topnav responsive";
        y.className = "responsive";
    }else{
	x.className = "topnav";
	y.className = "";
    }
}

$(window).bind('scroll', function(){
	var t = $(this).scrollTop();
	var w = $(this).width();

	if (t>100){
		$('#logoBar').hide();
		
	}else{
		if(w>767)$('#logoBar').show();		
	}
	
});

window.addEventListener("resize", function() {
	var t = $(this).scrollTop();
	if($(window).width()<768){
		$('#logoBar').hide();
	}else{
		if(t<101)$('#logoBar').show();		
	}

}, false);

function fullMaskToggle(){
	if($('#fullMask').is(":visible") == true)
		$('#fullMask').hide();
	else{
		$('#fullMask').show();
		$('#fullMask').css("height",$(document).height()+"px");
	}
}

function closeDialog(e){
	e.parentElement.style.display='none';	
	fullMaskToggle();
}

/*$.getJSON( "data/texts.json", function( data ) {
	$.each( data, function( key, val ) {
		$("#"+key).html(val);
	});
});*/
