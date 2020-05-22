#!/usr/bin/env /usr/local/bin/node

/*
 * <bitbar.title>WakatimeBar</bitbar.title>
 * <bitbar.version>v1.0.0</bitbar.version>
 * <bitbar.author>Amir Canto</bitbar.author>
 * <bitbar.author.github>amircp</bitbar.author.github>
 * <bitbar.image>https://imgur.com/a/gFijsck</bitbar.image>
 * <bitbar.desc>Wakatime plugin for Bitbar, check your coding activity from your bar.</bitbar.desc>
 * <bitbar.dependencies>node</bitbar.dependencies>
 *
 */

const WAKATIME_API_KEY = ''; // Get your API Key here: https://wakatime.com/settings/api-key
const https = require('https');


let currentDate =  new Date().toLocaleString().slice(0,10).replace(/,/g,'');

const icon  = '/9j/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwMBAQEBAQEBAgEBAgICAQICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//dAAQAAv/uAA5BZG9iZQBkwAAAAAH/wAARCAAQABADABEAAREBAhEB/8QAWAABAQEAAAAAAAAAAAAAAAAACAAFAQEAAAAAAAAAAAAAAAAAAAAAEAABBAMBAAMBAAAAAAAAAAAHAwQFBgIICQETFxglEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMAAAERAhEAPwB+h8bU7uA5ltsN6zNcWOgBQOhK1p53aQD8uW8MDowxI1m7JGyRZNdmpz6AmySXig7Hcq5h4RV23wjm8e7TbKuPFEksQwS3U6PxHnZTZrQ0hmD8GAIuhcD9FNOyZdyCWwTTIA0WJpDNCNrHfby6nJeAPQTkbbEL2eEj3btFTGYYtnSyGaThuoH/0HdSreOuPQ6NnOro6DrjbeV9hIBNJmqO0lJE91MIZhRSSyB9kyGvGx1aHjSRuA1JAsvkh46h5hPH+nl6oq3xbpt8MlQiBdh/2PGoc5v84gfbqlyviriML5thtPbBPdQgGVw8MCCkSI3XnWauXdlDW2+EslXiJ8cScv4n57GZfEotiumuoqgH/9k=';
let url = 'https://wakatime.com/api/v1/users/current/summaries?api_key='+  WAKATIME_API_KEY+'&start='+ currentDate + '&end='+ currentDate;
https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
      

            let wakaData = JSON.parse(body);
            if(wakaData  && wakaData.data && wakaData.data.length > 0){

                let categories = wakaData.data[0].categories || undefined;
                if(categories){
         
                    console.log(categories[0].text + ' | image='+icon);
                }
                

            }
            // do something with JSON
        } catch (error) {
            console.log('Wakatime');
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});


