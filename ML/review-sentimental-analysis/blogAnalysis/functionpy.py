import numpy as np
import pandas as pd
from sklearn import svm
from sklearn.feature_extraction.text import CountVectorizer
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords, wordnet
from nltk.stem import PorterStemmer, WordNetLemmatizer
from nltk import pos_tag, ne_chunk
import re
import pickle
def predictor(msg):
    corpus_train = []
    for i in range (len(msg)):
        review = re.sub('[^a-zA-Z]', ' ', (str(msg[i]).decode('UTF-8')))
        review = review.lower()
        review = review.split()
        ps = PorterStemmer()
        review = [ps.stem(word) for word in review if not word in set(stopwords.words('english'))]
        review = ' '.join(review)
        corpus_train.append(review)
    new=open('blogAnalysis/count_vectorizer.pickle','rb')
    cv=pickle.load(new)
    new.close()
    X=cv.transform(corpus_train).toarray()
    new=open('blogAnalysis/classifier.pickle','rb')
    clf=pickle.load(new)
    new.close()
    predict=clf.predict(X)
    return predict[0]

# predict_msg="camera photo lens photography photography photography photography the is am what my .; not much happy live"
# print predictor(predict_msg)