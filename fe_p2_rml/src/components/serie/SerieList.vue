<script setup lang="ts">
import type { Serie } from '@/models/serie'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'series'
let series = ref<Serie[]>([])
const emit = defineEmits(['edit'])
const serieDelete = ref<Serie | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
    series.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(serie: Serie) {
    emit('edit', serie)
}

function mostrarEliminarConfirm(serie: Serie) {
    serieDelete.value = serie
    mostrarConfirmDialog.value = true
}

async function eliminar() {
    await http.delete(`${ENDPOINT}/${serieDelete.value?.id}`)
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
                    <th>Titulo</th>
                    <th>Sinopsis</th>
                    <th>Director</th>
                    <th>Temporadas</th>
                    <th>Fecha de Estreno</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(serie, index) in series" :key="serie.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ serie.titulo }}</td>
                    <td>{{ serie.sinopsis }}</td>
                    <td>{{ serie.director }}</td>
                    <td>{{ serie.temporadas }}</td>
                    <td>{{ serie.fechaEstreno }}</td>
                    <td>
                        <button @click="emitirEdicion(serie)">Editar</button>
                        <button @click="mostrarEliminarConfirm(serie)">eliminar</button>

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
