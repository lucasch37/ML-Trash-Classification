import React, { useState } from "react";

const ImageForm = ({ onImageSubmit }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      onImageSubmit(image);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Upload Image:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      <button type="submit">Submit</button>

      {imageUrl && (
        <div>
          <p>Preview:</p>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </form>
  );
};

export default ImageForm;
