$(function(){

    "use strict";

    var app;

    var ui = {
        phrase : $('blockquote'),
        author : $('sub')
    };

    window.msf.local(function(err, service){

        app = service.application(window.location.href);

        app.connect({name: 'TV'}, function (err) {
            if(err) return console.error(err);
        });

        app.on('say', function(msg, from){
            ui.phrase.text(msg);
            ui.author.text('~ ' + (from.attributes.name || 'Unknown'));
        });

        app.on('clientConnect', function(client){
            ui.phrase.text('Hello '+client.attributes.name);
            ui.author.text('~ Your TV');
        });

        app.on('clientDisconnect', function(client){
            ui.phrase.text('Goodbye '+client.attributes.name);
            ui.author.text('~ Your TV');
        });

        app.on('connect', function(client){
            ui.phrase.text("Eureka! ... You're connected.");
            ui.author.text('~ Your TV');
        });

        app.on('disconnect', function(client){
            ui.phrase.text('Disconnected');
            ui.author.text('~ Your TV');
        });

    });

});

