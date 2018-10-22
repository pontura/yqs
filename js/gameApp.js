var gameApp = (function(){

	var gameConfig;

	var currentCountry = "Colombia";
	var currentElection = "Presidente";

	var candidates;
	var questions;

	var categories = [];

	var answers=[];

	var category2logro_cant = 3;
	
	function showHeader( divToShow )
	{
		/*$("#header-home").hide();
		$("#header-qdq").hide();
		$("#header-qo").hide();*/
		$(".sectionHeader").hide();
		
		$(divToShow).show();
	}
	
	function getCategories(quest){
		//console.log(quest);
		for(q of quest){
			q["category"]
			let cat = categories.filter(function (item) {
				return item.category == q["category"];
			});
			if(cat.length==0){
				let c = { category:q["category"],cant:0,logro:false};
				categories.push(c);
			}
		}
		//console.log(categories);
	}

	function setCategories(id){
		let cat = categories.filter(function (item) {
				return item.category == questions["all"][id]["category"];
			});
		if(cat.length>0){
			//console.log(cat);
			cat[0]["cant"]++;
		}

		for(c of categories){
			if(!c["logro"]){
				if(c["cant"]==category2logro_cant){
					c["logro"]=true;
					let candid = summary.getCategoryBestWorstCandidatesIds();
					/*$("#achievement-popup").show();
					$("#achiev-img").attr("src",candid[0]["photo"]);
					$("#achievement-popup h4").text("sos el mejor "+c["category"]);*/
					console.log(candidates);
					console.log(candid[0]);
					achievements.setAchiev("sos el mejor "+c["category"],c["category"],candid[0]);
					ShowAchievPopup(candidates[currentElection][candid[0]]["photo"],"sos el mejor "+c["category"]);
				}
			}
		}

		//console.log(categories);
	}

	function ShowAchievPopup(src,text){
		$("#achievement-popup").show();
		$("#achiev-img").attr("src",src);
		$("#achievement-popup h4").text(text);
	}

	return {//funcion de inicio de la aplicación
		init : function(){
			$.get('static/gameConfig.json', function( data ) {
				gameConfig = data;
				//console.log(gameConfig);
			});			
			
			setTimeout(function(){$.mobile.loading( "show", {
			            text: "loading",
			            textVisible: true,
			            theme: "b",
			            textonly: null,
			            html: ""   });}, 1000);

			YQS.init(function(){				
				candidates = YQS.getCandidatesByCountry(currentCountry);
				questions = YQS.getQuestionsByElection(currentElection,getCategories);				
				console.log(candidates);
				//console.log(questions);
				gameApp.mainMenu();
			});
		},

		mainMenu : function(){			
			showHeader("#header-home");
			$(".game-section").hide();
			$("#game-menu").show();
		},

		loadCasual : function(){
			showHeader("#header-casual");
			$(".game-section").hide();
			$("#game-casual").show();

			casual.init(candidates[currentElection],questions["all"],gameConfig.casual);
		},
		
		loadNormal : function(){
			showHeader("#header-normal");
			$(".game-section").hide();
			$("#game-normal").show();
			normal.init(candidates[currentElection],questions["all"],gameConfig.normal);
		},	

		loadQO : function(){
			showHeader("#header-qo");
			
			$(".game-section").hide();
			$("#game-qo").show();
			
			qo.init(candidates[currentElection],questions["all"],gameConfig.qdq);
			
		},
		loadQDQ : function(){
			
			showHeader("#header-qdq");
			
			$(".game-section").hide();
			$("#game-qdq").show();

			qdq.init(candidates[currentElection],gameConfig.qdq);
			/*let selCandidate = parseInt(candidates[currentElection].length * Math.random());
			//console.log(selCandidate);
			let frase = ""
			while(frase==""){
				frase = candidates[currentElection][selCandidate]["long_answer"][ parseInt(candidates[currentElection][selCandidate]["long_answer"].length * Math.random())];
			}
			$("#qdq-frase").html(frase);
			console.log(frase);*/
		},

		loadSummary : function(){
			showHeader("#header-summary");
			$(".game-section").hide();
			$("#game-summary").show();
			summary.init(candidates[currentElection],questions["all"],answers);
		},

		loadAchievements : function(){
			showHeader("#header-summary");
			$(".game-section").hide();
			$("#game-achievements").show();
			achievements.init(candidates[currentElection]);
		},

		setCountry : function(country){
			currentCountry=country;
		},

		setElection : function(election){
			currentElection=election;
		},

		getCountry : function(){
			return currentCountry;
		},

		getElection : function(){
			return currentElection;
		},

		addAnswer : function(ans){
			answers.push(ans);
			setCategories(ans["originalIndex"]);
		},

		getAnswers : function(){
			return answers;
		},

		getCandidates : function(){
			return candidates[currentElection];
		},

		getQuestions : function(){
			return questions["all"];
		},

		showAchievPopup: ShowAchievPopup

	};

})();

