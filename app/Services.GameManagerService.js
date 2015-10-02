/*********************************************************************
 * Created by Anton Baksheiev on 01.10.2015.                         *
 * linkedin: https://www.linkedin.com/pub/baksheiev-anton/20/a56/b53 *
 *********************************************************************/
angular
    .module('findTheSameApp.services', [])
    .service('gameManager',['$rootScope', '$timeout', 'gameSettings', function($rootScope, $timeout, gameSettings){
        var _lastSelectedCardValue=null;

        var _cards =[]
            ,_columns
            ,_rows;

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

            for(var i = 1;i<=valuesCount;i++) {
                var tmp_i = i;
                values.push(tmp_i);
            }

            for(var i = 1;i<=valuesCount;i++) {
                var tmp_i = i;
                values.push(tmp_i);
            }

             for (var row = 1; row <= _rows; row++) {
                for (var col = 1; col <= _columns; col++) {
                    var v = values.pop()
                    _cards.push({
                        'click': _selectCard ,
                        Y: _calculate_Y(row),
                        X: _calculate_X(col),
                        value:v,
                        active:false
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