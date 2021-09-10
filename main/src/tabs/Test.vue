<template>
  <div class="card">
         <!-- :value="dateChosen" @blur="ch" :max="film.finishTime" :min="film.startTime" -->
        <input type="file"  @change="ch">
        <img :src="image" alt="image">
  </div>
</template>

<script>// @change="checkDates":value="image"
// import {ref, onMounted, computed, watch, } from 'vue'
import { useStore } from "vuex";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";



export default {
    setup(){
        const store = useStore()

const firebaseConfig = {
  apiKey: "AIzaSyD7dWwQcB0EA9irJBYRWMAP4cQsGpsH_Vc",
  authDomain: "cinema-vue-project.firebaseapp.com",
  databaseURL: "https://cinema-vue-project-default-rtdb.firebaseio.com",
  projectId: "cinema-vue-project",
  storageBucket: "cinema-vue-project.appspot.com",
  messagingSenderId: "578123914941",
  appId: "1:578123914941:web:a438171e4709b786de21d4"
};

const firebase = initializeApp(firebaseConfig);
// console.log('firebase',firebase);
const storage = getStorage(firebase, 'gs://cinema-vue-project.appspot.com');
// console.log('storage',storage);


// const storage = getStorage();
// const storageRef = ref(storage, 'child');









        // console.log(firebase);
         

    const ch = async (event)=>{
// console.log('firebase',firebase);
// console.log('storage',storage);
            const pathReference = ref(storage, `images/${event.target.files[0].name}`);
            // console.log('rRef', pathReference);
            const gsReference = ref(storage, `gs://cinema-vue-project.appspot.com/images/${event.target.files[0].name}.jpg`);
            // console.log('ref 000', gsReference);

// Create a reference from an HTTPS URL
// Note that in the URL, characters are URL escaped!
// const httpsReference = ref(storage, `https://firebasestorage.googleapis.com/b/cinema-vue-project.appspot.com/o/images%20${event.target.files[0].name}.jpg`); 
// console.log('ref ', httpsReference); 

            const mountainsRef = ref(storage, `${event.target.files[0].name}`);
            const mountainImagesRef = ref(storage, `images/${event.target.files[0]}`);
            uploadBytes(storageRef, event.target.files[0].name).then((snapshot) => {
  // console.log('Uploaded a blob or file!');
});
    //         console.log('mountainsRef',mountainsRef);
    //         console.log('file image',event.target.files[0]);
    //         console.log('image path',event.target.value);
    }






            // console.log(res);
            // const fd = new FormData()post(`images/${event.target.files[0].name}`)
            // fd.append('image', event.target.files[0], event.target.files[0].name )
            // var storageRef = firebase.storageRef("gs://MyProject.appspot.com/")

            // const str = firebase.getInstance();
            // const storageRef = str.getReferenceFromUrl("gs://MyProject.appspot.com/");
            // console.log(storageRef);
            // storage.post(`images/${event.target.files[0].name}`).put(event.target.files[0])
            //const {data} = await axios.post(url(event.target.value), fd )
            // console.log(data);

            // storage.ref(`images/${event.target.name}`).put(event.target)
            // createBucket()
        
    // async function url(uri) {
//     // Why are we using XMLHttpRequest? See:
//     // https://github.com/expo/expo/issues/2402#issuecomment-443726662
//     const blob = await new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.onload = function () {
//             resolve(xhr.response);
//         };
//         xhr.onerror = function (e) {
//             console.log(e);
//             reject(new TypeError('Network request failed'));
//         };
//         xhr.responseType = 'blob';
//         xhr.open('GET', uri, true);
//         xhr.send(null);
//     });

//     const ref = firebase
//         .storage()
//         .ref()
//         .child(uuid.v4());
//     const snapshot = await ref.put(blob);

//     // We're done with the blob, close and release it
//     blob.close();

//     let url = await snapshot.ref.getDownloadURL();
//     console.log("Вот такой фот урл получился! ", url)
//     return url;
// }


        return{
            ch,
            // image

        }
    }
}
</script>