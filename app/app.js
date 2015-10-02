/*********************************************************************
 * Created by Anton Baksheiev on 01.10.2015.                         *
 * linkedin: https://www.linkedin.com/pub/baksheiev-anton/20/a56/b53 *
 *********************************************************************/

// Init all modules
angular.module('findTheSameApp.controllers', [])
angular.module('findTheSameApp.directives', [])
angular.module('findTheSameApp.services', [])
angular.module('findTheSameApp.providers', [])
angular.module('findTheSameApp.filters', [])
angular.module('findTheSameApp.values', [])

angular
    .module('findTheSameApp',
    [
        'findTheSameApp.controllers',
        'findTheSameApp.directives',
        'findTheSameApp.services',
        'findTheSameApp.providers',
        'findTheSameApp.filters',
        'findTheSameApp.values'
    ])
    .config(function (settingsProvider) {
        settingsProvider.setSettings({
            playBoard: {
                margin: 5,
                distance: 15
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