<template>
  <q-page class="flex flex-center">
    <q-form
      @submit="login"
      class="bg-darkBlue-pv q-px-xl q-py-md rounded-borders text-white"
    >
      <q-img
        src="../statics/logo-pvmz-348.png"
        style="max-height: 218px; max-width: 218px"
      />

      <q-space />

      <div class="text-h2 text-bold text-center">Login</div>

      <div class="q-gutter-xs">
        <q-input
          v-model="name"
          type="text"
          label="Nome"
          label-color="white"
          :rules="[ val => !!val ]"
        />

        <q-input
          v-model="pass"
          type="password"
          label="Senha"
          label-color="white"
          :rules="[ val => !!val ]"
        />
      </div>

      <q-btn class="full-width q-mt-md" color="primary" type="submit" label="Entrar"></q-btn>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      name: '',
      pass: ''
    }
  },
  methods: {
    login () {
      const urlBase = 'https://pvmzapp.tech/api_dev/public'
      // const urlBase = 'http://localhost:8081'
      this.$axios.post(urlBase + '/users-auth', { name: this.name, password: this.pass, missionary: true })
        .then(res => {
          if (res.data.apiKey !== undefined) {
            this.$q.sessionStorage.set('apiKey', res.data.apiKey)
            this.$q.sessionStorage.set('user', res.data.user)
            this.$router.push({ name: 'main' })
          } else {
            this.$q.notify({
              message: 'Usuário ou senha inválidos.',
              color: 'red',
              timeout: 1000
            })

            console.log(res.data)
          }
        })
        .catch(err => {
          this.$q.notify({
            message: 'Ocorreu um erro no processo de autenticação.',
            color: 'red',
            timeout: 1000
          })

          console.log(err)
        })
    }
  }
}
</script>
