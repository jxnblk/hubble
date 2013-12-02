
var token;

hubble.controller('GlobalCtrl', ['$scope', 'storage', '$location', function($scope, storage, $location){
  token = storage.get('token');
  if (token) {
    $scope.connected = true;
    //$location.path('/');
    $location.search('');
  } else {
    $scope.connected = false;
    $scope.authUrl = 'https://github.com/login/oauth/authorize?client_id=' + clientID;
  };
}]);

hubble.controller('HomeCtrl', ['$scope', '$http', '$window', 'github', 'storage', function($scope, $http, $window, github, storage){

  if (window.location.href.match(/\?code=(.*)/)){
    var code = window.location.href.match(/\?code=(.*)/)[1];  
    var url = tokenUrl + code;
    $http.get(url).success(function(data){
      token = data.token;
      storage.set('token', token);
      $window.location.href = '.';
    });
  };

  if($scope.connected){
    github.getUser('', function(res){
      console.log(res.data);
      $scope.me = res.data;
    });
  };
 
}]);

hubble.controller('UserCtrl', ['$scope', '$routeParams', 'github', function($scope, $routeParams, github){

  $scope.userPermalink = $routeParams.user;

  github.getUser($routeParams.user, function(res){
    $scope.user = res.data;
  });
  github.getRepos($routeParams.user, function(res){
    $scope.repos = res.data;
  });

}]);

hubble.controller('RepoCtrl', ['$scope', '$routeParams', 'github', function($scope, $routeParams, github){
  
  $scope.userPermalink = $routeParams.user;
  $scope.repoPermalink = $routeParams.repo;

  github.getRepo($routeParams.user, $routeParams.repo, function(res){
    $scope.repo = res.data;
  });

  github.getRepoContents($routeParams.user, $routeParams.repo, function(res){
    console.log(res);
    $scope.contents = res.data;
  });

  github.getReadme($routeParams.user, $routeParams.repo, function(res){
    $scope.readme = res.data;
    if(res.data.content) $scope.readmeContent = Base64.decode(res.data.content);
  });

}]);

hubble.controller('FollowingCtrl', ['$scope', '$routeParams', 'github', function($scope, $routeParams, github){
  $scope.userPermalink = $routeParams.user;
  github.getFollowing($routeParams.user, function(res){
    console.log(res.data);
    $scope.followings = res.data;
  });
}]);

hubble.controller('StarsCtrl', ['$scope', 'github', function($scope, github){
  github.getStars(function(res){
    $scope.stars = res.data;
  });
}]);
