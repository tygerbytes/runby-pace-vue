<template>
  <div class="runby">

  <div class="jumbotron">
    <h1 class="display-4">Runby&#x1F3C3;Pace</h1>
    <p class="lead"><em>When running gets really personal</em></p>
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
            <input class="form-control"
                   type="text"
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
              <!-- TODO: Use loop to build options -->
              <option value="DistanceRun">Distance Run</option>
              <option value="EasyRun">Easy Run</option>
              <option value="FastTempoRun">Fast Tempo Run</option>
              <option value="FiveKilometerRaceRun">5K Race Pace</option>
              <option value="LongRun">Long Run</option>
              <option value="MileRaceRun">Mile Race Pace</option>
              <option value="SlowTempoRun">Slow Tempo Run</option>
              <option value="TempoRun">Tempo Run</option>
              <option value="TenKilometerRaceRun">10K Race Pace</option>
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
      runType: this.getRunType(this.runTypeDefault),
    };
  },
  props: {
    fiveKmRaceTimeDefault: String,
    runTypeDefault: String,
  },
  computed: {
    missingRaceTime() {
      return this.submitted && this.fiveKmRaceTime === '';
    },
    invalidRaceTime() {
      return this.missingRaceTime ||
       (this.submitted && !this.validTime(this.fiveKmRaceTime));
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
    isTimeObject(time) {
      return Object.prototype.hasOwnProperty.call(time, 'totalMinutes');
    },
    validTime(time) {
      return this.isTimeObject(time) ||
        Number(time) ||
        (time && time.match(/^(\d?\d:\d\d|\d*\.?\d+)$/g));
    },
    parseTime(time) {
      if (this.isTimeObject(time)) {
        return time;
      }
      if (!this.validTime(time)) {
        return '';
      }
      let minutes = 0;
      let seconds = 0;
      if (Number(time)) {
        // Convert from a decimal
        minutes = Math.trunc(time);
        seconds = Math.round((time - minutes) * 60);
        if (seconds === 60) {
          minutes += 1;
          seconds = 0;
        }
      } else {
        // Parse as a string
        const parts = time.split(':');
        // TODO: Make more robust
        minutes = parseInt(parts[0], 10);
        seconds = parseInt(parts[1], 10);
      }
      return {
        totalMinutes: minutes + (seconds / 60.0),
        toString: () => `${minutes}:${(seconds.toString()).padStart(2, '0')}`,
      };
    },
    getRunType(runTypeName) {
      const runTypes = {
        DistanceRun: {
          code: 'DistanceRun',
          name: 'Distance run',
          description: 'Most of your weekly training should be comprised of Distance Runs. ' +
            'They are faster than easy runs, but you should still be able to carry on a conversation.',
          calcPace: (fiveKmTime) => {
            const fast = this.getPaceCalculator('03:44', '09:58', 3.675);
            const slow = this.getPaceCalculator('04:17', '11:10', 2.175);
            return `${fast.calc(fiveKmTime)}-${slow.calc(fiveKmTime)} p/mi`;
          },
        },
        EasyRun: {
          code: 'EasyRun',
          name: 'Easy run',
          description: 'Also called a recovery run, the easy run is harder than jogging, ' +
            'but you should still be able to carry on a conversation.',
          calcPace: (fiveKmTime) => {
            const fast = this.getPaceCalculator('04:17', '11:08', 1.99);
            const slow = this.getPaceCalculator('05:01', '12:39', 1.35);
            return `${fast.calc(fiveKmTime)}-${slow.calc(fiveKmTime)} p/mi`;
          },
        },
        TempoRun: {
          code: 'TempoRun',
          name: 'Tempo run',
          description: 'Ran at a comfortably hard pace that you could maintain for about an ' +
            'hour, if pressed. However, tempo runs are interval workouts, so you won\'t run for ' +
            'longer than 15-40 minutes per repetition',
          calcPace: (fiveKmTime) => {
            const fast = this.getPaceCalculator('03:07', '08:35', 4.025);
            const slow = this.getPaceCalculator('03:18', '08:59', 3.725);
            return `${fast.calc(fiveKmTime)}-${slow.calc(fiveKmTime)} p/mi`;
          },
        },
        FastTempoRun: {
          code: 'FastTempoRun',
          name: 'Fast tempo run',
          description: 'The fast tempo run is an interval workout of 15-25 minutes ' +
            'per repetition. The pace roughly corresponds to that of your half-marathon race pace.',
          calcPace: (fiveKmTime) => {
            const fast = this.getPaceCalculator('03:07', '08:35', 4.025);
            return `${fast.calc(fiveKmTime)} p/mi`;
          },
        },
        SlowTempoRun: {
          code: 'SlowTempoRun',
          name: 'Slow tempo run',
          description: 'The slow tempo run is an interval workout of 20-40 minutes per ' +
            'repetition. The pace roughly corresponds to that of your marathon race pace.',
          calcPace: (fiveKmTime) => {
            const slow = this.getPaceCalculator('03:18', '08:59', 3.725);
            return `${slow.calc(fiveKmTime)} p/mi`;
          },
        },
        LongRun: {
          code: 'LongRun',
          name: 'Long run',
          description: 'For many runners, the long run is the favorite run of the week. ' +
            'It is usually only ran once per week, and accounts for 20-25% of your weekly ' +
            'training volume. Remember that it\'s not a race. It should remain comfortable.',
          calcPace: (fiveKmTime) => {
            const fast = this.getPaceCalculator('04:00', '10:32', 2.125);
            const slow = this.getPaceCalculator('04:39', '11:53', 1.55);
            return `${fast.calc(fiveKmTime)}-${slow.calc(fiveKmTime)} p/mi`;
          },
        },
        FiveKilometerRaceRun: {
          code: 'FiveKilometerRaceRun',
          name: '5K race pace',
          description: 'The 5K race (~3.1 miles) is an excellent gauge of overall fitness. ' +
            'Running repetitions of varying duration at 5K race pace can boost stroke volume, ' +
            'blood volume, mitochondrial and capillary density, etc.',
          calcPace: (fiveKmTime) => {
            const pacePerMile = (this.parseTime(fiveKmTime).totalMinutes / (5 / this.unit('mi').conversionFactor));
            return `${this.parseTime(pacePerMile)} p/mi`;
          },
        },
        MileRaceRun: {
          code: 'MileRaceRun',
          name: 'Mile race pace',
          description: 'Repetitions run at a pace you would use to race one mile can ' +
            'increase the stroke volume of your heart, strengthen your lungs, increase ' +
            'the number of capillaries around your intermediate and fast twitch fibers, ' +
            'and increase mitochondrial densities around the same.',
          calcPace: (fiveKmTime) => {
            const fiveKmRaceTime = this.parseTime(fiveKmTime);
            const mileTimeMinutes = this.predictRaceTime(5, fiveKmRaceTime.totalMinutes, this.unit('mi').conversionFactor);
            return `${this.parseTime(mileTimeMinutes)} p/mi`;
          },
        },
        TenKilometerRaceRun: {
          code: 'TenKilometerRaceRun',
          name: '10K race pace',
          description: 'Repetitions ran at 10K race pace (10 km is about 6.2 miles) are ' +
            'like 5K pace repetitions, but less intense. They elicit many of the same ' +
            'benefits and help increase speed in races from the 10K to the half-marathon.',
          calcPace: (fiveKmTime) => {
            const fiveKmRaceTime = this.parseTime(fiveKmTime);
            const tenKmRaceTimeMinutes = this.predictRaceTime(5, fiveKmRaceTime.totalMinutes, 10);
            const pacePerMile = tenKmRaceTimeMinutes / (10 / this.unit('mi').conversionFactor);
            return `${this.parseTime(pacePerMile)} p/mi`;
          },
        },
      };
      return runTypes[runTypeName];
    },
    changeRunType() {
      this.runType = this.getRunType(this.runTypeOption);
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
</style>
