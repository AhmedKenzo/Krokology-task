<template>
  <div class="card">
    <div class="stars">
      <span v-for="n in 5" :key="n">⭐</span>
    </div>
    <p class="review">{{ review }}</p>
    <div class="reviewer">
      <img 
        :src="image" 
        alt="Reviewer Image" 
        class="reviewer-img" 
        @click="triggerImageUpload"
      />
      <input 
        type="file" 
        ref="imageInput" 
        @change="handleImageUpload" 
        style="display: none;"
      />
      <div class="reviewer-info">
        <p class="name">{{ name }}</p>
        <p class="company">{{ jobTitle }}</p>
      </div>
    </div>
    <button @click="$emit('remove')">Remove</button>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  name: String,
  jobTitle: String,
  review: String,
  image: String // This can be a URL or base64 image string
})

const emit = defineEmits(['update:image'])

const imageInput = ref(null)

const triggerImageUpload = () => {
  if (imageInput.value) {
    imageInput.value.click()
  }
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      emit('update:image', reader.result) // Emit new image data
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin: 1rem;
 
}

.stars {
  margin-bottom: 0.5rem;
}

.review {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
  height: 100px;
}

.reviewer {
  display: flex;
}

.reviewer-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 0.5rem;
  cursor: pointer;
}

.reviewer-info {
  text-align: left;
}

.name {
  font-weight: bold;
  margin: 0;
}

.company {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
}

button {
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
