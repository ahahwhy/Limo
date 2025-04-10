<script setup>
import { ref, computed, onMounted } from 'vue'
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '@/firebase'

const auth = getAuth()
const user = ref(null)

onMounted(() => {
  onAuthStateChanged(auth, (authUser) => {
    user.value = authUser
    if (authUser) {
      formData.value.userId = authUser.uid
    }
  })
})

const formData = ref({
  userId: '',
  age: '',
  weight: '',
  height: '',
  gender: '',
  activityLevel: '',
  goal: 'maintain',
  dailyCalories: 0,
  createdAt: null,
})

//const showAdminFeatures = computed(() => authStore.isAdmin)

const isLoading = ref(false)
const error = ref('')
const successMessage = ref('')

const activityLevels = [
  { value: 1.2, label: 'Сидячий образ жизни' },
  { value: 1.375, label: 'Легкая активность (1-3 тренировки)' },
  { value: 1.55, label: 'Умеренная активность (3-5 тренировок)' },
  { value: 1.725, label: 'Высокая активность (6-7 тренировок)' },
  { value: 1.9, label: 'Экстремальная активность' },
]

const goals = [
  { value: 'lose', label: 'Похудеть' },
  { value: 'maintain', label: 'Поддерживать вес' },
  { value: 'gain', label: 'Набрать массу' },
]

const disabledSaveButton = computed(() => {
  const requiredFields = ['age', 'weight', 'height', 'gender', 'activityLevel', 'goal']
  return requiredFields.some((field) => !formData.value[field])
})

const calculateCalories = () => {
  const { age, weight, height, gender, activityLevel, goal } = formData.value

  const numAge = parseFloat(age)
  const numWeight = parseFloat(weight)
  const numHeight = parseFloat(height)
  const numActivity = parseFloat(activityLevel)

  if (isNaN(numAge) || isNaN(numWeight) || isNaN(numHeight) || isNaN(numActivity)) {
    return 0
  }

  // Формула Миффлина-Сан Жеора
  const bmr =
    gender === 'male'
      ? 88.362 + 13.397 * numWeight + 4.799 * numHeight - 5.677 * numAge
      : 447.593 + 9.247 * numWeight + 3.098 * numHeight - 4.33 * numAge

  // Базовый расход калорий с учетом активности
  let calories = Math.round(bmr * numActivity)

  // Корректировка калорий в зависимости от цели
  switch (goal) {
    case 'lose':
      calories -= 500 // Дефицит 500 ккал для похудения
      break
    case 'gain':
      calories += 500 // Профицит 500 ккал для набора массы
      break
    // Для 'maintain' оставляем как есть
  }

  return calories
}

const addNewRecord = async () => {
  if (!user.value) {
    error.value = 'Для сохранения данных необходимо войти в систему'
    return
  }

  try {
    isLoading.value = true
    error.value = ''
    successMessage.value = ''

    // Рассчитываем калории
    formData.value.dailyCalories = calculateCalories()

    // Сохраняем в Firestore
    const recordId = Date.now().toString()
    await setDoc(doc(db, 'users', user.value.uid, 'caloriesRecords', recordId), {
      ...formData.value,
      userId: user.value.uid,
      calculatedAt: serverTimestamp(),
      displayDate: new Date().toLocaleDateString('ru-RU'),
    })

    successMessage.value = 'Данные успешно сохранены!'
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (err) {
    console.error('Ошибка сохранения:', err)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div v-if="!user">
    <p class="text-red-500">Для сохранения данных необходимо войти в систему</p>
    <router-link to="/autorization" class="text-blue-500">Войти</router-link>
  </div>
  <div v-else class="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-24 mb-24">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Калькулятор калорий</h1>

    <!-- Сообщения об ошибках/успехе -->
    <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded">
      {{ error }}
    </div>
    <div v-if="successMessage" class="mb-4 p-3 bg-green-100 text-green-700 rounded">
      {{ successMessage }}
    </div>

    <form v-else @submit.prevent="addNewRecord" class="space-y-4">
      <!-- Возраст -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Возраст (лет)</label>
        <input
          v-model.number="formData.age"
          type="number"
          min="10"
          max="100"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <!-- Пол -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Пол</label>
        <div class="flex space-x-4">
          <label class="inline-flex items-center">
            <input
              v-model="formData.gender"
              type="radio"
              value="male"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              required
            />
            <span class="ml-2">Мужской</span>
          </label>
          <label class="inline-flex items-center">
            <input
              v-model="formData.gender"
              type="radio"
              value="female"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              required
            />
            <span class="ml-2">Женский</span>
          </label>
        </div>
      </div>

      <!-- Вес -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Вес (кг)</label>
        <input
          v-model.number="formData.weight"
          type="number"
          min="30"
          max="300"
          step="0.1"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <!-- Рост -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Рост (см)</label>
        <input
          v-model.number="formData.height"
          type="number"
          min="100"
          max="250"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <!-- Уровень активности -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Уровень активности</label>
        <select
          v-model.number="formData.activityLevel"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option disabled value="">Выберите уровень</option>
          <option v-for="level in activityLevels" :key="level.value" :value="level.value">
            {{ level.label }}
          </option>
        </select>
      </div>

      <!-- Цель -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Ваша цель</label>
        <div class="grid grid-cols-3 gap-2">
          <label
            v-for="goalItem in goals"
            :key="goalItem.value"
            class="inline-flex items-center justify-center p-2 border rounded-md cursor-pointer"
            :class="{
              'border-indigo-500 bg-indigo-50': formData.goal === goalItem.value,
              'border-gray-300': formData.goal !== goalItem.value,
            }"
          >
            <input v-model="formData.goal" type="radio" :value="goalItem.value" class="sr-only" />
            <span class="text-sm">{{ goalItem.label }}</span>
          </label>
        </div>
      </div>

      <!-- Результат -->
      <div v-if="formData.dailyCalories > 0" class="p-4 bg-blue-50 rounded-md">
        <p class="text-sm text-gray-600">Рекомендуемая суточная норма:</p>
        <p class="text-2xl font-bold text-blue-600">{{ formData.dailyCalories }} ккал</p>
      </div>

      <!-- Кнопка сохранения -->
      <button
        type="submit"
        :disabled="disabledSaveButton || isLoading"
        class="w-full bg-lime-500 text-white py-2 px-4 rounded-md hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span v-if="isLoading">
          <svg
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Сохранение...
        </span>
        <span v-else>Рассчитать и сохранить</span>
      </button>
    </form>
  </div>
</template>
