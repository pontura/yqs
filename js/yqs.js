var YQS = (function(){

	var config = null;
	var country = null;
	var election = null;
	var questions = {};
	var candidates = {};

	function candidatesByCountry (countryName) {

		if(config==null){
			//console.log(countryName+" : "+config);
			setTimeout(function(){candidatesByCountry(countryName)}, 1000);
		}else{
			/*Given some country, get all the candidates json files and cache the
			photos of the candidates.

			 TODO
			      ----
			 * Mostrar un mejor error cuando el url es invalido
			 * So tengo muchas elecciones no lo va a resolver correctamente
			 */

			// Filter by countryName
			for (let i = 0; i < config.length; i++) {
				if (config[i]['country_name'] === countryName) {
					country = config[i];
				}
			}

			//console.log(country);

			let promises = [];

			country.elections.forEach(election => {

				$.get(election.candidates_url, function( data ) {
						//console.log(data);
						data = cvs2JSO(data);
						//console.log(data);

						data.forEach(candidate_info =>{

							let l = []
							for (let key in candidate_info) {
								if (candidate_info.hasOwnProperty(key) && /q_[0-9]+$/.test(key)) {
									let index = parseInt(key.split('_')[1]) - 1
									l.push(index)
								}
							}


							let amountElements = Math.max.apply(Math, l)
							let sortAnswer = new Array(amountElements)
							let longAnswer = new Array(amountElements)

							for (let key in candidate_info) {
								if (candidate_info.hasOwnProperty(key) && /q_[0-9]+$/.test(key)) {
									let index = parseInt(key.split('_')[1]) - 1
									let answer = parseInt(candidate_info[key])
									sortAnswer[index] = (isNaN(answer) ? -1 : answer)
								}
							}

							for (let key in candidate_info) {
								if (candidate_info.hasOwnProperty(key) && /q_[0-9]+_/.test(key)) {
									let index = parseInt(key.split('_')[1]) - 1
									longAnswer[index] = candidate_info[key]
								}
							}


							let candidate = {
								biography: candidate_info.biography,
								birthday: candidate_info.birthday,
								photo: candidate_info.photo,
								color: candidate_info.color,
								email: candidate_info.email,
								facebook: candidate_info.facebook,
								first_name: candidate_info.first_name,
								last_name: candidate_info.last_name,
								full_name: (candidate_info.first_name + ' ' + candidate_info.last_name).replace(/ /g, '-'),
								list: candidate_info.list,
								party_logo: candidate_info.party_logo,
								politic_party: candidate_info.politic_party,
								answers_pdf: candidate_info.answers_pdf,
								sort_answer: sortAnswer,
								long_answer: longAnswer
							}
							
							promises.push(candidate);
						})
				})
				
				//console.log(promises);
				candidates[election.name] = promises;
				//console.log(candidates);
			})		
		}
		return candidates;
	}

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
		init : function(callback){
			$.get('/static/config.json', function( data ) {
				config = data;
				callback();
				//console.log(config);
			});

		},

		getCandidatesByCountry : candidatesByCountry,

		getQuestionsByElection : questionsByElection,

		getCandidates : candidates,

		getQuestions : questions

	};

})();

function cvs2JSO(csv){

	var lines=csv.split("\n");

	var result = [];

	var headers=lines[0].split(",");

	for(var i=1;i<lines.length;i++){

		var obj = {};
		var currentline=lines[i].split(",");

		for(var j=0;j<headers.length;j++){
			obj[headers[j]] = currentline[j];
		}

		result.push(obj);

	}

	return result; //JavaScript object
	//return JSON.stringify(result); //JSON
}

function randomSubArray (arr, size) {
	/*
    Return N (size) element from a array
    */
	var shuffled = arr.slice(0)
	var i = arr.length
	var temp
	var index

	while (i--) {
		index = Math.floor((i + 1) * Math.random())
		temp = shuffled[index]
		shuffled[index] = shuffled[i]
		shuffled[i] = temp
	}
	return shuffled.slice(0, size)
}
