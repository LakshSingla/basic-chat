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

  <!-- CREATE GROUP MODAL -->
  <div id="modal1" class="modal" style="padding : 5px; padding-top: 20px;">
    <div class="row">
    <form class="col s12">
      <div class="row">
        <h4>Create Group</h4>
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
  <div id="modal3" class="modal">
    <div class="modal-content">
      <h4>Confirmation</h4>
      <p>Are you sure you want to logout?</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat" @click="logout()">Yes</a>
      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">No</a>
    </div>
  </div>

  <!-- JOIN GROUP MODAL -->
  <div id="modal2" class="modal">
    <div class="modal-content">
      <h4>Join Group</h4>
      <p>A bunch of text</p>
       <ul class="collapsible">
    <li>
      <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
      <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
      <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div>
      <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
    </li>
  </ul>
    </div>
    <!-- <div class="modal-footer"> -->
      <!-- <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a> -->
    <!-- </div> -->
  </div>

   <div class="fixed-action-btn click-to-toggle">
  <a class="btn-floating btn-large purple">
    <i class="large material-icons">menu</i>
  </a>
  <ul>
    <li><a class="btn-floating red modal-trigger" href="#modal3"><i class="material-icons">exit_to_app</i></a></li>
    <li><a class="btn-floating blue btn modal-trigger" href="#modal2"><i class="material-icons">add</i></a></li>
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
        allGroups :[
        {
            "_id": "5afd7f3f1df5c35ae624648a",
            "name": "Test",
            "noOfUsers": 1
        },
        {
            "_id": "5afd82b14b83565ce67c55ba",
            "name": "Test2",
            "noOfUsers": 1
        },
        {
            "_id": "5afd964ff027476733ab623b",
            "name": "Test3",
            "noOfUsers": 1
        },
        {
            "_id": "5afd9666f027476733ab623c",
            "name": "Test4",
            "noOfUsers": 1
        },
        {
            "_id": "5afda192860ec26a30edc827",
            "name": "Test5",
            "noOfUsers": 1
        },
        {
            "_id": "5b011546628aea6532729166",
            "name": "Test6",
            "noOfUsers": 1
        },
        {
            "_id": "5b0115d3b949e3659db76718",
            "name": "Test7",
            "noOfUsers": 1
        },
        {
            "_id": "5b01378a11915073be89b75a",
            "name": "Test8",
            "noOfUsers": 1
        },
        {
            "_id": "5b0175f211915073be89b75b",
            "name": "Test9",
            "noOfUsers": 1
        }
        ]
      }
    },
    mounted(){
      console.log('Mounted the dom');
      $('.modal').modal();
      $('.collapsible').collapsible();
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