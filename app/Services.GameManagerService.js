/*********************************************************************
 * Created by Anton Baksheiev on 01.10.2015.                         *
 * linkedin: https://www.linkedin.com/pub/baksheiev-anton/20/a56/b53 *
 *********************************************************************/
angular
    .module('findTheSameApp.services', [])
    .service('gameManager',['$rootScope', '$timeout', 'gameSettings', function($rootScope, $timeout, gameSettings){

        var _alphabet=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var _numeric=['0','1','2','3','4','5','6','7','8','9'];

        var _lastSelectedCardValue=null;
        var _cards =[]
            ,_columns
            ,_rows
        /*
            1: Alphabet
            2: Numeric
         */
            ,_cardType;

        var _calculate_Y=function( col){
            if(col==1){
                return gameSettings.playBoard.margin ;
            }else{
                return (col-1) * gameSettings.card.height + gameSettings.playBoard.margin+(col-1)*gameSettings.playBoard.distance;
            }
        }
        var _calculate_X=function(row){
            if(row==1){
                return gameSettings.playBoard.margin ;
            }else{
                return (row-1) * gameSettings.card.width + gameSettings.playBoard.margin+(row-1)*gameSettings.playBoard.distance;
            }
        }

        var _setSettings = function(settings){
            _columns = settings.size.cols;
            _rows = settings.size.rows;
            _cardType = settings.cardType
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // TODO: move to separate service
        var _getNumericValues = function(countValues){
            var array =[];

            var firstNumber = getRandomInt(0,_numeric.length-1);
            var secondNumber = getRandomInt(0,_numeric.length-1);

            for(var i=0;i<countValues;i++){

                var firstNumber = getRandomInt(0,_numeric.length-1);
                var secondNumber = getRandomInt(0,_numeric.length-1);

                array.push(_numeric[firstNumber]+_numeric[secondNumber]);
            }
            var fullArray =  array.concat(array.slice(0));

            return fullArray.shuffle();
        }

        var _getAphabetValues = function(countValues){
            var array =[];

            var firstNumber = getRandomInt(0,_alphabet.length-1);
            var secondNumber = getRandomInt(0,_alphabet.length-1);

            for(var i=0;i<countValues;i++){

                var firstNumber = getRandomInt(0,_alphabet.length-1);
                var secondNumber = getRandomInt(0,_alphabet.length-1);

                array.push(_alphabet[firstNumber]+_alphabet[secondNumber]);
            }
            var fullArray =  array.concat(array.slice(0));

            return fullArray.shuffle();
        }

        var _selectCard = function(el) {

            if (_lastSelectedCardValue == null) {
                //el.style['background-color']='red'
                el.item.active = true;
                _lastSelectedCardValue = el;
            } else {

                el.item.active = true;

                $timeout(function(){
                    if (_lastSelectedCardValue.item.value  == el.item.value) {

                        _removeElementByValue( el.item.value);

                    } else {
                        _lastSelectedCardValue.item.active = false;
                        el.item.active = false;
                    }
                    _lastSelectedCardValue = null;

                }, 1000);
            }
        }

        var _removeElementByValue= function(value){
            for(var i = 0;i<_cards.length;i++){
                if(_cards[i].value == value){
                    _cards[i].deleted=true;
                }
            }
        }

        var _generateMockCards = function() {
             _cards.splice(0,_cards.length);

            var valuesCount = (_columns * _rows)/2;
            var values=[];

            switch (_cardType){
                case 'Numeric':
                    values = _getNumericValues(valuesCount );
                    break;
                case 'Alphabet':
                    values =_getAphabetValues(valuesCount );
                    break;
                default :
                    console.error('Unsupported type of cards')
            }

            for (var row = 1; row <= _rows; row++) {
                for (var col = 1; col <= _columns; col++) {

                    var v = values.pop()

                    _cards.push({
                        'click': _selectCard ,
                        Y: _calculate_Y(row),
                        X: _calculate_X(col),
                        value: v,
                        active: false
                    });
                }
            }
        }

        var _playBoardSize = function(){

            var obj={}

            obj['width'] = _columns * gameSettings.card.width + 2*gameSettings.playBoard.margin+(_columns-1)*gameSettings.playBoard.distance;
            obj['height'] =_rows * gameSettings.card.height + 2*gameSettings.playBoard.margin+(_rows-1)*gameSettings.playBoard.distance;;

            return obj;
        }

        return {
            cards: function () {
                _generateMockCards();
                return _cards;
            },
            setSettings:_setSettings,
            playBoard:_playBoardSize
        }
    }
    ]);
// TODO: move to library
