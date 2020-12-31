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

const LOCAL_TEAM= 0;
const AWAY_TEAM = 1;


export default class RoundOf16Phase{
    constructor(teamNames){
        this.setupTeams(teamNames) //el poner este método aquí en el constructor provoca que se ejecute por cojones cada vez que instanciamos un nuevo objeto. No es enecesario llamar al método porque siempre se va a ejecturar
        this.setupTwoDimensionTeamNamesArray(teamNames);
        this.matchDay = [];
        this.qualifyingTeams = [];
        this.loserTeams=[];
        
    }
    setupTeams(teamNames){
        this.teams = [];
        
        for(const teamName of teamNames){
            const team= {
                name: teamName,
                goalsFor: 0
            }
           this.teams.push(team)
        }
    }

    setupTwoDimensionTeamNamesArray(teamNames){
        this. twoDimensionTeamNamesArray=[];
  
    for (let i = 0; i <= teamNames.length; i+= 4) {
      this.twoDimensionTeamNamesArray.push(teamNames.slice(i, i + 4)); 
        
         }
         return  this.twoDimensionTeamNamesArray.pop()
         
    }



    setupMatchDayr(){
        

        const match1 = [[this.teams[0].name, this.teams[3].name]];
        const match2 = [[this.teams[1].name, this.teams[2].name]];
        const match3 = [[this.teams[4].name, this.teams[7].name]];
        const match4 = [[this.teams[5].name, this.teams[6].name]];
        const match5 = [[this.teams[8].name, this.teams[11].name]];
        const match6 = [[this.teams[9].name, this.teams[10].name]];
        const match7 = [[this.teams[12].name, this.teams[15].name]];
        const match8 = [[this.teams[13].name, this.teams[14].name]];
            this.matchDay = [...match1,...match2,...match3,...match4,...match5,...match6,...match7,...match8]; 
        }
    

    getTeamNames() {
        return this.teams.map(team=>team.name)
    }



    start(){
        this.matchDay.forEach(match =>{
            const result= this.play(match);
            this.qualifyingTeams.push(result[1])
            this.loserTeams.push(result[2]);
            console.log(`${result[0].homeTeam} ${result[0].homeGoals} ${result[0].awayTeam} ${result[0].awayGoals} ====> ${result[1]} `);
        })
       
    }

    play(match){
        let homeGoals = 0;
        let awayGoals = 0; 
        let winnerTeam = "Equipo ganador";
        let loserTeam = "Equipo perdedor";
        
        do{
            homeGoals = Math.round(Math.random(0,1) *10);
            awayGoals = Math.round(Math.random(0,1) *10);
        } while(homeGoals === awayGoals)

        if(homeGoals > awayGoals){
            winnerTeam= match[0];
            loserTeam = match[1];
        }else if(awayGoals > homeGoals){
            winnerTeam = match[1];
            loserTeam = match[0];
        }

        return [{
            homeTeam:match[0],
            homeGoals:homeGoals,
            awayTeam: match[1],
            awayGoals:awayGoals
        }, winnerTeam, loserTeam ]
    }
}