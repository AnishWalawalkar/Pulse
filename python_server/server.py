import flask
from flask import Flask
from flask import request
import indicoio
import json

indicoio.config.api_key = 'b1b29987309a10beab53d428a70699d3'

app = Flask(__name__)



def analysis(data):
    return indicoio.analyze_text(data.get('data_to_analyze'))


@app.route('/', methods = ['GET', 'POST'])
def get_data():
    if request.method == 'POST':
        data_dict = dict(request.form)
        analysed_data = analysis(data_dict)
        return flask.jsonify(**analysed_data)

if __name__ == '__main__':
    app.debug = True
    app.run()
