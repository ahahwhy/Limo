<template>
  <div class="admin-users-container p-6">
    <nav class="mt-12 text-[20px]">
      <div class="container mx-auto flex space-x-4 p-2">
        <router-link
          to="/adminAccount"
          class="px-4 py-2 border-2 border-lime-400 rounded-lg hover:bg-lime-50 hover:text-lime-600 cursor-pointer transition-colors"
          active-class="bg-lime-400 text-white hover:bg-lime-500 hover:text-white"
        >
          Статистика
        </router-link>
      </div>
    </nav>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold mb-6">Управление пользователями</h2>

      <!-- Форма добавления нового пользователя -->
      <div class="mb-8 p-4 border border-gray-200 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Добавить нового пользователя</h3>
        <form @submit.prevent="registerNewUser" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="newUser.email"
              type="email"
              required
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input
              v-model="newUser.password"
              type="password"
              required
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Роль</label>
            <select v-model="newUser.role" class="w-full p-2 border border-gray-300 rounded-md">
              <option value="user">Пользователь</option>
              <option value="admin">Администратор</option>
            </select>
          </div>
          <button
            type="submit"
            class="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-md"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Сохранение...' : 'Зарегистрировать' }}
          </button>
        </form>
      </div>

      <!-- Список пользователей -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Список пользователей</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Роль
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Дата регистрации
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Действия
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    "
                    class="px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {{ user.role === 'admin' ? 'Админ' : 'Пользователь' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(user.createdAt) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button
                    @click="deleteUser(user.id)"
                    class="text-red-600 hover:text-red-900 mr-4"
                    :disabled="currentUser?.uid === user.id"
                    :title="currentUser?.uid === user.id ? 'Нельзя удалить себя' : ''"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  deleteUser as deleteAuthUser,
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export default {
  name: 'AdminUsers',
  data() {
    return {
      users: [],
      newUser: {
        email: '',
        password: '',
        role: 'user',
      },
      isLoading: false,
      currentUser: null,
    }
  },
  async created() {
    const auth = getAuth()
    this.currentUser = auth.currentUser
    await this.loadUsers()
  },
  methods: {
    async loadUsers() {
      try {
        this.isLoading = true
        const db = getFirestore()
        const querySnapshot = await getDocs(collection(db, 'users'))
        this.users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      } catch (error) {
        console.error('Ошибка загрузки пользователей:', error)
      } finally {
        this.isLoading = false
      }
    },

    async registerNewUser() {
      try {
        this.isLoading = true
        const auth = getAuth()
        const db = getFirestore()

        // 1. Создаем пользователя в Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.newUser.email,
          this.newUser.password,
        )

        // 2. Добавляем запись в Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: this.newUser.email,
          role: this.newUser.role,
          createdAt: serverTimestamp(),
        })

        // 3. Обновляем список
        await this.loadUsers()

        // 4. Очищаем форму
        this.newUser = {
          email: '',
          password: '',
          role: 'user',
        }

        alert('Пользователь успешно зарегистрирован!')
      } catch (error) {
        console.error('Ошибка регистрации:', error)
        alert(`Ошибка: ${error.message}`)
      } finally {
        this.isLoading = false
      }
    },

    async deleteUser(userId) {
      if (!confirm('Вы уверены, что хотите удалить этого пользователя?')) return

      try {
        this.isLoading = true
        const auth = getAuth()
        const db = getFirestore()

        if (this.currentUser?.uid !== userId) {
          const userToDelete = auth.currentUser
        }
        await deleteDoc(doc(db, 'users', userId))
        await this.loadUsers()
        alert('Пользователь удален!')
      } catch (error) {
        console.error('Ошибка удаления:', error)
        alert(`Ошибка: ${error.message}`)
      } finally {
        this.isLoading = false
      }
    },

    formatDate(timestamp) {
      if (!timestamp?.toDate) return 'Н/Д'
      return format(timestamp.toDate(), 'dd MMM yyyy HH:mm', { locale: ru })
    },
  },
}
</script>

<style scoped>
.admin-users-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
