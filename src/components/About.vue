<!-- /* eslint-disable */ -->
<template>
  <div class="about">
  <div class="jumbotron">
      <h1>About Runby Pace</h1>
      <p class="lead">What is this "Runby Pace" thing anyway? Can you eat it? And how do you pronounce it?</p>
    </div>

    <div class="row marketing">
      <div class="col-md-6">
        <div class="panel panel-info">
          <div class="panel-heading">
            <h2 class="panel-title">Contents</h2>
          </div>
          <div class="panel-body">
            <ul class="list-unstyled">
              <li><a href="#what_is_runby_pace">What is Runby Pace</a></li>
              <ul>
                <li><a href="#pronunciation">How do you pronounce "Runby"?</a></li>
                <li><a href="#etymology">What is the etymology of "Runby Pace"?</a></li>
              </ul>
              <li><a href="#why_created">Why I created Runby Pace</a></li>
              <ul>
                <li><a href="#build_your_running_body">A shout out to an inspiring running book</a></li>
              </ul>
              <li><a href="#development_status">Development status and the future of Runby Pace</a></li>
              <ul>
                <li><a href="#reporting_bugs">Reporting bugs</a></li>
              </ul>
              <li><a href="#donate">This is great! Can I buy you a beer?</a></li>
            </ul>
          </div>
        </div>

        <h2 id="what_is_runby_pace">What is Runby Pace?</h2>
        <p>Runby Pace is a Pace calculator for running. To use it,
          just enter your time for a recent 5K race, choose your desired type of run,
          and it will spit out the pace you should target (with your doctor's approval of course).
          You only have to enter your 5k time once; Runby Pace will remember it the next time you
          visit the app. Just don't forget to update your 5K time as you get faster!</p>

        <h3 id="pronunciation">How do you pronounce "Runby"?</h3>
        <p>"Runby" is pronounced like "rugby",
          or "run&middot;bee" if you aren't familiar with rugby.</p>

        <h2 id="why_created">Why I created Runby Pace</h2>
        <p>I code. I run. Running helps me write better code and just feel better in general.
          I even felt inspired to <a href="https://medium.com/@tygertec/run-for-better-code-c8d23338577c">write an
          entire article</a> on the subject of running and programming.</p>

        <p>A good running program incorporates runs at varying paces.
          Depending on your personal level of fitness, you might run at a pace of 10 minutes
          per mile during your weekly long run, but throw down a blistering 5:30 per mile while
          running track repeats.
          The difficult part is knowing which pace <em>you</em> should be running at.</p>

        <p>There are various pace tables that help you find your pace for a given type of run.
          Usually they center around a recent PR in a 5K or 10K race. There are fairly accurate
          mathematical formulae which
          <a href="http://www.hillrunner.com/calculators/raceconversion.php">predict your likely performance</a>
          in one distance based on your actual performance in another distance.
          These formulae are used to create these handy pace charts.</p>

        <p>The pace charts are immensely helpful. But... they are clunky and time-consuming. When I'm trying to run out the door at 5AM I need things to be as easy as possible. I wrote Runby Pace to fill that need.</p>

        <h3 id="build_your_running_body">A shout out to an inspiring running book</h3>
        <p>The book that taught me the most about running and got me started with more advanced pacing was <a href="http://amzn.to/2gKxHXG">Build Your Running Body, by Pete Magill</a>. I highly recommend it. For amateur runners like me, this could be the only running book you ever read.</p>


        <h2 id="development_status">Development status and the future of Runby Pace</h2>
        <p>Runby Pace is still under development. You've heard of Version 2.0? Runby Pace is something like Version 0.2. So expect a few bugs, incomplete features, as well as NEW features added periodically. (Ooh, exciting!)</p>
        <p>As I find the time I plan on creating mobile apps as well as an API to facilitate pace calculations the world over. I'm up for anything that streamlines that first step out the front door!</p>

        <h3 id="reporting_bugs">Reporting bugs</h3>
        <p>Did I mention Runby Pace was still in its infancy? :) There will be bugs, so feel free to report them. When reporting a bug, try to be specific as possible in describing the problem. Also, let me know if you're using the web app or one of the forthcoming mobile apps. I will respond as soon as I can, but it could take a while. I work on this for fun in my very limited free time.</p>

        <table class="table">
          <tr>
            <td>Twitter</td>
            <td><a href="https://twitter.com/runbypace">@runbypace</a></td>
          </tr>
          <tr>
            <td>Email</td>
            <td>runbypace at gmail dot com</td>
          </tr>
        </table>

        <h2 id="donate">This is great! Can I buy you a beer?</h2>
        <p>Though I don't drink much alcohol because of its negative impact on my training, I do find it hard to resist a fine red when paired with the right meal. ;) You can contribute to my efforts at <a href="https://paypal.me/tygerbytes/25">paypal.me/tygerbytes</a></p>

      </div>

      <div class="col-md-6">
          <figure>
            <img src="@/assets/half_marathon.jpg" class="img-fluid rounded" alt="Almost there! Ty toward the end of the Staten Island half marathon."/>
            <figcaption style="text-align: center">
              Slogging it close to the finish of a half-marathon.
            </figcaption>
          </figure>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
    };
  },
  props: {
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
