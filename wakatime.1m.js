#!/usr/bin/env /usr/local/bin/node

/*
 * <bitbar.title>WakatimeBar</bitbar.title>
 * <bitbar.version>v1.0.0</bitbar.version>
 * <bitbar.author>Amir Canto</bitbar.author>
 * <bitbar.author.github>amircp</bitbar.author.github>
 * <bitbar.image>https://imgur.com/a/ISrsuM3</bitbar.image>
 * <bitbar.desc>Wakatime plugin for Bitbar, check your coding activity from your bar.</bitbar.desc>
 * <bitbar.dependencies>node</bitbar.dependencies>
 *
 */

const WAKATIME_API_KEY = ''; // Get your API Key here: https://wakatime.com/settings/api-key
const https = require('https');


let currentDate =  new Date().toISOString().slice(0,10);



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
                    console.log('Wakatime');
                    console.log('---');
                    console.log('Coding Activity: ' + categories[0].digital + ' hrs');
                }
                

            }
            // do something with JSON
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});


