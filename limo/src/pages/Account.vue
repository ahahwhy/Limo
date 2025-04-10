<template>
  <div class="p-6 mt-12 w-full">
    <div v-if="loading" class="text-center">Загрузка данных...</div>

    <div v-else>
      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4 ml-2">Последние расчеты калорий</h2>

        <div v-if="caloriesData.length === 0" class="text-gray-500">
          У вас пока нет сохраненных расчетов
        </div>

        <div v-else class="grid gap-4">
          <div
            v-for="item in caloriesData"
            :key="item.id"
            class="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow relative"
          >
            <button
              @click="confirmDelete(item.id)"
              class="absolute top-2 right-2 text-red-500 hover:text-red-700"
              title="Удалить запись"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <div class="flex justify-between items-start">
              <div>
                <p class="font-medium">
                  Дата: {{ item.displayDate || formatDate(item.calculatedAt) }}
                </p>
                <p class="text-lg font-bold text-blue-600">{{ item.dailyCalories }} ккал/день</p>
              </div>
              <div class="text-sm text-gray-600">
                <p>Цель: {{ getGoalLabel(item.goal) }}</p>
                <p>Активность: {{ getActivityLabel(item.activityLevel) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '@/firebase'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const auth = getAuth()
const loading = ref(true)
const caloriesData = ref([])
const deletingId = ref(null) // Для отслеживания удаляемой записи

const activityLevels = {
  1.2: 'Сидячий',
  1.375: 'Легкая',
  1.55: 'Умеренная',
  1.725: 'Высокая',
  1.9: 'Экстремальная',
}

const goals = {
  lose: 'Похудение',
  maintain: 'Поддержание',
  gain: 'Набор массы',
}

const getActivityLabel = (level) => activityLevels[level] || 'Неизвестно'
const getGoalLabel = (goal) => goals[goal] || 'Неизвестно'

const formatDate = (timestamp) => {
  if (!timestamp?.toDate) return 'Н/Д'
  return format(timestamp.toDate(), 'dd MMM yyyy HH:mm', { locale: ru })
}

const fetchCaloriesData = async () => {
  try {
    const user = auth.currentUser
    if (!user) return

    const q = query(
      collection(db, 'users', user.uid, 'caloriesRecords'),
      orderBy('calculatedAt', 'desc'),
    )

    const querySnapshot = await getDocs(q)
    caloriesData.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  } finally {
    loading.value = false
  }
}

const confirmDelete = (id) => {
  if (confirm('Вы уверены, что хотите удалить эту запись?')) {
    deleteRecord(id)
  }
}

const deleteRecord = async (id) => {
  try {
    deletingId.value = id
    const user = auth.currentUser
    if (!user) return

    await deleteDoc(doc(db, 'users', user.uid, 'caloriesRecords', id))

    // Обновляем список после удаления
    caloriesData.value = caloriesData.value.filter((item) => item.id !== id)
  } catch (error) {
    console.error('Ошибка при удалении:', error)
    alert('Не удалось удалить запись')
  } finally {
    deletingId.value = null
  }
}

onMounted(() => {
  fetchCaloriesData()
})
</script>

<style scoped>
/* Добавляем анимацию для кнопки удаления */
button {
  transition: color 0.2s ease;
}
</style>
