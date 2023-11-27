from flask import Flask, jsonify, request
import sqlite3


app = Flask(__name__)


@app.route('/daily-verse', methods=['GET'])
def get_daily_verse():
    version = request.args.get('version', default='KoreanVerses1', type=str)

    # Validate the version and set the table name
    table_name = version if version in [
        'KoreanVerses1', 'EnglishVerses1', 'KoreanVerses2'] else 'KoreanVerses1'

    # Connect to your SQLite database
    conn = sqlite3.connect('bible_verses.db')
    cursor = conn.cursor()

    # Query to get a random verse
    cursor.execute(f'SELECT * FROM {table_name} ORDER BY RANDOM() LIMIT 1')
    verse = cursor.fetchone()

    # Close the connection
    conn.close()

    # Format and return the verse
    if verse:
        return jsonify({
            'book': verse[1],
            'chapter': verse[2],
            'verse_number': verse[3],
            'text': verse[4]
        })
    else:
        return jsonify({'error': 'Verse not found'}), 404


@app.route('/get-chapter', methods=['GET'])
def get_chapter():
    book = request.args.get('book', default='Genesis', type=str)
    chapter_number = request.args.get('chapter', default=1, type=int)
    version = request.args.get('version', default='KoreanVerses1', type=str)

    table_name = {
        'KoreanVerses1': 'KoreanVerses1',
        'KoreanVerses2': 'KoreanVerses2',
        'EnglishVerses1': 'EnglishVerses1'
    }.get(version, 'KoreanVerses1')  # Default to KoreanVerses1 if not found

    conn = sqlite3.connect('bible_verses.db')
    cursor = conn.cursor()
    cursor.execute(
        f'SELECT * FROM {table_name} WHERE book=? AND chapter=?', (book, chapter_number))
    verses = cursor.fetchall()
    conn.close()

    chapter_content = [{'verse_number': verse[3], 'text': verse[4]}
                       for verse in verses]
    return jsonify(chapter_content)


@app.route('/next-chapter', methods=['GET'])
def next_chapter():
    book = request.args.get('book', default='Genesis', type=str)
    chapter_number = request.args.get('chapter', default=1, type=int) + 1
    return jsonify(get_chapter_data(book, chapter_number))


@app.route('/previous-chapter', methods=['GET'])
def previous_chapter():
    book = request.args.get('book', default='Genesis', type=str)
    chapter_number = max(request.args.get(
        'chapter', default=1, type=int) - 1, 1)
    return jsonify(get_chapter_data(book, chapter_number))


@app.route('/search', methods=['GET'])
def search_verses():
    query = request.args.get('query', default='', type=str)
    version = request.args.get('version', default='KoreanVerses1', type=str)

    # Validate the version and set the table name
    table_name = version if version in [
        'KoreanVerses1', 'EnglishVerses1', 'KoreanVerses2'] else 'KoreanVerses1'

    conn = sqlite3.connect('bible_verses.db')
    cursor = conn.cursor()
    query = f"%{query}%"  # Prepare query for LIKE statement
    cursor.execute(f'SELECT * FROM {table_name} WHERE text LIKE ?', (query,))
    results = cursor.fetchall()
    conn.close()

    search_results = [{'book': result[1], 'chapter': result[2],
                       'verse_number': result[3], 'text': result[4]} for result in results]
    return jsonify(search_results)


if __name__ == '__main__':
    app.run(debug=True)
