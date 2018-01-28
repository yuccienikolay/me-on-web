var r = new Post("/posts/TEST");
var str = `## Hello Test Me Now\n\n\nI love js\n\n\n__not really__`;
r.body = str;
a = r.publish();
return "ok";

var updates = {};
updates[”/”] = null;
return firebase.database().ref().update(updates)


### Header
- to reboot linux try: `rm -rf /`
- Simple Text
- _bold_
1. __italic__
2. ~~ComplicatedText~~
> Quote

[link](/)

#### img
![cake](https://images.unsplash.com/photo-1514854500986-9638053f8d6e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=9e812516e8e53c73786f37e6fa0a186e)