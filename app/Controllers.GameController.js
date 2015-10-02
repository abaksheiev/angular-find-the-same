/*********************************************************************
 * Created by Anton Baksheiev on 01.10.2015.                         *
 * linkedin: https://www.linkedin.com/pub/baksheiev-anton/20/a56/b53 *
 *********************************************************************/
angular.module('findTheSameApp.controllers', [])
    .controller('gameController',['$scope','gameManager', function($scope, gameManager){

        $scope.settings={
            cardType:"Numeric",
            size:{
                rows:4,
                cols:6
            },
            matches:2
        };

        $scope.rows=[3,4,5,6,7,8,9,10];
        $scope.cols=[3,4,5,6,7,8,9,10];

        $scope.cardTypes=[
            {
                text:"Alphabet",
                value:"Alphabet"},
            {
                text:"Numeric",
                value:"Numeric"},
            {
                text:"Images",
                value:"Images"}
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

