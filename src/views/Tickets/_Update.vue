<template>
  <div class="modal-content">

    <div class="modal-header">
      <h3 class="modal-title">Editar ticket</h3>
      <button class="btn-close btn btn-icon btn-sm btn-active-light-primary me-0" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body">
      <form class="row mb-3 g-9">
        <input type="hidden" v-model="ticket.id" />
        <div class="col-sm-12">
          <label class="required form-label">Empleado:</label>
          <select v-model.number="ticket.idComputadora" class="form-select form-select-solid">
            <option disabled value="null">Seleccione empleado</option>
            <option v-for="compu in computadoras" :value="compu.idComputadora">
              {{ compu.nombreEmpleado }} - {{ compu.nombreComputadora }}
            </option>
          </select>
          <div class="invalid-feedback"> {{ v$.ticket.idComputadora.$errors[0]?.$message }} </div>
        </div>
        <div class="col-sm-12">
          <label class="required form-label">Prioridad:</label>
          <select v-model.number="ticket.prioridad" class="form-select form-select-solid">
            <option disabled value="null">Seleccione prioridad</option>
            <option value="0">Baja</option>
            <option value="1">Media</option>
            <option value="2">Alta</option>
          </select>
          <div class="invalid-feedback"> {{ v$.ticket.prioridad.$errors[0]?.$message }} </div>
        </div>
        <div class="col-sm-12">
          <label class="required form-label">Describa el problema:</label>
          <textarea v-model="ticket.descripcionProblema" class="form-control form-control-solid resize-none" rows="5" placeholder="Describa detalladamente el problema presentado"></textarea>
          <div class="invalid-feedback"> {{ v$.ticket.descripcionProblema.$errors[0]?.$message }} </div>
        </div>
      </form>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
      <button @click="update()" type="button" class="btn btn-primary">Editar</button>
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
      ticket: {
        id: 0,
        idComputadora: null,
        prioridad: null,
        descripcionProblema: ""
      },
      computadoras: []
    }
  },
  validations() {
    return {
      ticket: {
        idComputadora: { required },
        prioridad: { required },
        descripcionProblema: { required }
      },
    }
  },
  methods: {
    async update() {
      const valid = await this.v$.$validate()
      if (!valid) return
      const block = new KTBlockUI(this.$el)
      await axios.put(`tickets/actualizarticket/${this.ticket.id}`, this.ticket)
      await swal.fire("Success", "Ticket editado con éxito", "success")
      block.releaseDestroy()
      this.$emit("refresh")
      Modal.getInstance(this.$el.parentElement.parentElement).hide()
    },
    resetModal() {
      Object.assign(this.$data, this.$options.data())
      this.v$.$reset()
    },
    async openModal(id){
      const result = await axios.get(`tickets/gettickets/${id}`)
      this.ticket = result.data
      Modal.getOrCreateInstance(this.$el.parentElement.parentElement).show()
    },
    async getData() {
      const result = await axios.get("computadoras/getcomputadorasdropdown?empleados=asignados")
      this.computadoras = result.data
    }
  },
  mounted() {
    const modal = this.$el.parentElement.parentElement
    modal.addEventListener('hidden.bs.modal', () => this.resetModal())
    modal.addEventListener('show.bs.modal', () => this.getData())
  },
}
</script>