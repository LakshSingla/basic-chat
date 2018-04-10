<template>
<div id="intro-wrapper">
<h1>CHATTERBOX</h1>
        <div id="body-wrapper" class="valign-wrapper ">
            <div class="row" >
                <ul class="tabs tabs-fixed-width tab-demo z-depth-1 col s10" >
                    <li class="tab col s3"><a href="#login">Login</a></li>
                    <li class="tab col s3"><a class="active" href="#register">Register</a></li>
                </ul>
            </div>
            <div id="login">
                <div class="input-field col s12 center-align">
                    <label for="last_name">Nick</label>
                    <input id="last_name" type="text" class="validate">
                </div>
                <div class="input-field col s12 center-align">
                    <label for="password">Password</label>
                    <input id="password" class="validate" type="password">
                </div>
                <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i class="material-icons right">send</i>
                </button>
            </div>
            <div id="register">
                <div class="input-field col s12 center-align">
                    <label for="last_name">Nick</label>
                    <input id="last_name" type="text" class="validate">
                </div>
                <div class="input-field col s12 center-align">
                    <label for="password">Password</label>
                    <input id="password" class="validate" type="password">
                </div>
                <div class="input-field col s12 center-align">
                    <label for="password">Password</label>
                    <input id="password" class="validate" type="password">
                </div>
                <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i class="material-icons right">send</i>
                </button>
            </div>
</div>  
</div>  
</template>

<script>
export default {
  
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

</style>


