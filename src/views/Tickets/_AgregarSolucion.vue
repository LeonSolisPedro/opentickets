<template>
  <div class="modal-content">

    <div class="modal-header">
      <h3 class="modal-title">Agregar solucion</h3>
      <button class="btn-close btn btn-icon btn-sm btn-active-light-primary me-0" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body">
      <form class="row mb-3 g-9">
        <input type="hidden" v-model="solucion.id" />
        <input type="hidden" v-model="solucion.idTicket" />
        <div class="col-sm-12">
          <label class="required form-label">Cambios:</label>
          <div class="ms-9 mt-3 form-check form-check-custom form-check-solid">
            <input type="checkbox" v-model="solucion.modificoCompu" class="form-check-input" />
            <label class="form-check-label" for="flexCheckDefault">
              Computadora Modificada
            </label>
          </div>
        </div>
        <div class="col-sm-12">
          <label class="required form-label">Describa la solución:</label>
          <textarea v-model="solucion.solucionCampo" class="form-control form-control-solid resize-none" rows="5" placeholder="Describa detalladamente la solución"></textarea>
          <div class="invalid-feedback"> {{ v$.solucion.solucionCampo.$errors[0]?.$message }} </div>
        </div>
      </form>
    </div>
    
    <div class="modal-footer">
      <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
      <button @click="create()" type="button" class="btn btn-primary">Agregar</button>
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
      solucion: {
        id: 0,
        idTicket: 0,
        modificoCompu: false,
        solucionCampo: ""
      },
    }
  },
  validations() {
    return {
      solucion: {
        solucionCampo: { required }
      },
    }
  },
  methods: {
    async create() {
      const valid = await this.v$.$validate()
      if (!valid) return
      const block = new KTBlockUI(this.$el)
      await axios.post(`tickets/agregarsolucion/${this.solucion.idTicket}`, this.solucion)
      await swal.fire("Success", "Solución agregado con éxito", "success")
      block.releaseDestroy()
      this.$emit("refresh")
      Modal.getInstance(this.$el.parentElement.parentElement).hide()
    },
    resetModal() {
      Object.assign(this.$data, this.$options.data())
      this.v$.$reset()
    },
    openModal(id){
      this.solucion.idTicket = id
      Modal.getOrCreateInstance(this.$el.parentElement.parentElement).show()
    }
  },
  mounted() {
    const modal = this.$el.parentElement.parentElement
    modal.addEventListener('hidden.bs.modal', () => this.resetModal())
  },
}
</script>