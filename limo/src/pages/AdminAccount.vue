<template>
  <div class="admin-container">
    <!-- Шапка админ-панели -->

    <!-- Основное меню -->
    <nav class="admin-nav mt-12 text-[20px]">
      <div class="container mx-auto flex space-x-4 p-2">
        <router-link
          to="/adminUsers"
          class="px-4 py-2 border-2 border-lime-400 rounded-lg hover:bg-lime-50 hover:text-lime-600 cursor-pointer transition-colors"
          active-class="bg-lime-400 text-white hover:bg-lime-500 hover:text-white"
        >
          Пользователи
        </router-link>
      </div>
    </nav>

    <!-- Контент -->
    <main class="admin-content container mx-auto p-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-6">Отчет по пользователям</h2>

        <!-- Фильтры отчетов -->
        <div class="flex flex-wrap gap-4 mb-6">
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium text-gray-700 mb-1">Период</label>
            <select
              v-model="reportPeriod"
              @change="loadUserReports"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">За все время</option>
              <option value="month">За последний месяц</option>
              <option value="week">За последнюю неделю</option>
              <option value="day">За сегодня</option>
            </select>
          </div>

          <button
            @click="exportToExcel"
            class="flex items-center gap-2 bg-lime-300 hover:bg-lime-500 transition-colors px-4 py-2 rounded-md self-end"
          >
            Экспорт в Excel
          </button>
        </div>

        <!-- Статистика -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 class="text-lg font-medium text-blue-800 mb-2">Всего пользователей</h3>
            <p class="text-3xl font-bold text-blue-600">{{ formatNumber(stats.totalUsers) }}</p>
          </div>

          <div class="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 class="text-lg font-medium text-green-800 mb-2">Новых за период</h3>
            <p class="text-3xl font-bold text-green-600">{{ formatNumber(stats.newUsers) }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { orderBy, limit } from 'firebase/firestore'
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'
import * as XLSX from 'xlsx'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      reportPeriod: 'month',
      stats: {
        totalUsers: 0,
        newUsers: 0,
      },
      recentUsers: [],
      allUsers: [],
      isLoading: false,
    }
  },
  async created() {
    await this.loadUserReports()
  },
  methods: {
    async loadUserReports() {
      try {
        this.isLoading = true
        const db = getFirestore()

        const usersQuery = query(collection(db, 'users'))
        const usersSnapshot = await getDocs(usersQuery)
        this.allUsers = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        this.stats.totalUsers = this.allUsers.length

        const periodQuery = this.getPeriodQuery(db)
        const periodSnapshot = await getDocs(periodQuery)
        this.stats.newUsers = periodSnapshot.size
      } catch (error) {
        console.error('Ошибка загрузки отчетов:', error)
      } finally {
        this.isLoading = false
      }
    },

    async exportToExcel() {
      try {
        const data = this.allUsers.map((user) => ({
          ID: user.id,
          Email: user.email,
          'Дата регистрации': user.createdAt?.toDate
            ? format(user.createdAt.toDate(), 'yyyy-MM-dd HH:mm')
            : 'Н/Д',
          Роль: user.role === 'admin' ? 'Админ' : 'Пользователь',
        }))

        const workbook = XLSX.utils.book_new()
        const worksheet = XLSX.utils.json_to_sheet(data)
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Пользователи')

        const date = new Date()
        const filename = `users_export_${format(date, 'yyyy-MM-dd')}.xlsx`
        XLSX.writeFile(workbook, filename)
      } catch (error) {
        console.error('Ошибка экспорта:', error)
        alert('Не удалось выполнить экспорт')
      }
    },

    getPeriodQuery(db) {
      const now = new Date()
      let startDate

      switch (this.reportPeriod) {
        case 'day':
          startDate = new Date(now.setHours(0, 0, 0, 0))
          break
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7))
          break
        case 'month':
          startDate = new Date(new Date().setMonth(new Date().getMonth() - 1))
          break
        default:
          return query(collection(db, 'users'))
      }

      return query(collection(db, 'users'), where('createdAt', '>=', startDate))
    },

    formatDate(timestamp) {
      if (!timestamp?.toDate) return 'Н/Д'
      return format(timestamp.toDate(), 'dd MMM yyyy, HH:mm', { locale: ru })
    },

    formatNumber(num) {
      return new Intl.NumberFormat('ru-RU').format(num)
    },
  },
}
</script>

<style scoped>
.admin-container {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto auto 1fr;
}

.admin-content {
  background-color: #f7fafc;
}
</style>
