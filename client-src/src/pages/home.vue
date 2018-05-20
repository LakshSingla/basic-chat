<template>
<div>
<div class="container" id="body-wrapper">
  <div class="col s12 ">
    <h2 class="header">Groups</h2>
    <ul id="staggered-group-list">
      <group-box v-for="(item, index) in items" :key="index"></group-box>
    </ul>
  </div>
  </div>
  
  <div class="fixed-action-btn click-to-toggle">
      <a class="btn-floating btn-large red">
        <i class="large material-icons">mode_edit</i>
      </a>
      <ul>
        <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
        <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
        <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
        <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
      </ul>
    </div>

</div>
  
</template>

<script>

import axios from 'axios';

import CONFIG from '../config';
import groupBox from '../components/group-box';

export default {
    beforeRouteEnter(to, from, next){
      axios.request({
        method : 'get', 
        url : `${CONFIG.API_URI}/group/my`, 
        headers : {
          'Access-Control-Allow-Origin' : '*', 
          'x-chat-token' : localStorage.getItem(CONFIG.LOCALSTORAGE_PATH)
        }
      }).then(response => {
        const data = response.data;
        console.log(response.data);
        next();
      });
    },
    data(){
      return {
        groupList : []
      }
    },
    mounted(){
        Materialize.showStaggeredList('#staggered-group-list');
    }, 
    components : {
      'group-box' : groupBox,
    }, 
    props: {

    }
}
</script>

<style scoped>

html, body{
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

.staggered-group-item{
  opacity: 0;
}

</style>


