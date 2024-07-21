<template>
    <div class="carousel">
      <h2>What Our Customer Said</h2>
      <div class="carousel-container">
        <button class="nav-button left" @click="prevSlide">‹</button>
        <div class="cards-wrapper">
          <div class="cards" :style="sliderStyle">
            <CarouselCard
              v-for="(review, index) in reviews"
              :key="index"
              :name="review.name"
              :jobTitle="review.jobTitle"
              :review="review.review"
              :image="review.image"
              @remove="removeReview(index)"
              @update:image="updateImage(index, $event)"
            />
          </div>
        </div>
        <button class="nav-button right" @click="nextSlide">›</button>
      </div>
      <div class="add-edit">
        <h3>Add / Edit Review Card</h3>
        <input v-model="newReview.name" placeholder="Name" />
        <input v-model="newReview.jobTitle" placeholder="Job Title" />
        <textarea v-model="newReview.review" placeholder="Review"></textarea>
        <button @click="saveReview">Save</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  import { useCarouselStore } from '../stores/carouselStore'
  import CarouselCard from './CarouselCard.vue'
  
  const carouselStore = useCarouselStore()
  const reviews = carouselStore.reviews
  const currentIndex = ref(0)
  
  const newReview = ref({
    name: '',
    jobTitle: '',
    review: '',
    image: 'imgs/1.png'
  })
  
  const saveReview = () => {
    carouselStore.addReview({ ...newReview.value })
    newReview.value.name = ''
    newReview.value.jobTitle = ''
    newReview.value.review = ''
  }
  
  const updateImage = (index, newImage) => {
    carouselStore.updateReviewImage(index, newImage)
  }
  
  const removeReview = (index) => {
    carouselStore.removeReview(index)
  }
  
  const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + reviews.length) % reviews.length
  }
  
  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % reviews.length
  }
  
  const sliderStyle = computed(() => ({
    transform: `translateX(-${currentIndex.value * 100}%)`,
    transition: 'transform 0.5s ease'
  }))
  
  watch(
    () => reviews.length,
    (newLength, oldLength) => {
      if (newLength > oldLength) {
        currentIndex.value = 0
      }
    }
  )
  </script>
  
  <style lang="scss" scoped>
  .carousel {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 1rem;
    color: #405391;
    font-weight: 900;
  }
  
  .carousel-container {
    position: relative;
    overflow: hidden;
  }
  
  .cards-wrapper {
    overflow: hidden;
  }
  
  .cards {
    display: flex;
    transition: transform 0.5s ease;
  }
  
  .card {
    min-width: 33%; // Ensuring each card takes full width of the container
    height: 100%;
    box-sizing: border-box;
  }
  
  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    z-index: 10;
  }
  
  .left {
    left: 0;
  }
  
  .right {
    right: 0;
  }
  
  .add-edit {
    margin-top: 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  
  input, textarea {
    width: 100%; 
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  @media (min-width: 834px) and (max-width: 1194px) {
    .cards {
      flex-direction: column;
      align-items: center;
    }
  }
  </style>
  