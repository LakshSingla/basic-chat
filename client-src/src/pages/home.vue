<template>
<div style="overflow-x: hidden;">
<div class="container" id="body-wrapper">
  <div class="col s12 ">
    <h2 class="header">Groups</h2>
    <ul id="staggered-group-list">
      <group-box v-for="(group, index) in groupList" :key="index" :groupName="group.name" :groupID="group._id"></group-box>
    </ul>
  </div>
  </div>

  <div id="modal1" class="modal" style="padding : 5px;">
    <!-- <div class="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
    </div> -->
    <div class="row">
    <form class="col s12">
      <div class="row">
        
        <div class="input-field col s12">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Last Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" class="validate">
          <label for="password">Password</label>
        </div>
      </div>
    </form>
  </div>
  </div>
  <div class="fixed-action-btn ">
    <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
    <!-- <a class="waves-effect waves-light btn modal-trigger" 
       data-target="create-group-modal"
       @click="openModal('create-group-modal')"
       name="create-group-modal">Modal</a>
    <a class="btn-floating btn-large red" href="#create-group-modal">
      <i class="large material-icons">mode_edit</i>
    </a> -->
      <!-- <ul> -->
        <!-- <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li> -->
        <!-- <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li> -->
        <!-- <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li> -->
        <!-- <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li> -->
      <!-- </ul> -->
      <!-- <div id="create-group-modal" class="modal bottom-sheet">
        <div class="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
          <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div> -->
  </div>

</div>
  
</template>

<script>

import axios from 'axios';
import Materialize from 'materialize-css/dist/js/materialize.min.js';
import $ from 'jquery/dist/jquery.js'

import CONFIG from '../config';
import groupBox from '../components/group-box';

export default {
    created(){
      this.fetchData();
    },
    data(){
      return {
        groupList : [],
      }
    },
    mounted(){
      console.log('Mounted the dom');
      $('.modal').modal();
      $('.modal-trigger').leanModal(); // setTimeout(() => Materialize.showStaggeredList('#staggered-group-list'), 1 );
    }, 
    components : {
      'group-box' : groupBox,
    }, 
    props: {

    },
    methods: {
      fetchData(){
        console.log('In fetchData');
        const that = this;
        axios.request({
          method : 'get', 
          url : `${CONFIG.API_URI}/group/my`, 
          headers : {
            'Access-Control-Allow-Origin' : '*', 
            'x-chat-token' : localStorage.getItem(CONFIG.LOCALSTORAGE_PATH)
          }
        }).then(response => {
          const data = response.data;
          this.groupList = data.data;
          // console.log('Fetched the data');
          // console.log('Showing the staggered list');
          ;
        }).then(() => Materialize.showStaggeredList('#staggered-group-list'));
        // setTimeout(() => console.log(that.groupList[0].name), 1000);
      }, 
      openModal(elId){
        $(`#${elId}`).openModal();
      }
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

.input-field{
  max-width: 500px !important;
}


</style>


