/*********************************************************************
 * Created by Anton Baksheiev on 01.10.2015.                         *
 * linkedin: https://www.linkedin.com/pub/baksheiev-anton/20/a56/b53 *
 *********************************************************************/
angular.module('findTheSameApp.controllers', [])
    .controller('gameController', ['$scope', 'gameState', 'generatorCard', 'settings', function ($scope, gameState, generatorCard, settings) {
        var _playBoardSize = function () {

            var obj = {}

            obj['width'] = $scope.settings.size.cols * settings.card.width + 2 * settings.playBoard.margin + ($scope.settings.size.cols - 1) * settings.playBoard.distance;
            obj['height'] =$scope.settings.size.rows * settings.card.height + 2 * settings.playBoard.margin + ($scope.settings.size.rows - 1) * settings.playBoard.distance;

            return obj;
        }

        $scope.settings = {
            cardType: "Numeric",
            size: {
                rows: 3,
                cols: 4
            },
            matches: 2
        };

        $scope.rows = [1, 3, 5, 7, 9, 11, 13];
        $scope.cols = [2, 4, 6, 7, 8, 10, 12];

        $scope.cardTypes = [
            {
                text: "Alphabets",
                value: "Alphabet"
            },
            {
                text: "Numerics",
                value: "Numeric"
            },
            {
                text: "Colors",
                value: "Color"
            }

        ];

        $scope.newGame = function () {
            $scope.cards = [];

            // Save current state of game
            gameState.cardType($scope.settings.cardType);

            // Set initial settings for game
            generatorCard.setSettings($scope.settings);

            // Calculate size of background
            // TODO: move somewhere
            $scope.playBoard = _playBoardSize();

            // Generate cards
            $scope.cards = generatorCard.generate(gameState.selectCard);

        }
    }]);

