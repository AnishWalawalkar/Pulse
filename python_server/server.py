import flask
from flask import Flask
from flask import request
import indicoio
import json
import operator as op

indicoio.config.api_key = 'b1b29987309a10beab53d428a70699d3'

app = Flask(__name__)

def sort(data):
    sorted_data = sorted(data.items(), key=op.itemgetter(1))
    return sorted_data[::-1]

def analysis(data):
    data = data['data_to_analyze']
    sentiment = indicoio.sentiment(data)
    language = sort(indicoio.language(data)[0])
    political = indicoio.political(data)
    text_tags = sort(indicoio.text_tags(data)[0])[0:3]
    keywords = indicoio.keywords(data, top_n = 15, threshold = 0.2, relative=True)[0].keys()
    return {
        'sentiment': sentiment,
        'language': language,
        'political': political,
        'text_tags': text_tags,
        'keywords': keywords
    }

@app.route('/', methods = ['GET', 'POST'])
def get_data():
    if request.method == 'POST':
        data_dict = dict(request.form)
        analysed_data = analysis(data_dict)
        print analysed_data
        return json.dumps(analysed_data)

if __name__ == '__main__':
    app.debug = True
    app.run()
