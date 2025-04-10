<template>
  <div>
    <div v-if="trainings.length > 0" class="grid gap-4">
      <div
        v-for="training in trainings"
        :key="training.id"
        class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow relative"
      >
        <!-- Кнопка удаления (только для админов) -->
        <button
          v-if="isAdmin"
          @click="handleDelete(training.id)"
          class="absolute top-4 right-4 p-1 text-red-500 hover:text-red-700 transition-colors"
          title="Удалить тренировку"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
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

        <h3 class="text-xl font-semibold mb-2">{{ training.name }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <p class="text-gray-600">
            <span class="font-medium">Место:</span> {{ training.location }}
          </p>
          <!-- Остальные поля тренировки -->
        </div>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12 mx-auto text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900">Тренировки не найдены</h3>
      <p class="mt-1 text-gray-500">Попробуйте изменить параметры поиска или фильтры</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trainings: Array,
    searchQuery: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleDelete(trainingId) {
      if (confirm('Вы уверены, что хотите удалить эту тренировку?')) {
        this.$emit('delete-training', trainingId)
      }
    },
  },
}
</script>
