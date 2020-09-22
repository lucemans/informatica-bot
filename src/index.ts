import { Message, ReactionEmoji, ReactionManager, TextChannel } from "discord.js";
import { BombMSG } from "./bombmsg";

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
  if (!(msg.channel instanceof TextChannel))
    return;

  if (msg.content === '!invite') {

    const m = await BombMSG.send(msg.channel, 'INVITE LINK: https://lvk.sh/ict\n\nThis message self destructs in %s seconds!', 5, [msg]);

    // const m = await msg.reply('INVITE LINK: https://lvk.sh/ict\n\n**This message self destructs in 5 seconds**');
    // await msg.delete();
    // setTimeout(async () => {
    // await m.delete();
    // }, 5000);
    return;
  }
  if (msg.content === 'ping') {
    // msg.reply('Pong!');
    msg.react('😄');
    msg.reply(rand([
      'NO U',
      'Eugh, PONG!, happy now?',
      'NO! JUST NO!',
      'DONT TOUCH ME LIKE THAT'
    ]));
    return;
  }
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
    return;
  }
  if (msg.cleanContent.includes('senpai')) {
    msg.reply(rand([
      'NOTICE ME SENPAIIII',
      'LOL OK'
    ]));
  }
});

client.login(process.env.TOKEN);