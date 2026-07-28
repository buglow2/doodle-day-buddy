#!/usr/bin/env python3
# Doodle Day Buddy - No-cache HTTP server
# Cache-Control: no-store prevents browser from caching JS/CSS
import http.server
import socketserver
import os
import sys
import socket

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dist')

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        pass

socketserver.TCPServer.allow_reuse_address = True

try:
    local_ip = socket.gethostbyname(socket.gethostname())
except Exception:
    local_ip = None

print('Server running:')
print('  http://localhost:' + str(PORT))
if local_ip and local_ip != '127.0.0.1':
    print('  http://' + local_ip + ':' + str(PORT) + '  (LAN)')

with socketserver.TCPServer(('', PORT), NoCacheHandler) as httpd:
    httpd.serve_forever()
