var gameApp = (function(){

	var candidates;
	var questions;

	function questionsByElection (electionName) {
		/*Given some country and election, get the question file*/
		election = null

		// Filter by electionName
		for (var i = 0; i < country.elections.length; i++) {
			if (country.elections[i]['name'] === electionName) {
				election = country.elections[i]
			}
		}

		$.get(election.questions_url, function( data ) {
			// Add the question original index
			
			//console.log(data);
			data = cvs2JSO(data);
			//console.log(data);
			//
			data.forEach((question, index) => {
				question.originalIndex = index
			})

			questions.selection = randomSubArray(data, election.questions_number)
			questions.all = data

			// Agrego la propiedad more_options en yqs.questions
			if (election.hasOwnProperty('more_options')) {
				questions.more_options = election.more_options
			} else {
				questions.more_options = true
			}
			
			console.log(questions);
		});

		return questions;
	}

	return {//funcion de inicio de la aplicación
		init : function(){
			YQS.init(function(){
				console.log("init done");
				candidates = YQS.getCandidatesByCountry("Mexico");
				questions = YQS.getQuestionsByElection("Presidente");				
			});
		},

		mainMenu : function(){
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

		loadQDQ : function(){
			$(".game-section").hide();
			$("#game-qdq").show();
		},

	};

})();

