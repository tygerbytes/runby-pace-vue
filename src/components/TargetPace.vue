<template>
<div class="runby">

  <div class="jumbotron">
    <p>To fully benefit from your <strong>{{ runType.name }}</strong>, your pace should be</p>
    <h1>{{ pace }}</h1>
  </div>

  <div class="col-lg-12">
    <p>Would you like to help make Runby Pace better?</p>
    <ul>
      <li>Suggest features: <a href="https://twitter.com/runbypace">@runbypace</a></li>
      <li>Donate: <a href="https://paypal.me/tygerbytes/5">paypal.me/tygerbytes</a></li>
    </ul>
  </div>

</div>
</template>

<script>
export default {
  name: 'TargetPace',
  data() {
    return {
      runType: this.$store.state.RunbyLib.getRunType(this.runTypeCode),
    };
  },
  props: {
    fiveKmRaceTime: String,
    runTypeCode: String,
  },
  computed: {
    pace() {
      return this.runType.calcPace(this.fiveKmRaceTime);
    },
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
