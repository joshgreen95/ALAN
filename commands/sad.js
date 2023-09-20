module.exports = {
    name: 'sad',
    description: 'adds sad to alan Database',
    execute(message, alanQ, con){
        if (alanQ === ('sad')) {
            //TODO Impliment SQL Hygeine
            const appCheck = message.content.toString();
            const userInput = appCheck.replace("'","`");
            
            const userSuggestion = userInput.substring(userInput.lastIndexOf("sad") + 4); 
            console.log(`Record Inserted: ${userSuggestion}`);
            
            const sqlInsert = `INSERT INTO response(respSTR) VALUES ('${userSuggestion}')` 

            con.query(sqlInsert, function (err, result) {
            if (err){
                throw err;
            } 
            
            const author = message.author;
            message.channel.send("Thanks <@" + author + "> now im sad about " + userSuggestion + ".");
         });
        
        }
            }}     