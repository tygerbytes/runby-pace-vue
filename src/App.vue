<template>
  <div id="app" class="container">

    <b-navbar fixed="bottom" toggleable="md" type="light" variant="light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Runby&#x1F3C3;Pace <small>Where running gets really personal</small></b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view/>

    <footer class="footer">
      <div class="container">
        <p class="text-muted">
          Runby Pace &copy; 2018 Ty Walls <a href="https://twitter.com/tygertec">@tygertec</a>
        </p>
      </div>
    </footer>

  </div>
</template>

<script>

export default {
  name: 'app',
};
</script>

<style>
  body {
    padding-top: 10px;
    padding-bottom: 70px;
  }

  .footer {
    padding-top: 19px;
    color: #777;
    border-top: 1px solid #e5e5e5;
  }

  .jumbotron {
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    padding-top: 1.75rem;
    padding-bottom: 1rem;
  }

  .navbar-brand {
    line-height: 1rem;
  }
  .navbar-brand small {
    display: block;
    font-size: 0.48rem;
  }

  @media (min-width: 768px) {
    .container {
      max-width: 730px;
    }
  }

  #app {
    /* Placeholder */
  }
</style>
