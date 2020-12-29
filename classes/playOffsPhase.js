
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


export default class playOffsPhase{
    constructor(teamNames){
        this.setupTeams(teamNames) //el poner este método aquí en el constructor provoca que se ejecute por cojones cada vez que instanciamos un nuevo objeto. No es enecesario llamar al método porque siempre se va a ejecturar
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

    setupMatchDay(){
        const numberOfMatchesEveryMatchDay = this.teams.length /2;

        for (let i=0; i<numberOfMatchesEveryMatchDay; i++){//Tantas iteraciones como partidos haya en cada jornada
            const match = ["local", "visitante", "Equipo ganador"]; //[["Equipo local", "Equipo visitante"], "Equipo Ganador"];
            this.matchDay.push(match);
        }
    }

    getTeamNames(){
        return this.teams.map(team=>team.name)
    }

    setLocalTeams(){
        const teamNames = this.getTeamNames();
        let teamIndex = 0;
            this.matchDay.forEach(match=>{ 
                match[LOCAL_TEAM] = teamNames[teamIndex];
                teamIndex+=2
               
            })
    }

    setAwayTeams(){
        const teamNames = this.getTeamNames();
        let teamIndex = 1;
            this.matchDay.forEach(match=>{ 
                match[AWAY_TEAM] = teamNames[teamIndex];
                teamIndex+=2
               
            })
    }

    scheduleMatchDay(){
        this.setupMatchDay();
        this.setLocalTeams();
        this.setAwayTeams();
    
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