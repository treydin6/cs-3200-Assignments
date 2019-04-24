#// This is the javascript file for the resourceful assignment
#// Web 3200 spring 2019

from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json
from todo_db import TodosDB #imports from todo_db.py import the Todos class

class MyRequestHandler(BaseHTTPRequestHandler):

    def handleTodoList(self):
        self.send_response(200)
        # all headers go here:
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

        db = TodosDB()
        todos = db.getAllTodos()
        self.wfile.write(bytes(json.dumps(todos), "utf-8"))


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
        #completed = parsed_body["completed"][0]

        # send these values to the DB!
        db = TodosDB()
        db.createTodo(todo, ddate, clas, subject) #must change for my app

        self.send_response(201)
        self.send_header("Access-Control-Allow-Origin", "*")
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
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()

            db.DeleteTodos(id)
            self.wfile.write(bytes(json.dumps(todo), "utf-8"))

    # <<<<<<----- updates ----->>>>>>  
    # <<<<<<----- Not yet working ----->>>>>> 
    def handleTodoUpdate(self, id):
        db = TodosDB()
        entry = db.getTodo(id)
        if entry == None:
            self.handleNotFound()
        else:
            length = self.headers["Content-length"]
            body = self.rfile.read(int(length)).decode("utf-8")
            parsed_body = parse_qs(body)


            todo = parsed_body['todo'][0]
            ddate = parsed_body['ddate'][0]
            clas = parsed_body['clas'][0]
            subject = parsed_body['subject'][0]

            db.UpdateTodo(todo, ddate, clas, subject)

            self.send_response(200)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(bytes("updated", "utf-8"))







    def handleTodoRetrieve(self, id):
        # you need this implemented in delete update and 
        db = TodosDB()
        todo = db.getTodo(id)

        if todo == None:
            self.handleNotFound()
        else:
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(bytes(json.dumps(todo), "utf-8"))

    def do_DELETE(self):
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
    def do_PUT(self):
        parts = self.path.split('/')[1:]
        collection = parts[0]
        if len(parts) > 1:
            id = parts[1]
        else:
            id = None
        if collection == "todos":
            if id == None:
                self.handleNotFound()
            else:
                self.handleTodoUpdate(id)
        else:
            self.handleNotFound()
        return







    def do_GET(self):
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
        # todos create action
        if self.path == "/todos":
            self.handleTodoCreate()
        else:
            self.handleNotFound()


    def handleNotFound(self):
        self.send_response(404)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
        self.wfile.write(bytes("Not Found", "utf-8"))


    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, DELETE, POST, PATCH, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-type")
        self.end_headers()


def run():
    listen = ("127.0.0.1", 8080)
    server = HTTPServer(listen, MyRequestHandler)

    print("Listening...")
    server.serve_forever()

run()
        
        

    



