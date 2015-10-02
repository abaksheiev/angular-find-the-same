angular
    .module('findTheSameApp',
    [
        'findTheSameApp.controllers',
        'findTheSameApp.directives',
        'findTheSameApp.services',
        'findTheSameApp.providers'

    ])
    .config(function( gameSettingsProvider){
        gameSettingsProvider.setSettings({
            playBoard: {
                margin: 5,
                distance:15
            },
            card: {
                width: 50,
                height: 80
            }
        })
    })
    .run(function ($templateCache) {
        $templateCache.put('info.html',
            '<small><b>Author:</b> <i>Baksheiev Anton</i></small>' +
            '</br>' +
            '<small><b>linkedin:</b> ' +
            '<a href="https://www.linkedin.com/pub/baksheiev-anton/20/a56/b53" target="_blank">https://www.linkedin.com/pub/baksheiev-anton/20/a56/b53</a>' +
            '</small>' +
            '</br>' +
            '<small><b>github:</b> ' +
            '<a href="https://github.com/abaksheiev/angular-find-the-same">http://abaksheiev.github.io/angular-find-the-same/index.html</a>' +
            '</small>'
        );
});