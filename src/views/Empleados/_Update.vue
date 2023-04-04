<template>
  <div class="modal-content">

    <div class="modal-header">
      <h3 class="modal-title">Actualizar empleado</h3>
      <button class="btn-close btn btn-icon btn-sm btn-active-light-primary me-0" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body">
      <form class="row mb-3 g-9">
        <input type="hidden" v-model="empleado.id" />
        <div class="col-sm-12">
          <label class="required form-label">Computadora:</label>
          <select v-model.number="empleado.idComputadora" class="form-select form-select-solid">
            <option disabled value="null">Seleccione computadora</option>
            <option v-for="compu in computadoras" :value="compu.idComputadora">
              {{ compu.nombreComputadora }}
            </option>
          </select>
          <div class="invalid-feedback"> {{ v$.empleado.idComputadora.$errors[0]?.$message }} </div>
        </div>
        <div class="col-sm-12">
          <label class="required form-label">Nombre del Empleado</label>
          <input type="text" v-model="empleado.nombreEmpleado" class="form-control form-control-solid"
            placeholder="Juan Pancho" />
          <div class="invalid-feedback"> {{ v$.empleado.nombreEmpleado.$errors[0]?.$message }} </div>
        </div>
        <div class="col-sm-12">
          <label class="required form-label">Nombre del Departamento</label>
          <input type="text" v-model="empleado.nombreDepartamento" class="form-control form-control-solid"
            placeholder="Ventas" />
          <div class="invalid-feedback"> {{ v$.empleado.nombreDepartamento.$errors[0]?.$message }} </div>
        </div>
      </form>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
      <button @click="update()" type="button" class="btn btn-primary">Actualizar</button>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { Modal } from "bootstrap"

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      empleado: {
        id: 0,
        idComputadora: null,
        nombreEmpleado: "",
        nombreDepartamento: ""
      },
      computadoras: []
    }
  },
  validations() {
    return {
      empleado: {
        idComputadora: { required },
        nombreEmpleado: { required },
        nombreDepartamento: { required },
      },
    }
  },
  methods: {
    async update() {
      const valid = await this.v$.$validate()
      if (!valid) return
      const block = new KTBlockUI(this.$el)
      await axios.put(`empleados/${this.empleado.id}`, this.empleado)
      await swal.fire("Success", "Empleado actualizado con éxito", "success")
      block.releaseDestroy()
      this.$emit("refresh")
      Modal.getInstance(this.$el.parentElement.parentElement).hide()
    },
    resetModal() {
      Object.assign(this.$data, this.$options.data())
      this.v$.$reset()
    },
    async openModal(id){
      const result = await axios.get(`empleados/${id}`)
      this.empleado = result.data
      Modal.getOrCreateInstance(this.$el.parentElement.parentElement).show()
    },
    async getData() {
      const result = await axios.get("computadoras/getcomputadorasdropdown?empleados=noasignados")
      this.computadoras = result.data
      this.computadoras.unshift({
        idComputadora:this.empleado.computadora.id,
        nombreComputadora:this.empleado.computadora.marcaModel
      })
    }
  },
  mounted() {
    const modal = this.$el.parentElement.parentElement
    modal.addEventListener('hidden.bs.modal', () => this.resetModal())
    modal.addEventListener('show.bs.modal', () => this.getData())
  },
}
</script>