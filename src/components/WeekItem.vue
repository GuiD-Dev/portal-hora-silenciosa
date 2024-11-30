<template>
  <q-card class="q-pa-sm q-mx-xl q-my-md text-h6 bg-blue-grey-2">
    <q-card-section>
      <div class="text-h4 text-bold"> Semana {{ week.number }} - {{ week.title }} </div>
      <div class="text-h5"> {{ week.verse_reference }} </div>
      <div class="q-mb-sm"> {{ week.verse_text }} </div>

      <q-badge v-for="(verse,i) in week.verses" :key="i" class="text-body1 text-weight-bolder q-mr-sm" color="secondary"> {{ verse.reference }} </q-badge>

      <!-- <q-icon name="check" class="absolute-top-right text-h1 text-bold" color="positive" v-show="week.filled" /> -->
    </q-card-section>

    <q-card-actions>
      <q-btn label="Editar" color="primary" push :to="{ name: 'weeks-form', params: { week: week } }" />
      <q-btn label="Apagar" color="negative" push @click="show = true" />
    </q-card-actions>

    <q-dialog v-model="show">
      <CustomDialog :msg="`Tem certeza que deseja excluir a semana ${week.number}?`" :deleteFn="delWeek" />
    </q-dialog>
  </q-card>
</template>

<script>
import CustomDialog from 'components/CustomDialog'
import axios from 'axios'

export default {
  name: 'WeekItem',
  components: { CustomDialog },
  props: {
    week: {
      type: Object,
      required: true
    },
    removeFn: Function
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    delWeek () {
      const urlBase = 'https://pvmzapp.tech/api_dev/public'
      // const urlBase = 'http://localhost:8081'
      const key = this.$q.sessionStorage.getItem('apiKey')
      axios.delete(urlBase + `/weeks/${this.week.id}`, {
        headers: {
          'Api-Key': key
        }
      })
        .then(res => {
          this.$q.notify({
            message: 'Semana removida.',
            color: 'green'
          })

          this.removeFn(`${this.week.year}${this.week.number}`)
        })
        .catch(err => {
          console.log(err)

          this.$q.notify({
            message: 'Erro ao remover a semana.',
            color: 'red'
          })
        })
    }
  }
}
</script>
