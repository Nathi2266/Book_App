from flask import Flask, request, jsonify, render_template, g, Response
from flask_cors import CORS
from support import init_db, get_db_session, close_db_session, Book, Note
import os
import datetime
import csv
from io import StringIO
import random

app = Flask(__name__)
CORS(app)

# Initialize database
init_db()

# Add these quotes (you can expand this list)
DAILY_QUOTES = [
    "The more that you read, the more things you will know. – Dr. Seuss",
    "A room without books is like a body without a soul. – Cicero",
    "Books are a uniquely portable magic. – Stephen King"
]

@app.before_request
def before_request():
    g.db = get_db_session()

@app.teardown_request
def teardown_request(exception=None):
    close_db_session()

# Updated API routes
@app.route('/api/books', methods=['GET'])
def get_books():
    try:
        books = g.db.query(Book).all()
        return jsonify([{
            "id": book.id,
            "title": book.title,
            "author": book.author,
            "pages": book.pages,
            "published": book.published
        } for book in books])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/books', methods=['POST'])
def add_book():
    try:
        data = request.get_json()
        published_date = None
        if data.get('published'):
            published_date = datetime.datetime.strptime(data['published'], '%Y-%m-%d').date()

        new_book = Book(
            title=data['title'],
            author=data['author'],
            pages=data['pages'],
            published=published_date
        )
        g.db.add(new_book)
        g.db.commit()
        return jsonify({"message": "Book added successfully", "id": new_book.id}), 201
    except Exception as e:
        g.db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        g.db.close()

# The old routes are no longer needed for the React frontend,
# but we can keep them for reference or direct access if you want.
@app.route('/')
def index():
    conn = get_db_session()
    books = conn.query(Book).all()
    return render_template('index.html', books=books)

@app.route('/api/books/<int:book_id>/notes', methods=['GET'])
def get_notes(book_id):
    try:
        notes = g.db.query(Note).filter_by(book_id=book_id).all()
        return jsonify([{
            "id": note.id,
            "content": note.content,
            "timestamp": note.timestamp.isoformat()
        } for note in notes])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/notes', methods=['POST'])
def add_note():
    try:
        data = request.get_json()
        new_note = Note(
            book_id=data['book_id'],
            content=data['content']
        )
        g.db.add(new_note)
        g.db.commit()
        return jsonify({"message": "Note added successfully"}), 201
    except Exception as e:
        g.db.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    try:
        note = g.db.query(Note).get(note_id)
        if note:
            g.db.delete(note)
            g.db.commit()
            return jsonify({"message": "Note deleted successfully"}), 200
        return jsonify({"error": "Note not found"}), 404
    except Exception as e:
        g.db.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/export/books.csv')
def export_books_csv():
    try:
        books = g.db.query(Book).all()
        si = StringIO()
        cw = csv.writer(si)
        cw.writerow(['Title', 'Author', 'Pages', 'Published'])
        
        for book in books:
            cw.writerow([
                book.title,
                book.author,
                book.pages,
                book.published.isoformat() if book.published else ''
            ])
        
        output = si.getvalue()
        return Response(
            output,
            mimetype="text/csv",
            headers={"Content-disposition": "attachment; filename=books_export.csv"}
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/daily')
def daily_quote():
    return jsonify({
        "quote": random.choice(DAILY_QUOTES),
        "date": datetime.date.today().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)