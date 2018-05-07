let db = firebase.firestore();

let punches = db.collection("punches");

punches.add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
});

punches.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});

var asspunch = new Vue({
  el: '#asspunch',
  data: {
    count: 0
  }
});