<template>
  <div class="container">
    <div class="carousel">
      <div
        class="carousel-inner"
        :style="{ transform: `translateX(calc(-${currentSlide * (slideWidth + gap)}% + ${offset}%))` }"
      >
        <div
          v-for="(image, index) in images"
          :key="index"
          class="slide"
          :class="{
            active: index === currentSlide,
            previous: index === currentSlide - 1,
            next: index === currentSlide + 1
          }"
        >
          <img :src="image.src" :alt="image.alt" />
          <div class="overlay" v-if="index === currentSlide">
            <h2>The simplest example<br />is kafka + golang</h2>
            <p>This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker.</p>
            <button class="read-more">Read more →</button>
          </div>
        </div>
      </div>

      <div class="carousel-controls">
        <button @click="slideTo(currentSlide - 1)">←</button>
        <button @click="slideTo(currentSlide + 1)">→</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const images = [
  {
    src: 'https://images.pexels.com/photos/1242764/pexels-photo-1242764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Image 1'
  },
  {
    src: 'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Image 2'
  },
  {
    src: 'https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Image 3'
  },
  {
    src: 'https://images.pexels.com/photos/2739013/pexels-photo-2739013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Image 4'
  },
  {
    src: 'https://images.pexels.com/photos/3555161/pexels-photo-3555161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Image 5'
  }
]

const currentSlide = ref(0)

// paramètres pour le calcul du centrage
const slideWidth = 60   // en pourcentage
const gap = 4           // en pourcentage
const offset = 20       // pour recentrer la slide active

function slideTo(index) {
  const total = images.length
  if (index < 0) currentSlide.value = total - 1
  else if (index >= total) currentSlide.value = 0
  else currentSlide.value = index
}
</script>

<style scoped lang="scss">
$bg: #111;
$text: #fff;
$muted: #ccc;

.container {
  background: $bg;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel {
  position: relative;
  width: 100%;
  max-width: 1200px;
  overflow: hidden;
}

.carousel-inner {
  display: flex;
  transition: transform 0.6s ease-in-out;
  gap: 4%;
  padding: 0 5%;
}

.slide {
  flex: 0 0 60%;
  transition: all 0.5s ease-in-out;
  position: relative;
  opacity: 0.2;
  transform: scale(0.85);
  filter: blur(2px);
  pointer-events: none;

  &.active {
    opacity: 1;
    transform: scale(1);
    filter: none;
    pointer-events: auto;
  }

  &.previous,
  &.next {
    opacity: 0.5;
    transform: scale(0.9);
    filter: blur(1px);
  }

  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 2rem;
  }

  .overlay {
    position: absolute;
    color: $text;
    text-align: left;
    max-width: 500px;
    left: 10%;
    bottom: 10%;
    h2 {
      font-size: 1.8rem;
      font-weight: bold;
      margin-bottom: 0.8rem;
    }
    p {
      color: $muted;
      font-size: 1rem;
      margin-bottom: 1.2rem;
    }
    .read-more {
      background: white;
      color: black;
      font-weight: bold;
      padding: 0.6rem 1.5rem;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      transition: background 0.3s;
      &:hover {
        background: #ddd;
      }
    }
  }
}

.carousel-controls {
  position: absolute;
  top: 50%;
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);

  button {
    background: none;
    border: 2px solid white;
    color: white;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background: white;
      color: black;
    }
  }
}
</style>
