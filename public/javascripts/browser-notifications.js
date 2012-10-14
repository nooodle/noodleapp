'use strict';

define(function() {

  var PERMISSION_ALLOWED = 0;

  var notifier = window.webkitNotifications;

  var browserNotifications = {
    isSupported: function() {
      notifier;
    },

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
      if ( notifier.checkPermission() === PERMISSION_ALLOWED ) {
        return true;
      } else {
        return false;
      }
    }
  }

  return browserNotifications;
});
