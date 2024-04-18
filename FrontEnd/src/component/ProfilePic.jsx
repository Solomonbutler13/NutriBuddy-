import React, { useState, useRef, useCallback } from 'react';
import Avatar from './Avatar';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage'; // This needs to be implemented as shown previously

const ProfilePic = () => {
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png');
  const fileInputRef = useRef(null);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image')) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
        setShowCropDialog(true);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleSaveCroppedImage = async () => {
    const croppedImage = await getCroppedImg(imagePreviewUrl, croppedAreaPixels);
    setImagePreviewUrl(croppedImage);
    setShowCropDialog(false);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <div className="profile-img text-center p-4">
      <div className="flex flex-column justify-content-center align-items-center">
        <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
        <div onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
          <Avatar src={imagePreviewUrl} alt="User Avatar" />
        </div>
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
