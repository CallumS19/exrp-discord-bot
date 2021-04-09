require('dotenv').config()

const fs = require('fs')
const Discord = require('discord.js')

const client = new Discord.Client({
    partials: ['MESSAGE']
});
const prefix = process.env.BOT_PREFIX

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    // Printing to console letting me know that the bot is currently online
    console.log("EXRP Discord Bot is Online!")
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		client.commands.get('ping').execute(message, args);
	} else if (command === 'beep') {
		message.channel.send('Boop.');
	}
	// other commands...
});

client.login(process.env.BOT_TOKEN)