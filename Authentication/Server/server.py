from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
from http import cookies 
import json
from passlib.hash import bcrypt

from todo_db import TodosDB #imports from todo_db.py import the Todos class
from session_store import SessionStore

gSessionStore = SessionStore()

class MyRequestHandler(BaseHTTPRequestHandler):

    def end_headers(self):
        self.sendCookie()
        self.send_header("Access-Control-Allow-Origin", self.headers["Origin"])
        self.send_header("Access-Control-Allow-Credentials", "true")
        BaseHTTPRequestHandler.end_headers(self)

    def loadCookie(self):
        if "Cookie" in self.headers:
            self.cookie = cookies.SimpleCookie(self.headers["Cookie"])
        else:
            self.cookie = cookies.SimpleCookie()

    def sendCookie(self):
        for morsel in self.cookie.values():
            self.send_header("set-cookie", morsel.OutputString())

    def loadSession(self):
        self.loadCookie()           #load cookie, hand post it note
        if "sessionId" in self.cookie:  # 
            # Session id found in cookie
            sessionId = self.cookie["sessionId"].value #grad in var
            self.session = gSessionStore.getSessionData(sessionId)  #go find it in file cabinet
            if self.session == None:
                # Session id no longer found in session store
                # Create a brand new session id
                sessionId = gSessionStore.createSession()
                self.session = gSessionStore.getSessionData(sessionId)
                self.cookie["sessionId"] = sessionId    #hands them a post it note
        else:
            # No session ID found in the cookie
            # Create a brand new session ID
            sessionId = gSessionStore.createSession()
            self.session = gSessionStore.getSessionData(sessionId)
            self.cookie["sessionId"] = sessionId


    def handleTodoList(self):
        if self.isLoggedIn():
            self.send_response(200)
            # all headers go here:
            self.send_header("Content-type", "application/json")
            self.end_headers()

            db = TodosDB()
            todos = db.getAllTodos()
            self.wfile.write(bytes(json.dumps(todos), "utf-8"))
        else:
            self.handle401()


    def handleTodoCreate(self):                                 
        length = self.headers["Content-length"] # tells how many bytes have been sent to you
        body = self.rfile.read(int(length)).decode("utf-8")
        print("the text body:", body)
        parsed_body = parse_qs(body) # gives a dictionary from parse_qs/ decodes url encodes
        print("the parsed body:", parsed_body)

        # save the todo!
        todo = parsed_body["todo"][0]
        ddate = parsed_body["ddate"][0]
        clas = parsed_body["clas"][0]
        subject = parsed_body["subject"][0]
        #you will redo ^this for creating user

        # send these values to the DB!
        db = TodosDB()
        db.createTodo(todo, ddate, clas, subject) #must change for my app

        self.send_response(201)
        self.end_headers()

    def handleTodoDelete(self, id):
        db = TodosDB()
        todo = db.getTodo(id)

        if todo == None:
            self.handleNotFound()
        else:
            self.send_response(200)
            # all headers go here:
            self.send_header("Content-type", "application/json")
            self.end_headers()

            db.DeleteTodos(id)
            self.wfile.write(bytes(json.dumps(todo), "utf-8"))

    # <<<<<<----- updates ----->>>>>>  
    # <<<<<<----- Not yet working ----->>>>>> 
    # def handleTodoUpdate(self):
    #     length = self.headers["Content-length"]
    #     body = self.rfile.read(int(length)).decode("utf-8")
    #     parsed_body = parse_qs(body)
    #     #ids = parsed_body['id'][0]
    #     todo = parsed_body['todo'][0]
    #     ddate = parsed_body['ddate'][0]
    #     clas = parsed_body['clas'][0]
    #     subject = parsed_body['subject'][0]
    #     db = TodosDB()
    #     db.UpdateTodo(todo, ddate, clas, subject)
    #     self.send_response(200)
    #     self.send_header("Access-Control-Allow-Origin", "*")
    #     self.end_headers()
    #     self.wfile.write(bytes("updated", "utf-8"))

    def handleTodoRetrieve(self, id):
        # you need this implemented in delete update and 
        db = TodosDB()
        todo = db.getTodo(id)

        if todo == None:
            self.handleNotFound()
        else:
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(bytes(json.dumps(todo), "utf-8"))

    def do_DELETE(self):
        self.loadSession()
        parts = self.path.split('/')[1:]
        collection = parts[0]
        if len(parts) > 1:
            id = parts[1]
        else:
            id = None

        if collection == "todos":
            if id == None:
                self.handleTodoList()
            else:
                self.handleTodoDelete(id)
        else:
            self.handleNotFound()

    # for Update, not yet working
    # def do_PUT(self):
    #     self.loadSession()
    #     parts = self.path.split('/')
    #     if parts[1] == "todos":
    #         self.handleTodoUpdate()
    #     else:
    #         self.handleNotFound()

    def do_GET(self):
        self.loadSession()
        # tods list action
        parts = self.path.split('/')[1:]
        collection = parts[0]
        if len(parts) > 1:
            id = parts[1]
        else:
            id = None

        if collection == "todos":
            if id == None:
                self.handleTodoList()
            else:
                self.handleTodoRetrieve(id)
        else:
            self.handleNotFound()


    def do_POST(self):
        self.loadSession()
        # todos create action
        path = self.path.split('?')
        print(path[0])
        print("path: ", self.path)
        if path[0] == "/todos":
            self.handleTodoCreate()
        elif path[0] == "/users":
            print("made it to /users")
            self.handleUserCreate()
        elif path[0] == "/sessions":
            self.handleSessionCreate()
        else:
            self.handleNotFound()

     # Authentication Step
    #def handleAuthenticate(self):
        #find user in DB by email
        #if found:
            #compare given password to hashed password from DB
            #if matches:
                #":)" remember state
            #else:
                #Error 401
        #else:
            #Error 401
        #encrypass = bcript.hash("Some Password")
        #if bcrypt.verfiy("Other Password", encrypass):
            #print("YAY, Authenticated")
        #else:
            #print("UserName and Password Dont match")

    # Creation Step
    

    # /sessions
    def handleSessionCreate(self):
        #if self.isLoggedIn():
            length = self.headers["Content-length"] # tells how many bytes have been sent to you
            body = self.rfile.read(int(length)).decode("utf-8")
            parsed_body = parse_qs(body)
            print("The parsed body: ", parsed_body)
            email = parsed_body["email"][0]
            password = parsed_body["password"][0]

            db = TodosDB()

            user = db.getUserByEmail(email)

            if user == False:
                self.handle401()

            else:
                encrypass = db.getPass(email)
                if bcrypt.verify(password, encrypass):
                    self.session["userId"] = email
                    self.send_response(201)
                    self.end_headers()
                    self.wfile.write(bytes("Created", "utf-8"))
                else:
                    self.handle401()
                    self.wfile.write(bytes("Invalid login iformation", "utf-8"))
        #else:
            #self.send_response(404)



    # /users
    def handleUserCreate(self):
        print("It has made it to UserCreate()")
        #if self.isLoggedIn():
        print("made it through isLoggedIn()")
        length = self.headers["Content-length"] 
        body = self.rfile.read(int(length)).decode("utf-8")
        parsed_body = parse_qs(body)
        print("The parsed body ", parsed_body)

        # save the user
        fname = parsed_body["fname"][0]
        lname = parsed_body["lname"][0]
        email = parsed_body["email"][0]
        password = parsed_body["password"][0]

        # encrypt the password
        encrypted_password = bcrypt.hash(password)

        db = TodosDB()

        user = db.getUserByEmail(email)
        # check if user exists
        print("This is before checking if user exists")
        if user == False:
            print("The user dosent exist so we will create you one")
            db.createUser(fname, lname, email, encrypted_password)
            print("its a match")
            self.send_response(201)
            self.end_headers()
            self.wfile.write(bytes("created", "utf-8"))
        else:
            print("Users != None!!")
            self.send_response(422)
            self.end_headers()
            self.wfile.write(bytes("Email already in use!", "utf-8"))
        #else:
            #print("Didnt make it through isLoggedIn()")
            #self.handle401()



    def isLoggedIn(self):
        if "userId" in self.session:
            return True
        else:
            return False


    def handleNotFound(self):
        self.send_response(404)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
        self.wfile.write(bytes("Not Found", "utf-8"))

    #not authorized
    def handle401(self):
        self.send_response(401)
        self.end_headers()



    def do_OPTIONS(self):
        self.loadSession()
        self.send_response(200)
        self.send_header("Access-Control-Allow-Methods", "GET, DELETE, POST, PUT, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-type")
        self.end_headers()


def run():
    listen = ("127.0.0.1", 8080)
    server = HTTPServer(listen, MyRequestHandler)

    print("Listening...")
    server.serve_forever()

run()



#HTTP Status Codes
# 200 -- OK, request succeded 
# 201 -- Created 
# 202 -- Accepted but not completed

# 400 -- Bad request
# 401 -- Unauthorized
# 404 -- Not Found
# 422 -- Unprocessable, User Already created
        
        

    



