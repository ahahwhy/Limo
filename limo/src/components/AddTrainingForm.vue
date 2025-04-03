<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <h2 class="text-xl font-semibold mb-4">Добавить новую тренировку</h2>

      <form @submit.prevent="submitTraining">
        <div class="space-y-4">
          <!-- Название тренировки -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Название тренировки</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Например: Утренняя йога"
            />
          </div>

          <!-- Место проведения -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Место проведения</label>
            <select
              v-model="form.location"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Выберите место</option>
              <option value="Дома">Дома</option>
              <option value="В зале">В зале</option>
              <option value="На улице">На улице</option>
            </select>
          </div>

          <!-- Уровень сложности -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Уровень сложности</label>
            <select
              v-model="form.difficulty"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Выберите уровень</option>
              <option value="Начинающий">Начинающий</option>
              <option value="Средний">Средний</option>
              <option value="Продвинутый">Продвинутый</option>
            </select>
          </div>

          <!-- Пол -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Для кого</label>
            <select
              v-model="form.gender"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="Любой">Для всех</option>
              <option value="Мужской">Для мужчин</option>
              <option value="Женский">Для женщин</option>
            </select>
          </div>

          <!-- Типы тренировки (мультивыбор) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Тип тренировки</label>
            <div class="grid grid-cols-2 gap-2">
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  v-model="form.goals"
                  value="Йога"
                  class="rounded text-lime-500 focus:ring-lime-500"
                />
                <span>Йога</span>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  v-model="form.goals"
                  value="Растяжка"
                  class="rounded text-lime-500 focus:ring-lime-500"
                />
                <span>Растяжка</span>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  v-model="form.goals"
                  value="Похудение"
                  class="rounded text-lime-500 focus:ring-lime-500"
                />
                <span>Похудение</span>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  v-model="form.goals"
                  value="Силовая"
                  class="rounded text-lime-500 focus:ring-lime-500"
                />
                <span>Силовая</span>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  v-model="form.goals"
                  value="Кардио"
                  class="rounded text-lime-500 focus:ring-lime-500"
                />
                <span>Кардио</span>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  v-model="form.goals"
                  value="Для детей"
                  class="rounded text-lime-500 focus:ring-lime-500"
                />
                <span>Для детей</span>
              </label>
            </div>
          </div>

          <!-- Описание -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Описание</label>
            <textarea
              v-model="form.description"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows="3"
              placeholder="Краткое описание тренировки"
            ></textarea>
          </div>

          <!-- Блок упражнений -->
          <div class="mb-6">
            <h3 class="text-lg font-medium mb-3">Упражнения</h3>

            <div
              v-for="(exercise, index) in form.exercises"
              :key="index"
              class="mb-4 p-3 border border-gray-200 rounded-lg relative"
            >
              <!-- Кнопка удаления - теперь внутри div для каждого упражнения -->
              <button
                type="button"
                @click="removeExercise(index)"
                class="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Удалить упражнение"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>

              <div class="grid grid-cols-12 gap-3 mb-3">
                <!-- Подходы x Повторения -->
                <div class="col-span-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Подходы × Повторения</label
                  >
                  <div class="flex items-center">
                    <input
                      v-model.number="exercise.sets"
                      type="number"
                      min="1"
                      max="10"
                      class="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center"
                      placeholder="3"
                    />
                    <span class="mx-2">×</span>
                    <input
                      v-model.number="exercise.reps"
                      type="number"
                      min="1"
                      max="50"
                      class="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center"
                      placeholder="12"
                    />
                  </div>
                </div>
                <div class="col-span-12 mb-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Название упражнения</label
                  >
                  <input
                    v-model="exercise.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Название упражнения"
                  />
                </div>

                <!-- Описание упражнения -->
                <div class="col-span-8">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Описание упражнения</label
                  >
                  <textarea
                    v-model="exercise.description"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows="2"
                    placeholder="Техника выполнения, рекомендации..."
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="button"
              @click="addExercise"
              class="mt-2 flex items-center text-lime-600 hover:text-lime-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Добавить упражнение
            </button>
          </div>

          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              @click="$emit('cancel')"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-lime-400 text-white rounded-lg hover:bg-lime-500 disabled:opacity-50"
              :disabled="!isFormValid"
            >
              Сохранить тренировку
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue' // Добавьте computed
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '@/firebase'

const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  name: '',
  location: '',
  difficulty: '',
  gender: 'Любой',
  goals: [],
  description: '',
  exercises: [
    {
      name: '',
      sets: 3,
      reps: 12,
      description: '',
    },
  ],
})

const isLoading = ref(false)
const error = ref(null)

const addExercise = () => {
  form.value.exercises.push({
    name: '',
    sets: 3,
    reps: 12,
    description: '',
  })
}

const removeExercise = (index) => {
  form.value.exercises.splice(index, 1)
}

const validateForm = () => {
  if (!form.value.name.trim()) throw new Error('Введите название тренировки')
  if (!form.value.location) throw new Error('Выберите место проведения')
  if (!form.value.difficulty) throw new Error('Выберите уровень сложности')
  if (form.value.goals.length === 0) throw new Error('Выберите хотя бы одну цель')
  if (form.value.exercises.some((ex) => !ex.name.trim() || !ex.description.trim())) {
    throw new Error('Заполните все поля упражнений')
  }
}

const submitTraining = async () => {
  try {
    isLoading.value = true
    error.value = null

    validateForm()

    const auth = getAuth()
    const user = auth.currentUser
    if (!user) throw new Error('Требуется авторизация')

    // Проверка дубликатов
    const trainingsRef = collection(db, 'trainings')
    const q = query(trainingsRef, where('name', '==', form.value.name))
    const snapshot = await getDocs(q)
    if (!snapshot.empty) throw new Error('Тренировка с таким названием уже существует')

    // Подготовка данных
    const trainingData = {
      name: form.value.name.trim(),
      location: form.value.location,
      difficulty: form.value.difficulty,
      gender: form.value.gender,
      goals: form.value.goals,
      description: form.value.description.trim(),
      exercises: form.value.exercises.map((ex) => ({
        name: ex.name.trim(),
        sets: ex.sets,
        reps: ex.reps,
        description: ex.description.trim(),
      })),
      createdAt: serverTimestamp(),
      userId: user.uid,
      lastUpdated: serverTimestamp(),
    }

    // Сохранение в Firestore
    const newTrainingRef = doc(collection(db, 'trainings'))
    await setDoc(newTrainingRef, trainingData)

    // Возвращаем данные в родительский компонент
    emit('submit', { id: newTrainingRef.id, ...trainingData })
    emit('cancel')
  } catch (err) {
    console.error('Ошибка сохранения:', err)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

const isFormValid = computed(() => {
  return (
    form.value.name.trim() &&
    form.value.location &&
    form.value.difficulty &&
    form.value.goals.length > 0 &&
    form.value.exercises.length > 0 &&
    form.value.exercises.every(
      (ex) => ex.name.trim() && ex.description.trim() && ex.sets > 0 && ex.reps > 0,
    )
  )
})
</script>
