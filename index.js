

import {teamsGroupA} from "./teams.js"
import {teamsGroupB} from "./teams.js"
import {teamsGroupC} from "./teams.js"
import {teamsGroupD} from "./teams.js"
import {teamsGroupE} from "./teams.js"
import {teamsGroupF} from "./teams.js"
import {teamsGroupG} from "./teams.js"
import {teamsGroupH} from "./teams.js"


import WorldCupLeaguePhase from "./classes/WorldCupLeaguePhase.js";
import WorldCupPlayoffsPhase from "./classes/WorldCupPlayoffsPhase.js";

import PlayoffsPhase from "./classes/RoundOf16Phase.js"



const groupALeague = new WorldCupLeaguePhase("GRUPO A", teamsGroupA);
const groupBLeague = new WorldCupLeaguePhase("GRUPO B", teamsGroupB);
const groupCLeague = new WorldCupLeaguePhase("GRUPO C", teamsGroupC);
const groupDLeague = new WorldCupLeaguePhase("GRUPO D", teamsGroupD);
const groupELeague = new WorldCupLeaguePhase("GRUPO E", teamsGroupE);
const groupFLeague = new WorldCupLeaguePhase("GRUPO F", teamsGroupF);
const groupGLeague = new WorldCupLeaguePhase("GRUPO G", teamsGroupG);
const groupHLeague = new WorldCupLeaguePhase("GRUPO H", teamsGroupH);



const qatarWorldCupGroups = [];
qatarWorldCupGroups.push(groupALeague,groupBLeague, groupCLeague, groupDLeague, groupELeague, groupFLeague, groupGLeague, groupHLeague);


function displayInitialTeams (group){
    console.log("");
    console.log(group.name),
    console.log("");
    group.teams.forEach(team => console.log(`- ${team.name}`));
    console.log("");
   
}



console.log("==================================");
console.log("========GRUPOS DEL MUNDIAL========")
console.log("==================================");

function displayMatchDaySchedule(group){
    let i = 1;
    group.matchDaySchedule.forEach(matchDay => {
        console.log(`JORNADA ${i}`);
        matchDay.forEach(match => {
            const home = match[0];
            const away = match[1];
            console.log(`${home} vs ${away}`)
            
        })
        console.log(``);
        i++;
        
    })
    console.log("===================");
    console.log(``);
}

qatarWorldCupGroups.forEach(group=>{
    displayInitialTeams(group);
    group.scheduleMatchDays();
    displayMatchDaySchedule(group);
    
})

const fullListofqualifyingTeamsForOctavos = [];


console.log("==================================");
console.log("===COMIENZA LA FASE DE LIGUILLAS===")
console.log("==================================");

qatarWorldCupGroups.forEach(group =>{
    console.log(group.name);
    group.start();
   let i =1;
    group.summaries.forEach(summary =>{
        console.log(`RESUMEN JORNADA ${i}`);
        summary.results.forEach(result =>{
            console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} `);
        })
        console.table(summary.standings);
        i++;
        
       
    })
    // const qualifiedTeamsFromEachGroup= [group.teams[0].name, group.teams[1].name];
    // console.log("Equipos clasificados", group.name);
    // console.log(qualifiedTeamsFromEachGroup);
    console.log(`Equipos clasificados: de este grupo: ${group.qualifyingTeams[0]} y ${group.qualifyingTeams[1]}`);
    fullListofqualifyingTeamsForOctavos.push(group.qualifyingTeams);
   
     
    console.log("");

   
})

const processedOcatvosList=[];

fullListofqualifyingTeamsForOctavos.forEach(pair =>{
    pair.forEach(team=>{
        console.log(`- ${team}`)
        processedOcatvosList.push(team);
    })
    
})



const roundOf16TeamNames = processedOcatvosList;


//COMENZAR LA FASE DE PLAYOFFS





console.log("");
console.log("==================================");
console.log("=========OCTAVOS DE FINAL=========")
console.log("==================================");
console.log("");
   

const roundOf16 = new PlayoffsPhase(roundOf16TeamNames);


roundOf16.setupMatchDayRoundOf16();


roundOf16.start();



console.log("");
console.log("==================================");
console.log("=========CUARTOS DE FINAL=========")
console.log("==================================");
console.log("");

const roundOf8TeamNames= roundOf16.qualifyingTeams;

const roundOf8 = new PlayoffsPhase(roundOf8TeamNames);
roundOf8.setupMatchDayRoundOf8();
roundOf8.start();

console.log("");
console.log("==================================");
console.log("============SEMIFINALES===========")
console.log("==================================");
console.log("");

const roundOf4TeamNames = roundOf8.qualifyingTeams;
const roundOf4 = new PlayoffsPhase(roundOf4TeamNames);
roundOf4.setupMatchDayRoundOf4();
roundOf4.start();

console.log("");
console.log("==================================");
console.log("=======TERCER Y CUARTO PUESTO=====")
console.log("==================================");
console.log("");


const runnersUpTeamNames = roundOf4.loserTeams;
const runnersUp = new PlayoffsPhase(runnersUpTeamNames);
runnersUp.setupMatchDayFinals();
runnersUp.start();

console.log("");
console.log("==================================");
console.log("===============FINAL==============")
console.log("==================================");
console.log("");

const finalsTeamNames = roundOf4.qualifyingTeams;
const finals = new PlayoffsPhase(finalsTeamNames);
finals.setupMatchDayFinals();
finals.start();

const worldCupChampionTeam = finals.qualifyingTeams;



console.log("");
console.log(`SELECCIÓN CAMPEONA DEL MUNDO: ¡¡ ${worldCupChampionTeam} !!`);
console.log("");

