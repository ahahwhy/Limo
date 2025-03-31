<template>
  <div class="container mx-auto px-4 py-8 w-full mt-8">
    <!-- Строка поиска -->
    <div class="mb-6">
      <input
        type="text"
        placeholder="Поиск тренировок..."
        v-model="searchQuery"
        @input="filterTrainings"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Фильтры в аккордеоне -->
    <div class="mb-6 border border-gray-200 rounded-lg overflow-hidden">
      <button
        @click="isFiltersOpen = !isFiltersOpen"
        class="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span class="font-medium">Фильтры</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-500 transition-transform"
          :class="{ 'rotate-180': isFiltersOpen }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div v-show="isFiltersOpen" class="p-4 bg-white">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Фильтр по типу -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Тип тренировки</label>
            <select
              v-model="selectedType"
              @change="filterTrainings"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Все типы</option>
              <option v-for="type in trainingTypes" :value="type">{{ type }}</option>
            </select>
          </div>

          <!-- Фильтр по сложности -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Уровень сложности</label>
            <select
              v-model="selectedDifficulty"
              @change="filterTrainings"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Любой уровень</option>
              <option v-for="level in difficultyLevels" :value="level">{{ level }}</option>
            </select>
          </div>

          <!-- Фильтр по длительности -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Минимальная длительность (мин)</label
            >
            <input
              type="number"
              v-model="minDuration"
              @input="filterTrainings"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Дополнительные фильтры -->
        <div class="mt-4 pt-4 border-t border-gray-200">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Дополнительные параметры</h4>
          <div class="flex flex-wrap gap-4">
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="onlyPopular"
                @change="filterTrainings"
                class="rounded text-blue-500 focus:ring-blue-500"
              />
              <span class="text-sm">Только популярные</span>
            </label>
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="onlyNew"
                @change="filterTrainings"
                class="rounded text-blue-500 focus:ring-blue-500"
              />
              <span class="text-sm">Только новые</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Список тренировок -->
    <div class="grid gap-4">
      <div
        v-for="training in filteredTrainings"
        :key="training.id"
        class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
      >
        <h3 class="text-xl font-semibold mb-2">{{ training.name }}</h3>
        <p class="text-gray-600"><span class="font-medium">Тип:</span> {{ training.type }}</p>
        <p class="text-gray-600">
          <span class="font-medium">Сложность:</span> {{ training.difficulty }}
        </p>
        <p class="text-gray-600">
          <span class="font-medium">Длительность:</span> {{ training.duration }} мин
        </p>
        <div class="mt-2 flex gap-2">
          <span
            v-if="training.isPopular"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
          >
            Популярная
          </span>
          <span
            v-if="training.isNew"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
          >
            Новая
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedType: '',
      selectedDifficulty: '',
      minDuration: null,
      onlyPopular: false,
      onlyNew: false,
      isFiltersOpen: false,
      trainingTypes: ['Силовая', 'Кардио', 'Йога', 'Кроссфит'],
      difficultyLevels: ['Начинающий', 'Средний', 'Продвинутый'],
      trainings: [
        {
          id: 1,
          name: 'Интервальный бег',
          type: 'Кардио',
          difficulty: 'Средний',
          duration: 30,
          isPopular: true,
          isNew: false,
        },
        {
          id: 2,
          name: 'Йога для начинающих',
          type: 'Йога',
          difficulty: 'Начинающий',
          duration: 45,
          isPopular: false,
          isNew: true,
        },
        {
          id: 3,
          name: 'Тяжелая атлетика',
          type: 'Силовая',
          difficulty: 'Продвинутый',
          duration: 60,
          isPopular: true,
          isNew: true,
        },
      ],
      filteredTrainings: [],
    }
  },
  created() {
    this.filteredTrainings = this.trainings
  },
  methods: {
    filterTrainings() {
      this.filteredTrainings = this.trainings.filter((training) => {
        const matchesSearch = training.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesType = this.selectedType ? training.type === this.selectedType : true
        const matchesDifficulty = this.selectedDifficulty
          ? training.difficulty === this.selectedDifficulty
          : true
        const matchesDuration = this.minDuration ? training.duration >= this.minDuration : true
        const matchesPopular = this.onlyPopular ? training.isPopular : true
        const matchesNew = this.onlyNew ? training.isNew : true

        return (
          matchesSearch &&
          matchesType &&
          matchesDifficulty &&
          matchesDuration &&
          matchesPopular &&
          matchesNew
        )
      })
    },
  },
}
</script>
