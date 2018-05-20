<template>
<li class="staggered-group-item">
    <div class="card waves-effect waves-teal">
        <div class="card-stacked waves-effect waves-purple">
            <div class="card-content waves-effect waves-purple">
               {{ groupName }}
            </div>
        </div>
    </div>
</li>
</template>

<script>
export default {
    props: ['groupName', 'groupID']
}
</script>

<style scoped>

</style>