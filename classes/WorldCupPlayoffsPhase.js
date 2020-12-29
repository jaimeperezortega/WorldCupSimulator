
//Se me ocurre que en el constructor de la clase PlayOffs podemos añadir un atributo que sea this.qualified teams y ahi le pasamos los equipos ganadores de esa ronda

//Para aegurarnos que 2 equipos no empaatan quizá es buena idea clonar el método play con un do while???. Hacer esto, mientras  homegoals == awaygoals

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
                    teamIndex+=2
                    // if(teamIndex >maxHomeTeams){
                    //     teamIndex=0;
                    // }
                })
            }) 
        }

        setawayTeams(){
            const teamNames = this.getTeamNames();
            const maxHomeTeams = this.teams.length-2;
            let teamIndex = 1;
            //Vamos a recorrer cada jornada y cada partido con forEach
            this.matchDaySchedule.forEach(matchDay =>{ // Método forEach para recorrer cada jornada
                matchDay.forEach(match=>{ //Método forEach para recorrer el partido de cada jornada
                    match[AWAY_TEAM] = teamNames[teamIndex];
                    teamIndex+=2
                    // if(teamIndex >maxHomeTeams){
                    //     teamIndex=0;
                    // }
                })
            }) 
        }



        scheduleMatchDays(){
            this.initPlayoffsSchedule()
            this.setLocalTeams();
            this.setawayTeams();

        }


        start(){
        
            for (const matchDay of this.matchDaySchedule){
                const matchDaySummary = {
                    results:[],
                }
                for (const match of matchDay){
                    const result = this.play(match);
                    // console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} `);
                    this.updateTeams(result); //Actualizamos los equipos con el resultado del partido
                    matchDaySummary.results.push(result);
                }
               
            }
        }


        play(match){
            const homeGoals= this.generateGoals();
            const awayGoals = this.generateGoals();
            return {
                homeTeam: match[LOCAL_TEAM], 
                homeGoals, 
                awayTeam: match[AWAY_TEAM], 
                awayGoals
            } 
                
            
        }

        getTeamByName(name){
            return this.teams.find(team=>team.name ===name)
        }

        updateTeams(result){
            //Hay que buscar cada equipo por su nombre en el array de equipos
           const homeTeam = this.getTeamByName(result.homeTeam);
           const awayTeam = this.getTeamByName(result.awayTeam);
         if(homeTeam && awayTeam){
             homeTeam.goalsFor+=result.homeGoals;
             homeTeam.goalsAgainst += result.awayGoals;
             awayTeam.goalsFor += result.awayGoals;
             awayTeam.goalsAgainst += result.homeGoals;
    
            if(result.homeGoals > result.awayGoals){ //gana equipo local
                homeTeam.points+= this.config.pointsPerWin;
                homeTeam.matchesWon +=1;
                awayTeam.points += this.config.pointsPerLose;
                awayTeam.matchesLost +=1;
           }else if(result.awayGoals > result.homeGoals){ // gana equipo visitante
            awayTeam.points+= this.config.pointsPerWin;
            awayTeam.matchesWon +=1;
            homeTeam.points += this.config.pointsPerLose;
            homeTeam.matchesLost +=1;
           } else { //empate
            homeTeam.points += this.config.pointsPerDraw;
            awayTeam.points+= this.config.pointsPerDraw;
            homeTeam.matchesDrawn +=1;
            awayTeam.matchesDrawn +=1;
           }
         }
    
        }
            
   


}

