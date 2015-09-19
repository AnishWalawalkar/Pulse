"""from flask import Flask, render_template
from flask.ext.socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route("/")
def main():
    return "Welcome!"

@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)
	
if __name__ == '__main__':
    socketio.run(app)"""
    
import indicoio
indicoio.config.api_key = 'b1b29987309a10beab53d428a70699d3'
    
data = open("text.txt").read()

print(indicoio.keywords(data))
