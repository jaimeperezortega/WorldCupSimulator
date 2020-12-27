Array.prototype.shuffle = function() //este código añade al prototipo array el método shuffle. A partir de ahora, a cualquier array podemos pasarle este método al habérselo agregado en esta parte
{
	var i = this.length;
	while (i)
	{
		var j = Math.floor(Math.random() * i);
		var t = this[--i];
		this[i] = this[j];
		this[j] = t;
	}
	return this;
}


const fullListOfWorldCupTeams = ["Argentina", "Uruguay", "Burundi", "USA", "Germany", "Mexico", "Canada", "Thailand", "Spain", "Japan", "Poland", "Ecuador", "Italy", "Australia", "Egypt", "Ireland", "Nederlands", "Sweden", "Qatar", "Panama", "Russia", "Cameroon", "Belgium", "Serbia", "Vatican City", "Namibia", "Kosovo", "Botswana", "Brasil", "South Korea", "San Marino", "Austria"];

fullListOfWorldCupTeams.shuffle();


export const teamsGroupA = fullListOfWorldCupTeams.slice(0,4);
export const teamsGroupB = fullListOfWorldCupTeams.slice(4,8);
export const teamsGroupC = fullListOfWorldCupTeams.slice(8,12);
export const teamsGroupD = fullListOfWorldCupTeams.slice(12,16);
export const teamsGroupE = fullListOfWorldCupTeams.slice(16,20);
export const teamsGroupF = fullListOfWorldCupTeams.slice(20,24);
export const teamsGroupG = fullListOfWorldCupTeams.slice(24,28);
export const teamsGroupH = fullListOfWorldCupTeams.slice(28,32);



// const winnerTeamsGroupA = ["Germany", "Mexico"];
// const winnerTeamsGroupB = ["Brasil", "South Korea"];
// const winnerTeamsGroupC = ["Argentina", "Uruguay"];
// const winnerTeamsGroupD = ["Spain", "Japan"];
// const winnerTeamsGroupE = ["Italy", "Australia"];
// const winnerTeamsGroupF = ["Nederlands", "Sweden"];
// const winnerTeamsGroupG = ["Russia", "Cameroon"];
// const winnerTeamsGroupH = ["Vatican City", "Namibia"];

// const worldCupPlayOffTeams = [...winnerTeamsGroupA, ...winnerTeamsGroupB, ...winnerTeamsGroupC, ...winnerTeamsGroupD, ...winnerTeamsGroupE, ...winnerTeamsGroupF, ...winnerTeamsGroupG, ...winnerTeamsGroupH];










