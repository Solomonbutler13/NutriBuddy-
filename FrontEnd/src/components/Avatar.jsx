import React, { useState, useEffect } from 'react';
import '../component/avatar.css';

const Avatar = ({ src, alt, username }) => {
  // State to manage loading state when fetching a new avatar
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(src);

  // Function to fetch a new avatar when the component mounts
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        // Make API call to fetch new avatar
        const response = await fetch('https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Felix');
        const blob = await response.blob();
        const newAvatarUrl = URL.createObjectURL(blob);
        setAvatarUrl(newAvatarUrl);
      } catch (error) {
        console.error('Error fetching new avatar:', error);
      } finally {
        setLoading(false); // Set loading state back to false after fetching
      }
    };

    fetchAvatar(); // Call the fetchAvatar function when the component mounts
  }, []); // Empty dependency array to ensure the effect runs only once when the component mounts

  return (
    <div className="avatar">
      {/* Display current avatar */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <img src={avatarUrl || src} alt={alt} style={{ width: '250px', height: '250px', borderRadius: '20%' }} />
          {/* Display username */}
          <div className="avatar-name">{`Hi ${username}`}</div>
        </>
      )}
    </div>
  );
};

export default Avatar;
