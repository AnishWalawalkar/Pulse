import flask
from flask import Flask, request
import indicoio
import json
import operator as op

indicoio.config.api_key = '53fdb0f7d4d51903f2ac2d1575e6c416'

app = Flask(__name__)

def sort(data):
    sorted_data = sorted(data.items(), key=op.itemgetter(1))
    return sorted_data[::-1]

@app.route('/sentiment', methods=['GET', 'POST'])
def get_sentiment():
    if request.method == 'POST':
        data = dict(request.form)['data_to_analyze']
        return json.dumps({
            'sentiment': round(indicoio.sentiment(data)[0]*10)
        })

@app.route('/language', methods=['GET', 'POST'])
def get_language():
    if request.method == 'POST':
        data = dict(request.form)['data_to_analyze']
        return json.dumps({
            'language': sort(indicoio.language(data)[0])[0]
        })

@app.route('/political', methods=['GET', 'POST'])
def get_political():
    if request.method == 'POST':
        data = dict(request.form)['data_to_analyze']
        return json.dumps({
            'political': indicoio.political(data)
        })

@app.route('/text_tags', methods=['GET', 'POST'])
def get_texttags():
    if request.method == 'POST':
        data = dict(request.form)['data_to_analyze']
        return json.dumps({
            'text_tags': sort(indicoio.text_tags(data)[0])[0:3]
        })

@app.route('/keywords', methods=['GET', 'POST'])
def get_keywords():
    if request.method == 'POST':
        data = dict(request.form)['data_to_analyze']
        return json.dumps({
            'keywords': indicoio.keywords(data, top_n = 15, threshold = 0.3, relative=True)[0].keys()
        })

@app.route('/virality', methods=['GET', 'POST'])
def get_virality():
    if request.method == 'POST':
        data = dict(request.form)['data_to_analyze']
        return json.dumps({
            'virality': indicoio.twitter_engagement(data)
        })

@app.route('/named_entities', methods=['GET', 'POST'])
def get_entities():
    if request.method == 'POST':
        data = dict(request.form)['data_to_analyze']
        return json.dumps({
            'keywords': indicoio.named_entities(data)
        })   

if __name__ == '__main__':
    app.debug = True
    app.run()
