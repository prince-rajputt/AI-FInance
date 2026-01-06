"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, EyeOff } from "lucide-react";

export default function AccountQRCode({ accountId, accountName, qrCode }) {
  const [showQR, setShowQR] = useState(false);

  const downloadQR = () => {
    if (!qrCode) return;

    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `${accountName}-qr.png`;
    link.click();
  };

  if (!qrCode) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Account QR Code</span>
          <span className="text-sm font-normal text-gray-600">
            Share to receive money
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showQR ? (
          <div className="flex flex-col items-center gap-4">
            <img
              src={qrCode}
              alt={`QR Code for ${accountName}`}
              className="w-48 h-48 border-4 border-white rounded-lg shadow-lg"
            />
            <p className="text-sm text-gray-600 text-center">
              Others can scan this QR code to transfer money to <strong>{accountName}</strong> account
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowQR(false)}
                variant="outline"
                className="flex-1"
              >
                <EyeOff className="mr-2 h-4 w-4" />
                Hide QR
              </Button>
              <Button onClick={downloadQR} className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setShowQR(true)}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Eye className="mr-2 h-4 w-4" />
            Show QR Code
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
