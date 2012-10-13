define(['jquery'], function($) {
  'use strict';

  var notifier = window.webkitNotifications;

  var toggle_button = $('#notifications');

  var self = {

    sendNotification: function(user, messsage) {
      this.notify('Mention from ' + user, message);
    },

    notify: function(title, message) {
      console.log('Notification: ',title,message);
      try {
        if (notificationsAllowed()) {
          // no icon for now
          notification = notifier.createNotification(null, 'NoodleApp - ' + title, message)
          notification.show();
        }
      } catch(error) {
        console.log(error);
      }
    },

    requestPermission: function() {
      notifier.requestPermission();
    },

    notificationsAllowed: function() {
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
