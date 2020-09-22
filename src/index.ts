import { Client, Message, ReactionEmoji, ReactionManager, TextChannel } from "discord.js";
import { BombMSG } from "./bombmsg";
import { getIP } from "./iputils";

require('dotenv').config();

const Discord = require('discord.js');
const client: Client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.guilds.cache.forEach((g) => {
    g.channels.cache.filter((a) => {
      return a instanceof TextChannel;
    }).filter((a) => {
      return a.name.toLowerCase().includes('bot');
    }).forEach(async (ch: TextChannel) => {
      await ch.messages.fetch();
      ch.messages.cache.forEach((m) => {
        m.delete();
      });
    });
  });
});

function rand(opts: string[]) {
  return opts[Math.floor(Math.random() * opts.length)];
}

client.on('message', async (msg: Message) => {
  if (!(msg.channel instanceof TextChannel))
    return;
  if (msg.author.bot)
    return;

  if (msg.content === '!help') {
    BombMSG.send({ channel: msg.channel, msg: 'List of Commands ```javascript\n!invite // Laat de invite link zien\n!ping // Ping!\n!ip // Laat uw IP-Address zien```Self Destructs in %s', alsoDelete: [msg], timeUntilDeletion: 20, timeUntilUpdate: 5 });
    return;
  }
  if (msg.content === '!invite') {
    BombMSG.send({ channel: msg.channel, msg: 'INVITE LINK: https://lvk.sh/ict\n\nThis message self destructs in %s seconds!', timeUntilDeletion: 5, alsoDelete: [msg], timeUntilUpdate: 1 })
    // const m = await BombMSG.send(msg.channel, 'INVITE LINK: https://lvk.sh/ict\n\nThis message self destructs in %s seconds!', 5, [msg]);
    return;
  }
  if (msg.content.startsWith('!ip')) {
    let m = 'Your IP Address is ``' + getIP(msg.author.id);

    if (msg.mentions.users.size) {
      m = '<@'+msg.mentions.users.first().id+'>\'s ip is ``' + getIP(msg.mentions.users.first().id);
    }

    if (!msg.channel.name.toLowerCase().includes('bot')) {
      msg.reply(m + '``\n\nThis message does not self destruct!');
    } else {
      BombMSG.send({ channel: msg.channel, msg: m + '``\n\nThis message self destructs in %s seconds!', timeUntilDeletion: 5, alsoDelete: [msg], timeUntilUpdate: 1 })
    }
    return;
  }
  if (msg.content === '!ping') {
    // msg.reply('Pong!');
    msg.react('😄');
    BombMSG.send({
      channel: msg.channel, msg: '<@' + msg.author.id + '> ' + rand([
        'NO U',
        'Eugh, PONG!, happy now?',
        'NO! JUST NO!',
        'DONT TOUCH ME LIKE THAT'
      ]), timeUntilDeletion: 5, alsoDelete: [msg], timeUntilUpdate: 1
    })
    return;
  }
  if (msg.cleanContent.includes('kill me')) {
    BombMSG.send({
      channel: msg.channel, msg: '<@' + msg.author.id + '> ' + rand([
        'Yeah, that sounds like a good idea',
        'How about no',
        'Maybe not',
        'OK NOU OPHOUWE HE!',
        'BRUH WTF',
        'CHILL HOMIE',
        'HMMMM Meh'
      ]), timeUntilDeletion: 5, alsoDelete: [msg], timeUntilUpdate: 1
    })
    return;
  }
  if (msg.cleanContent.includes('senpai')) {

    BombMSG.send({
      channel: msg.channel, msg: '<@' + msg.author.id + '> ' + rand([
        'NOTICE ME SENPAIIII',
        'LOL OK'
      ]), timeUntilDeletion: 5, alsoDelete: [msg], timeUntilUpdate: 1
    })
    return;
  }

  if (msg.channel.name.toLowerCase().includes('bot')) {
    msg.delete();
    BombMSG.send({ channel: msg.channel, msg: '``' + msg.cleanContent + '`` was not recognized as a command, try ``!help`` for a list of commands.', timeUntilDeletion: 5, alsoDelete: [msg], timeUntilUpdate: 1 })
  }
});

client.login(process.env.TOKEN);