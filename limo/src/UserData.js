export const UUserData = {
  id: '',
  age: '',
  activityLevel: '',
  dailyCalories: '',
  gender: '',
  height: '',
  weight: '',
  goal: '',
}

// Или лучше использовать класс:
export class UserModel {
  constructor() {
    this.id = ''
    this.age = ''
    this.activityLevel = ''
    this.dailyCalories = ''
    this.gender = ''
    this.height = ''
    this.weight = ''
    this.goal = ''
  }
}
