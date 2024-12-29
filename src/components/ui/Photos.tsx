import React from "react";
import Image from "next/image";

// Import images
// import photo1 from "@/assets/photos/photo-1.png";
// import photo2 from "@/assets/photos/photo-2.png";
// import photo3 from "@/assets/photos/photo-3.png";
// import photo4 from "@/assets/photos/photo-4.png";
// import photo5 from "@/assets/photos/photo-5.png";
// import photo6 from "@/assets/photos/photo-6.png";
import { useGetPhotoByUserQuery } from "@/redux/features/authSlice/authApi";

export default function Photos(id: any) {
  // Array of photos
  // const photos = [
  //   photo1,
  //   photo2,
  //   photo3,
  //   photo4,
  //   photo5,
  //   photo6,
  //   photo1,
  //   photo2,
  //   photo3,
  //   photo4,
  //   photo5,
  //   photo6,
  //   photo1,
  //   photo2,
  //   photo3,
  //   photo4,
  //   photo5,
  //   photo6,
  //   photo1,
  //   photo2,
  //   photo3,
  //   photo4,
  //   photo5,
  //   photo6,
  // ];

  const userId = id.id;
  const { data: getPhoto } = useGetPhotoByUserQuery(userId);

  // Extracting the images from the response
  const photos = getPhoto?.data?.meta?.data
    ?.flatMap((item: any) => item.images) || []; 

  return (
    <div className="container mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Photos.length > 0 ? (
          
            photos.map((photo: string, index: number) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden  hover:scale-105 transition-transform duration-300"
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
            ))
          
        ) : (
          <div className="text-center text-gray-500">
            No Photo found.
          </div>
        ) }
      </div>
    </div>
  );
}
