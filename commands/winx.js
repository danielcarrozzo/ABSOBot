const Discord = require('discord.js');

module.exports = {
  name: 'winx',
  aliases: ['w', 'wi', 'magic winx, trasformaci'],
  description: 'Italian lyrics of Winx',
  guildOnly: false,
  execute(client, msg, args, prefix) {//solo se hai KICK
    var trasformations=[];
    trasformations[0]=['Magic Winx', 'magic', 'Magic', 'Livello base', 'magic winx', 'livello base'];
    trasformations[1]=['Charmix', 'charmix'];
    trasformations[2]=['Enchantix', 'enchantix'];
    trasformations[3]=['Enchantix Believix', 'believix', 'enchantix believix', 'Believix'];
    trasformations[4]=['Enchantix Harmonix', 'harmonix', 'enchantix harmonix', 'Harmonix'];
    trasformations[5]=['Enchantix Sirenix', 'sirenix', 'enchantix sirenix', 'Sirenix'];
    trasformations[6]=['Enchantix Crystal Sirenix', 'crystal sirenix', 'enchantix crystal sirenix', 'Crystal Sirenix'];
    trasformations[7]=['Enchantix Bloomix', 'bloomix', 'enchantix bloomix', 'Bloomix'];
    trasformations[8]=['Enchantix Mythix', 'mythix', 'enchantix mythix', 'Mythix'];
    trasformations[9]=['Enchantix Butterflix', 'butterflix', 'enchantix butterflix', 'Butterflix'];
    trasformations[10]=['Enchantix Tynix', 'tynix', 'enchantix tynix', 'Tynix'];
    trasformations[11]=['Enchantix Cosmix', 'tynix', 'enchantix cosmix ', 'Cosmix'];
    trasformations[12]=['Dreamix', 'dreamix'];
    trasformations[13]=['Onyrix', 'onyrix'];
    var testo;
    var index;
    if(trasformations[0].includes(args[0])){
        index=0;
        testo="Siamo noi le Winx\n"+
        "Fonte di energia\n"+
        "Con la magia\n"+
        "Sfideremo le malvagie Trix\n"+
        "Nuove fate siamo Winx\n\n"+
        
        "Flora\n"+
        "Flora\n\n"+
        
        "Winx Club\n"+
        "Stella Stella Stella\n"+
        "Ali in cielo noi siamo Winx\n\n"+
        
        "Sono Bloom col fuoco mi difenderò\n"+
        "E la mia forza dal cuore salirà\n"+
        "Io sono stella di luce di luce splenderò\n"+
        "Con i poteri raggi magici faro’\n"+
        "Siamo magiche\n\n"+
        
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
        "Nuove fate siamo Winx\n\n"+
        
        "Winx Club\n"+
        "Winx Club\n"+
        "Winx Club\n"+
        "Winx Club\n\n"+
        
        "Siamo noi le Winx\n"+
        "Fonte di energia\n"+
        "Con la magia\n"+
        "Siamo noi le Winx\n"+
        "Fonte di energia\n"+
        "Con la magia\n\n"+
        
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
        testo="Believix, Believix\n"+
        "Believix, Believix\n"+
        "Believix, Believix\n"+
        "Believix, potere Winx\n\n"+
        
        "Si ci credi di luce risplenderai\n"+
        "(Risplenderai)\n"+
        "E ti trasformerai\n"+
        "Credici credici\n"+
        "Believix, magia di Winx\n\n"+
        
        "Dal tuo cuore un potere invincibile\n"+
        "Sei magica magica\n"+
        "E ti trasformerai\n"+
        "Believix, potere Winx\n\n"+
        
        "Si ci credi di luce risplenderai\n"+
        "E ti trasformerai\n"+
        "Credici credici\n"+
        "Believix, magia di Winx\n\n"+
        
        "È nel cuore un potere invincibile\n"+
        "Siamo magiche magiche\n"+
        "La forza è dentro me\n"+
        "Siamo noi le magiche\n\n"+
        
        "Winx\n\n"+
        
        "Believix, Believix\n"+
        "Believix, Believix\n"+
        "Believix, Believix\n"+
        "Believix, potere Winx\n\n"+
        
        "Se ci credi di luce risplenderai\n"+
        "E ti trasformerai\n"+
        "Credici credici\n"+
        "Believix, magia di Winx\n\n"+
        
        "Dal tuo cuore un potere invincibile\n"+
        "Sei magica magica\n"+
        "E ti trasformerai\n"+
        "E ti trasformerai\n\n"+
        
        "E ti trasformerai\n"+
        "Believix, potere Winx\n"+
        "Se ci credi di luce risplenderai\n"+
        "E ti trasformerai\n\n"+
        
        "Credici credici\n\n"+
        
        "Believix, magia di Winx\n"+
        "È nel cuore un potere invincibile\n"+
        "Siamo magiche magiche\n\n"+
        
        "La forza è dentro me\n"+
        "Siamo noi le magiche\n\n"+
        
        "Winx";
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
    }else if(trasformations[11].includes(args[0])){
        index=11;
        testo="";
    }else if(trasformations[12].includes(args[0])){
        index=12;
        testo="";
    }else if(trasformations[13].includes(args[0])){
        index=13;
        testo="";
    }
    if(index>=0&&index<trasformations.length){
        var embed = new Discord.MessageEmbed().setColor('#ff00c8');
        embed.setTitle(trasformations[index][0]);
        msg.channel.send(embed);
        return msg.channel.send("`"+testo+"`", {split: true});
    }
    var embed = new Discord.MessageEmbed().setColor('#ff00c8');
    var trasformazioniElenco=[];
    for(var i=0; i<trasformations.length; i++){
        trasformazioniElenco.push(trasformations[i][0]);
    }
    var trasformazioniToString="";
    for(var i=0; i<trasformazioniElenco.length; i++){
        trasformazioniToString+=trasformazioniElenco[i]+"\n";
    }
    embed.addField('Magica fata, bisogna specificare la trasformazione!', trasformazioniToString, true);
    return msg.channel.send(embed);
  }
};