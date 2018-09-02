const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
let points = JSON.parse(fs.readFileSync(`./point.json`, `utf8`));
var shortNumber = require('short-number');


let prefix = '*';


client.on('message', message => {
  if (message.author.bot) return;


if(!message.channel.guild) return;

if (!points[message.author.id]) points[message.author.id] = {
	points: 0,
  wins: 0,
  loses: 0,
  };
if (message.content.startsWith(prefix + 'انمي')) {

const type = require('./anime.json');
const item = type[Math.floor(Math.random() * type.length)];
const filter = response => {
    return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
message.channel.send('**لديك 10  ثواني لتخمن الانمي**').then(msg => {

   const embed = new Discord.RichEmbed()
 .setColor("RANDOM")
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
 .setThumbnail(message.author.avatarURL)     
 .addField(`**Dark-bot**`,` **${item.type}**`)
 .setFooter(`ستكسب 15 نقطة`)

msg.channel.send(embed).then(() => {
        message.channel.awaitMessages(filter, { maxMatches: 1, time: 10000, errors: ['time'] })
        .then((collected) => {
		message.channel.send(`**${ collected.first().author} مبروك لقد كسبت 15 نقطة 
لمعرفة نقاطك الرجاء كتابة *point**` , '');
		console.log(`[Typing] ${collected.first().author} typed the word.`);
			let userData = points[collected.first().author.id];
userData.wins += 1 
userData.points += 15; 

          })

          .catch(collected => {
points[message.author.id].loses += 1;

            message.channel.send(`:x: ** الاجابه الصحيحه هي : __${item.answers}__حظ اوفر المرة القادمة ! لقد خسرت , انتهى الوقت**` , '');
			console.log('[Typing] Error: No one type the word.');

		})
	})
    })
points[message.author.id].game += 1; 


}
fs.writeFile("./point.jsmn",JSON.stringify(points), function(err){
    if (err) console.log(err);
  })
});


//points
client.on('message', message => {

if (!points[message.author.id]) points[message.author.id] = {
	points: 0,
  wins: 0,
  loses: 0,
  game: 0,

  };
  if (message.author.bot) return;


if(!message.channel.guild) return;
	let userData = points[message.author.id];

if (message.content.startsWith(prefix + 'point')) {
let pointss = userData.points
try {
                            pointss = shortNumber(pointss);
                        } catch (error) {
                            pointss = 0;
                        }
                        let wins = userData.wins
try {
                            wins = shortNumber(wins);
                        } catch (error) {
                            wins = 0;
                        }
                        let loses = userData.loses
try {
                            loses = shortNumber(loses);
                        } catch (error) {
                            loses  = 0;
                        }
                         let games = userData.game
try {
                            games = shortNumber(games);
                        } catch (error) {
                            games  = 0;
                        }
	let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
	.setColor('#000000')
	.setDescription(`**اسم بوتك
:white_check_mark: عدد الفوز : ${wins}
:x: عدد الخسارة: ${loses}
:label:التقاط: ${pointss}
:video_game: عدد مرات اللعب: ${games}**` , '');
	message.channel.sendEmbed(embed)
  }
  fs.writeFile("./point.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  })

});

client.login(process.env.BOT_TOKEN);
     
