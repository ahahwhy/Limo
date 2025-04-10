<template>
  <div class="container mx-auto px-4 py-8 w-full mt-8">
    <!-- Строка поиска и фильтров -->
    <div class="flex gap-3 mb-6">
      <!-- Поиск -->
      <div class="flex-1">
        <input
          type="text"
          placeholder="Поиск тренировок..."
          v-model="searchQuery"
          @input="filterTrainings"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Кнопка фильтров -->
      <button
        @click="isFiltersOpen = !isFiltersOpen"
        class="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-lime-400 hover:bg-lime-500 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-white"
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
        <span class="hidden sm:inline">Фильтры</span>
      </button>

      <!-- Кнопка добавить -->
      <AddTrainingButton @add-training="showAddForm = true" />
    </div>

    <!-- Форма добавления -->
    <AddTrainingForm v-if="showAddForm" @submit="handleAddTraining" @cancel="showAddForm = false" />

    <!-- Фильтры -->
    <div
      v-if="isFiltersOpen"
      class="mb-6 border border-gray-300 rounded-lg overflow-hidden bg-gray-50 p-4 shadow-sm"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Место проведения -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Место проведения</label>
          <select
            v-model="selectedLocation"
            @change="filterTrainings"
            class="w-full px-3 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Любое</option>
            <option v-for="location in locations" :value="location">{{ location }}</option>
          </select>
        </div>

        <!-- Уровень подготовки -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Уровень подготовки</label>
          <select
            v-model="selectedDifficulty"
            @change="filterTrainings"
            class="w-full px-3 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Любой</option>
            <option v-for="level in difficultyLevels" :value="level">{{ level }}</option>
          </select>
        </div>

        <!-- Пол -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Пол</label>
          <select
            v-model="selectedGender"
            @change="filterTrainings"
            class="w-full px-3 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Любой</option>
            <option v-for="gender in genders" :value="gender">{{ gender }}</option>
          </select>
        </div>

        <!-- Цель тренировки -->
        <div class="md:col-span-2 lg:col-span-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Цель тренировки</label>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            <label v-for="goal in trainingGoals" class="flex items-center gap-2">
              <input
                type="checkbox"
                :value="goal"
                v-model="selectedGoals"
                @change="filterTrainings"
                class="rounded text-blue-500 focus:ring-blue-500 h-4 w-4"
              />
              <span class="text-sm">{{ goal }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Список тренировок -->
    <TrainingsList
      :trainings="filteredTrainings"
      :search-query="searchQuery"
      :is-admin="isAdmin"
      @delete-training="handleDeleteTraining"
      @reset-filters="resetFilters"
    />
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getDoc } from 'firebase/firestore'
import AddTrainingButton from '@/components/AddTrainingButton.vue'
import AddTrainingForm from '@/components/AddTrainingForm.vue'
import TrainingsList from '@/components/TrainingsList.vue'

export default {
  components: { AddTrainingButton, AddTrainingForm, TrainingsList },
  data() {
    return {
      showAddForm: false,
      searchQuery: '',
      isFiltersOpen: false,
      isAdmin: false,
      selectedLocation: '',
      selectedDifficulty: '',
      selectedGender: '',
      selectedGoals: [],
      locations: ['В зале', 'На улице', 'Дома', 'Бассейн', 'Студия'],
      difficultyLevels: ['Начинающий', 'Средний', 'Продвинутый'],
      genders: ['Мужской', 'Женский', 'Смешанный'],
      trainingGoals: [
        'Похудение',
        'Рельеф',
        'Масса и сила',
        'Йога',
        'Танцы',
        'Растяжка',
        'Для детей',
        'Кардио',
        'Реабилитация',
      ],
      trainings: [],
      filteredTrainings: [],
      isLoading: false,
    }
  },
  async created() {
    await this.checkAdminStatus()
    await this.loadTrainings()
  },
  methods: {
    async checkAdminStatus() {
      const auth = getAuth()
      const user = auth.currentUser
      if (user) {
        const db = getFirestore()
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        this.isAdmin = userDoc.data()?.role === 'admin'
      }
    },

    async handleDeleteTraining(trainingId) {
      if (!confirm('Вы уверены, что хотите удалить эту тренировку?')) return

      try {
        const db = getFirestore()
        await deleteDoc(doc(db, 'trainings', trainingId))
        this.trainings = this.trainings.filter((t) => t.id !== trainingId)
        this.filteredTrainings = this.filteredTrainings.filter((t) => t.id !== trainingId)
        alert('Тренировка успешно удалена')
      } catch (error) {
        console.error('Ошибка удаления:', error)
        alert('Не удалось удалить тренировку: ' + error.message)
      }
    },

    async loadTrainings() {
      try {
        this.isLoading = true
        const db = getFirestore()
        const q = query(collection(db, 'trainings'), orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)

        this.trainings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        this.filteredTrainings = [...this.trainings]
      } catch (error) {
        console.error('Ошибка загрузки:', error)
      } finally {
        this.isLoading = false
      }
    },

    async handleAddTraining(newTraining) {
      try {
        this.trainings.unshift(newTraining)
        this.filteredTrainings.unshift(newTraining)
        this.showAddForm = false
      } catch (error) {
        console.error('Ошибка добавления:', error)
        throw error
      }
    },

    filterTrainings() {
      this.filteredTrainings = this.trainings.filter((training) => {
        const matchesSearch = training.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesLocation = this.selectedLocation
          ? training.location === this.selectedLocation
          : true
        const matchesDifficulty = this.selectedDifficulty
          ? training.difficulty === this.selectedDifficulty
          : true
        const matchesGender = this.selectedGender ? training.gender === this.selectedGender : true
        const matchesGoals =
          this.selectedGoals.length > 0
            ? this.selectedGoals.some((goal) => training.goals.includes(goal))
            : true

        return (
          matchesSearch && matchesLocation && matchesDifficulty && matchesGender && matchesGoals
        )
      })
    },

    resetFilters() {
      this.selectedLocation = ''
      this.selectedDifficulty = ''
      this.selectedGender = ''
      this.selectedGoals = []
      this.filterTrainings()
    },
  },
}
</script>
