<template>
    <div id="body-wrapper" class="valign-wrapper ">
       <h1>CHATTERBOX</h1>
       <div class="input-field col s12 center-align">
           <label for="last_name">Nick</label>
           <input id="last_name" type="text" class="validate">
       </div>
       <button class="btn waves-effect waves-light" type="submit" name="action">Submit
           <i class="material-icons right">send</i>
       </button>
    </div>
</template>
<script>
    // let heading = document.getElementsByTagName('h1')[0];
    //      heading.style.left = (document.documentElement.clientWidth - heading.getBoundingClientRect().width)/2 + "px";
    //      window.onresize = function(){
    //          heading.style.left = (document.documentElement.clientWidth - heading.getBoundingClientRect().width)/2 + "px";
    //      }
    export default {

    }
</script>
<style>
    #body-wrapper{
            height: 100vh;
            width:  100vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        h1{
            position: absolute;
            top: 10px;
            font-size: 36px;
        }
</style>