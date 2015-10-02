/*********************************************************************
 * Created by Anton Baksheiev on 02.10.2015.                         *
 * linkedin: https://www.linkedin.com/pub/baksheiev-anton/20/a56/b53 *
 *********************************************************************/
angular
    .module('findTheSameApp.filters', [])
    .filter('notDeleted', function () {
        return function (input) {
            if (undefined === input) {
                return input;
            }

            var result = [];

            for (var i = 0; i < input.length; i++) {
                var index = i;
                if (input[index].deleted === undefined) {
                    result.push(input[i])
                }
            }

            return result;
        };
    });
