import React from "react";
import { useGetVideoByUserQuery } from "@/redux/features/authSlice/authApi";

export default function Videos({ id }: { id: any }) {
    const userId = id.id;
    const { data: getVideos } = useGetVideoByUserQuery(userId);

    // Extract videos from the API response
    const videos =
        getVideos?.data?.meta?.data?.flatMap((item: any) => item.videos) || [];

    return (
        <div className="container mx-auto p-5">
            {videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {videos.map((video: string, index: number) => (
                        <div
                            key={index}
                            className="relative rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                        >
                            <video
                                controls
                                className="w-full h-auto rounded-lg"
                            >
                                <source src={video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    No videos found.
                </div>
            )}
        </div>
    );
}
