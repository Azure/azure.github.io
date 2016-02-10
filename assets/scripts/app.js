$(document).ready(function() {
  var idValue = window.location.pathname.replace(/\//g, '');
  if(!idValue) {
    idValue = ["home"];
  } else {
    idValue = [idValue];
  }

  if(idValue[0].match(/projects/)){
    idValue.push("projects");
  }

  $(".nav").find(".active").removeClass("active");
  _.each(idValue, function(i){
    $("#" + i + 'Link').addClass("active");
  });

  // ['azure-sdk-for-net', 'azure-storage-net'].forEach(function(repo) {
  //   Github.repoProfile({ username: 'azure', reponame: repo, selector: '.' + repo});
  // });


});

Github.gitApiUrl="http://localhost:4000/proxy/api.github.com/";


// Github.orgProfile({
//   orgname: 'azure',
//   selector: '.azure-org'
// });

// Github.orgActivity({
//  orgname: 'azure',
//  selector: '.azure-org-activity'
// });
