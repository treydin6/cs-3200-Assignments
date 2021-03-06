#// This is the javascript file for the resourceful assignment
#// Web 3200 spring 2019

import sqlite3 #sqlite is built in to python # python code for writing a database

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

class TodosDB:

	def __init__(self):
		self.connection = sqlite3.connect("todo_db.db") #gets sqlite connected to your database stored in connection
		self.connection.row_factory = dict_factory
		self.cursor = self.connection.cursor()
		
	def __del__(self):
		#disconnect
		self.connection.close()

	# this is an example of Data Binding and it MUST ALWAYS BE USED to prevent sql injection attacks 
	def createTodo(self, todo, ddate, clas, subject):
		sql = "INSERT INTO todos (todo, ddate, clas, subject) VALUES (?, ?, ?, ?)" 
		self.cursor.execute(sql, [todo, ddate, clas, subject])  #use it for inserting and selecting...
		self.connection.commit()
		return

	# on delete method must use the cursor.execute and cursor.commit
	def getAllTodos(self):
		self.cursor.execute("SELECT * FROM todos")
		return self.cursor.fetchall()

	def getTodo(self, id):
		sql = "SELECT * FROM todos WHERE id = ?"
		self.cursor.execute(sql, [id]) #data must be a list
		return self.cursor.fetchone()

	# delete everything.
	def DeleteTodos(self, id):
		sql = "DELETE FROM todos WHERE ID = ?"
		self.cursor.execute(sql, [id])
		self.connection.commit()

	#update query
	def UpdateTodo(self, id, todo, date, clas, subject ):
		sql = "UPDATE todo SET (todo, ddate, clas, subject) = (?, ?, ?, ?) WHERE id =?"
		self.cursor.execute(sql, [todo, ddate, clas, subject, id])
		self.connection.commit()
		return

