<template>
  <div class="dashboard-container">
    <div class='dashboard-text'>这是一个看板，这里可以放任何你需要放的东西。现在只放了用户名。</div>
    <div class='dashboard-text'>你是谁:{{name}}</div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
      name: 'dashboard',
      computed: {
        ...mapGetters([
          'name'
        ])
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
