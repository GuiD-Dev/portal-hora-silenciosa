<template>
  <q-card class="q-pa-sm q-mx-xl q-my-md text-h6 bg-blue-grey-2">
    <q-card-section>
      <div class="text-h4 text-bold"> {{ user.name }} </div>

      <!-- <q-icon name="check" class="absolute-top-right text-h1 text-bold" color="positive" v-show="user.filled" /> -->
    </q-card-section>

    <q-card-actions>
      <q-btn push label="Editar" color="primary" @click="to" />
      <q-btn push label="Apagar" color="negative" @click="show = true" />
    </q-card-actions>

    <q-dialog v-model="show">
      <CustomDialog :msg="`Tem certeza que deseja excluir o usuário ${user.name}?`" :deleteFn="delUser" />
    </q-dialog>
  </q-card>
</template>

<script>
import CustomDialog from 'components/CustomDialog'
import axios from 'axios'

export default {
  name: 'UserItem',
  components: { CustomDialog },
  props: {
    user: {
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
    to () {
      this.$router.push({ name: `${(this.user.missionary ? 'missionaries' : 'users')}-form`, params: { user: this.user } })
    },
    delUser () {
      const urlBase = 'https://pvmzapp.tech/api_dev/public'
      // const urlBase = 'http://localhost:8081'
      const userId = this.$q.sessionStorage.getItem('user').id
      const key = this.$q.sessionStorage.getItem('apiKey')
      axios.delete(urlBase + `/users/${userId}/${this.user.id}`, {
        headers: {
          'Api-Key': key
        }
      })
        .then(res => {
          console.log(res.data)

          this.$q.notify({
            message: 'Usuário removido.',
            color: 'green',
            timeout: 1000
          })

          this.removeFn(this.user.id)
        })
        .catch(err => {
          this.$q.notify({
            message: 'Erro ao remover o usuário.',
            color: 'red',
            timeout: 1000
          })

          console.log(err)
        })
    }
  }
}
</script>
