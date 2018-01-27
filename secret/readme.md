var r = new Post("/posts/TEST");
var str = `## Hello Test Me Now\n\n\nI love js\n\n\n__not really__`;
r.body = str;
a = r.publish();
return "ok";