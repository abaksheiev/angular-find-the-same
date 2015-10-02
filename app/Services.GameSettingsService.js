/*********************************************************************
 * Created by Anton Baksheiev on 02.10.2015.                         *
 * linkedin: https://www.linkedin.com/pub/baksheiev-anton/20/a56/b53 *
 *********************************************************************/
angular
    .module('findTheSameApp.providers', [])
    .provider('gameSettings', function () {
        var _defaultSettings ={
            playBoard: {
                margin: 5,
                distance:15
            },
            card: {
                width: 10,
                height: 10
            }
        };

        this.setSettings=function(settings){
            _defaultSettings = settings;
        };

        this.$get = [ function() {
            return   _defaultSettings;
            }
        ];
    }
);