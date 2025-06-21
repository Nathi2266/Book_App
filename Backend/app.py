from flask import Flask, render_template, request, redirect, url_for
import sqlite3
from datetime import datetime

app = Flask(__name__)
DATABASE = 'books.db'

def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS books
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 title TEXT NOT NULL,
                 author TEXT NOT NULL,
                 pages INTEGER,
                 published DATE)''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM books")
    books = cur.fetchall()
    conn.close()
    return render_template('index.html', books=books)

@app.route('/add', methods=['GET', 'POST'])
def add_book():
    if request.method == 'POST':
        title = request.form['title']
        author = request.form['author']
        pages = request.form['pages']
        published = request.form['published']
        
        conn = sqlite3.connect(DATABASE)
        cur = conn.cursor()
        cur.execute("INSERT INTO books (title, author, pages, published) VALUES (?, ?, ?, ?)",
                    (title, author, pages, published))
        conn.commit()
        conn.close()
        return redirect(url_for('index'))
    return render_template('add.html')

@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit_book(id):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    
    if request.method == 'POST':
        title = request.form['title']
        author = request.form['author']
        pages = request.form['pages']
        published = request.form['published']
        
        cur.execute("UPDATE books SET title=?, author=?, pages=?, published=? WHERE id=?",
                    (title, author, pages, published, id))
        conn.commit()
        conn.close()
        return redirect(url_for('index'))
    
    cur.execute("SELECT * FROM books WHERE id=?", (id,))
    book = cur.fetchone()
    conn.close()
    return render_template('edit.html', book=book)

@app.route('/delete/<int:id>')
def delete_book(id):
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute("DELETE FROM books WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

if __name__ == '__main__':
    init_db()
    app.run(debug=True)