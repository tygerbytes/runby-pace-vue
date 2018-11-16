<template>
  <div class="runby">

  <div class="jumbotron">
    <h1 class="display-4">Runby&#x1F3C3;Pace</h1>
    <p class="lead"><em>Where running gets really personal</em></p>
    <hr class="my-4"/>
    <p>How hard should you run today? Use the form below to find out.</p>
  </div>

  <div class="row marketing">
    <div class="col-md-12">
      <form @submit.prevent="getMyPace()">
        <div class="form-group">
          <label for="five_k_time"
                 class="col-form-label-lg pb-0">I can run a 5K in:</label>
          <div class="input-group input-group-lg mb-1">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">&#x23f1;</span>
            </div>
            <input type="text"
                   v-model="fiveKmRaceTime"
                   v-bind:class="{
                     'form-control': true,
                     'is-invalid': this.invalidRaceTime }"
                   placeholder="A recent 5K race time, like 21:30" />
            <div class="invalid-feedback">{{ this.raceTimeValidationMessage }}</div>
          </div>
          <div class="text-muted">
            Your finishing time for a recent race is an excellent indicator of your VO2 Max
            and overall fitness. This helps us prescribe the right paces for your unique body.
          </div>

        </div>
        <div class="form-group">
          <label for="run_type"
                 class="col-form-label-lg pb-0">Today, I plan on running:</label>
          <div class="input-group input-group-lg mb-1">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon2">&#x2764;</span>
            </div>
            <select name="run_type"
                @change="changeRunType()"
                class="form-control"
                v-model="runTypeOption">
              <option v-for="run in runTypes" v-bind:value="run.code" v-bind:key="run.Code">
                {{ run.name }}
              </option>
            </select>
          </div>
          <div class="text-muted">{{ this.runType.description }}</div>
        </div>
        <div class="form-group text-center">
          <input type="submit"
                 value="Get my pace"
                 class="btn btn-primary btn-block btn-lg" />
        </div>
      </form>
    </div>
  </div>
  </div>

</template>

<script>
export default {
  name: 'RunbyPace',
  data() {
    return {
      submitted: false,
      fiveKmRaceTime: this.fiveKmRaceTimeDefault,
      runTypeOption: this.runTypeDefault,
      runType: this.$store.state.RunbyLib.getRunType(this.runTypeDefault),
      runTypes: this.$store.state.RunbyLib.runTypes,
    };
  },
  props: {
    fiveKmRaceTimeDefault: String,
    runTypeDefault: String,
  },
  computed: {
    lib() {
      return this.$store.state.RunbyLib;
    },
    missingRaceTime() {
      return this.submitted && this.fiveKmRaceTime === '';
    },
    invalidRaceTime() {
      return this.missingRaceTime ||
       (this.submitted && !this.lib.validTime(this.fiveKmRaceTime));
    },
    raceTimeValidationMessage() {
      if (this.missingRaceTime) {
        return 'Don\'t forget your 5K race time';
      }
      if (this.invalidRaceTime) {
        return `'${this.fiveKmRaceTime}' is not a valid race time. Try 21:44.`;
      }
      return '5K Valid';
    },
    formValid() {
      return !(
        this.missingRaceTime ||
        this.invalidRaceTime);
    },
  },
  methods: {
    changeRunType() {
      this.runType = this.lib.getRunType(this.runTypeOption);
    },
    getMyPace() {
      this.submitted = true;
      if (!(this.formValid)) {
        return;
      }
      this.$router.push({
        name: 'targetPace',
        params: {
          fiveKmRaceTime: this.fiveKmRaceTime,
          runTypeCode: this.runTypeOption,
        },
      });
    },
  },
};
</script>

<style scoped>
  ::placeholder {
    font-style: italic;
    font-size: 1rem;
    color: lightgray;
  }
</style>
