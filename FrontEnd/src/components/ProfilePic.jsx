// ProfilePic.jsx
import React, { useState, useRef, useCallback } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import Avatar from './Avatar';

const ProfilePic = () => {
  // Default image URL when no profile picture is set
  const defaultImageUrl = 'https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png';
  // State for previewing the selected image
  const [imagePreviewUrl, setImagePreviewUrl] = useState(defaultImageUrl);
  // Reference to the file input element
  const fileInputRef = useRef(null);
  // State to control the visibility of the crop dialog
  const [showCropDialog, setShowCropDialog] = useState(false);
  // State for cropping the image
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  // State for zoom level in the cropper
  const [zoom, setZoom] = useState(1);
  // State for storing the cropped area pixels
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  // Final avatar URL after cropping
  const [finalAvatarUrl, setFinalAvatarUrl] = useState(defaultImageUrl);

  // Handle image change from file input
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
        setShowCropDialog(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle click event to choose a new random avatar
  const handleNewAvatarClick = async () => {
    try {
      const seed = Math.random().toString(36).substring(7);
      const response = await fetch(`https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=${seed}`);
      const blob = await response.blob();
      const newAvatarUrl = URL.createObjectURL(blob);
      setImagePreviewUrl(newAvatarUrl);
    } catch (error) {
      console.error('Error fetching new avatar:', error);
    }
  };

  // Handle saving the cropped image
  const handleSaveCroppedImage = async () => {
    if (croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imagePreviewUrl, croppedAreaPixels);
      setFinalAvatarUrl(croppedImage);
    } else {
      setFinalAvatarUrl(imagePreviewUrl);
    }
    setShowCropDialog(false);
  };

  // Callback when cropping is complete
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <div className="profile-img text-center p-4">
      <div className="flex flex-column justify-content-center align-items-center">
        {/* Hidden file input for image upload */}
        <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
        
        <div className="avatar-edit-icon" style={{ cursor: 'pointer' }}>
          {/* Avatar component to display the current avatar */}
          <Avatar src={finalAvatarUrl} alt="User Avatar" />
          {/* Edit icon to open the crop dialog */}
          <span className="pencil" onClick={() => setShowCropDialog(true)}>&#9998;</span>
        </div>
        
        {/* Dialog for cropping the image */}
        <Dialog visible={showCropDialog} onHide={() => setShowCropDialog(false)} header="Update Profile" draggable={false}>
          <div>
            {/* Button to trigger file input click */}
            <Button label="Upload Image" onClick={() => fileInputRef.current.click()} />
            {/* Button to choose a new random avatar */}
            <Button label="Choose New Avatar" onClick={handleNewAvatarClick} />
          </div>
          <div style={{ position: 'relative', width: '90%', height: 400 }}>
            {/* Cropper component to crop the image */}
            <Cropper
              image={imagePreviewUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              minZoom={0.5}
              maxZoom={3}
            />
          </div>
          {/* Button to save the cropped image */}
          <Button label="Save" icon="pi pi-check" onClick={handleSaveCroppedImage} />
        </Dialog>
      </div>
    </div>
  );
};

export default ProfilePic;
