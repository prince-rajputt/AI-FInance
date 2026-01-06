"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera, X, Check, Upload } from "lucide-react";
import { toast } from "sonner";

const QRScanner = ({ onScan, isOpen, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [manualInput, setManualInput] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setUploadedImage(null);
      }
    } catch (error) {
      toast.error("Camera access denied");
      console.error("Camera error:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      setIsCameraActive(false);
    }
  };

  const captureAndScan = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      // Simulate QR code detection
      // In production, use a library like jsQR or QrScanner
      const imageData = context.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      // Simple simulation - extract account number from center of image
      toast.success("QR scanned! Use manual input below.");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setUploadedImage(img.src);
        stopCamera();
        
        // Simulate QR code detection from image
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          
          toast.success("QR image loaded! Use manual input below.");
        }
      };
      img.src = e.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const handleManualInput = () => {
    if (!manualInput.trim()) {
      toast.error("Please enter account number or phone/email");
      return;
    }

    setScannedData(manualInput);
    toast.success("Data captured");
  };

  const handleConfirm = () => {
    if (!scannedData && !manualInput) {
      toast.error("Please scan or enter recipient details");
      return;
    }

    const data = scannedData || manualInput;
    onScan(data);
    resetScanner();
  };

  const resetScanner = () => {
    stopCamera();
    setScannedData("");
    setManualInput("");
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Scan or Upload QR
          </CardTitle>
          <button
            onClick={resetScanner}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Camera Feed */}
          {isCameraActive && (
            <div className="space-y-3">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg bg-black h-64 object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="flex gap-2">
                <Button onClick={captureAndScan} className="flex-1">
                  Capture
                </Button>
                <Button onClick={stopCamera} variant="outline" className="flex-1">
                  Stop Camera
                </Button>
              </div>
            </div>
          )}

          {/* Uploaded Image Display */}
          {uploadedImage && (
            <div className="space-y-3">
              <img
                src={uploadedImage}
                alt="Uploaded QR"
                className="w-full rounded-lg h-64 object-cover border-2 border-green-200"
              />
              <Button onClick={() => setUploadedImage(null)} variant="outline" className="w-full">
                Clear Image
              </Button>
            </div>
          )}

          {/* Camera/Upload Options */}
          {!isCameraActive && !uploadedImage && (
            <div className="space-y-2">
              <Button onClick={startCamera} className="w-full" variant="outline">
                <Camera className="mr-2 h-4 w-4" />
                Start Camera
              </Button>
              <Button 
                onClick={() => fileInputRef.current?.click()} 
                className="w-full" 
                variant="outline"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload QR Image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Manual Input */}
          <div className="border-t pt-4 space-y-3">
            <div>
              <label className="text-sm font-medium">
                Or enter account/phone/email
              </label>
              <Input
                placeholder="Account No / Phone / Email"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                className="mt-2"
              />
            </div>

            {(scannedData || manualInput) && (
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 font-medium">
                  ✓ {scannedData || manualInput}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleManualInput} className="flex-1" variant="outline">
                Capture
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={!scannedData && !manualInput}
              >
                <Check className="mr-2 h-4 w-4" />
                Confirm
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRScanner;
