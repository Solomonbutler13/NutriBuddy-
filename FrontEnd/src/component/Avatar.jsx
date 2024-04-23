

// Create Avatar Component in App (<Avatar/>)
// Create an “import Avatar from “.Avatar” ”
// Create Avatar.jsx  / .css page
// create default class and styling

// - Pseudocode For Avatar

// Function to load avatar options from the API

// Make an API call to fetch avatars

// Function to populate select dropdown with avatar options ( assuming each has an id )

// Append each to options

// Function to update the avatar display

// Create API call function (using URL)

// Function to get avatar image URL by ID




//front end
//import React from 'react'
//import "./Avatar.css"




import React from 'react';
import '../component/Avatar.css';

{/* <Avatar src={user.avatar} alt="User Avatar" username={user.username} /> */}

const Avatar = ({ src, alt, username }) => (
  <div className="avatar">
    <img src={src} alt={alt} style={{ width: '250px', height: '250px', borderRadius: '20%' }} />
    <div className="avatar-name">{`Hi ${username}`}</div>
  </div>
);

export default Avatar;

