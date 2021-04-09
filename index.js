require('dotenv').config()

const fs = require('fs')
const Discord = require('discord.js')
const {prefix} = require('./config.json');

const client = new Discord.Client({
    partials: ['MESSAGE']
});

client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.on('ready', () => {
    // Printing to console letting me know that the bot is currently online
    console.log("EXRP Discord Bot is Online!")
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;
        const command = client.commands.get(commandName);

        if (command.args && !args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

    try {
        client.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error executing that command!');
    }
});

client.login(process.env.BOT_TOKEN)