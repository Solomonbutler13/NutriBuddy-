// ProfilePic.jsx
import React, { useState, useRef, useCallback } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage'; 
import Avatar from './Avatar'; 

const ProfilePic = () => {
  const defaultImageUrl = 'https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png';
  const [imagePreviewUrl, setImagePreviewUrl] = useState(defaultImageUrl);
  const fileInputRef = useRef(null);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [finalAvatarUrl, setFinalAvatarUrl] = useState(defaultImageUrl);

  // Function to handle image change when uploading a new image
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

  // Function to generate a new random avatar
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

  // Function to handle saving the cropped image or avatar
  const handleSaveCroppedImage = async () => {
    if (croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imagePreviewUrl, croppedAreaPixels);
      setFinalAvatarUrl(croppedImage); // Update the final avatar URL with the cropped image
    } else {
      setFinalAvatarUrl(imagePreviewUrl);
    }
    setShowCropDialog(false);
  };

  // Callback function to handle crop completion
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <div className="profile-img text-center p-4">
      <div className="flex flex-column justify-content-center align-items-center">
        <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
        
        <div className="avatar-edit-icon" style={{ cursor: 'pointer' }}>
          <Avatar src={finalAvatarUrl} alt="User Avatar" />
          <span className="pencil" onClick={() => setShowCropDialog(true)}>&#9998;</span>
        </div>
        
        <Dialog visible={showCropDialog} onHide={() => setShowCropDialog(false)} header="Update Profile" draggable={false}>
          <div>
            <Button label="Upload Image" onClick={() => fileInputRef.current.click()} />
            <Button label="Choose New Avatar" onClick={handleNewAvatarClick} />
          </div>
          <div style={{ position: 'relative', width: '90%', height: 400 }}>
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
          <Button label="Save" icon="pi pi-check" onClick={handleSaveCroppedImage} />
        </Dialog>
      </div>
    </div>
  );
};

export default ProfilePic;
