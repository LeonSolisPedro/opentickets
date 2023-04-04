<template>
  <div class="card card-flush datatable">

    <div class="card-header">
      <h2 class="card-title">Tickets</h2>
      <div class="card-toolbar">
        <button class="btn btn-flex btn-primary" data-bs-toggle="modal" data-bs-target="#create">Agregar</button>
      </div>
    </div>

    <div class="card-body">
      <vue-datatable :watchData="lista" class="table table-row-dashed dt-custom">
        <thead>
          <tr>
            <th>Prioridad</th>
            <th>Empleado</th>
            <th>Computadora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in lista" :key="ticket.id">
            <th>
              <span v-if="ticket.prioridad == 0" class="badge badge-success">Baja</span>
              <span v-if="ticket.prioridad == 1" class="badge badge-warning">Media</span>
              <span v-if="ticket.prioridad == 2" class="badge badge-danger">Alta</span>
            </th>
            <th>{{ ticket.computadora.empleado.nombreEmpleado }}</th>
            <th>{{ ticket.computadora.marcaModel }}</th>
            <th>
              <div class="dropdown">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Acciones
                </button>
                <ul class="dropdown-menu">
                  <li><button class="dropdown-item" @click="$refs.update.openModal(ticket.id)">Editar</button></li>
                </ul>
              </div>
            </th>
          </tr>
        </tbody>
      </vue-datatable>
    </div>

    <div class="modal fade" tabindex="-1" id="create">
      <div class="modal-dialog"><Create @refresh="refresh()"/></div>
    </div>

    <div class="modal fade" tabindex="-1">
      <div class="modal-dialog"><Update @refresh="refresh()" ref="update"/></div>
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
  methods:{
    async refresh(){
      const result = await axios.get("tickets/gettickets")
      this.lista = result.data
    }
  },
  async beforeRouteEnter(to, from, next) {
    const result = await axios.get("tickets/gettickets")
    next(vm => { vm.lista = result.data })
  }
}
</script>