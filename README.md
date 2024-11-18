# To-Do List Application

This repository contains a web-based To-Do List application built using **HTML, CSS, JavaScript** (Frontend) and **Node.js with Express** (Backend). It provides basic task management functionality such as adding, editing, deleting, and marking tasks as completed, with persistence across page refreshes.

---

## Features

- **Add Tasks:** Create tasks with a title and description through a popup form.
- **Edit Tasks:** Modify task details via a popup form.
- **Delete Tasks:** Remove tasks individually.
- **Task Completion:** Mark tasks as completed. Completed tasks:
  - Hide the edit button.
  - Change the background color of the delete button.
- **Feedback Messages:** Display success or error messages for all actions.
- **Data Persistence:** Tasks and their states persist even after refreshing the page.

---

## Demo

![To-Do List UI](https://via.placeholder.com/800x400)  
*(Replace this placeholder with an actual screenshot of your application)*

---

## Setup Instructions

### Prerequisites

1. **Node.js** and **npm** installed. [Download Node.js](https://nodejs.org/).
2. **Git** installed. [Download Git](https://git-scm.com/).

### Clone the Repository

```bash
git clone https://github.com/Pasandul2/Simple-To-Do-List-Web-Application.git
cd Simple-To-Do-List-Web-Application
```

### Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the backend server:
```bash
node server.js
```

 #### The server runs on http://localhost:3000.

### Frontend Setup

#### Navigate to the frontend folder:

```bash
cd frontend
```

#### Open the index.html file in your browser:

You can either double-click the index.html file or serve it using an HTTP server.

## Usage

#### 1. Click the "Add Task" button to open the popup form.
#### 2. Fill in the task title and description, then submit to add the task.
#### 3. Tasks will appear as a list with checkboxes, edit, and delete buttons.
#### 4. Mark a task as completed by checking the checkbox. The edit button will be hidden, and the delete button's background color will change.
#### 5. Refreshing the page will retain all tasks and their states.

## Assumptions & Simplifications

#### Data Storage:Tasks are stored in memory in the backend for simplicity. A database like MongoDB or SQLite can be integrated for full persistence.
#### CORS Configuration: Designed for local communication between frontend and backend only.
#### Styling: Basic CSS is used. Feel free to enhance the design.

## Project Structure

Simple-To-Do-List-Web-Application/
│
├── backend/
│   ├── server.js         # Node.js backend
│   └── package.json      # Backend dependencies
│
├── frontend/
│   ├── index.html        # HTML file for the frontend
│   ├── style.css         # Stylesheet
│   └── script.js         # JavaScript for UI interactions
│
└── README.md             # Documentation


Author
Pamith Pasandul
GitHub: https://github.com/Pasandul2

