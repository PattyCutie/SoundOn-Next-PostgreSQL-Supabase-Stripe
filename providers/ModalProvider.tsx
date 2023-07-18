"use client";

import React, { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";

const ModalProvider = () => {
  const [isMounted, setIsmounted] = useState(false);

  useEffect(() => {
    setIsmounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal/>
    </>
  );
};

export default ModalProvider;
