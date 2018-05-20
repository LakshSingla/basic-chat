<template>
<div>
<div class="container" id="body-wrapper">
  <div class="col s12 ">
    <h2 class="header">Groups</h2>
    <ul id="staggered-group-list">
        <li class="staggered-group-item">
            <div class="card waves-effect waves-teal">
              <div class="card-stacked waves-effect waves-purple">
                <div class="card-content waves-effect waves-purple">
                  <p>I am a very simple card. I am good at containing small bits of information.</p>
                </div>
              </div>
            </div>
            </li>
            <group-box></group-box>
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

import CONFIG from '../config';
import groupBox from '../components/group-box';

export default {
    mounted(){
        Materialize.showStaggeredList('#staggered-group-list');
    }, 
    components : {
      'group-box' : groupBox,
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


