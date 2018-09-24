var gameApp = (function(){

	var gameConfig;

	var currentCountry = "Colombia";
	var currentElection = "Presidente";

	var candidates;
	var questions;
	
	function showHeader( divToShow )
	{
		/*$("#header-home").hide();
		$("#header-qdq").hide();
		$("#header-qo").hide();*/
		$(".sectionHeader").hide();
		
		$(divToShow).show();
	}
	

	return {//funcion de inicio de la aplicaci�n
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
				questions = YQS.getQuestionsByElection(currentElection);				
				//console.log(candidates);
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

	};

})();

