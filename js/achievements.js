var achievements = (function(){

	var config;
	var candidates;

	var achievTexts;
	var achievements = [];

	function SetAchiev(){

		let html="<h1><span>"+achievements.length+"</span> LOGROS</h1><ul>";

		for(let i=0;i<achievements.length;i++){
			html+="<li class='achiev-item' name='"+i+"'><img src='img/cup.png'/><p>"+achievements[i]["name"]+"</p></li>";
			
		}

		html+="</ul>"

		$("#achievements").html(html);

		$("#achievements .achiev-item").unbind().click(function(){
			achievDetail($(this).attr("name"))
		});

	}

	function achievDetail(i){
		let src = candidates[achievements[i]["candidateIndex"]]["photo"];
		gameApp.showAchievPopup(src,achievements[i]["name"]);
	}	

	function Back(){
		gameApp.mainMenu();
	}

	return {//funcion de inicio de la aplicación
		init : function(c){
			candidates = c;			
			//console.log(candidates);

			$("#achievements-back-btn").unbind().click(function(){
				Back();	
			});

			//console.log(gameApp.achievTexts);
			SetAchiev();
		},

		setAchiev : function(n,cat,cIndex){
			if(achievements.length==0)
				$("#achievement_signal").show();					
			let achiev = { name: n, category:cat, candidateIndex:cIndex};
			achievements.push(achiev);
			$("#achievement_signal").text(achievements.length);
			localStorage.setItem("achievements",  JSON.stringify(achievements));			
		},

		getAchievements : function(){
			return achievements;
		},

		loadAchievData :  function(){
			let data = localStorage.getItem("achievements");
			if(data!=null){
				achievements = JSON.parse(data);
				$("#achievement_signal").show();
				$("#achievement_signal").text(achievements.length);
			}
		}

	};
})();
