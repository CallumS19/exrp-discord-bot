require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client({
    partials: ['MESSAGE']
});

client.on('ready', () => {
    // Printing to console letting me know that the bot is currently online
    console.log("EXRP Discord Bot is Online!")
})

client.on('message', msg => {
    if (msg.content === "hello") {
        msg.reply("Hi there")
    } else if (msg.content === "u good bro") {
        msg.channel.send("nah")
    } else if (msg.content === "rtn is epic") {
        msg.react("❤️")
    }
})

client.on("messageDelete", msg => {
    msg.reply("stop deleting messages!!")
})

client.login(process.env.BOT_TOKEN)