import { defineStore } from 'pinia'

export const useCarouselStore = defineStore('carousel', {
  state: () => ({
    reviews: [
      // Example reviews
      {
        name: 'Anthony',
        jobTitle: 'ABC Company',
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor vestibulum odio, eget convallis enim euismod ut.',
        image: 'imgs/1.png'
      },
      {
        name: 'Sarah',
        jobTitle: 'XYZ Inc',
        review: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        image: 'imgs/2.png'
      },
      {
        name: 'John',
        jobTitle: '123 Ltd',
        review: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        image: 'imgs/3.png'
      }
    ]
  }),
  actions: {
    addReview(review) {
      this.reviews.unshift(review) // Add new review to the beginning of the array
    },
    removeReview(index) {
      this.reviews.splice(index, 1)
    },
    updateReviewImage(index, newImage) {
      if (this.reviews[index]) {
        this.reviews[index].image = newImage
      }
    }
  }
})
