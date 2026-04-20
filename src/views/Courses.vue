<template>
  <section>
    <h2>Courses</h2>
    <div v-if="coursesStore.isLoading" class="state-message">Loading courses...</div>
    <CourseList v-else :courses="coursesStore.courses" />
  </section>
</template>

<script>
import CourseList from '../components/CourseList.vue'
import { useCoursesStore } from '../stores/courses'

export default {
  components: {
    CourseList
  },

  data() {
    return {
      coursesStore: useCoursesStore()
    }
  },

  mounted() {
    this.coursesStore.loadCourses()
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 12px;
  color: #0f172a;
}

.state-message {
  padding: 16px;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  color: #475569;
  background: #f8fafc;
}
</style>
