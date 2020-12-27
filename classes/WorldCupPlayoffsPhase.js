
//Se me ocurre que en el constructor de la clase PlayOffs podemos añadir un atributo que sea this.qualified teams y ahi le pasamos los equipos ganadores de esa ronda

const LOCAL_TEAM = 0;
const AWAY_TEAM = 1;

export default class WorldCupPlayoffsPhase{
    constructor(name, teamNames=[], config={}) {
        this.name = name
        this.matchDaySchedule = []
        this.setup(config)
        this.setupTeams(teamNames)
    }
    setup(config){
        const defaultConfig ={
            rounds:1,
    
        }
        this.config = Object.assign(defaultConfig, config)
    }

    setupTeams(teamNames){
        this.teams=[]
        for(const teamName of teamNames){
            const team= {
                name: teamName,
                goalsFor:0,
                goalsAgainst:0
            }
           this.teams.push(team)
        }
    }

    initPlayoffsSchedule(){
        const numberOfMatchesEveryMatchDay = this.teams.length /2;

       
            const matchDay= [];
            for (let j=0; j<numberOfMatchesEveryMatchDay; j++){//Tantas iteraciones como partidos haya en cada jornada
                const match = ["Equipo local", "Equipo visitante"];
                matchDay.push(match);
            }
            //después de añadir todos los partidos a la jornada, añadimos la jornada a la planificacion de todas las jornadas.
            this.matchDaySchedule.push(matchDay);
        }

        getTeamNames(){
            return this.teams.map(team=>team.name)
        }
    
        setLocalTeams(){
            const teamNames = this.getTeamNames();
            const maxHomeTeams = this.teams.length-2;
            let teamIndex = 0;
            //Vamos a recorrer cada jornada y cada partido con forEach
            this.matchDaySchedule.forEach(matchDay =>{ // Método forEach para recorrer cada jornada
                matchDay.forEach(match=>{ //Método forEach para recorrer el partido de cada jornada
                    match[LOCAL_TEAM] = teamNames[teamIndex];
                    teamIndex++
                    if(teamIndex >maxHomeTeams){
                        teamIndex=0;
                    }
                })
            }) 
        }

        scheduleMatchDays(){
            this.initPlayoffsSchedule()
            this.setLocalTeams();

        }


}

