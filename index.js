require('dotenv').config();
const { DISCORD_LOGIN_TOKEN, SQL_HOST, SQL_USER, SQL_PASSWORD, SQL_DATABASE} = process.env;

const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');
const mysql = require('mysql');
const loginToken = DISCORD_LOGIN_TOKEN;

const prefix = 'alan ';

// SQL connection 
var con = mysql.createConnection({
	host: SQL_HOST,
	user: SQL_USER,
	password: SQL_PASSWORD,
	database: SQL_DATABASE,
});

// sql connection check
con.connect(function(err) {
	if (err) {
		throw(err);
	};
	console.log('SQL connected. Sadly.')
});

// Execute java files.
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	console.log(client.commands);
}

//log into console once ready with discord.
client.once('ready', () =>{console.log('Alanbot is sad. but online.');});

client.on('message', message =>{
	console.log(message);
	
//On message event -> Define commands.
	const args = message.content.toLowerCase().slice(prefix.length).split();
	const command = args.shift().toLowerCase();

	const alanQ = command.substring(0, 3);
	
	//how 
	client.commands.get('how').execute(message, alanQ, con);		
	//sad
	client.commands.get('sad').execute(message, alanQ, con);
});

	
client.login(loginToken);  