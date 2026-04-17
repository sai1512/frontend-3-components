<template>
  <div class="card">
    <h3>Add New Student</h3>
    <!-- TODO: form with @submit.prevent that calls submit() -->
    <!-- TODO: v-model inputs for name, email -->
    <!-- TODO: v-model select for grade -->
    <!-- TODO: v-model.number input for courseId -->
    <!-- TODO: submit button -->
    <form @submit.prevent="submit">
      <input type="text" v-model="name" placeholder="Name" required>
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="text" v-model="grade" placeholder="Grade" required>
      <select v-model.number="courseId" required>
          <option value="" disabled>Select Course</option>
          <option v-for="course in courses" :key="course.id" :value="course.id">
              {{ course.name }}
          </option>
      </select>
      <button type="submit">Add Student</button>
    </form>

  </div>
</template>

<script>
export default {
  props: {
    courses: {
      type: Array,
      default: () => []
    }
  },

  emits: ['student-added'],

  data() {
    return {
      // TODO: local form state — name, email, grade, courseId
      name: "",
      email: "",
      grade: "",
      courseId: null
    }
  },

  methods: {
    // TODO: submit()
    // Emit 'student-added' with { name, email, grade, course: this.courseId }
    // Clear the form fields after emitting
    submit() {
      this.$emit('student-added', {
        name: this.name,
        email: this.email,
        grade: this.grade,
        course: this.courseId
      });
      this.name = "";
      this.email = "";
      this.grade = "";
      this.courseId = null;
    }
  }
}
</script>

<style scoped>
.card {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

h3 {
  margin-bottom: 12px;
  color: #0f172a;
  font-size: 20px;
}

form {
  display: grid;
  gap: 12px;
}

input,
select,
button {
  width: 100%;
  font: inherit;
  border-radius: 10px;
}

input,
select {
  padding: 11px 12px;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #0f172a;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus,
select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.14);
}

button {
  padding: 12px 14px;
  border: 0;
  background: #2563eb;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

button:hover {
  background: #1d4ed8;
}

button:active {
  transform: translateY(1px);
}
</style>
