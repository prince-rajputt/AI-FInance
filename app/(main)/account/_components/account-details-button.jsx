"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import AccountDetailsModal from "./account-details-modal";

export default function AccountDetailsButton({ account, qrCode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        className="w-full gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg"
        size="lg"
      >
        <FileText className="h-5 w-5" />
        View Account Details
      </Button>

      <AccountDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        account={account}
        qrCode={qrCode}
      />
    </>
  );
}
