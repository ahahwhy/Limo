<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
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

          <div class="flex justify-end space-x-3 pt-4">
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
              Сохранить
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
      },
    }
  },
  computed: {
    isFormValid() {
      return (
        this.form.name && this.form.location && this.form.difficulty && this.form.goals.length > 0
      )
    },
  },
  methods: {
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
      }
    },
  },
}
</script>
