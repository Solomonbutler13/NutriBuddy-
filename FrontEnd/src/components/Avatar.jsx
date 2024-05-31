// Avatar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './avatar.css';

const Avatar = ({ src, alt, username }) => {
  // State to manage loading state
  const [loading, setLoading] = useState(false);
  // State to manage the avatar URL
  const [avatarUrl, setAvatarUrl] = useState(src);
  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Effect to fetch a default avatar if no source is provided
  useEffect(() => {
    if (!src) {
      const fetchAvatar = async () => {
        setLoading(true);
        try {
          // Fetch a new avatar from Dicebear API
          const response = await fetch('https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Felix');
          const blob = await response.blob();
          // Create a URL for the fetched avatar
          const newAvatarUrl = URL.createObjectURL(blob);
          // Set the fetched avatar URL
          setAvatarUrl(newAvatarUrl);
        } catch (error) {
          console.error('Error fetching new avatar:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchAvatar();
    }
  }, [src]);

  // Effect to update the avatar URL when the src prop changes
  useEffect(() => {
    setAvatarUrl(src);
  }, [src]);

  // Handle click event to navigate to the profile page
  const handleClick = () => {
    navigate('/profilepage'); // Navigate to the profile page
  };

  return (
    <div className="avatar" onClick={handleClick} style={{ cursor: 'pointer' }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Display the avatar image */}
          <img src={avatarUrl} alt={alt} style={{ width: '250px', height: '250px', borderRadius: '20%' }} />
          {/* Display the username */}
          <div className="avatar-name">{`Hi ${username}`}</div>
        </>
      )}
    </div>
  );
};

export default Avatar;
