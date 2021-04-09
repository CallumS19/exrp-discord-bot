require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client({
    partials: ['MESSAGE']
});

client.on('ready', () => {
    // Printing to console letting me know that the bot is currently online
    console.log("EXRP Discord Bot is Online!")
})

client.login(process.env.BOT_TOKEN)