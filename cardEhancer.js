// ==UserScript==
// @name         EasyViewer Cards ehancer
// @namespace    http://wikipao.net
// @version      0.1
// @description  Easyviewer Mod for Cards
// @author       Lukenga Victor
// @match        http://127.0.0.1:51089/
// @grant        none
// ==/UserScript==

setTimeout(function(){

    $( '.boxJobs' ).scroll(function() {
        colorCondition();
    });

    function colorcard(){
        $('.nameJob span').each(function(){
            var complete = $(this).text();//recuperation du nom de la carte
            var regx = complete.match(/(bch|di)/gi);

            if(regx=='BCH'){
                $(this).parent().css( "background-color", "red" );
            }else if (regx=='DI'){
                $(this).parent().css( "background-color", "green" );
            }else{
                $(this).parent().css( "background-color", "blue" );
            }

            //---------------Truncate the name ---------------------------------
            $('.nameJob p').each(function(){
                var cardName = $(this).text().split('_');
                finalName = cardName[cardName.length-1];//la fin du nom e.g ORDXXXXX.pdf
                $(this).text(finalName);
            });
        });
    }

    function colorCondition(){

        var $movingDiv = $('#jobsGridScroll >div:nth-child(1) >div:nth-child(1)');
        var heightValue = parseFloat($movingDiv.css('height'));

        if(heightValue>=0 ){
            colorcard();//console.log("execution");
        }
    }

    $('.nameJob p').each(function(){
        colorCondition();
    });

}, 2000);














