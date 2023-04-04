<template>
  <div class="card card-flush datatable">

    <div class="card-header">
      <h2 class="card-title">Empleados</h2>
      <div class="card-toolbar">
        <button class="btn btn-flex btn-primary" data-bs-toggle="modal" data-bs-target="#create">Agregar</button>
      </div>
    </div>

    <div class="card-body">
      <vue-datatable :watchData="lista" class="table table-row-dashed dt-custom">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre Empleado</th>
            <th>Nombre Departamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="empleado in lista" :key="empleado.id">
            <th>{{ empleado.id }}</th>
            <th>{{ empleado.nombreEmpleado }}</th>
            <th>{{ empleado.nombreDepartamento }}</th>
            <th>
              <div class="dropdown">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Acciones
                </button>
                <ul class="dropdown-menu">
                  <li><button class="dropdown-item" @click="$refs.update.openModal(empleado.id)">Editar</button></li>
                  <li><button @click="$globalDelete('empleados', empleado.id, 'Empleado')" class="dropdown-item">Eliminar</button></li>
                </ul>
              </div>
            </th>
          </tr>
        </tbody>
      </vue-datatable>
    </div>

    <div class="modal fade" tabindex="-1" id="create">
      <div class="modal-dialog"><Create @create="$globalAdd($event)"/></div>
    </div>

    <div class="modal fade" tabindex="-1">
      <div class="modal-dialog"><Update @update="$globalEdit($event)" ref="update"/></div>
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
  async beforeRouteEnter(to, from, next) {
    const result = await axios.get("empleados")
    next(vm => { vm.lista = result.data })
  }
}
</script>