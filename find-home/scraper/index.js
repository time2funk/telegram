'use strict';
const Nightmare = require("nightmare");
const Xvfb = require('xvfb');
const xvfb = new Xvfb();

module.exports.getLink = async function(url) {
    try{

        console.log(' -> start getLink Nightmare');

        if (!url) return;

        console.log('url');
        console.log(url);
        
        return new Promise((resolve, reject)=>{
xvfb.start(function(err, xvfbProcess) {
            Nightmare({
                'ignore-certificate-errors': true,
                'node-integration': false,
                'web-security': false,
                // show: true,
                show: false,
            })
            .on( 'did-get-redirect-request', function(event, oldUrl, newUrl){
                console.log('did-get-redirect-request');
                // console.log(event);
                // console.log(oldUrl);
                // console.log(newUrl);
            })
            .on('crashed', function(event, url){
                console.log('[Nightmare] crashed');
                xvfb.stop(function(err) {
                    reject('crashed');
                });                
            })
            .on('did-fail-load', function(event){
                console.log('[Nightmare] did-fail-load');
                console.log(event);
                // event.preventDefault();
                // reject('did-fail-load');
            })
            .on('new-window', function(event, url){
                console.log('new-window');
                event.preventDefault();
            })
        	.goto(url)
            // .viewport(2000, 1000)
            .wait(2000)
            .evaluate(function(url) {
                // console.log(' ! - ! - ! - evaluate - ! - ! - !');
                var list, 
                    result = [];

                if(url.search(/olx\.pl/i) != -1){
                    // console.log(' - - - > olx');

                    list = document.querySelectorAll('div.listHandler #offers_table>tbody>tr');
                    if(!list)
                        xvfb.stop(function(err) {
                            reject('broken link');
                        });
                        

                    for(var i=0; i<list.length; i++){
                        var ad = list[i];
                        if( !ad.querySelector('tr td div.space.rel p.marginbott5 span') ) continue;

                        let id = ad.querySelector('table').getAttribute("data-id");
                        let name = ad.querySelector('tr td div.space.rel h3 strong').innerText;
                        let location = ad.querySelector('tr td div.space.rel p.marginbott5 span').innerText;
                        let date = ad.querySelector('tr td div.space.rel p.x-normal').innerText;
                        let price = ad.querySelector('tr td div.space.rel.inlblk p.price strong').innerText;
                        let link = ad.querySelector('tr td div.space.rel a').getAttribute("href");
                        let trade = ad.querySelector('tr td div.space.rel.inlblk span.normal.inlblk.pdingtop5');
                        let pic = ad.querySelector('img');
                        pic = pic ?  pic.getAttribute("src") : "<no thumb photo>";

                        if( id && name && location && date && price && pic && link){
                            if(trade) trade = true; 
                            else trade = false;

                            result.push({
                                id: id,
                                name: name,
                                location: location,
                                date: date,
                                price: price,
                                pic: pic,
                                link: link,
                                trade: trade
                            });
                        }else reject('broken evaluate html parsing');
                    }
                }
                // else if (url.search(/xhamster\.com/i) != -1){
                //     console.log(' - - - > xhamster');
                //     obj = document.querySelector('a.player-container__no-player.xplayer');
                //     if(!obj)
                //         // return new Promise(function(resolve, reject) {
                //             reject('broken link');
                //         // })
                //     link = obj.href;
                // }
                // else if (url.search(/youporn/i) != -1){
                //     console.log(' - - - > youporn');
                //     obj = document.querySelector('video source');
                //     console.log(' - - - > obj');
                //     console.log(obj);
                //     if(!obj)
                //         reject('broken link');
                //     link = obj.src;
                // }
                else{ 
                    xvfb.stop(function(err) {
                        reject('wrong link');
                    });                    
                }

                if(!result) 
                    xvfb.stop(function(err) {
                        reject('empty result array');
                    });
                    
                return result;
            }, url)
            .end()
    		.then(function(results) {
    		    console.log(" - donor html list - ");
    		    console.log(results);
                xvfb.stop(function(err) {
                    resolve(results);
                });
    		})
            .catch(err => {
                console.log(" { Nightmare REJECT } ");
                console.error(err);
                xvfb.stop(function(err) {
                    reject(err);
                });
                
            })
}); // xvfb
        });

    } catch (e) {
        console.log(e);
        return 0;
    }
}
