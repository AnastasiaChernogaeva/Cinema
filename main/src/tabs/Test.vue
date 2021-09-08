<template>
  <div class="card">
         <!-- :value="dateChosen" @blur="ch" :max="film.finishTime" :min="film.startTime" -->
        <input type="file" :value="image" @change="ch">
        <img :src="image" alt="image">
  </div>
</template>

<script>// @change="checkDates"
import {ref, onMounted, computed, watch, } from 'vue'
import { useStore } from "vuex";
import {Storage} from '@google-cloud/storage'

export default {
    setup(){
        const store = useStore()
        const image = ref()
        // Creates a client using Application Default Credentials
// const storage = new Storage();

// // Creates a client from a Google service account key
// // const storage = new Storage({keyFilename: 'key.json'});

// /**
//  * TODO(developer): Uncomment these variables before running the sample.
//  */
// // The ID of your GCS bucket
// // const bucketName = 'your-unique-bucket-name';

// async function createBucket() {
//   // Creates the new bucket
//   await storage.createBucket(bucketName);
//   console.log(`Bucket ${bucketName} created.`);
// }

// createBucket().catch(console.error);
         
        // const session = ref({})
        //         const film = ref({})
        //         const dateChosen =ref()
        // onMounted(async()=>{
        //     session.value = await store.dispatch('gettingInfo/loadByID',{
        //         rType:'sessions',
        //         id:'-MiGwOycpHIYSXxYaOtt',
        //     },)

        //      await store.dispatch('gettingInfo/load',{
        //         rType:'films',
        //     },)           
        //       const films = computed(()=> store.getters['gettingInfo/films'])
        //       film.value = films.value.find(filmO =>{
        //                             if(session.value.sessionFilmName === filmO.filmName) {
        //                                 return filmO
        //                             }
        //                     } )
        // })




        // const ch = (event)=>{
        //     console.log(event.target.value);
        // }

    const ch = (event)=>{
            image.value = event.target.value
            console.log(event.target.value);
            // console.log(image.value);
        }


        return{
            // session,
            // film,

            // dateChosen,
            ch,
            image

        }
    }
}
</script>