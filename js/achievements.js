var achievements = (function(){

	var config;
	var candidates;

	var achievTexts;
	var achievements = [];

	function SetAchiev(){

		let html="<h1><span>"+achievements.length+"</span> LOGROS</h1><ul>";

		for(let i=0;i<achievements.length;i++){
			html+="<li class='achiev-item' name='"+i+"'><img src='img/"+achievements[i]["category"]+".png'/><p>"+achievements[i]["name"]+"</p></li>";
			
		}

		html+="</ul>"

		$("#achievements").html(html);

		$("#achievements .achiev-item").unbind().click(function(){
			achievDetail($(this).attr("name"))
		});

	}

	function SetAchievList(categories){
		//console.log(achievements);
		let html="<ul>";

		for(let i=0;i<categories.length;i++){
			let achs = achievements.filter(function (item) {
					return item.category == categories[i]["category"];
			});
			if(achs.length==0)
			html+="<li class='achiev-item list' name='"+categories[i]["category"]+"'><img src='img/"+categories[i]["category"]+".png'/><p>"+categories[i]["text"]+"</p></li>";
			
		}

		html+="</ul>"

		$("#achievements-list").html(html);	
	}

	function achievDetail(i){
		let src = candidates[achievements[i]["candidateIndex"]]["photo"];
		gameApp.showAchievPopup(src,achievements[i]["name"],achievements[i]["category"]);
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
			console.log(config);
			$(".achiev-item.list[name*='"+cat+"']").remove();
			$("#achievement_signal").text(achievements.length +"/"+config["total-cant"]);
			localStorage.setItem(gameApp.getCountry()+"_"+gameApp.getElection()+"achievements",  JSON.stringify(achievements));			
		},

		getAchievements : function(){
			return achievements;
		},

		haveCandIDEspecialista : function(candid){
			let ach = achievements.filter(function (item) {
					return (item.category == "especialista" && item.candidateIndex == candid);
			});
			return ach.length>0;
		},

		haveCandIDExperto : function(candid){
			let ach = achievements.filter(function (item) {
					return (item.category == "experto" && item.candidateIndex == candid);
			});
			return ach.length>0;
		},

		loadAchievData :  function(conf){
			config = conf;
			let data = localStorage.getItem(gameApp.getCountry()+"_"+gameApp.getElection()+"achievements");
			if(data!=null){
				achievements = JSON.parse(data);
				$("#achievement_signal").show();
				$("#achievement_signal").text(achievements.length +"/"+config["total-cant"]);
			}else{
				$("#achievement_signal").text("0/"+config["total-cant"])
			}
		//	SetAchievList(categories);
		},

		setAchievList : SetAchievList

	};
})();
