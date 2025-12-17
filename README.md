# 📝 Todo Application

> A modern, full-stack project and task management application built with enterprise-grade technologies.

![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=flat&logo=angular)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.0-6DB33F?style=flat&logo=spring)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?style=flat&logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)

---

## ✨ Overview

This application provides a complete solution for managing projects and tasks with a beautiful, intuitive interface. Built with modern web technologies, it demonstrates best practices in full-stack development, security, and user experience design.

### Key Highlights

- 🔐 **Secure Authentication** - JWT-based authentication system
- 📊 **Project Management** - Organize work into distinct projects
- ✅ **Task Tracking** - Create, manage, and complete tasks
- 📅 **Due Date Management** - Set and track task deadlines
- 🎨 **Modern UI/UX** - Responsive design with smooth animations
- 🚀 **RESTful API** - Clean, well-documented backend architecture

---

## 🛠️ Technology Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Spring Boot 3.4.0** | Backend framework |
| **Spring Security** | Authentication & authorization |
| **Spring Data JPA** | Database ORM |
| **PostgreSQL** | Relational database |
| **JWT (JSON Web Tokens)** | Secure authentication |
| **Maven** | Dependency management |

### Frontend
| Technology | Purpose |
|------------|---------|
| **Angular 19** | Frontend framework |
| **TypeScript** | Type-safe JavaScript |
| **RxJS** | Reactive programming |
| **Angular Router** | Client-side routing |
| **Modern CSS** | Responsive styling |

---

## 📋 Features

✅ User registration and authentication  
✅ Secure JWT token-based session management  
✅ Create, view, update, and delete projects  
✅ Add tasks to projects with descriptions  
✅ Set due dates for tasks  
✅ Mark tasks as completed  
✅ Delete tasks and projects  
✅ Responsive design for all devices  
✅ Clean, modern user interface  
✅ Protected routes and API endpoints  

---

## 📂 Project Structure

```
Project Management/
│
├── todo-app/                          # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/todo_app/
│   │   │   │   ├── config/          # Security configuration
│   │   │   │   ├── controller/      # REST API controllers
│   │   │   │   ├── entity/          # JPA entities (models)
│   │   │   │   ├── repository/      # Database repositories
│   │   │   │   ├── security/        # JWT utilities
│   │   │   │   └── service/         # Business logic
│   │   │   └── resources/
│   │   │       ├── application.properties.example
│   │   │       └── application.properties (not in git)
│   │   └── test/
│   ├── pom.xml                       # Maven dependencies
│   └── .gitignore
│
└── todo-app-frontend/                 # Frontend (Angular)
    ├── src/
    │   ├── app/
    │   │   ├── components/          # UI components
    │   │   │   ├── login/
    │   │   │   ├── register/
    │   │   │   ├── projects/
    │   │   │   └── tasks/
    │   │   ├── services/            # API services
    │   │   ├── models/              # TypeScript interfaces
    │   │   ├── interceptors/        # HTTP interceptors
    │   │   └── guards/              # Route guards
    │   ├── assets/
    │   └── index.html
    ├── package.json                  # npm dependencies
    └── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- ☑️ **Java 17 or higher** ([Download](https://www.oracle.com/java/technologies/downloads/))
- ☑️ **Node.js 18+ and npm** ([Download](https://nodejs.org/))
- ☑️ **PostgreSQL 14+** ([Download](https://www.postgresql.org/download/))
- ☑️ **Maven 3.6+** ([Download](https://maven.apache.org/download.cgi))
- ☑️ **Angular CLI** (Install: `npm install -g @angular/cli`)

### Installation Guide

#### Step 1: Database Setup

1. **Start PostgreSQL** service on your machine

2. **Create the database:**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE todoapp;

# Exit
\q
```

3. **Verify the database exists:**
```bash
psql -U postgres -l
```

#### Step 2: Backend Configuration

1. **Navigate to the backend directory:**
```bash
cd todo-app
```

2. **Create configuration file:**
```bash
cd src/main/resources
cp application.properties.example application.properties
```

3. **Edit `application.properties`** with your database credentials:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/todoapp
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

# Important: Generate a secure JWT secret
jwt.secret=YOUR_SECURE_SECRET_KEY
jwt.expiration=86400000
```

💡 **Tip:** Generate a secure JWT secret:
```bash
# Linux/Mac
openssl rand -base64 64

# Windows PowerShell
[Convert]::ToBase64String((1..64|%{Get-Random -Max 256}))
```

4. **Build the project:**
```bash
mvn clean install
```

5. **Start the backend server:**
```bash
mvn spring-boot:run
```

✅ **Backend running at:** `http://localhost:8911`



#### Step 3: Frontend Configuration

1. **Navigate to the frontend directory:**
```bash
cd todo-app-frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Verify API URL** (optional):

Open `src/app/services/api.service.ts` and confirm:
```typescript
private baseUrl = 'http://localhost:8911/api';
```

4. **Start the development server:**
```bash
ng serve
```

✅ **Frontend running at:** `http://localhost:4200`

5. **Open in browser:**
```
http://localhost:4200
```

---

## 🎯 Usage Guide

### Creating Your First Project

1. **Register** a new account or **login** with existing credentials
2. Click **"+ Nouveau Projet"** button
3. Enter project title and description
4. Click **"Créer"** to save

### Managing Tasks

1. Click **"Voir les tâches"** on any project card
2. Click **"+ Nouvelle Tâche"** to add a task
3. Fill in task details and due date
4. Click checkbox to mark task as completed
5. Click **×** button to delete a task

### Organizing Your Work

- Create separate projects for different areas (Work, Personal, etc.)
- Add descriptive task titles and details
- Set due dates to track deadlines
- Mark tasks complete to track progress
- Delete completed tasks or entire projects when finished

---

## 🔐 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/auth/register` | Register new user | None |
| POST | `/api/auth/login` | Login user | None |


### Project Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/projects` | Get all user projects | Required |
| GET | `/api/projects/{id}` | Get project by ID | Required |
| POST | `/api/projects` | Create new project | Required |
| DELETE | `/api/projects/{id}` | Delete project | Required |

### Task Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/tasks/{projectId}` | Get tasks for project | Required |
| POST | `/api/tasks/{projectId}` | Create new task | Required |
| PUT | `/api/tasks/complete/{taskId}` | Toggle task completion | Required |
| DELETE | `/api/tasks/{taskId}` | Delete task | Required |

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** Backend won't start
- ✅ Verify PostgreSQL is running: `pg_isready`
- ✅ Check database credentials in `application.properties`
- ✅ Ensure port 8911 is available: `netstat -ano | findstr :8911`
- ✅ Review logs for error messages

**Problem:** Database connection errors
- ✅ Verify database exists: `psql -U postgres -l`
- ✅ Check username and password are correct
- ✅ Ensure PostgreSQL service is running

### Frontend Issues

**Problem:** Frontend won't start
- ✅ Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- ✅ Clear Angular cache: `rm -rf .angular`
- ✅ Verify Angular CLI: `ng version`

**Problem:** CORS errors
- ✅ Check backend CORS configuration in `SecurityConfig.java`
- ✅ Verify API URL in `api.service.ts`
- ✅ Restart both frontend and backend

### Authentication Issues

**Problem:** 401 Unauthorized errors
- ✅ Clear browser localStorage and login again
- ✅ Verify JWT secret is consistent in backend
- ✅ Check token expiration time
- ✅ Ensure interceptor is adding Authorization header

---

## 🔒 Security Notes

⚠️ **Important Security Practices:**

1. **Never commit sensitive files:**
   - `application.properties` (contains database credentials)
   - `.env` files
   - Any file with passwords or API keys

2. **Use strong JWT secrets:**
   - Minimum 256 bits
   - Generate randomly
   - Change for production

3. **Database security:**
   - Use strong passwords
   - Limit database user permissions
   - Use environment variables in production

4. **HTTPS in production:**
   - Always use HTTPS for deployed applications
   - Configure SSL/TLS certificates

---

## 📦 Building for Production

### Backend

```bash
cd todo-app
mvn clean package
java -jar target/todo-app-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
cd todo-app-frontend
ng build --configuration production
# Output will be in dist/ folder
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 👤 Author

**Kaoutar MOUH**

📧 Email: kaoutarmouh7@gmail.com  
💼 GitHub: [@yourusername](https://github.com/MOUH KAOUTAR)

---

## 🙏 Acknowledgments

Special thanks to:

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Angular Documentation](https://angular.io/docs)
- [PostgreSQL Community](https://www.postgresql.org/community/)
- All open-source contributors who make projects like this possible

---



## 💡 Support

If you find this project helpful, please consider:

⭐ Starring the repository  
🐛 Reporting bugs or issues  
💬 Sharing feedback and suggestions  

**Happy coding!** 