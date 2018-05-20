<template>
<li class="staggered-group-item" >
    <div class="card waves-effect waves-teal width100" style="width: 100%; max-width: 750px;">
        <div class="card-stacked waves-effect waves-purple width100" style="display : flex; flex-direction: column justify-content : center">
            <a class="btn-floating btn-large waves-effect waves-light red leave-group"><i class="material-icons">add</i></a>
            <div class="card-content waves-effect waves-purple width100">
                This is just a test message
                {{ groupName }} : {{ groupID }}
            </div>
        </div>
    </div>
</li>
</template>

<script>
export default {
    props: ['groupName', 'groupID'], 
}
</script>

<style scoped>
.staggered-group-item{
    /* opacity: 1; */
}

.width100{
    width: 100%; 
    max-width: 750px;
}

.leave-group{
    position: absolute; 
    right: 5px;
}

</style>