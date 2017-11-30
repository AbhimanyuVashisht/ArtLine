import nltk.classify.util
from nltk.classify import NaiveBayesClassifier
from nltk.corpus import movie_reviews
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import pickle


def create_word_features(words):
    useful_words = [word for word in words if word not in stopwords.words("english")]
    my_dict = dict([(word, True) for word in useful_words])
    return my_dict
neg_reviews = []
pos_reviews = []


def neg_classification():
    for fileid in movie_reviews.fileids('neg'):
        words = movie_reviews.words(fileid)
        neg_reviews.append((create_word_features(words), "negative"))
    print(len(neg_reviews))


def pos_classication():
    for fileid in movie_reviews.fileids('pos'):
        words = movie_reviews.words(fileid)
        pos_reviews.append((create_word_features(words), "positive"))


'''neg_classification()
pos_classication()
train_set = neg_reviews[:750] + pos_reviews[:750]
test_set =  neg_reviews[750:] + pos_reviews[750:]
##print(len(train_set),  len(test_set))
    
classifier = NaiveBayesClassifier.train(train_set)
## first time
f = open('my_classifier.pickle', 'wb')
pickle.dump(classifier, f)
f.close()'''


def result(rev):
    f = open('my_classifier.pickle', 'rb')
    classifier = pickle.load(f)
    f.close()
    # rev="I love it"
    words=word_tokenize(rev.lower())
    temp=create_word_features(words)
    return classifier.classify(temp)

# accuracy = nltk.classify.util.accuracy(classifier, test_set)
# print(accuracy * 100)
