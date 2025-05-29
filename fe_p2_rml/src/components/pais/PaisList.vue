<script setup lang="ts">
import type { Pais} from '@/models/pais'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'paises'
let paises = ref<Pais[]>([])
const emit = defineEmits(['edit'])
const paisDelete = ref<Pais | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
    paises.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(pais: Pais) {
    emit('edit', pais)
}

function mostrarEliminarConfirm(pais: Pais) {
    paisDelete.value = pais
    mostrarConfirmDialog.value = true
}

async function eliminar() {
    await http.delete(`${ENDPOINT}/${paisDelete.value?.id}`)
    obtenerLista()
    mostrarConfirmDialog.value = false
}

onMounted(() => {
    obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Nro.</th>
                    <th>Descripcion</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(pais, index) in paises" :key="pais.id">
                    <td>{{ index + 1 }}</td>
                    <!-- <td>{{ pais.serie.titulo }}</td> -->
                    <td>{{ pais.descripcion }}</td>
                    <td>
                        <button @click="emitirEdicion(pais)">Editar</button>
                        <button @click="mostrarEliminarConfirm(pais)">eliminar</button>

                    </td>
                </tr>
            </tbody>
        </table>

        <Dialog v-model:visible="mostrarConfirmDialog" style="background-color: blue;" header="Confirmar Eliminación"
            :style="{ width: '25rem' }">
            <p>¿Estás seguro de que deseas eliminar este registro?</p>
            <div class="flex justify-end gap-2">
                <button severity="secondary" @click="mostrarConfirmDialog = false">cancelar</button>
                <button @click="eliminar">Eliminar</button>
            </div>
        </Dialog>
    </div>
</template>

<style scoped></style>
