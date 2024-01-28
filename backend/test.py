from werkzeug.utils import secure_filename
import os
import numpy as np
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.preprocessing.image import load_img, img_to_array
import tensorflow as tf
import os

def getPrediction(filename):
    model = tf.keras.models.load_model("/Users/lucas/Documents/vscode/waste-classification/backend/model/final_model_weights.hdf5")
    img = load_img('/Users/lucas/Documents/vscode/waste-classification/backend/static/'+filename, target_size=(180, 180))
    img = img_to_array(img)
    img = img / 255
    img = np.expand_dims(img,axis=0)
    predictions = model.predict(img)
    category = int(tf.argmax(predictions, axis=1))
    answer = int(category)
    probability = model.predict(img)
    probability_results = 0

    if answer == 1:
        answer = "Recycle"
        probability_results = probability[0][1]
    elif answer == 0:
        answer = "Compost"
        probability_results = probability[0][0]
          
    probability_results = round(probability_results * 100)
     
    if probability_results < 90:
        answer = "Trash"

    probability_results=str(probability_results)

    return answer, probability_results

print(getPrediction('download_2.jpeg'))