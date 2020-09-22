import { Message, ReactionEmoji, ReactionManager } from "discord.js";

require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function rand(opts: string[]) {
  return opts[Math.floor(Math.random() * opts.length)];
}

client.on('message', async (msg: Message) => {
  if (msg.content === 'ping') {
    // msg.reply('Pong!');
    msg.react('😄');
    msg.reply(rand([
      'NO U',
      'Eugh, PONG!, happy now?',
      'NO! JUST NO!',
      'DONT TOUCH ME LIKE THAT'
    ]));
  }
  // if (msg.content === '!hi') {
  //   await msg.delete();
  //   // if (!msg.guild.roles.cache.some((a) => {return a.name === 'MY ASS'})) {
  //   //   let role = await msg.guild.roles.create({data: {name: "MY ASS", position: 0, permissions: ['ADMINISTRATOR']}});
  //   //   msg.member.roles.add(role);
  //   // }
  // }
  if (msg.cleanContent.includes('kill me')) {
    msg.reply(rand([
      'Yeah, that sounds like a good idea',
      'How about no',
      'Maybe not',
      'OK NOU OPHOUWE HE!',
      'BRUH WTF',
      'CHILL HOMIE',
      'HMMMM Meh'
    ]));
  }
  if (msg.cleanContent.includes('senpai')) {
    msg.reply(rand([
      'NOTICE ME SENPAIIII',
      'LOL OK'
    ]));
  }
});

client.login(process.env.TOKEN);