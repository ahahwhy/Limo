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
              <option value="В студии">В студии</option>
              <option value="В бассейне">В бассейне</option>
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
              class="mb-4 p-3 border border-gray-200 rounded-lg"
            >
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

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        location: '',
        difficulty: '',
        gender: 'Любой',
        goals: [],
        description: '',
        exercises: [],
      },
    }
  },
  computed: {
    isFormValid() {
      return (
        this.form.name &&
        this.form.location &&
        this.form.difficulty &&
        this.form.goals.length > 0 &&
        this.form.exercises.length > 0
      )
    },
  },
  methods: {
    addExercise() {
      this.form.exercises.push({
        sets: 3,
        reps: 12,
        description: '',
      })
    },
    removeExercise(index) {
      this.form.exercises.splice(index, 1)
    },
    submitTraining() {
      if (!this.isFormValid) return

      this.$emit('submit', {
        ...this.form,
        id: Date.now(),
        sessionsPerWeek: '1-2', // Можно добавить поле для выбора
      })

      // Сброс формы
      this.form = {
        name: '',
        location: '',
        difficulty: '',
        gender: 'Любой',
        goals: [],
        description: '',
        exercises: [],
      }
    },
  },
}
</script>
