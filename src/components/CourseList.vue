<template>
  <section>
    <h3>Available Courses</h3>

    <div v-if="courses.length === 0" class="state-message">
      No courses found.
    </div>

    <div v-else class="table-wrap">
      <table class="course-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in courses" :key="course.id">
            <td>{{ course.name }}</td>
            <td>{{ course.code }}</td>
            <td>{{ course.description || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    courses: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
h3 {
  margin-bottom: 12px;
  color: #0f172a;
}

.table-wrap {
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
}

.course-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 560px;
}

.course-table th,
.course-table td {
  text-align: left;
  padding: 12px 14px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 14px;
}

.course-table thead th {
  background: #f8fafc;
  color: #334155;
  font-weight: 700;
}

.course-table tbody td {
  color: #0f172a;
}

.course-table tbody tr:last-child td {
  border-bottom: none;
}

.state-message {
  padding: 16px;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  color: #475569;
  background: #f8fafc;
}
</style>
