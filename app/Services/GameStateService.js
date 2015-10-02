/*********************************************************************
 * Created by Anton Baksheiev on 01.10.2015.                         *
 * linkedin: https://www.linkedin.com/pub/baksheiev-anton/20/a56/b53 *
 *********************************************************************/
angular
    .module('findTheSameApp.services')
    .service('gameState', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        var _cardtype;

        var _selectedCards = [];
        var _currentCard;

        var _selectCard = function (el) {
            _currentCard = el;

            if (_selectedCards.length == 0) {
                el.item.active = true;
                _selectedCards.push(el);

            } else {

                el.item.active = true;

                $timeout(function () {
                    if (_selectedCards[0].item.value == _currentCard.item.value) {

                        _selectedCards.push(_currentCard);

                        while (_selectedCards.length > 0) {
                            var el = _selectedCards.pop();
                            el.item.deleted = true;
                        }
                    } else {
                        while (_selectedCards.length > 0) {
                            var el = _selectedCards.pop();
                            el.item.active = false;

                        }
                        _currentCard.item.active = false;
                        _selectedCards.slice(0, _selectedCards.length);
                    }

                }, 1000);
            }
        }

        var _cardType = function (value) {
            if (value !== undefined) {
                _cardtype = value;
            } else {
                return _cardtype;
            }
        }

        return {
            cardType: _cardType,
            selectCard: _selectCard
        }
    }
    ]);
