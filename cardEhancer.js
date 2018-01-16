// ==UserScript==
// @name         EasyViewer Cards ehancer
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  try to take over the world!
// @author       Victor Lukenga
// @include  /(http:\/\/)(([a-z])|([\d.]))+:510[0-9]{2}\//
// @grant        none
// ==/UserScript==

setTimeout(function(){


    var settings1 = {
        "async": true,
        "crossDomain": true,
        "url": "http://127.0.0.1:51088/api/v1/jobs?filter=%7B%22and%22%3A%5B%7B%22name%22%3A%7B%22contains%22%3A%223%22%7D%7D%5D%7D&fields=checkpointName,status",
        "method": "GET",
        "headers": {
            "Authorization": "Bearer d7ca14cf3a1d979064b830dbf4bb9cb9c2123c5e",
            "Cache-Control": "no-cache",
            "Postman-Token": "0ceb426e-0f23-74ab-3d77-1234496542ab"
        }
    };
    var source1 = $('#listFilter li #filterBox');
    var matchArr = ['OFFSET','NGF','test'];

    function macaron(thaFilter,thaSource,thaMatch){
        $.ajax(thaFilter).done(function (response) {
            console.log(response.data.length);
            thaSource.each( function(){
                var myfilter =$(this).text();
                var match = myfilter.match(/offset|ngf|test/gi);
                if (match == thaMatch){
                    $(this).append( "<p class ='counter'>"+response.data.length+"</p>" );
                }
            });
        });
    }
    macaron(settings1,source1,matchArr[0]);
    macaron(settings1,source1,matchArr[2]);



    //----------------------------------

    $('.countOfAlertJobs').bind("DOMSubtreeModified",function(){
        console.log("changed");
        macaron(settings1,source1,matchArr[0]);
        macaron(settings1,source1,matchArr[2]);
    });

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

    $(".noMetadataText").css("color","red");

    $('.nameJob p').each(function(){
        colorCondition();
    });


    $(".button_process_job").click(function(){

        $('body').bind("DOMSubtreeModified",function(){
            $(".modal-body").css("background-color","red","important");
        });
    });

}, 2000);
