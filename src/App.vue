<template>
  <div class="app">
    <!-- TODO: use NavBar component -->
    <!-- Pass :username and :is-logged-in as props -->
    <!-- Listen for @logout event -->
    <NavBar :username="username" :is-logged-in="isLoggedIn" @logout="handleLogout" />

    <main>
      <LoginForm v-if="!isLoggedIn" @login="handleLogin" />

      <div v-if="isLoggedIn">
        <!-- TODO: when logged in, show the dashboard -->
        <!-- Include SearchBar, AddStudentForm, and StudentCards -->
        <h2>Student Dashboard</h2>
        <div class="dashboard-tabs">
            <button type="button" class="tab-button" :class="{ active: activeTab === 'list' }" @click="activeTab = 'list'">Student List</button>
            <button type="button" class="tab-button" :class="{ active: activeTab === 'create' }" @click="activeTab = 'create'">Create Student</button>
          <button type="button" class="tab-button" :class="{ active: activeTab === 'courses' }" @click="activeTab = 'courses'">Courses</button>
        </div>

                
        <div v-if="activeTab === 'list'" class="tab-panel">
          <SearchBar @search="searchTerm = $event" />
            
          <div v-if="isLoading" class="state-message">Loading students...</div>
          <div v-else-if="filteredStudents.length === 0" class="state-message">No students found.</div>
            <div v-else class="card-grid">
                <StudentCard
                    v-for="student in filteredStudents"
                    :key="student.id"
                    :student="student"
                    @delete="handleDelete"
                  @update="handleUpdateStudent"
                />
            </div>
        </div>

        <div v-if="activeTab === 'create'" class="tab-panel">
          <AddStudentForm :courses="courses" @student-added="handleStudentAdded" />
        </div>

        <div v-if="activeTab === 'courses'" class="tab-panel">
          <CourseList :courses="courses" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// TODO: import your components
// import NavBar from './components/NavBar.vue'
// import LoginForm from './components/LoginForm.vue'
// import SearchBar from './components/SearchBar.vue'
// import AddStudentForm from './components/AddStudentForm.vue'
// import StudentCard from './components/StudentCard.vue'
import LoginForm from './components/LoginForm.vue'
import NavBar from './components/NavBar.vue'
import StudentCard from './components/StudentCard.vue'
import SearchBar from './components/SearchBar.vue'
import AddStudentForm from './components/AddStudentForm.vue'
import CourseList from './components/CourseList.vue'

const API_URL = "http://localhost:8000/api"

export default {
  components: {
    // TODO: register your components here
    LoginForm,
    NavBar,
    StudentCard,
    SearchBar,
    AddStudentForm,
    CourseList

  },

  data() {
    return {
      // Auth
      isLoggedIn: false,
      username: "",

      // Dashboard UI
      activeTab: "list",

      // Students
      students: [],
      courses: [],
      isLoading: false,
      searchTerm: ""
    }
  },

  computed: {
    // TODO: filteredStudents — filter this.students by this.searchTerm
    filteredStudents() {
      if (!this.searchTerm) {
        return this.students;
      }
      const term = this.searchTerm.toLowerCase();
      return this.students.filter(student =>
        student.name.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term)
      );
    }
  },

  methods: {
    // TODO: handleLogin(credentials)
    // - POST to API_URL + "/token/" with credentials.username and credentials.password
    // - Store token in localStorage
    // - Set isLoggedIn = true, username = credentials.username
    // - Call this.loadStudents()
    async handleLogin(credentials) {
      try {
        const response = await fetch(API_URL + "/token/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password
          })
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("username", credentials.username);
        this.isLoggedIn = true;
        this.username = credentials.username;
        this.loadStudents();
        this.loadCourses();
      } catch (error) {
        console.error(error);
        // Optionally, you can set an error message to show in the UI
      }
    },

    // TODO: handleLogout()
    // - Clear localStorage
    // - Set isLoggedIn = false, students = []
    handleLogout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("username");
      this.isLoggedIn = false;
      this.students = [];
      this.courses = [];
    },




    // TODO: loadStudents()
    // - GET from API_URL + "/students/" with Authorization header
    // - Set this.students with the response
    async loadStudents() {
      this.isLoading = true;
      try {
        const response = await fetch(API_URL + "/students/", {
          headers: {
            "Authorization": "Bearer " + this.getToken()
          }
        });

        if (!response.ok) {
          throw new Error("Failed to load students");
        }

        const data = await response.json();
        this.students = Array.isArray(data) ? data : (Array.isArray(data.results) ? data.results : []);
      } catch (error) {
        console.error(error);
        // Optionally, you can set an error message to show in the UI
      } finally {
        this.isLoading = false;
      }
    },

    // TODO: loadCourses()
    // GET from API_URL + "/courses/" with Authorization header
    // Store courses in a data property (not shown here) for use in the add student form
      async loadCourses() {
        try {
          const response = await fetch(API_URL + "/courses/", {
            headers: {
              "Authorization": "Bearer " + this.getToken()
            }
          });
          const data = await response.json();
          // Store courses in a data property (not shown here) for use in the add student form
          this.courses = Array.isArray(data) ? data : (Array.isArray(data.results) ? data.results : []);
        } catch (error) {
          console.error(error);
        }
      },


    // TODO: handleStudentAdded(studentData)
    // - POST to API_URL + "/students/" with studentData
    // - Call this.loadStudents() to refresh
    async handleStudentAdded(studentData) {
      try {
        const response = await fetch(API_URL + "/students/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.getToken()
          },
          body: JSON.stringify(studentData)
        });

        await response.json();
        this.loadStudents();
        this.activeTab = "list";
      } catch (error) {
        console.error(error);
      }
    },


    // TODO: handleDelete(id)
    // - DELETE to API_URL + "/students/" + id + "/"
    // - Remove from this.students
    async handleDelete(id) {
      try {
        const response = await fetch(`${API_URL}/students/${id}/`, {
          method: "DELETE",
          headers: {
            "Authorization": "Bearer " + this.getToken()
          }
        });

        if (!response.ok) {
          throw new Error("Failed to delete student");
        }

        // Remove the deleted student from the list
        this.students = this.students.filter(student => student.id !== id);
      } catch (error) {
        console.error(error);
      }
    },

    async handleUpdateStudent(updatedStudent) {
      try {
        const response = await fetch(`${API_URL}/students/${updatedStudent.id}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.getToken()
          },
          body: JSON.stringify(updatedStudent)
        });

        if (!response.ok) {
          throw new Error("Failed to update student");
        }

        const savedStudent = await response.json();
        this.students = this.students.map(student =>
          student.id === savedStudent.id ? savedStudent : student
        );
      } catch (error) {
        console.error(error);
        throw error;
      }
    },


    getToken() {
      return localStorage.getItem("access_token")
    }
  },

  mounted() {
    // TODO: check if token exists in localStorage
    // If yes, set isLoggedIn = true and call this.loadStudents()
    const token = this.getToken();
    if (token) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem("username") || "";
      this.loadStudents();
      this.loadCourses();
    }
  }
}
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  background-color: #f5f7fa;
  color: #333;
  line-height: 1.6;
}

.app {
  min-height: 100vh;
}

main {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
}

h2 {
  margin-bottom: 20px;
  color: #0f172a;
}

.dashboard-tabs {
  display: inline-flex;
  gap: 8px;
  padding: 6px;
  margin-bottom: 18px;
  border-radius: 12px;
  background: #e2e8f0;
}

.tab-button {
  border: 0;
  border-radius: 8px;
  padding: 9px 14px;
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.tab-button:hover {
  background: #cbd5e1;
}

.tab-button.active {
  color: #ffffff;
  background: #2563eb;
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.32);
}

.tab-button:active {
  transform: translateY(1px);
}

.tab-panel {
  padding-top: 6px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 14px;
}

.state-message {
  padding: 16px;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  color: #475569;
  background: #f8fafc;
}

@media (max-width: 640px) {
  main {
    padding: 20px;
  }

  .dashboard-tabs {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .tab-button {
    width: 100%;
  }
}
</style>
