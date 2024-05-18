// Avatar.jsx
import React, { useState, useEffect } from 'react';
import './Avatar.css';

const Avatar = ({ src, alt, username }) => {
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(src);

  useEffect(() => {
    if (!src) {
      const fetchAvatar = async () => {
        setLoading(true);
        try {
          const response = await fetch('https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Felix');
          const blob = await response.blob();
          const newAvatarUrl = URL.createObjectURL(blob);
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

  useEffect(() => {
    setAvatarUrl(src);
  }, [src]);

  return (
    <div className="avatar">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <img src={avatarUrl} alt={alt} style={{ width: '250px', height: '250px', borderRadius: '20%' }} />
          <div className="avatar-name">{`Hi ${username}`}</div>
        </>
      )}
    </div>
  );
};

export default Avatar;
