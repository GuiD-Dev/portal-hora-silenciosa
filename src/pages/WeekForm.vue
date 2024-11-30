<template>
  <q-page class="flex flex-center">
    <div class="rounded-borders bg-lightBlue-pv" style="width: 800px">
      <div class="bg-black-pv text-center text-white text-h3 shadow-3 q-py-sm">
        <q-btn round color="brown" @click="$router.push({ name: 'main' })">
          <q-icon name="arrow_back" />
        </q-btn>
        {{ week.id != 0 ? 'Editar Semana' : 'Nova Semana' }}
      </div>

      <q-form class="q-px-lg q-py-md" @submit="submit">
        <div class="row">
          <q-input class="col-1" label="Ano" bg-color="white" outlined v-model.number="year" readonly :rules="[ val => !!val ]" />
          <q-input class="col-2" label="Número" bg-color="white" outlined v-model.trim.number="week.number" :readonly="week.id!=0" :rules="[ val => !!val ]" />
          <q-input class="col-9" label="Título" bg-color="white" outlined v-model.trim="week.title" :rules="[ val => !!val ]" />
        </div>
        <q-input label="Versículo da Semana" bg-color="white" outlined v-model.trim="week.verse_reference" :rules="[ val => !!val ]" />
        <q-input label="Texto do Versículo" bg-color="white" outlined type="textarea" v-model.trim="week.verse_text" :rules="[ val => !!val ]" />

        <q-input class="full-width" bg-color="white" outlined dense placeholder="Domingo" v-model="week.verses[0].reference" :rules="[ val => !!val ]" />
        <q-input class="full-width" bg-color="white" outlined dense placeholder="Segunda" v-model="week.verses[1].reference" :rules="[ val => !!val ]" />
        <q-input class="full-width" bg-color="white" outlined dense placeholder="Terça" v-model="week.verses[2].reference" :rules="[ val => !!val ]" />
        <q-input class="full-width" bg-color="white" outlined dense placeholder="Quarta" v-model="week.verses[3].reference" :rules="[ val => !!val ]" />
        <q-input class="full-width" bg-color="white" outlined dense placeholder="Quinta" v-model="week.verses[4].reference" :rules="[ val => !!val ]" />
        <q-input class="full-width" bg-color="white" outlined dense placeholder="Sexta" v-model="week.verses[5].reference" :rules="[ val => !!val ]" />
        <q-input class="full-width" bg-color="white" outlined dense placeholder="Sábado" v-model="week.verses[6].reference" :rules="[ val => !!val ]" />

        <q-btn type="submit" label="Salvar" color="primary" />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'WeekForm',
  props: {
    week: {
      type: Object,
      default: () => {
        return {
          id: 0,
          number: '',
          title: '',
          verse_reference: '',
          verse_text: '',
          verses: [
            { id: 0, day_index: 0, reference: '', weeks_id: 0 },
            { id: 0, day_index: 1, reference: '', weeks_id: 0 },
            { id: 0, day_index: 2, reference: '', weeks_id: 0 },
            { id: 0, day_index: 3, reference: '', weeks_id: 0 },
            { id: 0, day_index: 4, reference: '', weeks_id: 0 },
            { id: 0, day_index: 5, reference: '', weeks_id: 0 },
            { id: 0, day_index: 6, reference: '', weeks_id: 0 }
          ]
        }
      }
    },
    year: {
      type: Number,
      default: new Date().getFullYear()
    }
  },
  methods: {
    submit () {
      this.week.year = this.year

      const urlBase = 'https://pvmzapp.tech/api_dev/public'
      // const urlBase = 'http://localhost:8081'
      const key = this.$q.sessionStorage.getItem('apiKey')
      const call = this.week.id === 0
        ? axios.post(urlBase + '/weeks', this.week, {
          headers: {
            'Api-Key': key
          }
        })
        : axios.put(urlBase + '/weeks', this.week, {
          headers: {
            'Api-Key': key
          }
        })

      call
        .then(res => {
          if (res.data) {
            this.$q.notify({
              message: 'Semana salva com sucesso.',
              color: 'green',
              timeout: 1000
            })

            this.$router.push({ name: 'main' })
          } else {
            this.$q.notify({
              message: 'Erro ao salvar semana.',
              color: 'red',
              timeout: 1000
            })
          }
        })
        .catch(err => {
          console.log(err)

          this.$q.notify({
            message: 'Erro ao salvar semana.',
            color: 'red',
            timeout: 1000
          })
        })
    }
  },
  beforeCreate () {
    if (this.$q.sessionStorage.getItem('apiKey') === null) {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
