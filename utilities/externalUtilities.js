const { numberPlayersPerMatch } = require('../config.json');

const wonderfulMatchmaking =
function (users){
    alpha=[];
    beta=[];
    //faccio l'array sort
    users.sort(sorter);
    //divido
    users.forEach((user, index) => {
        if(alpha.length===beta.length){//it can not be =4
            if(deconverter(summation(alpha))===deconverter(summation(beta))){//alpha.length===0 && beta.length===0 is covered
                if(parseInt(Math.random()*2)===0){//I don't want backs play always in Alpha team, just for it :(
                    alpha.push(user);
                }else{
                    beta.push(user);
                }
            }else if(deconverter(summation(alpha))>deconverter(summation(beta))){
                beta.push(user);
            }else{
                alpha.push(user);
            }
        }else if(alpha.length===numberPlayersPerMatch/2 || alpha.length>beta.length){
            beta.push(user);
        }else if(beta.length===numberPlayersPerMatch/2 || alpha.length<beta.length){
            alpha.push(user);
        }
    });
    alpha.forEach(player=>player.team=true);
    beta.forEach(player=>player.team=false);
    return alpha.concat(beta);

    /*
    0) t, f, f   1) f, f, t   2) f, t, f   3) t, t, f
    4) f, t, t   5) t, f, t   6) t, t, t,  7) f, f, f/null
     */
    function sorter(user){
        if(user.anchorback){
            if(user.midsupport){
                if(user.frontslayer){
                    return 6;
                }else{
                    return 3;
                }
            }else{
                if(user.frontslayer){
                    return 5;
                }else{
                    return 0;
                }
            }
        }else{
            if(user.midsupport){
                if(user.frontslayer){
                    return 4;
                }else{
                    return 2;
                }
            }else{
                if(user.frontslayer){
                    return 1;
                }else{
                    return 7;
                }
            }
        }
    }

    function summation(array){
        let sum=[0, 0, 0];
        array.forEach(user => {
            let weight=converter(user);
            sum[0]+=weight[0];
            sum[1]+=weight[1];
            sum[2]+=weight[2];
        });
        return sum;
    }

    function deconverter(array){
        return (array[0]?1:0)*100+(array[1]?1:0)*10+(array[2]?1:0);
    }

    function converter(user){//null?-->false
        return [(user.anchorback?1:0), user.midsupport?1:0, user.frontslayer?1:0];
    }
}

msToTime =
function (ms){
    days = Math.floor(ms / 86400000); // 24*60*60*1000
    daysms = ms % 86400000; // 24*60*60*1000
    hours = Math.floor(daysms / 3600000); // 60*60*1000
    hoursms = ms % 3600000; // 60*60*1000
    minutes = Math.floor(hoursms / 60000); // 60*1000
    minutesms = ms % 60000; // 60*1000
    sec = Math.floor(minutesms / 1000);

    let str = "";
    if (days) str = str + days + "d";
    if (hours) str = str + hours + "h";
    if (minutes) str = str + minutes + "m";
    if (sec) str = str + sec + "s";

    return str;
}

module.exports={
    wonderfulMatchmaking,
    msToTime
}

