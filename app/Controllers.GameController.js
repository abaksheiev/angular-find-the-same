/*********************************************************************
 * Created by Anton Baksheiev on 01.10.2015.                         *
 * linkedin: https://www.linkedin.com/pub/baksheiev-anton/20/a56/b53 *
 *********************************************************************/
angular.module('findTheSameApp.controllers', [])
    .controller('gameController',['$scope','gameManager', function($scope, gameManager){
        $scope.newGame=function(){
            $scope.cards=[];
            $scope.cards=gameManager.cards();
            $scope.notDeleted = function(el){
                return !(undefined !== el.deleted &&  el.deleted);
            }
        }
    }]);

