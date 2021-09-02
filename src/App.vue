<template>
  <div id="app">
    <link rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
          integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
          crossorigin="anonymous">
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
  import Footer from './Footer';
  import Header from './Header';
  
  export default {
    name: "App",
    components: {
      'Footer' : Footer,
      'Header': Header
    }
  }
</script>

<style>
html,body {
  height:100%;
}
#app {
  position: relative;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#contenedor {
  width: 100%;
  background-color: transparent;
  padding-bottom: 60px;
  padding-top: 20px;
}
.centra {
  margin: auto;
  padding-top: 40px;
  padding-bottom: 40px;
}
.loader {
  position: fixed;
  top:0px;
  right:0px;
  width:100%;
  height:100%;
  background-color:#ffffff;
  background-image: url('assets/loader-spinner.gif');
  background-repeat:no-repeat;
  background-position:center;
  z-index:10000000;
  opacity: 0.4;
  filter: alpha(opacity=40);
}
</style>