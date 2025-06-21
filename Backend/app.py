from flask import Flask, request, jsonify, render_template, g
from flask_cors import CORS
from support import init_db, get_db_session, close_db_session, Book
import os
import datetime

app = Flask(__name__)
CORS(app)

# Initialize database
init_db()

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

if __name__ == '__main__':
    app.run(debug=True, port=5000)