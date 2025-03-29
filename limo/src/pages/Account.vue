<script setup>
import AccountCards from '../components/AccountCards.vue'
</script>

<template>
  <div>
    <AccountCards
      name="Имя Фамилия"
      image-url="/photo.svg"
      trening="/oneTren.svg"
      activeStar="/activeStar.svg"
      noActiveStar="/noActiveStar.svg"
      complexity="Новичок"
      treningDone="0"
      dificult="2"
    />
  </div>
</template>
