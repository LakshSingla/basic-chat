<template>
<div style="overflow-x: hidden;">
  <div class="progress" style="position: absolute; top: 0px" :style="{display: displayLoader}">
      <div class="indeterminate"></div>
  </div>
<div class="container" id="body-wrapper">
  <div class="col s12 ">
    <h2 class="header">Groups</h2>
    <ul id="staggered-group-list">
      <group-box v-for="(group, index) in groupList" :key="index" :groupName="group.name" :groupID="group._id"></group-box>
    </ul>
  </div>
  </div>

  <!-- ADD GROUP MODAL -->
  <div id="modal1" class="modal" style="padding : 5px;">
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
      <a class="waves-effect waves-light btn">CREATE</a>
    </form>
  </div>
  </div>

  <!-- LOGOUT MODAL -->
  <div id="modal2" class="modal">
    <div class="modal-content">
      <h4>Confirmation</h4>
      <p>Are you sure you want to logout?</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat" @click="logout()">Yes</a>
      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">No</a>
    </div>
  </div>

   <div class="fixed-action-btn click-to-toggle">
  <a class="btn-floating btn-large purple">
    <i class="large material-icons">menu</i>
  </a>
  <ul>
    <li><a class="btn-floating red modal-trigger" href="#modal2"><i class="material-icons">exit_to_app</i></a></li>
    <li><a class="btn-floating blue"><i class="material-icons">add</i></a></li>
    <li><a class="btn-floating green modal-trigger" href="#modal1"><i class="material-icons">create</i></a></li>
  </ul>
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
        displayLoader: 'block',
      }
    },
    mounted(){
      console.log('Mounted the dom');
      $('.modal').modal();
      // $('.modal-trigger').leanModal(); // setTimeout(() => Materialize.showStaggeredList('#staggered-group-list'), 1 );
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
        }).then(() => {
          Materialize.showStaggeredList('#staggered-group-list')
          this.displayLoader = 'none';
        });
        // setTimeout(() => console.log(that.groupList[0].name), 1000);
      }, 
      logout(){
        try{
          localStorage.removeItem(CONFIG.LOCALSTORAGE_PATH);
        }catch(e){

        }finally{
          this.$router.push('/');
        }
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