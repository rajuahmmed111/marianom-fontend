import React from "react";
import Image from "next/image";

// Import images
import photo1 from "@/assets/photos/photo-1.png";
import photo2 from "@/assets/photos/photo-2.png";
import photo3 from "@/assets/photos/photo-3.png";
import photo4 from "@/assets/photos/photo-4.png";
import photo5 from "@/assets/photos/photo-5.png";
import photo6 from "@/assets/photos/photo-6.png";

export default function Photos() {
  // Array of photos
  const photos = [
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo6,
    photo1, 
    photo2,
    photo3,
    photo4,
    photo5,
    photo6,
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo6,
    photo1, 
    photo2,
    photo3,
    photo4,
    photo5,
    photo6,
  ];

  return (
    <div className="container mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={photo}
              alt={`Photo ${index + 1}`}
              layout="responsive"
              width={300}
              height={300}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
