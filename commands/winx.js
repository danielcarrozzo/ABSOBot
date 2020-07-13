const Discord = require('discord.js');

module.exports = {
  name: 'winx',
  aliases: ['w', 'wi', 'magic winx, trasformaci'],
  description: 'Italian lyrics of Winx',
  guildOnly: 'false',
  execute(client, message, args, prefix) {//solo se hai KICK
    var msg=message;
    var trasformations=[];
    trasformations[0]=['Magic', 'Magic Winx', 'Livello base', 'magic', 'magic winx', 'livello base'];
    trasformations[1]=['Charmix', 'charmix'];
    trasformations[2]=['Enchantix', 'enchantix'];
    trasformations[3]=['Enchantix Harmonix', 'enchantix harmonix', 'Harmonix', 'harmonix'];
    trasformations[4]=['Enchantix Sirenix', 'enchantix sirenix', 'Sirenix', 'sirenix'];
    trasformations[5]=['Livello base', 'Magic', 'Magic Winx', 'livello base', 'magic', 'magic winx'];
    trasformations[6]=['Livello base', 'Magic', 'Magic Winx', 'livello base', 'magic', 'magic winx'];
    trasformations[7]=['Livello base', 'Magic', 'Magic Winx', 'livello base', 'magic', 'magic winx'];
    trasformations[8]=['Livello base', 'Magic', 'Magic Winx', 'livello base', 'magic', 'magic winx'];
    trasformations[9]=['Livello base', 'Magic', 'Magic Winx', 'livello base', 'magic', 'magic winx'];
    trasformations[10]=['Livello base', 'Magic', 'Magic Winx', 'livello base', 'magic', 'magic winx'];
    var testo;
    //message.channel.send(`${trasformations[0]}`);
    message.channel.send(`${args[0]}`);
    message.channel.send(`${trasformations[1].includes(args[0])}`);
    var index;
    if(trasformations[0].includes(args[0])){
        index=0;
        testo="Siamo noi le Winx"+
        "Fonte di energia"+
        "Con la magia\n"+
        "Sfideremo le malvagie Trix\n"+
        "Nuove fate siamo Winx\n"+
        
        "Flora\n"+
        "Flora\n"+
        
        "Winx Club\n"+
        "Stella Stella Stella\n"+
        "Ali in cielo noi siamo Winx\n"+
        
        "Sono Bloom col fuoco mi difenderò\n"+
        "E la mia forza dal cuore salirà\n"+
        "Io sono stella di luce di luce splenderò\n"+
        "Con i poteri raggi magici faro’\n"+
        "Siamo magiche\n"+
        
        "Siamo noi le Winx\n"+
        "Fonte di energia\n"+
        "Con la magia\n"+
        "Sfideremo le malvagie Trix\n"+
        "Nuove fate siamo Winx\n\n"+
        
        "Tecna\n"+
        "Musa\n"+
        "Flora\n"+
        "Bloom Bloom Bloom\n\n"+
        
        "Winx Club\n"+
        "Stella Stella Stella\n"+
        "Ali in cielo noi siamo Winx\n\n"+
        
        "Sono Flora e profumi emanerò\n"+
        "Con le pozioni magiche ogni cosa cambierò\n"+
        "E sono Tecna e tecnologica sarò\n"+
        "Ed i misteri nascosti con scienza esplorerò\n"+
        "E sono musa ed il volume della musica alzerò\n"+
        "Sempre di piu’ sempre di piu’ sempre di piu’\n\n"+
        
        "Siamo noi le Winx\n"+
        "Fonte di energia\n"+
        "Con la magia\n"+
        "Sfideremo le malvagie Trix\n"+
        "Nuove fate siamo Winx\n\n"+
        
        "Nuove fate siamo\n"+
        "Nuove fate siamo\n"+
        "Nuove fate siamo\n"+
        "Nuove fate siamo\n"+
        "Nuove fate siamo\n"+
        "Nuove fate siamo\n"+
        "Nuove fate siamo\n"+
        "Nuove fate siamo Winx\n"+
        
        "Winx Club\n"+
        "Winx Club\n"+
        "Winx Club\n"+
        "Winx Club\n"+
        
        "Siamo noi le Winx\n"+
        "Fonte di energia\n"+
        "Con la magia\n"+
        "Siamo noi le Winx\n"+
        "Fonte di energia\n"+
        "Con la magia\n"+
        
        "Siamo noi le Winx\n"+
        "Fonte di energia\n"+
        "Con la magia\n"+
        "Sfideremo le malvagie Trix\n"+
        "Nuove fate siamo Winx\n\n"+
        
        "Nuove fate siamo Winx\n"+
        "Nuove fate siamo Winx\n"+
        "Nuove fate siamo Winx\n"+
        "Nuove fate siamo Winx";
    }else if(trasformations[1].includes(args[0])){
        index=1;
        testo="";
    }else if(trasformations[2].includes(args[0])){
        index=2;
        testo="";
    }else if(trasformations[3].includes(args[0])){
        index=3;
        testo="";
    }else if(trasformations[4].includes(args[0])){
        index=4;
        testo="";
    }else if(trasformations[5].includes(args[0])){
        index=5;
        testo="";
    }else if(trasformations[6].includes(args[0])){
        index=6;
        testo="";
    }else if(trasformations[7].includes(args[0])){
        index=7;
        testo="";
    }else if(trasformations[8].includes(args[0])){
        index=8;
        testo="";
    }else if(trasformations[9].includes(args[0])){
        index=9;
        testo="";
    }else if(trasformations[10].includes(args[0])){
        index=10;
        testo="";
    }
    if(index>=0&&index<trasformations.length){
        var embed = new Discord.MessageEmbed().setColor('#ff00c8');
        embed.setTitle(trasformations[index][0]);
        message.channel.send(embed);
        return msg.channel.send("`"+testo+"`", {split: true});
    }
    var embed = new Discord.MessageEmbed().setColor('#ff00c8');
    var trasformazioniElenco=[];
    for(var i=0; i<trasformations.length; i++){
        console.log(typeof trasformations[i][0]);
        trasformazioniElenco.push(trasformations[i][0]);
        console.log("-"+typeof trasformazioniElenco[i]);
    }
    var trasformazioniToString="";
    for(var i=0; i<trasformazioniElenco.length; i++){
        trasformazioniToString+=trasformazioniElenco[i]+"\n";
    }
    embed.addField('Magica fata, bisogna specificare la trasformazione!', trasformazioniToString, true);
    return message.channel.send(embed);
  }
};