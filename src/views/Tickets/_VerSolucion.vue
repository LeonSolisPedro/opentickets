<template>
  <div class="modal-content">

    <div class="modal-header">
      <h3 class="modal-title">Detalles solucion</h3>
      <button class="btn-close btn btn-icon btn-sm btn-active-light-primary me-0" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body">
      <form class="row mb-3 g-9">
        <input type="hidden" v-model="solucion.id" />
        <input type="hidden" v-model="solucion.idTicket" />
        <div class="col-sm-12">
          <label class="required form-label">Cambios:</label>
          <div class="ms-9 mt-3 form-check form-check-custom form-check-solid">
            <input disabled type="checkbox" v-model="solucion.modificoCompu" class="form-check-input" />
            <label class="form-check-label">
              Computadora Modificada
            </label>
          </div>
        </div>
        <div class="col-sm-12">
          <label class="required form-label">Describa la solución:</label>
          <textarea disabled v-model="solucion.solucionCampo" class="form-control form-control-solid resize-none" rows="5" placeholder="Describa detalladamente la solución"></textarea>
          <span class="invalid-feedback"></span>
        </div>
      </form>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap"

export default {
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
  methods: {
    resetModal() {
      Object.assign(this.$data, this.$options.data())
    },
    openModal(solucion){
      this.solucion = solucion
      Modal.getOrCreateInstance(this.$el.parentElement.parentElement).show()
    }
  },
  mounted() {
    const modal = this.$el.parentElement.parentElement
    modal.addEventListener('hidden.bs.modal', () => this.resetModal())
  },
}
</script>