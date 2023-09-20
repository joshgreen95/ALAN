module.exports = {
    name: 'sad',
    description: 'adds sad to alan Database',
    execute(message, alanQ, con){
        if (alanQ === ('sad')) {
            //TODO Impliment SQL Hygeine
            let userInput = message.content.toString();
            userInput = userInput.replace("'","`");

            const sqlSanitizationRegex = new RegExp(/[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi);
            const isInjectionDetected = sqlSanitizationRegex.test(userInput);
            console.log(isInjectionDetected);
            
            if (isInjectionDetected){
                console.log('SQL Injection Detected. Stop That!');
                throw new Error(`SQL INJECTION ATTEMPT BY ACCOUNT ${message.author}`);
            }


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