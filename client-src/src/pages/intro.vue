<template>
<div id="intro-wrapper">
<!-- <h1>CHATTERBOX</h1> -->
        <div id="body-wrapper" class="valign-wrapper ">
            <div class="row" >
                <ul class="tabs tabs-fixed-width tab-demo z-depth-1 col s10" >
                    <li class="tab col s3"><a href="#login">Login</a></li>
                    <li class="tab col s3"><a href="#register">Register</a></li>
                </ul>
            </div>
            <div id="login">
                <div class="input-field col s12 center-align">
                    <label for="last_name">Nick</label>
                    <input id="last_name" type="text" class="validate" v-model="logNick">
                </div>
                <div class="input-field col s12 center-align">
                    <label for="password">Password</label>
                    <input id="password" class="validate" type="password" v-model="logPass">
                </div>
                <button class="btn waves-effect waves-light" type="submit" name="action" 
                        @click="login"
                        :disabled="logDisabled">LOGIN
                </button>
            </div>

            <div id="register">
                <div class="input-field col s12 center-align">
                    <label for="reg-nick">Nick</label>
                    <input id="reg-nick" type="text" class="validate" required v-model="regNick">
                </div>
                <div class="input-field col s12 center-align">
                    <label for="reg-pass">Password</label>
                    <input id="reg-pass" class="validate" type="password" required v-model="regPass">
                </div>
                <div class="input-field col s12 center-align">
                   <label for="reg-confim-pass">Confirm password</label>
                    <input id="reg-confirm-pass" class="validate" type="password" required v-model="regConfirmPass">
                </div>
                <button class="btn waves-effect waves-light" type="submit" name="action" 
                        @click="register"
                        :disabled="regDisabled">REGISTER
                    <i class="material-icons right">send</i>
                </button>
            </div>
</div>  
</div>  
</template>

<script>
import axios from 'axios'; 

import CONFIG from '../config';

import 'materialize-css/dist/css/materialize.min.css';
import $ from 'jquery/dist/jquery.js';
// import Materialie from 'materialize-css/dist/js/materialize.js';

export default {
    data(){
        return {
            regNick : '', 
            regPass : '', 
            regConfirmPass : '',
            logNick: '',
            logPass: '',
            regDisabled : false, 
            logDisabled : false, 
            toast : undefined
        }
    },
    methods : {
        register(event){
            event.preventDefault();
            if(this.regPass === '' && this.regConfirmPass === '') {
                if(this.toast) this.toast.remove();
                this.toast = Materialize.toast('Please fill out the password', 4000);
                return;
            }

            if (this.regPass !== this.regConfirmPass){ 
                if(this.toast) this.toast.remove();
                this.toast = Materialize.toast('The passwords entered donot match', 4000);
                return; 
            }
            const that = this;
            this.regDisabled = true;

            axios.request({
                url : `${CONFIG.API_URI}/register`, 
                method : 'post',
                data : {nick : that.regNick, password: that.regPass}, 
                headers : {
                    'Access-Control-Allow-Origin' : '*'
                }
            }).then(response => {
                this.regDisabled = false;
                const data = response.data;
                if(this.toast) this.toast.remove();
                this.toast = Materialize.toast(data.message, 4000);
                if(data.code === 'reg0'){
                    this.regNick = ''; 
                    this.regPass = '';
                    this.regConfirmPass = '';
                    this.tabOpened = 'login';
                    this.logNick = data.data.nick;

                }
            }).catch(err => {
                this.regDisabled = false;
                if(this.toast) this.toast.remove();
                this.toast = Materialize.toast('Unable to send the request to the server', 4000);
                console.log(err);
            });
        }, 

        login(event){
            event.preventDefault();
            if(this.logNick === '' || this.logPass === ''){
                // const toastElement = document.querySelector('.toast');
                // const toastInstance = Materialize.Toast.getInstance(toastElement);
                // toastInstance.dismiss();
                if(this.toast) this.toast.remove();
                this.toast = Materialize.toast('Please enter the credentials', 4000);
                return;
            }
            else {
                this.logDisabled = true;
                const that = this;
                axios.request({
                    url : `${CONFIG.API_URI}/login`, 
                    method : 'post', 
                    data : {nick : that.logNick, password : that.logPass}, 
                    headers : {
                        'Access-Control-Allow-Origin' : '*'
                    }
                }).then(response => {
                    this.logDisabled = false;
                    const data = response.data; 
                    if(data.code === 'log0'){
                        //console.log(data);
                        console.log(data.data.token);
                        localStorage.setItem(CONFIG.LOCALSTORAGE_PATH, data.data.token);
                        this.$router.push('home');
                    }else{
                        if(this.toast) this.toast.remove();
                        this.toast = Materialize.toast(data.message, 4000);
                    }
                }).catch(err => {
                    this.logDisabled = false;
                    if(this.toast) this.toast.remove();
                    Materialize.toast('Unable to send the request to the server', 4000);
                });
            }
        }

    },
    mounted(){
        // let heading = document.getElementsByTagName('h1')[0];
        // heading.style.left = (document.documentElement.clientWidth - heading.getBoundingClientRect().width)/2 + "px";
        // window.onresize = function(){
            // heading.style.left = (document.documentElement.clientWidth - heading.getBoundingClientRect().width)/2 + "px";
        // }
        this.$router.push('/');
        $('.collapsible').collapsible();
        $('ul .tabs').tabs();
        $('#login').click(ev => false);
        $('#register').click(ev => false);

    }
}
</script>

<style scoped>
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
ul{
    width: 210px !important;
    overflow: hidden !important;
}
li > a{
    font-size: 9.5px !important;
}

#login, #register {
    display: flex;
    flex-direction: column;
}

</style>


