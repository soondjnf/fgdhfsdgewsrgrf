
const Discord = require('discord.js');
const client = new Discord.Client();   

client.on('ready', () => {

        console.log(`----------------`);
  console.log(`Logged in as ${client.user.tag}!`);
    console.log(`----------------`);
});
      const devs = ['463857132060540958','421023400971075585'];
const adminprefix = "$"
      
client.on('message', message => {
      if (!devs.includes(message.author.id)) return;
  if (message.content.startsWith(adminprefix + 'slfstr')) {
    if (!devs.includes(message.author.id)) return; 
let args = message.content.split(' ').slice(1).join(' ');

message.channel.sendMessage('جار ارسال الرسالة |:white_check_mark:')
client.users.forEach(m =>{
m.sendMessage(args)
})
}});
     
client.login(process.env.BOT_TOKEN);
