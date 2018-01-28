// By Kiselev Nikolay


var md = new markdownit();


// Declaring prototype functions

String.prototype.Format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};
String.prototype.ReplaceAll = function(str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
};
String.prototype.MakeNormal = function(placeholder) {
  var normalString = this.ReplaceAll(".", placeholder);
  var toChange = " .,./.\\.$.@.#.%.^.&.*.(.).-.{.}.[.].=.+.?.<.>.~.;._".split(".");
  toChange.forEach( function (element, index, array) {
    normalString = normalString.ReplaceAll(element, placeholder);
  });
  return normalString;
};
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
};
function ToClassicDate(timestamp) {
  var date = new Date();
  date.setTime(timestamp);
  date.setHours(date.getHours());
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var d = date.getDay();
  var ms = date.getMonth();
  var y = date.getFullYear();
  m = checkTime(m);
  s = checkTime(s);
  return h + ":" + m + ":" + s + " " + d + "." + ms + "." + y;
};


// Cookie jobs

function LoadCookie(Key) {
  return $.cookie(Key);
};

function CreateCookie(Key, Value) {
  $.cookie(Key, Value, {
    expires: 7,
    path: '/'
  });
};

function RemoveCookie(Key) {
  $.removeCookie(Key, {
    path: '/'
  });
};


// Firebase functions

var database = firebase.database();

function Post(key) {
  this.key = key || firebase.database().ref().child('posts').push().key;

  var self = this;
  this.parking = firebase.database().ref(this.key);
  this.parking.once('value', function(snapshot) {
    var val = snapshot.val() || {body: "", time: Date.now(), stars: 0, type: "article"};
    self.body = self.body || val.body;
    self.time = self.time || val.time;
    self.stars = self.stars || val.stars;
    self.type = self.type || val.type;
  });

  this.update = function(callback) {
    this.parking.once('value', function(snapshot) {
      var val = snapshot.val() || {body: "", time: Date.now(), stars: 0, type: "article"};
      self.body = val.body;
      self.time = val.time;
      self.stars = val.stars;
      self.type = val.type;
      if (callback) {
        callback(self);
      }
    });
  }

  this.watch = function(callback) {
    this.parking.on('value', function(snapshot) {
      var val = snapshot.val() || {body: "", time: Date.now(), stars: 0, type: "article"};
      self.body = val.body;
      self.time = val.time;
      self.stars = val.stars;
      self.type = val.type;
      if (callback) {
        callback(self);
      }
    });
  }

  this.mdbody = function() {
    var b = md.render(this.body);
    return b;
  }

  this.publish = function () {
    var pd = {
      body: this.body,
      time: this.time,
      stars: this.stars,
      type: this.type
    }
    var updates = {};
    updates[this.key] = pd;
    return firebase.database().ref().update(updates)
  }
}


// Temps
var temp = `
<div class="uk-card uk-card-default uk-width-1-1 uk-margin">
  <div class="uk-card-header">
    <div class="uk-grid-small uk-flex-middle" uk-grid>
      <div class="uk-width-auto">
        <img class="uk-border-circle" width="40" height="40" src="/img/dist/logo.png">
      </div>
      <div class="uk-width-expand">
        <h3 class="uk-card-title uk-margin-remove-bottom">{}</h3>
        <p class="uk-text-meta uk-margin-remove-top">{}</p>
      </div>
    </div>
  </div>
  <div class="uk-card-body">
    {}
  </div>
  <div class="uk-card-footer">
    <a href="" onclick="addStar('{}');" class="uk-button uk-button-text">
      <i class="far fa-heart"></i> {}
    </a>
  </div>
</div>
`;

// Body


var postAbout = new Post("/about");
postAbout.watch(function(data) {
  $("#aboutme *").removeClass("uk-invisible");
  $("#aboutme *").removeClass("animatefadenofade");
  $("#aboutme *").removeClass("uk-background-muted");
  var aboutme = $("#aboutme").html();
  $("#aboutme").html(aboutme.Format("Обо мне", postAbout.mdbody()));
});

var ref = firebase.database().ref("/posts/");
ref.on('value', function(snapshot) {
  $("#news").html("");
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var currentpost = new Post("/posts/" + childKey);
    currentpost.update(function(data) {
      $("#news").append(temp.Format(childKey, ToClassicDate(currentpost.time), currentpost.mdbody(), childKey, currentpost.stars));
    });
  });
});

function addStar(str) {
  var tos = new Post("/posts/" + str);
  var isLiked = LoadCookie("/posts/" + str);
  if (isLiked) {
    tos.stars -= 1;
    RemoveCookie("/posts/" + str);
  } else {
    tos.stars += 1;
    CreateCookie("/posts/" + str, "true");
  }
  tos.publish();
}