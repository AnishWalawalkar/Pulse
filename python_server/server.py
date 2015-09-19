import flask
from flask import Flask
from flask import request
import indicoio
import json

app = Flask(__name__)

def analysis(data):
    return data


@app.route('/', methods = ['GET', 'POST'])
def get_data():
    if request.method == 'GET':
        return 'Hello World'
    if request.method == 'POST':
        data_dict = dict(request.form)
        analysed_data = analysis(data_dict)
        return flask.jsonify(**analysed_data)

if __name__ == '__main__':
    app.debug = True
    app.run()
