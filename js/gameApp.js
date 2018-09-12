var gameApp = (function(){

	var currentCountry = "Colombia";
	var currentElection = "Presidente";

	var candidates;
	var questions;
	
	function showHeader( divToShow )
	{
		$("#header-home").hide();
		$("#header-qdq").hide();
		$("#header-qo").hide();
		
		$(divToShow).show();
	}
	

	return {//funcion de inicio de la aplicación
		init : function(){
			YQS.init(function(){
				candidates = YQS.getCandidatesByCountry(currentCountry);
				questions = YQS.getQuestionsByElection(currentElection);				
				console.log(candidates);
			});
		},

		mainMenu : function(){			
			showHeader("#header-home");
			$(".game-section").hide();
			$("#game-menu").show();
		},

		loadCasual : function(){
			$(".game-section").hide();
			$("#game-casual").show();			
		},
		
		loadNormal : function(){
			$(".game-section").hide();
			$("#game-normal").show();
		},	

		loadQO : function(){
			console.log("loadQO");
			showHeader("#header-qo");
			
			$(".game-section").hide();
			$("#game-qo").show();

			//qdq.init(candidates[currentElection]);
			/*let selCandidate = parseInt(candidates[currentElection].length * Math.random());
			//console.log(selCandidate);
			let frase = ""
			while(frase==""){
				frase = candidates[currentElection][selCandidate]["long_answer"][ parseInt(candidates[currentElection][selCandidate]["long_answer"].length * Math.random())];
			}
			$("#qdq-frase").html(frase);
			console.log(frase);*/
		},
		loadQDQ : function(){
			
			showHeader("#header-qdq");
			
			$(".game-section").hide();
			$("#game-qdq").show();

			qdq.init(candidates[currentElection]);
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
		}

	};

})();

