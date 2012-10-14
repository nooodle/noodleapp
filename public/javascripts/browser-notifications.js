'use strict';

define(function() {

  var PERMISSION_ALLOWED = 0;

  var notifier = window.webkitNotifications;

  exports.isSupported = function() {
    notifier;
  },

  exports.sendNotification = function(user, messsage) {
    this.notify('Mention from ' + user, message);
  },

  exports.notify = function(title, message) {
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

  exports.requestPermission = function() {
    notifier.requestPermission();
  },

  exports.notificationsAllowed = function() {
    if ( notifier.checkPermission() === PERMISSION_ALLOWED ) {
      return true;
    } else {
      return false;
    }
  }

});
