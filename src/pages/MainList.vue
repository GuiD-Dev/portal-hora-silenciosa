<template>
  <q-page class="bg-lightBlue-pv">
    <q-splitter separator-style="background-color: #00000000">

      <template v-slot:before>
        <q-tabs vertical v-model="tabVal">
          <q-tab name="weeks" icon="list" label="Semanas" />
          <q-tab name="missionaries" icon="supervisor_account" label="Administradores" />
          <q-tab name="users" icon="people" label="Usuários" />
        </q-tabs>
      </template>

      <template v-slot:after>

        <q-toolbar class="bg-black-pv q-py-sm shadow-4">
          <q-btn class="q-mr-lg q-px-md" color="brown" push :to="{ name: `${tabVal}-form`, params: { year: barSets.dropLabel } }">Novo Item</q-btn>

          <q-space />

          <q-btn-dropdown color="primary" class="q-mr-md" :label="barSets.dropLabel">
            <q-list>
              <q-item v-for="year in barSets.dropYears" :key="year" clickable v-close-popup @click="setYear(year)">
                <q-item-section>
                  <q-item-label>{{ year }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-input outlined bg-color="white" dense placeholder="Pesquisar" v-model="barSets.search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>

        <WeekItem v-for="week in filteredWeeks" :key="`${week.year}${week.number}`" :week="week" :removeFn="removeWeek" v-show="tabVal == 'weeks'" />
        <UserItem v-for="missionary in filteredMissionaries" :key="missionary.id" :user="missionary" :removeFn="removeUser" v-show="tabVal == 'missionaries'" />
        <UserItem v-for="user in filteredUsers" :key="user.id" :user="user" :removeFn="removeUser" v-show="tabVal == 'users'" />

      </template>

    </q-splitter>
  </q-page>
</template>

<script>
import WeekItem from 'components/WeekItem'
import UserItem from 'components/UserItem'
import axios from 'axios'

export default {
  name: 'MainLayout',
  components: { WeekItem, UserItem },
  data () {
    return {
      tabVal: this.$q.sessionStorage.getItem('tabSet') ?? 'weeks',
      barSets: {
        dropLabel: this.$q.sessionStorage.getItem('yearSet') ?? new Date().getFullYear(),
        dropYears: [2020, 2021, 2022, 2023, 2024, 2025],
        selected: 1,
        options: [
          { label: 'Todos', value: 1 },
          { label: 'Completos', value: 2 },
          { label: 'Incompletos', value: 3 }
        ],
        search: ''
      },
      lists: {
        weeks: [],
        users: []
      }
    }
  },
  watch: {
    tabVal: function (val) {
      this.barSets.search = ''
      this.$q.sessionStorage.set('tabSet', val)
    }
  },
  computed: {
    filteredWeeks () {
      let result = this.lists.weeks

      result = result.filter(w => w.year === this.barSets.dropLabel.toString())

      if (this.barSets.search !== '') {
        result = result.filter(w =>
          w.number.toString().startsWith(this.barSets.search) ||
          w.title.toString().startsWith(this.barSets.search.toUpperCase())
        )
      }

      return result
    },
    filteredMissionaries () {
      let missionaries = this.lists.users.filter(m => m.missionary === '1')

      if (this.barSets.selected !== 1) {
        missionaries = missionaries.filter(u => u.filled === (this.barSets.selected === 2))
      }

      if (this.barSets.search !== '') {
        missionaries = missionaries.filter(m => m.name.toUpperCase().startsWith(this.barSets.search.toUpperCase()))
      }

      return missionaries
    },
    filteredUsers () {
      let users = this.lists.users.filter(m => m.missionary === '0')

      if (this.barSets.selected !== 1) {
        users = users.filter(u => u.filled === (this.barSets.selected === 2))
      }

      if (this.barSets.search !== '') {
        users = users.filter(u => u.name.toUpperCase().startsWith(this.barSets.search.toUpperCase()))
      }

      return users
    }
  },
  methods: {
    setYear (val) {
      this.barSets.dropLabel = val
      this.$q.sessionStorage.set('yearSet', val)
    },
    removeWeek (key) {
      const i = this.lists.weeks.map(w => `${w.year}${w.number}`).indexOf(key)
      this.lists.weeks.splice(i, 1)
    },
    removeUser (key) {
      const i = this.lists.users.map(u => u.id).indexOf(key)
      this.lists.users.splice(i, 1)
    }
  },
  beforeCreate () {
    if (this.$q.sessionStorage.getItem('apiKey') === null) {
      this.$router.push({ name: 'login' })
    }
  },
  created () {
    var loggedUser = this.$q.sessionStorage.getItem('user')
    var key = this.$q.sessionStorage.getItem('apiKey')
    const urlBase = 'https://pvmzapp.tech/api_dev/public'
    // const urlBase = 'http://localhost:8081'

    axios.get(urlBase + `/weeks/${loggedUser.id}`, {
      headers: {
        'Api-Key': key
      }
    })
      .then(res => {
        this.lists.weeks = res.data
      })
      .catch(err => {
        this.$q.notify({
          message: 'Falha ao tentar buscar semanas.',
          color: 'red',
          timeout: 1000
        })

        console.log(err)
      })

    axios.get(urlBase + `/users/${loggedUser.id}`, {
      headers: {
        'Api-Key': key
      }
    })
      .then(res => {
        this.lists.users = res.data
        console.log(res.data)
      })
      .catch(err => {
        this.$q.notify({
          message: 'Falha ao tentar buscar usuários.',
          color: 'red',
          timeout: 1000
        })

        console.log(err)
      })
  }
}
</script>
