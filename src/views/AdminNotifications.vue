<template>
  <default-layout>
  <div class="container">
    <div class="my-3 p-3 bg-body rounded shadow-sm">
      <table class="table">
        <thead>
        <tr>
          <th>№</th>
          <th v-for="header in headers" :key="header.value" scope="col"> {{ header.text }}</th>
          <th>
            Actions
            <button
                class="btn btn-primary btn-sm float-end"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
            >
              <i class="bi bi-plus-lg bold"></i>
            </button>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, key) in items" :key="item.id">
          <th scope="row"> {{ key + 1 }}</th>
          <td v-for="head in headers" :key="key + head.value"> {{
              head.value === 'createdAt' ? formatDate(item[head.value]) : item[head.value]
            }}
          </td>
          <td>
            <button
                @click="itemClick(item)"
                type="button"
                class="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
            >
              <i class="bi bi-pencil"></i>
            </button>

            <!-- Edit Modal -->
            <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editModalLabel"> {{ editedIndex > -1 ? 'Edit' : 'Add' }} </h1>
                  </div>
                  <div class="modal-body">
                    <div class="input-group input-group-sm mb-3">
                      <span class="input-group-text" id="headerInput">Header</span>
                      <input v-model="editedItem.header" type="text" class="form-control">
                    </div>
                    <div class="input-group input-group-sm mb-3">
                      <span class="input-group-text">Text</span>
                      <textarea v-model="editedItem.text" class="form-control"></textarea>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button @click="close" type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                    <button @click="save" type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal">Save changes</button>
                  </div>
                </div>
              </div>
            </div>

            <button
                @click="itemClick(item)"
                type="button"
                class="btn btn-danger ms-1 btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
            >
              <i class="bi bi-trash3"></i>
            </button>

            <!-- Delete Modal -->
            <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm">
                <div class="modal-content">
                  <div class="modal-body">
                    Are you sure?
                  </div>
                  <div class="modal-footer">
                    <button @click="close" type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
                    <button @click="deleteItemConfirm" type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layouts/defaultLayout'

export default {
  name: 'AdminNotifications',
  components: { DefaultLayout },
  data () {
    return {
      url: '/admin/notification/',
      headers: [
        {
          text: 'Header',
          value: 'header'
        },
        { text: 'Text', value: 'text' },
        { text: 'Views', value: 'views' },
        { text: 'Date', value: 'createdAt' }
      ],
      rules: null,
      items: [],

      editedIndex: -1,
      editedItem: {
        header: '',
        text: ''
      },
      defaultItem: {
        header: '',
        text: ''
      },
      valid: true
    }
  },
  mounted () {
    this.init()
  },

  methods: {
    async init () {
      try {
        const response = await this.axios.get(this.url)
        this.items = response.data
      } catch (error) {
        console.log(error)
      }
    },
    itemClick (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },

    async deleteItemConfirm () {
      await this.axios.delete(this.url + this.items[this.editedIndex].id)
      this.items.splice(this.editedIndex, 1)
      this.close()
    },

    close () {
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save () {
      if (this.editedIndex > -1) {
        const response = await this.axios.post(this.url + this.items[this.editedIndex].id + '/edit', this.editedItem)
        Object.assign(this.items[this.editedIndex], response.data)
      } else {
        const response = await this.axios.post(this.url + 'new', this.editedItem)
        this.items.push(response.data)
      }
      this.close()
    },
    formatDate (date) {
      const d = new Date(date)
      return ('0' + d.getDate()).slice(-2) + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' +
          d.getFullYear() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2)
    }
  }
}

</script>

<style scoped>

</style>
