<script setup lang="ts">
import type { idiomaPrincipal } from '@/models/idiomaPrincipal'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'idiomaPrincipal'
const props = defineProps({
  mostrar: Boolean,
  idiomaPrincipal: {
    type: Object as () => idiomaPrincipal,
    default: () => ({}) as idiomaPrincipal,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const idiomaPrincipal= ref<idiomaPrincipal>({ ...props.idiomaPrincipal})
watch(
  () => props.idiomaPrincipal,
  (newVal) => {
    idiomaPrincipal.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      descripcion: idiomaPrincipal.value.descripcion,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${idiomaPrincipal.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    idiomaPrincipal.value = {} as idiomaPrincipal
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-24">Descripción</label>
        <InputText
          id="descripcion"
          v-model="idiomaPrincipal.descripcion"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
