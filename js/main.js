includeHTML();

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
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

$(document).ready(function() {

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
		gameApp.loadCasual();
	});

	$("#menu-btn-normal").click(function(){
		gameApp.loadNormal();
	});
});
gameApp.mainMenu();
