from flask import Flask, request, render_template, jsonify, abort
from datetime import datetime

app = Flask(__name__)


@app.route("/")
@app.route("/one.html")
def hello():
    return render_template('one.html')


@app.route("/two.html")
def apps():
    return render_template('two.html', now=f'{datetime.now()}', text=f'{datetime.now()}')


@app.route('/api/v1/senddata', methods=['POST'])
def sendData():
    data = {
        "resp": f'date time from the server is: {datetime.now()}  - got {request.json["fromUI"]}'
    }

    return jsonify(data)


@app.errorhandler(503)
def too_busy(e):
    return jsonify(error="way too busy"), 503


if __name__ == '__main__':
    app.run(debug=True)
