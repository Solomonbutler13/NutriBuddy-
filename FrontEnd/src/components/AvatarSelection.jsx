import React, { useState, useEffect } from 'react';
import '../component/Avatar.css';

// Avatar component for displaying the selected avatar
const Avatar = ({ src, alt }) => (
  <div className="avatar">
    <img src={src} alt={alt} style={{ width: '250px', height: '250px', borderRadius: '20%' }} />
    <div className="avatar-name">Hi Solomon</div> {/* Placeholder username */}
  </div>
);

// AvatarSelection component for selecting avatars
const AvatarSelection = () => {
  // State to store avatars fetched from the API
  const [avatars, setAvatars] = useState([]);
  // State to store the selected avatar
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // Fetch avatars from the API when the component mounts
  useEffect(() => {
    fetch('https://api.dicebear.com/8.x/adventurer-neutral/svg')
      .then(response => response.json())
      .then(data => setAvatars(data))
      .catch(error => console.error('Error fetching avatars:', error));
  }, []);

  // Function to handle click event on an avatar
  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar); // Set the selected avatar
  };

  return (
    <div>
      <h2>Select Your Avatar</h2>
      <div className="avatar-selection">
        {/* Map through the avatars array to display each avatar */}
        {avatars.map(avatar => (
          <img
            key={avatar.id}
            src={avatar.url}
            alt={avatar.alt}
            onClick={() => handleAvatarClick(avatar)}
            className={selectedAvatar === avatar ? 'selected' : ''} // Add 'selected' class if the avatar is selected
          />
        ))}
      </div>
      {/* Display the selected avatar preview if an avatar is selected */}
      {selectedAvatar && (
        <div className="avatar-preview">
          <Avatar src={selectedAvatar.url} alt={selectedAvatar.alt} /> {/* Render the selected avatar */}
        </div>
      )}
    </div>
  );
};

export default AvatarSelection;
