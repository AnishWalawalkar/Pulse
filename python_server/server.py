import socket
import threading
import indicoio
import json

BUFFER = 1024
HOST = '127.0.0.1'
PORT = 8000


def analysis(data):
    indicoio.config.api_key = 'b1b29987309a10beab53d428a70699d3'
    return indicoio.political(data)


def handler(client_socket, address):
    while True:
        data = client_socket.recv(BUFFER)
        if not data:
            break
        else:
            client_socket.send(json.dumps(analysis(data)))

if __name__ == '__main__':
    socket_server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    socket_server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    socket_server.bind((HOST, PORT))
    socket_server.listen(5)
    while True:
        client_socket, addr = socket_server.accept()
        print '... connected from: {}'.format(addr)
        thread = threading.Thread(target=handler, args=(client_socket, addr,))
        thread.setDaemon(True)
        thread.start()
