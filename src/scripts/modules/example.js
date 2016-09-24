'use strict';

var $ = require('jquery');

module.exports = {
    init: function() {
        var self = this;
        var moduleName = 'example';

        if (!$('.js-' + moduleName)) {
            return;
        }

        var $obj = $('.js-' + moduleName);

    }
};
