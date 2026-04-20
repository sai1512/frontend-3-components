<template>
  <div class="card">
    <!-- View Mode -->
    <div v-if="!isEditMode">
      <h3>{{ student.name }}</h3>
      <p>Email: {{ student.email }}</p>
      <p>Grade: {{ student.grade }}</p>
      <div class="button-group">
        <button @click="$emit('view', student.id)" class="view-btn">View</button>
        <button @click="toggleEdit" class="edit-btn">Edit</button>
        <button @click="$emit('delete', student.id)" class="delete-btn">Delete</button>
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else>
      <input v-model="formData.name" placeholder="Name" class="input-field" />
      <input v-model="formData.email" placeholder="Email" class="input-field" />
      <input v-model="formData.grade" placeholder="Grade" class="input-field" />

      <div class="button-group">
        <button @click="saveChanges" class="save-btn">Save</button>
        <button @click="toggleEdit" class="cancel-btn">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    student: {
      type: Object,
      required: true
    },
  },

  data() {
    return {
      isEditMode: false,
      formData: {
        name: '',
        email: '',
        grade: ''
      }
    }
  },

  methods: {
    toggleEdit() {
      if (!this.isEditMode) {
        this.formData = { ...this.student };
      }
      this.isEditMode = !this.isEditMode;
    },

    saveChanges() {
      this.$emit('update', {
        ...this.student,
        ...this.formData
      });
      this.isEditMode = false;
    }
  },
  emits: ['delete', 'update', 'view']
}
</script>

<style scoped>


/* TODO: style the card content and delete button */
.card {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
}

.card h3 {
  margin: 0 0 10px;
  color: #0f172a;
  font-size: 18px;
}

.card p {
  margin: 4px 0;
  color: #475569;
  font-size: 14px;
}

.card button {
  margin-top: 12px;
  background: #dc2626;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.card button:hover {
  background: #b91c1c;
}

.button-group {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.card .edit-btn {
  background: #3b82f6;
}

.card .edit-btn:hover {
  background: #2563eb;
}

.card .view-btn {
  background: #007bff;
}

.card .view-btn:hover {
  background: #0056b3;
}

.card .delete-btn {
  background: #dc2626;
}

.card .delete-btn:hover {
  background: #b91c1c;
}

.card .save-btn {
  background: #10b981;
}

.card .save-btn:hover:not(:disabled) {
  background: #059669;
}

.card .save-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.card .cancel-btn {
  background: #6b7280;
}

.card .cancel-btn:hover {
  background: #4b5563;
}

.input-field {
  width: 100%;
  padding: 8px 10px;
  margin: 8px 0;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}
</style>
