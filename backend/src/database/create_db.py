# import sqlite3

# db = sqlite3.connect("economic.db")

# handler = db.cursor()

# handler.execute("CREATE TABLE users (id integer primary key, name text, email text unique, hash_password text )")

# handler.execute("CREATE TABLE items ( id integer primary key, title text, description text, owner_id integer, foreign key(owner_id) references users(id) )")


# db.commit()

print("This is the script used to created the database")
