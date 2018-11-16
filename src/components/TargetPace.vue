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
      runType: this.getRunType(this.runTypeCode),
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
    predictRaceTime(race1DistanceKm, race1TotalMinutes, targetDistanceKm) {
      const targetRaceTotalMinutes = race1TotalMinutes
         * ((targetDistanceKm / race1DistanceKm) ** 1.06);
      return targetRaceTotalMinutes;
    },
    getPaceCalculator(fastestPaceKm, slowestPaceKm, midpointRadiusDivisor) {
      const MIDPOINT_X = 28;
      const DATA_POINTS_COUNT = 57;
      const fastestSupportedPaceKm = this.parseTime(fastestPaceKm);
      const slowestSupportedPaceKm = this.parseTime(slowestPaceKm);
      function calculateSlope() {
        return (slowestSupportedPaceKm.totalMinutes - fastestSupportedPaceKm.totalMinutes)
                / (DATA_POINTS_COUNT - 1);
      }
      function curveMinutes(xAxis) {
        let midpointReduction = xAxis;
        if (midpointReduction > MIDPOINT_X) {
          midpointReduction = MIDPOINT_X - (midpointReduction - MIDPOINT_X);
          if (midpointReduction < 0) {
            midpointReduction = 0;
          }
        }
        return midpointReduction / midpointRadiusDivisor / 60;
      }
      return {
        calc: (fiveKmRaceTime) => {
          const fiveKmTime = this.parseTime(fiveKmRaceTime);
          const x2 = ((fiveKmTime.totalMinutes * 2) - (MIDPOINT_X - 1)) - 1;
          const minutesPerKm = fastestSupportedPaceKm.totalMinutes
                               + (calculateSlope() * x2)
                               + curveMinutes(x2);
          // TODO: Handle both Km and miles
          const minutesPerMile = minutesPerKm * this.unit('mi').conversionFactor;
          return this.parseTime(minutesPerMile);
        },
      };
    },
    unit(unitName) {
      const units = {
        km: {
          conversionFactor: 1.0,
        },
        m: {
          conversionFactor: 0.001,
        },
        mi: {
          conversionFactor: 1.609344,
        },
        ft: {
          conversionFactor: 0.0003048,
        },
        yd: {
          conversionFactor: 1093.61,
        },
        marathon: {
          conversionFactor: 42.1648128,
        },
      };
      return units[unitName];
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
  },
};
</script>

<style scoped>
</style>
