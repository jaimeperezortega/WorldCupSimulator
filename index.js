

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




//PRIMER REQUISITO: PINTAR TODOS LOS EQUIPOS DEL MUNDIAL POR PANTALLA

//Me creo una función cuya misión es pintar el nombre del grupo y luego un listado de los nombres de los equipos. Esta función luego se la voy a pasar a cada grupo en la iteracion forEach

function displayInitialTeams (group){
    console.log(group.name),
    console.log("");
    group.teams.forEach(team => console.log(`- ${team.name}`));
    console.log("");
   
}

//Recorro el array que tiene contenidos a todos los grupos del mundial y sobre cada grupo aplico la función de callback para pintar los datos de cada grupo del mundial. Estaba aplicando estas funciones en cada uno de los grupos y se me ha ocurrido el forEach para solo necesitar escribirlo una vez (bien por mi!!)

function displayMatchDaySchedule(group){
    let i = 1;
    group.matchDaySchedule.forEach(matchDay => {
        console.log(`JORNADA ${i}`);
        matchDay.forEach(match => {
            // console.log(match.join(`  VS  `))
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
    
    // console.log(group.matchDaySchedule);
})


//COMENZAR LA FASE DE LIGUILLAS

qatarWorldCupGroups.forEach(group =>{
    console.log(group.name);
    group.start();
    console.log("");
})







//EJEMPLO METODO JORNADA DE PLAYOFFS (por ejemplo las semis)

// const octavosDeFinal = new WorldCupPlayoffsPhase("OCTAVOS DE FINAL", [1,2,3,4,5,6,7,8])


// octavosDeFinal.scheduleMatchDays();
// console.log(octavosDeFinal.matchDaySchedule);


