/*jshint quotmark:false */
/*global $:false, native5:false */
$(function() {
    "use strict";
    $(document).ready(function() {
        $("#btn1").on("click", function() {
        	native5.Notifications.requestPermission();
            native5.Notifications.show('Toast Notification Demo', {notificationType:'toast', title:'Toast', position:'bottom', distance:'50px', messageType: ""});
        });
        $("#btn2").on("click", function() {
            native5.Notifications.show('Proress Notification Demo', {notificationType:'progress', title:'Progress', position:'bottom', distance:'50px', messageType: "", progressText: "Creating ...", progressComplete: "25%"});
        });
        $("#btn3").on("click", function() {
            native5.Notifications.show('Web Notification Demo', {notificationType:'web', title:'Web', position:'top', distance:'50px', persistent:true});
        });
        $("#btn4").on("click", function() {
            native5.Notifications.update({progressText: "Checking ...", progressComplete: "50%"});
        });
    });
});
