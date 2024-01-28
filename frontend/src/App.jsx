import React, { useState } from "react";
import ImageForm from "./components/ImageForm";
import axios from "axios";

const App = () => {
  const [prediction, setPrediction] = useState(null);

  const handleImageSubmit = async (image) => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData
      );
      const prediction = response.data.prediction;
      setPrediction(prediction);
      console.log(prediction, response.data.probability);
    } catch (error) {
      console.error("Error classifying image:", error);
    }
    console.log("Image submitted:", image);
  };

  return (
    <div>
      <h1>Waste Image Classifier</h1>
      <ImageForm onImageSubmit={handleImageSubmit} />
      {prediction && (
        <div>
          <h2>Category:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default App;
