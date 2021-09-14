<template>
  <div class="card">
        <input type="file"  @change="ch">
        <img :src="imageUrl" alt="image">
  </div>
</template>

<script>
import {ref} from 'vue'
import { useStore } from "vuex";

import firebase from 'firebase/app'
import 'firebase/storage'




export default {
    setup(){
        const store = useStore()
        const imageUrl = ref()



    const ch = async (e) => {
    const file = e.target.files[0]
    const storageRef = firebase.storage().ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    imageUrl.value = await fileRef.getDownloadURL()
    // console.log(imageUrl.value);
  }





        return{
            ch,
            imageUrl

        }
    }
}
</script>