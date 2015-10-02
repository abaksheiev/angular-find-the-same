/*********************************************************************
 * Created by Anton Baksheiev on 02.10.2015.                         *
 * linkedin: https://www.linkedin.com/pub/baksheiev-anton/20/a56/b53 *
 *********************************************************************/
angular
    .module('findTheSameApp.services')
    .service('generatorCard', ['$rootScope','settings','colors', function ($rootScope, settings, colors) {
        var _cols,
            _rows,
            _cardType;

        var _alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var _numeric = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        var _calculate_Y=function( col){
            if(col==1){
                return settings.playBoard.margin ;
            }else{
                return (col-1) * settings.card.height + settings.playBoard.margin+(col-1)*settings.playBoard.distance;
            }
        }

        var _calculate_X=function(row){
            if(row==1){
                return settings.playBoard.margin ;
            }else{
                return (row-1) * settings.card.width + settings.playBoard.margin+(row-1)*settings.playBoard.distance;
            }
        }

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

        var _getColorValues = function(countValues)
        {
            var array =[];

            var firstNumber = getRandomInt(0,colors.length-1);

          for(var i=0;i<countValues;i++){

                var firstNumber = getRandomInt(0,colors.length-1);


                array.push(colors[firstNumber]);
            }
            var fullArray =  array.concat(array.slice(0));

            return fullArray.shuffle();
        }

        var _setSettings = function(settings){
            _cols = settings.size.cols;
            _rows = settings.size.rows;
            _cardType = settings.cardType
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }


        var _generateCards = function(callback) {
            var cards =[];

            var valuesCount = (_cols * _rows)/2;
            var values=[];

            switch (_cardType){
                case 'Numeric':
                    values = _getNumericValues(valuesCount );
                    break;
                case 'Alphabet':
                    values =_getAphabetValues(valuesCount );
                    break;
                case 'Color':
                    values =_getColorValues(valuesCount );
                    break;
                default :
                    console.error('Unsupported type of cards')
            }

            for (var row = 1; row <= _rows; row++) {
                for (var col = 1; col <= _cols; col++) {

                    var v = values.pop()

                    cards.push({
                        'click': callback,
                        Y: _calculate_Y(row),
                        X: _calculate_X(col),
                        value: v,
                        active: false
                    });
                }
            }

            return cards;
        }
        return {
            setSettings:_setSettings,
            generate: _generateCards
        }
    }]);