// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4iDYZpECVszQJiiD2vkoJlp9Q0ZZSnmQ",
    authDomain: "d-like-view-counter.firebaseapp.com",
    projectId: "d-like-view-counter",
    storageBucket: "d-like-view-counter.appspot.com",
    messagingSenderId: "610362446013",
    appId: "1:610362446013:web:b91396c4c50acb2d85a7d4",
    measurementId: "G-ZR5TC5R06H"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.addEventListener('DOMContentLoaded', () => {
    const visitorCountElement = document.getElementById('visitorCount');
    const likeCountElement = document.getElementById('likeCount');
    const likeButton = document.getElementById('likeButton');

    let userHasLiked = false; // Track if the user has liked the page

    // Increment and fetch visitor count
    const visitorCountRef = database.ref('visitorCount');
    visitorCountRef.transaction(currentCount => {
        return (currentCount || 0) + 1;
    });

    visitorCountRef.on('value', (snapshot) => {
        visitorCountElement.textContent = snapshot.val();
    });

    // Fetch like count
    const likeCountRef = database.ref('likeCount');
    likeCountRef.on('value', (snapshot) => {
        likeCountElement.textContent = snapshot.val();
    });

    // Handle like button click
    likeButton.addEventListener('click', () => {
        if (userHasLiked) {
            likeCountRef.transaction(currentCount => {
                return (currentCount || 0) - 1;
            });
            likeButton.classList.remove('liked');
            userHasLiked = false;
        } else {
            likeCountRef.transaction(currentCount => {
                return (currentCount || 0) + 1;
            });
            likeButton.classList.add('liked');
            userHasLiked = true;
        }
    });
});
