import sqlite3

# Connect to SQLite database
conn = sqlite3.connect('bible_verses.db')
cursor = conn.cursor()

# Query to get the first 10 entries from the Verses table
cursor.execute('SELECT * FROM Verses LIMIT 10')

# Fetch and print the results
results = cursor.fetchall()
for row in results:
    print(row)

# Query to get the total number of entries in the Verses table
cursor.execute('SELECT COUNT(*) FROM Verses')
count = cursor.fetchone()[0]
print(f"Total number of verses in the database: {count}")

# Close the connection
conn.close()
