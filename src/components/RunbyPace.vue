<template>
  <div class="runby">
  <div class="jumbotron">
    <h1 class="display-5">How hard should you run today?</h1>
    <hr class="my-4"/>
    <p class="lead"><em>Find out below. Have fun.</em></p>
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
              <option v-for="run in lib.runTypes" v-bind:value="run.code" v-bind:key="run.Code">
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
  beforeCreate() {
    this.lib = this.$store.state.RunbyLib;
    this.defaults = {
      fiveKmRaceTime: localStorage.fiveKmRaceTime || '',
      runTypeOption: localStorage.runTypeOption || 'DistanceRun',
    };
  },
  data() {
    return {
      submitted: false,
      fiveKmRaceTime: this.defaults.fiveKmRaceTime,
      runTypeOption: this.defaults.runTypeOption,
      runType: this.lib.getRunType(this.defaults.runTypeOption),
    };
  },
  computed: {
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
    persist() {
      localStorage.fiveKmRaceTime = this.fiveKmRaceTime;
      localStorage.runTypeOption = this.runTypeOption;
    },
    getMyPace() {
      this.submitted = true;
      if (!(this.formValid)) {
        return;
      }
      this.persist();
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
