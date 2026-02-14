import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profileCard.css";

function ProfileCard({ user }) {
  
  return (
   <div className="card shadow rounded profile-card gradient-border p-3">
  <div className="card-body d-flex justify-content-between align-items-start p-0">

        {/* Left side: details list */}
        <div className="profile-details text-start">
          <ul className="list-unstyled mb-0">
            <li><strong>Name:</strong> {user.name}</li>
            <li><strong>Halka :</strong> {user.halkaNo} <strong>Masjid Name:</strong> {user.masjidName}</li>
            <li><strong>Phone No:</strong> {user.phone}</li>
            <li><strong>Profession:</strong> {user.profession}</li>
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Comments:</strong> {user.comments}</li>
          </ul>
        </div>

        {/* Right side: image */}
        <div className="profile-image">
          <img
            src={user.image}
            alt="profile"
            className="profile-img rounded-circle"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
