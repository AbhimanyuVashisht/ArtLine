from flask import Flask
from flask import render_template, request
import sentiment_analysis
from blogAnalysis import functionpy
app = Flask(__name__)


@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/blog")
def blog():
    return render_template('blogindex.html')


@app.route("/review", methods=['POST'])
def review():
    print request.form['review']
    return sentiment_analysis.result(request.form['review'])


@app.route("/bsubmit", methods=['POST'])
def bsubmit():
    print request.form['review']
    return functionpy.predictor(request.form['review'])


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)