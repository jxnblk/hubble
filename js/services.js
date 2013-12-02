
hubble.factory('github', function($http){
  var apiUrl = '//api.github.com',
      // params = '?client_id=' + clientID + '&callback=JSON_CALLBACK';
      params = '?access_token=' + token + '&callback=JSON_CALLBACK';

  return {

    getUser: function(user, callback){
      var url;
      if (user) {
        url = apiUrl + '/users/' + user + params;
      } else {
        url = apiUrl + '/user' + params;
      };
      console.log(token);
      $http.jsonp(url).
        error(function(error){ console.error('oh noes') }).
        success(callback);
    },

    getRepos: function(user, callback){
      $http.jsonp(apiUrl + '/users/' + user + '/repos' + params).success(callback);
    },

    getRepo: function(user, repo, callback){
      $http.jsonp(apiUrl + '/repos/' + user + '/' + repo + params).success(callback);
    },

    getRepoContents: function(user, repo, callback){
      $http.jsonp(apiUrl + '/repos/' + user + '/' + repo + '/contents' + params).success(callback);
    },

    getReadme: function(user, repo, callback){
      $http.jsonp(apiUrl + '/repos/' + user + '/' + repo + '/readme' + params).success(callback);
    },

    getFollowing: function(user, callback){
      var url;
      if (user) {
        url = apiUrl + '/users/' + user + '/following' + params;
      } else {
        url = apiUrl + '/user' + '/following' + params;
      };
      $http.jsonp(url).success(callback);
    },

    getStars: function(callback){
      $http.jsonp(apiUrl + '/user/starred' + params).success(callback);
    }

  }

});


// Local Storage Factory
hubble.factory('storage', function(){            
  return {
    set: function(key, obj){
      var string = JSON.stringify(obj)
      localStorage.setItem(key, string);
    },
    get: function(key, callback){
      var data = localStorage.getItem(key);
      var obj = JSON.parse(data);
      return obj;
    },
    clearAll: function(){
      localStorage.clear();
    }
  }     
});


hubble.directive('markdown', function () {
    var converter = new Showdown.converter();
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        if (attrs.markdown) {
          scope.$watch(attrs.markdown, function (newVal) {
            var html = newVal ? converter.makeHtml(newVal) : '';
            element.html(html);
          });
        } else {
          var html = converter.makeHtml(element.text());
          element.html(html);
        }
      }
    };
});

