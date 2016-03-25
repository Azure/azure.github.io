$(document).ready(function () {
    var idValue = window.location.pathname.replace(/\//g, '');
    if (!idValue) {
        idValue = ["home"];
    } else {
        idValue = [idValue];
    }

    if (idValue[0].match(/projects/)) {
        idValue.push("projects");
    }

    $(".nav").find(".active").removeClass("active");
    _.each(idValue, function (i) {
        $("#" + i + 'Link').addClass("active");
    });

});

function log() {
    if ('console' in window) {
        console.log.apply(console, arguments);
    }
}
