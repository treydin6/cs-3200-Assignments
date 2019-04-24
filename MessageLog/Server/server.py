from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json

class MyRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        c = []
        if self.path == "/todos":
            self.send_response(200)
            # all headers go here:
            self.send_header("Content-type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            fin = open("todo.txt", "r")
            for line in fin:
                line = line.strip()
                c.append(line)
            fin.close()
            self.wfile.write(bytes(json.dumps(c), "utf-8"))
            print(c)
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(bytes("not found", "utf-8"))
        return

    def do_POST(self):
        if self.path == "/todos":
            length = self.headers["Content-length"]
            body = self.rfile.read(int(length)).decode("utf-8")
            print("the text body:", body)
            parsed_body = parse_qs(body)
            print("the parsed body:", parsed_body)
            fout = open("todo.txt", "a")
            fout.write(parsed_body["todo"][0] + "\n")
            self.send_response(201)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(bytes("not found", "utf-8"))
        return

def run():
    listen = ("127.0.0.1", 8080)
    server = HTTPServer(listen, MyRequestHandler)

    print("Listening...")
    server.serve_forever()

run()