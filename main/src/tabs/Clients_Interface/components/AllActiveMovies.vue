<template>
  <div class="card">
      <span>В прокате</span>
      <hr>
        <div class="filmBlock" v-for="(film, idx) of films" :key="idx" >
            <img :src="film.movieposter" :alt="film.filmName">
            
            <div class="infoAbout">
                <h3>{{film.filmName}}</h3>
                <hr>
                <p><b>Жанр:</b>{{film.genre}}</p>
                <p><small>Для получения подробной информации нажмите на постер</small></p>
            </div>
        </div>
        
  </div>
</template>

<script>
export default {
    props:['films'],

}
</script>

<style scoped>
   .filmBlock{
       /* width:25%;
       height:auto;
       display: inline-block; */
    /* margin-bottom: 8px;
    position: relative;
    display: block; */
    width: 20%;
    height: 300px;
    text-align: center;
    display: inline-flex;
    /* border: chocolate 3px solid; */
    justify-content: space-around;
   }
      
    img{
        width: 200px;
        height: auto;
        z-index:15;

    /* width: 100%;
    height: auto;
    vertical-align: bottom;
    border-radius: 4px; */
   } 
   .infoAbout{
       display: none;
   }
   .filmBlock:hover{
       background:rgba(0, 0, 0, 0.719);
       cursor: pointer;
       z-index:25;
   }
   .filmBlock:hover .infoAbout{
       display: block;
       width: 200px;
       height: 300px;
       color:white;
       font-size:15px;
       position: absolute;
       background:rgba(0, 0, 0, 0.719);
       z-index:35;
   }

</style>