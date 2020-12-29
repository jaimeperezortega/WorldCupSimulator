const LOCAL_TEAM = 0;
const AWAY_TEAM = 1;


 export default class WorldCupLeaguePhase{
    constructor(name, teamNames=[], config={}) {
        this.name = name
        this.matchDaySchedule = []
        this.setup(config)
        this.setupTeams(teamNames)
        this.summaries = []
        this.qualifyingTeams=[]
       
    }
    setup(config){
        const defaultConfig ={
            rounds:1,
            pointsPerWin:3,
            pointsPerDraw:1,
            pointsPerLose:0
        }
        this.config = Object.assign(defaultConfig, config)
    }

    setupTeams(teamNames){
        this.teams=[]
        for(const teamName of teamNames){
            const team= {
                name: teamName,
                matchesWon:0,
                matchesDrawn:0,
                matchesLost:0,
                goalsFor:0,
                goalsAgainst:0,
                points:0
            }
           this.teams.push(team)
        }
    }

    initSchedule(){
        const numberOfMatchDays = this.teams.length -1; //numero de jornadas que es igual a numero de equipos -1
        const numberOfMatchesEveryMatchDay = this.teams.length /2;

        //Usamos un doble for para crear un array de 2 dimensiones
        for (let i=0; i<numberOfMatchDays; i++){ //Tantas iteraciones como numero de jornadas
            const matchDay= [];
            for (let j=0; j<numberOfMatchesEveryMatchDay; j++){//Tantas iteraciones como partidos haya en cada jornada
                const match = ["Equipo local", "Equipo visitante"];
                matchDay.push(match);
            }
            //después de añadir todos los partidos a la jornada, añadimos la jornada a la planificacion de todas las jornadas.
            this.matchDaySchedule.push(matchDay);
        }
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

    setAwayTeams(){
        const teamNames = this.getTeamNames();
        const maxAwayTeams = this.teams.length -2;
        let teamIndex = maxAwayTeams;
        this.matchDaySchedule.forEach(matchDay =>{
            let firstMatchFound = false;
            matchDay.forEach(match =>{
                if(!firstMatchFound){
                    firstMatchFound = true;
                } else {
                    match[AWAY_TEAM] = teamNames[teamIndex];
                    teamIndex--
                    if(teamIndex <0){
                        teamIndex = maxAwayTeams;
                    }
                }
                
            })
        })
    }

    fixLastTeamSchedule(){
        let matchDayNumber = 1;
        const teamNames = this.getTeamNames()
        const lastTeamName = teamNames[teamNames.length-1];
        this.matchDaySchedule.forEach(matchday =>{
            const firstMatch = matchday[0]
            if(matchDayNumber %2 ==0){ //si la jornada es par -> es local
                firstMatch[AWAY_TEAM] = firstMatch[LOCAL_TEAM];
                firstMatch[LOCAL_TEAM] = lastTeamName;
            } else { //si la jornada es impar, juega de visitante
                firstMatch[AWAY_TEAM] = lastTeamName;
            }
            //establecer el último equipo de la lista como visitante o local alternativamente
            matchDayNumber ++;

        })
    }

    scheduleMatchDays(){
        //algoritmo de wikipedia sistema de todos contra todos (fixtures)
        this.initSchedule();
        this.setLocalTeams();
        this.setAwayTeams();
        this.fixLastTeamSchedule();
        
    }

    start(){
        
        for (const matchDay of this.matchDaySchedule){
            const matchDaySummary = {
                results:[],
                standings:undefined
            }
            for (const match of matchDay){
                const result = this.play(match);
                // console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} `);
                this.updateTeams(result); //Actualizamos los equipos con el resultado del partido
                matchDaySummary.results.push(result);
            }
            this.getStandings();
            matchDaySummary.standings = this.teams.map(team=>Object.assign({}, team));
            this.summaries.push(matchDaySummary);
            
        }
        this.qualifyingTeams.push(this.teams[0].name, this.teams[1].name);
    }

   

    getStandings(){
        //Ordenamos nuestro array de equipos
        this.teams.sort((teamA, teamB)=>{
            if(teamA.points > teamB.points){
                return -1
            } else if (teamA.points < teamB.points){
                return 1
            } else { //empatan a puntos. Nos fijamos en diferencia de goles
                const goalsdiffA = teamA.goalsFor -teamB.goalsAgainst;
                const goalsdiffB = teamB.goalsFor -teamA.goalsAgainst;
                if(goalsdiffA > goalsdiffB){
                    return -1
                } else if(goalsdiffA < goalsdiffB){
                    return 1
                } else{
                    return 0
                }
            }
        });
        // console.table(this.teams);
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

    generateGoals(){
        return Math.round(Math.random(0,1)*10);
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


}