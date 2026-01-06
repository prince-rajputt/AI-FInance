"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Eye, EyeOff, Download } from "lucide-react";
import { toast } from "sonner";

export default function AccountDetails({ account, qrCode }) {
  const [showQR, setShowQR] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`${fieldName} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const downloadQR = () => {
    if (!qrCode) return;

    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `${account.name}-qr.png`;
    link.click();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAccountTypeIcon = (type) => {
    const icons = {
      CURRENT: "🏦",
      SAVINGS: "💰",
    };
    return icons[type] || "💼";
  };

  return (
    <div className="space-y-4">
      {/* Main Account Details Card */}
      <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">{getAccountTypeIcon(account.type)}</span>
            Account Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Account Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-blue-200">
            {/* Account Name and Type */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Account Name</p>
              <p className="text-lg font-semibold">{account.name}</p>
            </div>

            {/* Account Type */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Account Type</p>
              <Badge className="w-fit bg-blue-100 text-blue-800 hover:bg-blue-100">
                {account.type.charAt(0) + account.type.slice(1).toLowerCase()}
              </Badge>
            </div>

            {/* Current Balance */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Current Balance</p>
              <p className="text-2xl font-bold text-green-600">
                ${parseFloat(account.balance).toFixed(2)}
              </p>
            </div>

            {/* Account ID */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Account ID</p>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono bg-gray-200 px-2 py-1 rounded truncate">
                  {account.id.slice(0, 8)}...{account.id.slice(-4)}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(account.id, "Account ID")}
                  className="h-8 w-8 p-0"
                >
                  <Copy
                    className={`h-4 w-4 ${
                      copiedField === "Account ID"
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-blue-600">
                {account._count?.transactions || 0}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-600">Account Created</p>
              <p className="text-sm font-semibold text-gray-800">
                {formatDate(account.createdAt)}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-600">Last Updated</p>
              <p className="text-sm font-semibold text-gray-800">
                {formatDate(account.updatedAt)}
              </p>
            </div>
          </div>

          {/* QR Code Section */}
          {qrCode && (
            <div className="border-t border-blue-200 pt-6">
              <p className="text-sm font-semibold text-gray-600 mb-4">
                Account QR Code
              </p>
              {showQR ? (
                <div className="space-y-4 flex flex-col items-center">
                  <img
                    src={qrCode}
                    alt={`QR Code for ${account.name}`}
                    className="w-48 h-48 border-4 border-blue-200 rounded-lg shadow-lg bg-white p-2"
                  />
                  <p className="text-xs text-gray-600 text-center max-w-xs">
                    Share this QR code with others to receive money transfers
                  </p>
                  <div className="flex gap-2 w-full justify-center">
                    <Button
                      onClick={() => setShowQR(false)}
                      variant="outline"
                      className="gap-2"
                    >
                      <EyeOff className="h-4 w-4" />
                      Hide QR
                    </Button>
                    <Button
                      onClick={downloadQR}
                      className="gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      <Download className="h-4 w-4" />
                      Download QR
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setShowQR(true)}
                  className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Eye className="h-4 w-4" />
                  View QR Code
                </Button>
              )}
            </div>
          )}

          {/* Account Information Summary */}
          <div className="border-t border-blue-200 pt-6">
            <p className="text-sm font-semibold text-gray-600 mb-3">
              Account Information
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Active
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account ID</span>
                <code className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                  {account.id}
                </code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Created</span>
                <span className="font-medium">
                  {formatDate(account.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
