var achievements = (function(){

	var config;
	var candidates;

	var achievements = [];

	function SetAchiev(){	

		let html="<h1><span>"+achievements.length+"</span> LOGROS</h1><ul>";

		for(let i=0;i<achievements.length;i++){
			html+="<li class='achiev-item' name='"+i+"'><img src='img/cup.png'/>"+achievements[i]["name"]+"</li>";
			
		}

		html+="</ul>"

		$("#achievements").html(html);

		$("#achievements .achiev-item").unbind().click(function(){
			achievDetail($(this).attr("name"))
		});

	}

	function achievDetail(i){
		let src = candidates[achievements[i]["candidateIndex"]]["photo"];
		let text = "sos el mejor "+achievements[i]["category"];
		gameApp.showAchievPopup(src,text);
	}	

	function Back(){
		gameApp.mainMenu();
	}

	return {//funcion de inicio de la aplicaci�n
		init : function(c){
			candidates = c;			
			console.log(candidates);

			$("#achievements-back-btn").unbind().click(function(){
				Back();	
			});

			SetAchiev();
		},

		setAchiev : function(n,cat,cIndex){
			let achiev = { name: n, category:cat, candidateIndex:cIndex};
			achievements.push(achiev);
		}
	};
})();