<template>
    <div class="app-wrapper" >
        <canvas id="canvas" @mouseover="check" ></canvas>
    </div>
</template>

<script>
export default {
    props:['rows','simplePl','vipPl','couplePl', 'places',],
    data() {
        return {
            elements:[],
            // rows:9,
            // simplePl:[2,7,6,8,],
            // vipPl:[1,4,3,],
            // couplePl:[5,9],
            // places:10,
            radius:6,
            mouse:{
                x:0,
                y:0,
                startX: 0,
                startY: 0
            },
        }
    },
    mounted(){
        this.draw()
    },

    methods: {
        check(e){
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) { //Moz
            this.mouse.x = ev.pageX + window.pageXOffset;
            this.mouse.y = ev.pageY + window.pageYOffset;
        } else if (ev.clientX) { //IE
            this.mouse.x = ev.clientX + document.body.scrollLeft;
            this.mouse.y = ev.clientY + document.body.scrollTop;
        }
                    

        this.elements.forEach(element => {

            if(element.x===this.mouse.x+this.radius||this.mouse.x && element.y===this.mouse.y+this.radius||this.mouse.y)
                console.log('fit',element, this.mouse);
        });
        },

    draw() {
        canvas.height=300;
    for (let i=0;i<this.rows;i++){
      for (let j=0;j<this.places;j++){
            let x = 12+j*20
            let y = 12+i*20
            if(this.simplePl.includes(i+1) ){
            this.ctx.strokeStyle = 'black';
            this.ctx.beginPath();
            this.ctx.arc(x,y,this.radius,0,Math.PI*2,true);
            this.ctx.stroke();
            this.ctx.beginPath();
        }
        else if(this.vipPl.includes(i+1)){
            this.ctx.beginPath();
            this.ctx.arc(x,y, this.radius*1.5, 0, Math.PI);
            this.ctx.strokeStyle = '#1a2edb'; // тёмно-синий цвет
            this.ctx.lineWidth = 2; // толщина линии в 5px
            this.ctx.stroke();
            this.ctx.beginPath();

            this.ctx.beginPath();
            this.ctx.arc(x,y, this.radius, Math.PI, 0);
            this.ctx.fillStyle = '#50c843'; // зелёный цвет
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.beginPath();
        // this.ctx.fill(); 
        }
        else if(this.couplePl.includes(i+1)){
   if(j%2!=0){
            this.ctx.beginPath();
            this.ctx.fillStyle = 'red'; // зелёный цвет
            this.ctx.fillRect(x/3 + j*10,y/1.055,this.radius*4.5, this.radius*2.2);
             this.ctx.beginPath();
        }
        }

        this.elements.push({x: x , y: y, place:j+1, row:i+1,})

      }
    }
  }
    },
    computed: {
        ctx(){
            return document.querySelector('#canvas').getContext('2d');
        }
    },

}

</script>

<style scoped>
.app-wrapper[data-v-4c755ec4] {
    /* padding-top: 5%; */
    /* text-align: center; */
    max-height: 190px;
    max-width: 16%;
    background: beige;
}

canvas#canvas {
    height: 303px;
    padding-left: 2%;
}
    /* .app-wrapper {
        padding-top:5%;
        text-align: center;
        min-height: 300px;
        max-width: 95%;
        background: beige;
    } */
</style>