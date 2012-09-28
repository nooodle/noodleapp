define(['jquery'], function($) {
  'use strict';

  var toggle_button = $('#notifications');

  $(document).ready( function() {
    if (window.webkitNotifications.checkPermission() !== 0) { // 0 is PERMISSION_ALLOWED
      toggle_button.show();
    }
  });

  toggle_button.on('click', function() {
    if (window.webkitNotifications.checkPermission() !== 0) { // 0 is PERMISSION_ALLOWED
      window.webkitNotifications.requestPermission();
    }
  });

});
