/*********************************************************************
 * Created by Anton Baksheiev on 01.10.2015.                         *
 * linkedin: https://www.linkedin.com/pub/baksheiev-anton/20/a56/b53 *
 *********************************************************************/

angular.module('findTheSameApp.directives',[])
    .directive('card', ['gameSettings',function(gameSettings) {
        return {
            restrict: 'A',
            //templateUrl: 'app/views/card.html',
            template:'<div class="card" ng-style="style" ng-click="item.click(this)"><span ng-if="item.active">{{text}}</span><div>',
            transclude: true,
            replace:true,
            scope: {
                item: '='
            },
            link: function (scope, element, attrs) {
                scope.text =  scope.item.value ;
                scope.style={
                    top:scope.item.Y+'px',
                    left:scope.item.X+'px',
                    width:gameSettings.card.width+'px',
                    height:gameSettings.card.height+'px',
                }
            }
        }}]);

