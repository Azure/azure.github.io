$(document).ready(function() {
  var idValue = window.location.pathname.replace(/\//g, '');
  $(".nav").find(".active").removeClass("active");
  $("#" + idValue + 'Link').addClass("active");
});

Github.gitApiUrl="http://localhost:4000/proxy/api.github.com/"


// Github.orgProfile({
//   orgname: 'azure',
//   selector: '.azure-org'
// });

// Github.orgActivity({
//  orgname: 'azure',
//  selector: '.azure-org-activity'
// });
