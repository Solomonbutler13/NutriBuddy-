// cropImage.js

// Function to crop an image based on pixel crop data
export default async function getCroppedImg(imageSrc, pixelCrop) {
  // Create a new image element
  const image = new Image();
  image.src = imageSrc;

  // Wait for the image to load
  await new Promise((resolve) => {
      image.onload = resolve;
  });

  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  // Draw the cropped portion of the image onto the canvas
  ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
  );

  // Convert the canvas content to a data URL
  return new Promise((resolve) => {
      canvas.toDataURL('image/jpeg', resolve);
  });
}
