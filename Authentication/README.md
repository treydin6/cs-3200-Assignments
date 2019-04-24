# Resourcful Web app
### Resource and Attributes
* **Resouce**
	* Login
	* Create Accout
	* HW To-Do List
* **Attributes**
	### Login
		* Email
		* Password
	### Create Account
		* First Name
		* Last Name
		* Email
		* Password
	### HW To-do list
		* Name
		* Due Date
		* Class
		* Subject

### Database Schema
**SQL**
CREATE TABLE todos(

	id INTEGER PRIMARY KEY,
	todo TEXT,
	ddate TEXT,
	clas TEXT,
	subject TEXT);

CREATE TABLE users(

	id INTEGER PRIMARY KEY,
	fname TEXT,
	lname TEXT,
	email TEXT,
	password TEXT);

### REST endpoints
Name     | HTTP Method | Path
----	 | ----------- | ----
List     | GET		   | http://localhost:8080/todos
Create   | POST		   | http://localhost:8080/todos
Replace  | PUT		   | http://localhost:8080/todos/id
Retrieve | GET  	   | http://localhost:8080/todos/id
Delete   | DELETE	   | http://localhost:8080/todos/id
Create(NewUser)  | POST		   | http://localhost:8080/users
Retrieve(Login)	 | POST		   | http://localhost:8080/sessions

### Password Hashing is
	* from passlib.hash import bcrypt
	* encryptedPass = bcrypt.hash(password)
