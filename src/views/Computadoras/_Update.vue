<template>
  <div class="modal-content">

    <div class="modal-header">
      <h3 class="modal-title">Actualizar computadora</h3>
      <button class="btn-close btn btn-icon btn-sm btn-active-light-primary me-0" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body">
      <form class="row mb-3 g-9">
        <input type="hidden" v-model="computadora.id" />
        <div class="col-sm-12">
          <label class="required form-label">Tipo de Computadora</label>
          <select v-model.number="computadora.tipoComputadora" class="form-select form-select-solid">
            <option value="0">Escritorio</option>
            <option value="1">Laptop</option>
          </select>
        </div>
        <div class="col-sm-12">
          <label class="required form-label">Marca y Modelo</label>
          <input type="text" v-model="computadora.marcaModel" class="form-control form-control-solid" placeholder="Aspire 5" />
          <div class="invalid-feedback"> {{ v$.computadora.marcaModel.$errors[0]?.$message }} </div>
        </div>
        <div class="col-sm-12">
          <label class="form-label">Numero de Serie</label>
          <input type="text" v-model="computadora.numeroSerie" class="form-control form-control-solid" placeholder="252525" />
          
        </div>
        <div class="col-sm-12">
          <label class="required form-label">Procesador</label>
          <input type="text" v-model="computadora.procesador" class="form-control form-control-solid" placeholder="i5 5200" />
          <div class="invalid-feedback"> {{ v$.computadora.procesador.$errors[0]?.$message }} </div>
        </div>
        <div class="col-sm-12">
          <label class="required form-label">RAM</label>
          <input type="text" v-model="computadora.ram" class="form-control form-control-solid" placeholder="8 GB" />
          <div class="invalid-feedback"> {{ v$.computadora.ram.$errors[0]?.$message }} </div>
        </div>
        <div class="col-sm-12">
          <label class="required form-label">Disco</label>
          <input type="text" v-model="computadora.disco" class="form-control form-control-solid" placeholder="1TB" />
          <div class="invalid-feedback"> {{ v$.computadora.disco.$errors[0]?.$message }} </div>
        </div>
        <div class="col-sm-12">
          <label class="required form-label">Sistema Operativo</label>
          <input type="text" v-model="computadora.sistemaOperativo" class="form-control form-control-solid" placeholder="Ubuntu 20" />
          <div class="invalid-feedback"> {{ v$.computadora.sistemaOperativo.$errors[0]?.$message }} </div>
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
      computadora: {
        id: 0,
        tipoComputadora: 0,
        marcaModel: "",
        numeroSerie: "",
        procesador: "",
        ram: "",
        disco: "",
        sistemaOperativo: ""
      }
    }
  },
  validations() {
    return {
      computadora: {
        marcaModel: {required},
        procesador: {required},
        ram: {required},
        disco: {required},
        sistemaOperativo: {required}
      },
    }
  },
  methods: {
    async update() {
      const valid = await this.v$.$validate()
      if (!valid) return
      const block = new KTBlockUI(this.$el)
      await axios.put(`computadoras/${this.computadora.id}`, this.computadora)
      await swal.fire("Success", "Computadora actualizada con éxito", "success")
      block.releaseDestroy()
      this.$emit("refresh")
      Modal.getInstance(this.$el.parentElement.parentElement).hide()
    },
    resetModal() {
      Object.assign(this.$data, this.$options.data())
      this.v$.$reset()
    },
    async openModal(id){
      const result = await axios.get(`computadoras/getcomputadoras/${id}`)
      this.computadora = result.data
      Modal.getOrCreateInstance(this.$el.parentElement.parentElement).show()
    }
  },
  mounted() {
    const modal = this.$el.parentElement.parentElement
    modal.addEventListener('hidden.bs.modal', () => this.resetModal())
  },
}
</script>