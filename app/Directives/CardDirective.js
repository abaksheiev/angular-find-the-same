/*********************************************************************
 * Created by Anton Baksheiev on 01.10.2015.                         *
 * linkedin: https://www.linkedin.com/pub/baksheiev-anton/20/a56/b53 *
 *********************************************************************/

angular.module('findTheSameApp.directives', [])
    .directive('card', ['settings', 'gameState', function (settings, gameState) {
         return {
            restrict: 'A',
            //templateUrl: 'app/views/card.html',
            template: '<div class="card" ng-style="style" ng-click="item.click(this)"><span ng-if="item.active">{{text}}</span><div>',
            transclude: true,
            replace: true,
            scope: {
                item: '='
            },
            link: function (scope, element, attrs) {
                scope.style  = {
                    top: scope.item.Y + 'px',
                    left: scope.item.X + 'px',
                    width: settings.card.width + 'px',
                    height: settings.card.height + 'px'
                }

                if (gameState.cardType() !== 'Color' ) {

                    scope.text = scope.item.value;
                }

                scope.$watch(function (scope) {
                    if (gameState.cardType() === 'Color') {
                        if (scope.item.active === true) {
                            scope.style['background-color'] = scope.item.value;
                        } else {
                            delete scope.style['background-color'];
                        }
                    }
                }, function (newValue) {

                });

            }
        }
    }]);

