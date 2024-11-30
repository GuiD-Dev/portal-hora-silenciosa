<template>
  <q-card>
    <q-card-section class="bg-black-pv q-pa-none">
      <div class="text-h5 text-center text-white">Atenção</div>
    </q-card-section>

    <q-card-section class="q-pt-md text-body1">
      {{ msg }}
    </q-card-section>

    <q-card-actions align="right">
      <q-btn label="Sim" color="primary" v-close-popup @click="del" />
      <q-btn label="Cancelar" color="negative" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'CustomDialog',
  props: ['msg', 'deleteFn'],
  methods: {
    del () {
      this.deleteFn()
    }
  }
}
</script>
