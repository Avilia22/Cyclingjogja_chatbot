import nltk
import numpy as np
# nltk.download('punkt')

from nltk.stem.porter import PorterStemmer
stemmer = PorterStemmer()

def tokenize(sentence):
    #split sentence into array of words
    return nltk.word_tokenize(sentence)

def stem(word):
    #stemming = find the root form of the word
    return stemmer.stem(word.lower())

def bag_of_words(tokenized_sentence, words):
    # stem each word
    sentence_words = [stem(word) for word in tokenized_sentence]
    # initialize bag with 0 for each word
    bag = np.zeros(len(words), dtype=np.float32)
    for idx, w in enumerate(words):
        if w in sentence_words: 
            bag[idx] = 1

    return bag

sentence = ["hello", "how", "are", "you"]
words = ["hi", "hello", "I", "you","bye", "thank", "cool"]
bog = bag_of_words(sentence, words)
# print(bog)


# a="Is my appointment fixed?"
# print(a)
# a= tokenize(a)
# print(a)

# words = ["Organize", "organizes", "organizing"]
# steamed_word = [stem(w) for w in words]
# print(steamed_word)
