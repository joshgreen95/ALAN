module.exports = {
    name: 'how',
    description: 'Sql random query in how table ',


//DESPERATELY NEEDS TO BE REDONE

    execute(message, alanQ, con){
        if (alanQ === ('how')){ 
            //sql count
            const sqlA = "SELECT COUNT(*) as total FROM response";

            con.query(sqlA, function (err, result) {
            
                //Subroutine for counting fields
                if (err) throw err;
                    var resultCount = result.map(({total}) => +total);
                //takes sql row value and generates random number with that as ceiling.
                        var randAlan = Math.floor(Math.random() * resultCount + 1);
                            console.log(randAlan);

                //sub subroutine its getting wacky

                var sqlB = "SELECT respSTR FROM response WHERE respID = " + randAlan + ";";
                    con.query(sqlB, function (errB, resultB) {
                            if (err) throw errB;
                            var string = JSON.stringify(resultB);
                            var json = JSON.parse(string);
                        var alanSadMessage = json[0].respSTR; // sad msg variable is the parsed string 

                        // change this to match number of cases // random message clause 
                        var alanSadMessageCase = Math.floor(Math.random()* 14 + 1);
            } 	
            )}
        )}
    }
}