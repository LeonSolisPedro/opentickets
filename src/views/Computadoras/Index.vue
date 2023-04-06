<template>
  <div class="card card-flush datatable">

    <div class="card-header">
      <h2 class="card-title">Computadoras</h2>
      <div class="card-toolbar">
        <button class="btn btn-flex btn-primary" data-bs-toggle="modal" data-bs-target="#create">Agregar</button>
      </div>
    </div>

    <div class="card-body">
      <vue-datatable :watchData="lista" class="table table-row-dashed dt-custom">
        <thead>
          <tr>
            <th>Id</th>
            <th>Marca y Modelo</th>
            <th>Sistema Operativo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="computadora in lista" :key="computadora.id">
            <th>{{ computadora.id }}</th>
            <th>
              <div class="d-flex align-items-center">
                <div class="symbol symbol-50px">
                  <img v-if="computadora.tipoComputadora == 0" src="@/assets/media/escritorio.webp" />
                  <img v-if="computadora.tipoComputadora == 1" src="@/assets/media/laptop.webp" />
                </div>
                <div class="ms-3">
                  {{ computadora.marcaModel }}
                </div>
              </div>
            </th>
            <th>{{ computadora.sistemaOperativo }}</th>
            <th>
              <div class="dropdown">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Acciones
                </button>
                <ul class="dropdown-menu">
                  <li><button class="dropdown-item" @click="$refs.update.openModal(computadora.id)">Editar</button></li>
                  <li><button @click="$globalDelete('computadoras', computadora.id, 'Computadora')" class="dropdown-item">Eliminar</button></li>
                </ul>
              </div>
            </th>
          </tr>
        </tbody>
      </vue-datatable>
    </div>

    <div class="modal fade" tabindex="-1" id="create">
      <div class="modal-dialog">
        <Create @refresh="refresh()" />
      </div>
    </div>

    <div class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <Update @refresh="refresh()" ref="update" />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      lista: []
    }
  },
  components: {
    Create: () => import("./_Create.vue"),
    Update: () => import("./_Update.vue")
  },
  methods: {
    async refresh() {
      const result = await axios.get("computadoras/getcomputadoras")
      this.lista = result.data
    }
  },
  async beforeRouteEnter(to, from, next) {
    const result = await axios.get("computadoras/getcomputadoras")
    next(vm => { vm.lista = result.data })
  }
}
</script>