import React from "react";
import { withRouter } from "react-router-dom";

const DisplayAvatar = props => {
  const images = [
    {
      id: 1,
      src: "../rats/New Piskel-2.png (1).png",
      title: "foo",
      description: "bar"
    },
    {
      id: 2,
      src: "../rats/New Piskel-2.png.png",
      title: "foo",
      description: "bar"
    },
    {
      id: 3,
      src: "../rats/New Piskel-3.png.png",
      title: "foo",
      description: "bar"
    },
    {
      id: 4,
      src: "../rats/New Piskel-4.png.png",
      title: "foo",
      description: "bar"
    },
    {
      id: 5,
      src: "../rats/New Piskel-5.png.png",
      title: "foo",
      description: "bar"
    },
    {
      id: 6,
      src: "../rats/New Piskel-6.png.png",
      title: "foo",
      description: "bar"
    }
  ];

  console.log("avatarlist:dipsplayAvatars", images);
  return (
    <div className="stock-list">
      {images &&
        images.map(({ id, src, title, description }) => (
          <div className="image-container">
            <img key={id} src={src} title={title} alt={description} />
          </div>
        ))}
    </div>
  );
};
export default withRouter(DisplayAvatars);
