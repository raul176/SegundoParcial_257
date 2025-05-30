<script setup lang="ts">
import type { idiomaPrincipal} from '@/models/idiomaPrincipal'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'idiomaPrincipal'
let idiomaPrincipal = ref<idiomaPrincipal[]>([])
const emit = defineEmits(['edit'])
const idiomaPrincipalDelete = ref<idiomaPrincipal | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
    idiomaPrincipal.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(idiomaPrincipal: idiomaPrincipal) {
    emit('edit', idiomaPrincipal)
}

function mostrarEliminarConfirm(idiomaPrincipal: idiomaPrincipal) {
    idiomaPrincipalDelete.value = idiomaPrincipal
    mostrarConfirmDialog.value = true
}

async function eliminar() {
    await http.delete(`${ENDPOINT}/${idiomaPrincipalDelete.value?.id}`)
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
                <tr v-for="(idiomaPrincipal, index) in idiomaPrincipal" :key="idiomaPrincipal.id">
                    <td>{{ index + 1 }}</td>
                    <!-- <td>{{ idiomaPrincipal.serie.titulo }}</td> -->
                    <td>{{ idiomaPrincipal.descripcion }}</td>
                    <td>
                        <button @click="emitirEdicion(idiomaPrincipal)">Editar</button>
                        <button @click="mostrarEliminarConfirm(idiomaPrincipal)">eliminar</button>

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
