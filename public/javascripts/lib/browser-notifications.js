define(['jquery'], function($) {
  'use strict';

  var notifier = window.webkitNotifications;

  var toggle_button = $('#notifications');

  var self = {

    sendBrowserNotifications: function(user, messsage) {
      this.notify('Mention', user + ": " + message);
    },

    notify: function(title, message) {
      console.log('Notification: ',title,message);
      try {
        if ( notification_allowed() ) {
          // no icon for now
          notifier.createNotification(null, 'NoodleApp - ' + title, message).show();
        }
      } catch(error) {
        console.log(error);
      }
    },

    notification_allowed: function() {
      var PERMISSION_ALLOWED = 0;
      if ( notifier.checkPermission() === PERMISSION_ALLOWED ) {
        return true;
      } else {
        return false;
      }
    }

  };

  if ( !notification_allowed() ) {
    toggle_button.show();
  }

  toggle_button.on('click', function() {
    console.log("requesting notification access");
    if ( !notification_allowed() ) {
      notifier.requestPermission();
    }
  });



});
