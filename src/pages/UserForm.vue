<template>
  <q-page class="flex flex-center">
    <div class="rounded-borders bg-lightBlue-pv" style="width: 600px">
      <div class="bg-black-pv text-center text-white text-h3 shadow-3 q-py-sm">
        <q-btn round color="brown" @click="$router.push({ name: 'main' })">
          <q-icon name="arrow_back" />
        </q-btn>
        {{ user.id != 0 ? 'Editar Usuário' : 'Novo Usuário' }}
      </div>

      <q-form class="q-px-lg q-py-md q-gutter-sm" @submit="submit">
        <q-input label="Nome" bg-color="white" outlined v-model.trim="user.name" :rules="[ val => !!val ]" />
        <q-input label="Senha" bg-color="white" outlined type="password" v-model="user.password" />
        <q-btn type="submit" label="Salvar" color="primary" />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserForm',
  props: {
    user: {
      type: Object,
      default: () => {
        return { id: 0, name: '', password: '', missionary: false, users_id: null }
      }
    }
  },
  methods: {
    submit () {
      this.user.missionary = this.$route.name === 'missionaries-form'
      const key = this.$q.sessionStorage.getItem('apiKey')
      const idUser = this.$q.sessionStorage.getItem('user').id
      const payload = { user: this.user, loggedUserId: idUser }

      const urlBase = 'https://pvmzapp.tech/api_dev/public'
      // const urlBase = 'http://localhost:8081'
      const call = this.user.id === 0
        ? axios.post(urlBase + '/users', payload, {
          headers: {
            'Api-Key': key
          }
        })
        : axios.put(urlBase + '/users', payload, {
          headers: {
            'Api-Key': key
          }
        })

      call
        .then(res => {
          this.$q.notify({
            message: 'Usuário salvo com sucesso.',
            color: 'green',
            timeout: 1000
          })
          console.log(res.data)
          this.$router.push({ name: 'main' })
        })
        .catch(err => {
          console.log(err)

          this.$q.notify({
            message: 'Erro ao salvar usuário.',
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
