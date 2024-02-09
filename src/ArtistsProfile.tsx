import React, { useState } from "react";
import { Artist } from "./types/Artist";

interface ArtistsProfileProps {
  artist: Artist;
}

const ArtistsProfile = ({ artist }: ArtistsProfileProps) => {
  const [isEditing, setEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...artist });
  const [bio, setBio] = useState("");
  const handleEditToggle = () => {
    setEditing(!isEditing);
  };

  console.log("editedProfile =>", editedProfile);
  const handleInputChange = (e: React.MouseEvent) => {
    // const { name, value } = e.target;
    // setEditedProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSaveChanges = () => {
    // Implement the logic to save changes to the backend
    // For simplicity, let's just log the edited profile for now
    console.log("Saved Changes:", editedProfile);
    setEditing(false);
  };

  return (
    <div>
      <h2>Artist Profile</h2>
      {true ? (
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editedProfile?.user?.username}
              //   onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Bio:
            <textarea
              name="bio"
              value={editedProfile?.bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
          <br />
          <label>
            Contact Information:
            <input
              type="text"
              name="contactInfo"
              //   value={editedProfile.contactInfo}
              //   onChange={handleInputChange}
            />
          </label>
          <br />
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      ) : (
        <div>
          <h3>{artist?.user?.username}</h3>
          <p>{artist?.bio}</p>
          {/* <p>Contact: {artist.contactInfo}</p> */}
          <button onClick={(e) => handleEditToggle}>Edit Profile</button>
        </div>
      )}

      <hr />

      <div>
        <h3>Artworks</h3>
      </div>
    </div>
  );
};

export default ArtistsProfile;
