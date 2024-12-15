"use client";
import Header from "@/components/common/Header";
import NewsFeed from "@/components/ui/NewsFeed";
import Notification from "@/components/ui/Notification";
import { useState } from "react";

export default function Home() {
  // const [showNotification, setShowNotification] = useState(false);
  // const handleShowNotification = () => {
  //   setShowNotification(true);
  // };
  // const handleCloseNotification = () => {
  //   setShowNotification(false);
  // };
  return (
    <div>
      {/* <Header onShowNotification={handleShowNotification} /> */}

      {/* <div className="pt-48">{showNotification ? <Notification onClose={handleCloseNotification} /> : <NewsFeed />}</div> */}
      <NewsFeed/>
    </div>
  );
}
