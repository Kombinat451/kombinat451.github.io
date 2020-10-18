<template>
  <b-container>
    <b-row id="headline" class="justify-content-center mt-4">
      <b-col cols="12" sm="12" md="8"  class="my-auto">
        <nuxt-link to="/">
          <h1 class="mb-0">Комбинат<small>451</small></h1>
        </nuxt-link>
        <b-navbar type="light" class="px-0">
          <b-navbar-nav>
            <b-nav-item href="/blog">Blog</b-nav-item>
            <b-nav-item href="/about">About</b-nav-item>
          </b-navbar-nav>
        </b-navbar>
      </b-col>
      <b-col cols="12" sm="12" md="4" class="sloth">
        <b-img width="90%" src="@/assets/sloth.svg" blank-color="black"/>
      </b-col>
    </b-row>

    <Nuxt />

  </b-container>
</template>

<style>
@font-face {
  font-family: "Rubik Mono One";
  src: local("Rubik Mono One"), url(~assets/RubikMonoOne-Regular.ttf) format("truetype");
}

h1 {
  font-family: monospace;
}

h2, h3, h4, p, a {
  font-family: sans-serif;
}

h2 {
  margin-top: 1em;
}

h3 {
  margin-top: 0.8em;
}

#headline  .sloth {
  text-align: center;
}

#headline h1 small {
  vertical-align: bottom;
}

#headline h1 {
  font-family: 'Rubik Mono One', sans-serif;
  color: rgb(33, 37, 41);
  font-size: 10vw;
}

@media (min-width: 500px) {
#headline h1 {
    font-size: 3.5em;
  }
  #headline  .sloth {
    text-align: right;
  }
}

article h1, .nuxt-content h1 {
  text-align: center;
}
</style>
