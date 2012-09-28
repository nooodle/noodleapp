define(['jquery'], function($) {
  'use strict';
  $(loader);

  var notifier = window.webkitNotifications;

  var loader = function() {
    var toggle_button = $('#notifications');
    if ( !notification_allowed() ) {
      toggle_button.show();
    }

    toggle_button.on('click', function() {
      if ( !notification_allowed() ) {
        notifier.requestPermission();
      }
    });

    notify("Test", "Test Message");
  };

  var notify = function(title, message) {
    try {
      if ( notification_allowed() ) {
        // no icon for now
        notifier.createNotification(null, 'NoodleApp - ' + title, message);
      }
    } catch(error) {
      console.log(error);
    }
  };

  var notification_allowed = function() {
    var PERMISSION_ALLOWED = 0;
    if ( notifier.checkPermission() === PERMISSION_ALLOWED ) {
      return true;
    } else {
      return false;
    }
  };

});
