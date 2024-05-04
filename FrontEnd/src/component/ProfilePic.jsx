import React, { useState, useRef, useCallback } from 'react';
import Avatar from './Avatar'; // Import Avatar component
import { Dialog } from 'primereact/dialog'; // Import Dialog component from PrimeReact
import { Button } from 'primereact/button'; // Import Button component from PrimeReact
import Cropper from 'react-easy-crop'; // Import Cropper component
//import getCroppedImg from './cropImage'; // This needs to be implemented as shown previously


const ProfilePic = () => {
  // State for managing the image preview URL
  const [imagePreviewUrl, setImagePreviewUrl] = useState('https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png');
  const fileInputRef = useRef(null); // Ref for the file input element
  const [showCropDialog, setShowCropDialog] = useState(false); // State for managing the visibility of the crop dialog
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // State for managing the crop position
  const [zoom, setZoom] = useState(1); // State for managing the zoom level
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // State for managing the cropped area pixels

  // Function to handle image change when a new image is selected
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

  // Function to handle click event for fetching a new avatar
  const handleNewAvatarClick = async () => {
    try {
      const seed = Math.random().toString(36).substring(7); // Generate a random seed value
      const response = await fetch(`https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=${seed}`);
      const blob = await response.blob();
      const newAvatarUrl = URL.createObjectURL(blob);
      setImagePreviewUrl(newAvatarUrl);
    } catch (error) {
      console.error('Error fetching new avatar:', error);
    }
  };

  // Function to handle click event for selecting an avatar from file input
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // Function to handle saving the cropped image
  const handleSaveCroppedImage = async () => {
    // Implement getCroppedImg function to save the cropped image
    // const croppedImage = await getCroppedImg(imagePreviewUrl, croppedAreaPixels);
    // setImagePreviewUrl(croppedImage);
    setShowCropDialog(false);
  };

  // Callback function to update cropped area pixels
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <div className="profile-img text-center p-4">
      <div className="flex flex-column justify-content-center align-items-center">
        {/* Hidden file input for image selection */}
        <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
        
        {/* Avatar display */}
        <div onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
          <Avatar src={imagePreviewUrl} alt="User Avatar" />
        </div>
        
        {/* Button to get a new avatar */}
        <Button label="Get New Avatar" onClick={handleNewAvatarClick} />
        
        {/* Avatar dropdown for selecting avatars */}
        {/* <AvatarDropdown onSelect={(url) => setImagePreviewUrl(url)} /> */}
        
        {/* Dialog for cropping the image */}
        <Dialog visible={showCropDialog} onHide={() => setShowCropDialog(false)} header="Update Profile" draggable={false}>
          <div style={{ position: 'relative', width: '90%', height: 400 }}> {/* Enlarged Cropping Area */}
            <Cropper
              image={imagePreviewUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              minZoom={0.5} // Adjust minimum zoom if necessary
              maxZoom={3} // Adjust maximum zoom if necessary
            />
          </div>
          <Button label="Save" icon="pi pi-check" onClick={handleSaveCroppedImage} />
        </Dialog>
      </div>
    </div>
  );
};

export default ProfilePic;
