import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,  signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { collection, addDoc, getFirestore, onSnapshot, deleteDoc, doc, updateDoc  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";  
  
const firebaseConfig = {
    apiKey: "AIzaSyBlKO3PTAi_G4Po3CPSyDUCr-PZh-0Sy-4",
    authDomain: "project-f09fb.firebaseapp.com",
    projectId: "project-f09fb",
    storageBucket: "project-f09fb.appspot.com",
    messagingSenderId: "857081771973",
    appId: "1:857081771973:web:0c5dcf986e3d15c189fdac"
  };

  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const ids = []





window.signUp = function () {
    
  let signUpEmail = document.getElementById("signupemail").value
  let signUpPassword = document.getElementById("signuppassword").value
  
  createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    Swal.fire('User Created Successfully')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    swal.fire(errorMessage)
    // ..
  });

}

window.logIn = function () {
    let logInEmail = document.getElementById("loginemail").value
    let logInPassword = document.getElementById("loginpassword").value
    signInWithEmailAndPassword(auth, logInEmail, logInPassword)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      Swal.fire('Login Successfull')
      window.location.href = "./dashboard.html"
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire(errorMessage);
    });
  
}

window.addpost = async() => {
   
  
 let postTitle = document.getElementById("author-name")
 let postText = document.getElementById("post-text")
 let date = new Date()
  try {
      const docRef = await addDoc(collection(db, "post"), {
        postTitle: postTitle.value,
        postText: postText.value,
        time: date.toLocaleString()
      });
    
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  }

  const postContainer = document.getElementById("post-container");

    window.getPost = () => {
      const postCollectionRef = collection(db, "post");
    
      onSnapshot(postCollectionRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const postDoc = change.doc;
          const postId = postDoc.id;
          const postTitle = postDoc.data().postTitle;
          const postText = postDoc.data().postText;
    
          console.log("Post ID:", postId);
          console.log("Post Title:", postTitle);
          console.log("Post Text:", postText);

          // Create a new card element
          const card = document.createElement("div");
          card.classList.add("post-card");
          
          // Set the content of the card
          card.innerHTML = `
            <h2>${postTitle}</h2>
            <p>${postText}</p>
          `;
    
          // Append the card to the post container
          postContainer.appendChild(card);
        });
      });
    }
  
  
    
     

 getPost();
 









 

 