<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header elevated class="q-py-sm q-pl-md bg-darkBlue-pv">
      <q-img
        src="../statics/logo-pvmz-348.png"
        style="max-height: 50px; max-width: 50px"
        class="fixed-top-left q-mt-sm q-ml-xs"
      />
      <span class="text-h3 text-bold q-ml-xl">Portal da Hora Silenciosa</span>
      <q-btn class="fixed-top-right q-mt-sm q-mr-xl q-px-sm" push size="lg" color="info" @click="exit" v-show="this.$route.name != 'login'">Sair</q-btn>
    </q-header>

    <q-page-container class="bg-white">
      <router-view />
    </q-page-container>

    <q-footer class="q-pl-sm text-body1 bg-darkBlue-pv">
      Palavra da Vida Moçambique, todos os direitos reservados.
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  methods: {
    exit () {
      this.$q.sessionStorage.remove('apiKey')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
