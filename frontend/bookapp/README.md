# Book Tracking Application

A full-stack web application for managing your personal book collection with notes, exports, and daily inspiration. Built with React (Chakra UI) frontend and Flask backend.

## Features

- 📚 Book Collection Management
  - Add/edit/delete books
  - View all books in a clean table format
- 📝 Notes & Highlights
  - Add private notes to each book
  - View notes history with timestamps
- 📤 Export Functionality
  - Export your entire library to CSV
  - One-click download capability
- 💡 Daily Reading Inspiration
  - Get random book-related quotes
  - Refresh for new motivation
- 🔒 User Authentication
  - Secure registration/login
  - Protected routes

## Technologies Used

**Frontend**
- React.js
- Chakra UI
- React Router
- Axios

**Backend**
- Python Flask
- SQLAlchemy
- SQLite

## Installation

### Backend Setup
```bash
cd Backend
pip install -r requirements.txt
python app.py
```

### Frontend Setup
```bash
cd frontend/bookapp
npm install
npm start
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/books` | GET | Get all books |
| `/api/books` | POST | Add new book |
| `/api/books/{id}/notes` | GET | Get notes for a book |
| `/api/notes` | POST | Add new note |
| `/api/notes/{id}` | DELETE | Delete a note |
| `/api/export` | GET | Export books as CSV |
| `/api/daily` | GET | Get daily book quote |

## Usage

1. Start both backend and frontend servers
2. Register a new account or login
3. Add books using the "Add Book" button
4. Click "Notes" on any book to add insights
5. Use the navigation menu to:
   - Export your library
   - Get daily quotes
   - Manage your account

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss proposed changes.
