from flask import Flask, render_template
from flask.ext.socketio import SocketIO, send, emit

app = Flask(__name__)
#app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


if __name__ == '__main__':
    socketio.run(app)
    
@socketio.on('connect')
def handle_message(json):
	while True:
    	emit('event', {data: 'I\'m connected!'})