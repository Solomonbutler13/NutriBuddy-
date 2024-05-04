import React, { useState } from 'react';
import '../component/Avatar.css';

const Avatar = ({ src, alt, username }) => {
  // State to manage loading state when fetching a new avatar
  const [loading, setLoading] = useState(false);

  // Function to handle click event for getting a new avatar
  const handleNewAvatarClick = async () => {
    setLoading(true); // Set loading state to true
    try {
      // Make API call to fetch new avatar
      const response = await fetch('https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Felix');
      const blob = await response.blob();
      const newAvatarUrl = URL.createObjectURL(blob);
      // Update the avatar URL
      // setImage(newAvatarUrl); // Update the state in your ProfilePage component
      console.log('New avatar URL:', newAvatarUrl);
    } catch (error) {
      console.error('Error fetching new avatar:', error);
    }
    setLoading(false); // Set loading state back to false after fetching
  };

  return (
    <div className="avatar">
      {/* Display current avatar */}
      <img src={src} alt={alt} style={{ width: '250px', height: '250px', borderRadius: '20%' }} />
      
      {/* Display username */}
      <div className="avatar-name">{`Hi ${username}`}</div>
      
      {/* Button to fetch new avatar */}
      <button onClick={handleNewAvatarClick} disabled={loading}>
        {/* Show loading text if loading state is true, otherwise show button text */}
        {loading ? 'Loading...' : 'Get New Avatar'}
      </button>
    </div>
  );
};

export default Avatar;
