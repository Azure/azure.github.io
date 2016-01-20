$(document).ready(function() {
  var idValue = window.location.pathname.replace(/\//g, '');
  $(".nav").find(".active").removeClass("active");
  $("#" + idValue + 'Link').addClass("active");
});


Github.orgProfile({
  orgname: 'azure',
  selector: '.azure-org'
});

Github.orgActivity({
 orgname: 'azure',
 selector: '.azure-org-activity'
});
