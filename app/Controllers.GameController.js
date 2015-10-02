/*********************************************************************
 * Created by Anton Baksheiev on 01.10.2015.                         *
 * linkedin: https://www.linkedin.com/pub/baksheiev-anton/20/a56/b53 *
 *********************************************************************/
angular.module('findTheSameApp.controllers', [])
    .controller('gameController',['$scope','gameManager', function($scope, gameManager){

        $scope.settings={
            cardType:"Numeric",
            size:{
                rows:3,
                cols:4
            },
            matches:2
        };

        $scope.rows=[1,3,5,7,9,11,13];
        $scope.cols=[2,4,6,7,8,10,12];

        $scope.cardTypes=[
            {
                text:"Alphabet",
                value:"Alphabet"},
            {
                text:"Numeric",
                value:"Numeric"}
/*,
            {
                text:"Images",
                value:"Images"}
*/
        ];

        $scope.newGame=function(){
            $scope.cards=[];

            // Set initial settings for game
            gameManager.setSettings($scope.settings);


            // Calculate size of background
            $scope.playBoard=gameManager.playBoard();

            // Generate cards
            $scope.cards=gameManager.cards();


            // Filter: just show active cards
            $scope.notDeleted = function(el){
                return !(undefined !== el.deleted &&  el.deleted);
            }
        }
    }]);

