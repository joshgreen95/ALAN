const howResponses = require('../resources/howResponses.js');

module.exports = {
    name: 'how',
    description: 'Sql random query in how table ',

//DESPERATELY NEEDS TO BE REDONE
    execute(message, alanQ, con){
        if (alanQ === ('how')){ 

            const sqlCountQuery = "SELECT COUNT(*) as total FROM response";

            con.query(sqlCountQuery, function (err, count) {
                if (err) {
                    throw err; 
                }

                const resultCount = count.map(({total}) => +total);
                const randAlan = Math.floor(Math.random() * resultCount + 1);

                const sqlSelectQuery = "SELECT respSTR FROM response WHERE respID = " + randAlan + ";";
                con.query(sqlSelectQuery, function (err, response) {
                    if (err) {
                        throw err; 
                    }

                    const sadMessage = JSON.parse(JSON.stringify(response))[0].respSTR;
                    const sadMessageSplit = sadMessage.split('');

                    const isPlural = sadMessageSplit[sadMessageSplit.length - 1] === 's';

                    const randomResponseID = Math.floor(Math.random() * (Object.keys(howResponses).length - 1));

                    let responseString = null;

                    console.log(sadMessage);

                    const reasonRegex = new RegExp(/%\w+%/g)

                    if(isPlural && howResponses[`${randomResponseID}`]['plural']){
                        responseString = howResponses[`${randomResponseID}`]['plural'];
                        responseString = responseString.replace(reasonRegex, sadMessage);
                        message.channel.send(responseString);
                    } else{
                        responseString = howResponses[`${randomResponseID}`]['singular'];
                        responseString = responseString.replace(reasonRegex, sadMessage);
                        message.channel.send(responseString);
                    }
            } 	
            )}
        )}
    }
}