/*function NavToggle(val) {
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
}*/

function InitGame(){
	gameApp.init();

	$("#hamBtn").click(function(){
		gameApp.mainMenu();
	});

	$("#menu-btn-qo").click(function(){
		gameApp.loadQO();
	});

	$("#menu-btn-qdq").click(function(){	
		gameApp.loadQDQ();
	});

	$("#menu-btn-casual").click(function(){
		$.mobile.loading('show');
		gameApp.loadCasual();
	});

	$("#menu-btn-normal").click(function(){
		gameApp.loadNormal();
	});

	$("#footerHomeBtn2").click(function(){
		gameApp.loadAchievements();
	})

	$("#footerHomeBtn3").click(function(){
		gameApp.loadSummary();
	});


	$(".popup-close-btn").click(function(){
		$(".popup").hide();
	});

	//console.log(jsSocials.shares);

	jsSocials.setDefaults("facebook", {
    		shareUrl: "https://facebook.com/sharer/sharer.php?u={url}&quote={text}"
	});

	//console.log(jsSocials.shares);

	$("#share").jsSocials({
		showLabel: false,
		showCount: false,
		media: function(){
			html2canvas($("#achievement-popup .popup-sign")[0]).then(function(canvas) {
				// Convert and download as image 
				return Canvas2Image.convertToJPEG(canvas); 
			});
		},
		shares: ["facebook", "twitter", "whatsapp", "googleplus"]
	});

}

$(document).ready(function() {
	includeHTML();
	$(".game-section").hide();
	$(".sectionHeader").hide();
	setTimeout(function(){InitGame()}, 1000);

});

function CreateNavigator(divId,dotsNumber){
	let html = "<div id='navigator'><ul><div class='dots done' id='p0'></div>";
	for(let i=1;i<dotsNumber;i++)
		html+="<div class='dots' id='p"+i+"'></div>";	

	html+="</ul></div>";
	$("#"+divId+" .navigator").html(html);
}

function SetNavigatorPos(divId,dotNumber){
	$("#"+divId+" .dots").each(function( index ) {
		if(index==dotNumber)
			$( this ).addClass("done");
		else
			$( this ).removeClass("done");
	});
}

function GetUrlValue(varsearch){
	var searchstring = window.location.search.substring(1);
	var variablearray = searchstring.split('&');
	for(var i = 0; i < variablearray.length; i++){
		var keyvaluepair = variablearray[i].split('=');
		if(keyvaluepair[0] == varsearch){
			return keyvaluepair[1];
		}
	}
}

//gameApp.mainMenu();
