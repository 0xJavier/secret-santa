// Your web app's Firebase configuration
var firebaseConfig = {
    // Enter your own FirebaseConfig here
};
// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

const personRef = db.collection("people");

const getPersonButton = document.querySelector("#getPersonButton");
const nameLabel = document.querySelector("#name");
const shirtLabel = document.querySelector("#shirtSize");

var people = [];
var selectedPerson;

getPersonButton.addEventListener("click", function() {
    people = [];
    console.clear();
    personRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            people.push(makePerson(doc.id, doc.data()));
        });
        presentRandomPerson();
    });
});

confirmButton.addEventListener("click", function() {
    personRef.doc(selectedPerson.id).delete().then(function() {
        alert("Person Selected Successfully!")
        resetInterface()
    }).catch(function(error) {
        alert("Error removing document: ", error);
    });
});

function makePerson(id, data) {
    var person = new Object();
    person.id = id;
    person.name = data["name"];
    person.shirtSize = data["shirtSize"];
    return person;
}

function presentRandomPerson() {
    var person = people[Math.floor(Math.random() * people.length)];
    nameLabel.innerHTML = "Name: " + person.name;
    shirtLabel.innerHTML = "Shirt Size: " + person.shirtSize;
    selectedPerson = person;
}

function resetInterface() {
    nameLabel.innerHTML = "Name: ";
    shirtLabel.innerHTML = "Shirt Size: ";
}