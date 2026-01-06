"use client";

import React, { useState, useEffect } from "react";
import { transferMoney, verifyPhoneOrEmail } from "@/actions/transfer";
import useFetch from "@/hooks/usefetch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import QRScanner from "./qr-scanner";

const TransferForm = ({ accounts }) => {
  const [step, setStep] = useState(1); // 1: Select From, 2: Enter To, 3: Amount, 4: Confirm, 5: Success
  const [fromAccountId, setFromAccountId] = useState("");
  const [transferType, setTransferType] = useState("internal"); // internal or external
  const [toAccountId, setToAccountId] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [verifiedRecipient, setVerifiedRecipient] = useState(null);

  const { loading: transferLoading, fn: transferFn, data: transferResult, error: transferError } = useFetch(transferMoney);
  const { loading: verifyLoading, fn: verifyFn } = useFetch(verifyPhoneOrEmail);

  const selectedFromAccount = accounts.find((a) => a.id === fromAccountId);
  const selectedToAccount = accounts.find((a) => a.id === toAccountId);

  // Watch for transfer result and show success popup
  useEffect(() => {
    if (transferResult?.success) {
      setStep(5);
      toast.success("Transaction Successful! ✓", {
        description: `Transfer of $${parseFloat(amount).toFixed(2)} completed successfully`,
        duration: 4000,
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      });
    }
  }, [transferResult]);

  // Watch for transfer error and show failure popup
  useEffect(() => {
    if (transferError) {
      toast.error("Transaction Failed ✗", {
        description: transferError.message || "An error occurred during the transfer",
        duration: 4000,
        icon: <AlertCircle className="h-5 w-5 text-red-600" />,
      });
    }
  }, [transferError]);

  const handleQRScan = (data) => {
    if (/^\d{10}$/.test(data)) {
      setRecipientPhone(data);
    } else if (data.includes("@")) {
      setRecipientEmail(data);
    } else {
      setRecipientPhone(data);
    }
    setShowScanner(false);
  };

  const verifyRecipient = async () => {
    const recipient = recipientPhone || recipientEmail;
    if (!recipient) {
      toast.error("Please enter phone or email");
      return;
    }

    const result = await verifyFn(recipient);
    if (result?.valid) {
      setVerifiedRecipient(result);
      setStep(3);
    } else {
      toast.error("Invalid phone or email format");
    }
  };

  const handleTransfer = async () => {
    if (!fromAccountId || !amount) {
      toast.error("Please fill all required fields");
      return;
    }

    const transferData = {
      fromAccountId,
      amount: parseFloat(amount),
      description: description || `Transfer to ${transferType === "internal" ? selectedToAccount?.name : recipientPhone || recipientEmail}`,
    };

    if (transferType === "internal") {
      if (!toAccountId) {
        toast.error("Please select destination account");
        return;
      }
      transferData.toAccountId = toAccountId;
    } else {
      transferData.toPhoneOrEmail = recipientPhone || recipientEmail;
    }

    await transferFn(transferData);
  };

  const resetForm = () => {
    setStep(1);
    setFromAccountId("");
    setTransferType("internal");
    setToAccountId("");
    setRecipientPhone("");
    setRecipientEmail("");
    setAmount("");
    setDescription("");
    setVerifiedRecipient(null);
  };

  // Step 1: Select From Account
  if (step === 1) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Select Source Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">From Account</label>
            <Select value={fromAccountId} onValueChange={setFromAccountId}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose account to send from" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    {acc.name} - ${parseFloat(acc.balance).toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedFromAccount && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Account:</strong> {selectedFromAccount.name}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Available:</strong> ${parseFloat(selectedFromAccount.balance).toFixed(2)}
              </p>
            </div>
          )}

          <Button
            onClick={() => setStep(2)}
            disabled={!fromAccountId}
            className="w-full"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Step 2: Select Transfer Type & Recipient
  if (step === 2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Select Recipient</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={transferType === "internal" ? "default" : "outline"}
              onClick={() => setTransferType("internal")}
              className="flex-1"
            >
              To My Account
            </Button>
            <Button
              variant={transferType === "external" ? "default" : "outline"}
              onClick={() => setTransferType("external")}
              className="flex-1"
            >
              To Other Account
            </Button>
          </div>

          {transferType === "internal" ? (
            <div>
              <label className="text-sm font-medium">To Account</label>
              <Select value={toAccountId} onValueChange={setToAccountId}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose destination account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts
                    .filter((a) => a.id !== fromAccountId)
                    .map((acc) => (
                      <SelectItem key={acc.id} value={acc.id}>
                        {acc.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {selectedToAccount && (
                <div className="mt-3 bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {selectedToAccount.name}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Phone or Email</label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Phone (10 digits) or Email"
                    value={recipientPhone || recipientEmail}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {
                        setRecipientPhone(value);
                      } else {
                        setRecipientEmail(value);
                      }
                    }}
                  />
                  <Button
                    onClick={() => setShowScanner(true)}
                    variant="outline"
                    size="icon"
                  >
                    📱
                  </Button>
                </div>
              </div>

              {(recipientPhone || recipientEmail) && (
                <Button
                  onClick={verifyRecipient}
                  disabled={verifyLoading}
                  className="w-full"
                >
                  {verifyLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Recipient"
                  )}
                </Button>
              )}
            </div>
          )}

          <QRScanner
            isOpen={showScanner}
            onClose={() => setShowScanner(false)}
            onScan={handleQRScan}
          />

          <div className="flex gap-2">
            <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
              Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              disabled={
                transferType === "internal" ? !toAccountId : !verifiedRecipient
              }
              className="flex-1"
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Step 3: Enter Amount
  if (step === 3) {
    const maxAmount = parseFloat(selectedFromAccount?.balance || 0);
    const transferAmount = parseFloat(amount) || 0;
    const isValid = transferAmount > 0 && transferAmount <= maxAmount;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Enter Amount</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">From</p>
            <p className="font-semibold text-lg">{selectedFromAccount?.name}</p>
            <ArrowRight className="h-4 w-4 my-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-1">To</p>
            <p className="font-semibold text-lg">
              {transferType === "internal"
                ? selectedToAccount?.name
                : verifiedRecipient?.recipient}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              step="0.01"
              min="0"
              max={maxAmount}
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-2 text-xl"
            />
            <p className="text-xs text-gray-500 mt-1">
              Available: ${maxAmount.toFixed(2)}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">Description (Optional)</label>
            <Input
              placeholder="What's this transfer for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2"
            />
          </div>

          {!isValid && amount && (
            <div className="bg-red-50 p-3 rounded-lg border border-red-200 flex gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">Insufficient balance or invalid amount</p>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
              Back
            </Button>
            <Button onClick={() => setStep(4)} disabled={!isValid} className="flex-1">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Step 4: Confirm
  if (step === 4) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Confirm Transfer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">From Account</span>
              <span className="font-semibold">{selectedFromAccount?.name}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">To</span>
              <span className="font-semibold">
                {transferType === "internal"
                  ? selectedToAccount?.name
                  : verifiedRecipient?.recipient}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Amount</span>
              <span className="font-semibold text-lg text-green-600">
                ${parseFloat(amount).toFixed(2)}
              </span>
            </div>
            {description && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Description</span>
                <span className="font-semibold">{description}</span>
              </div>
            )}
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              ✓ Review your details carefully before confirming
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setStep(3)} variant="outline" className="flex-1">
              Back
            </Button>
            <Button
              onClick={handleTransfer}
              disabled={transferLoading}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {transferLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Confirm Transfer
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Step 5: Success
  if (step === 5) {
    return (
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardContent className="pt-8 text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-900">Transfer Successful!</h3>
            <p className="text-green-700 mt-2">
              ${parseFloat(amount).toFixed(2)} has been transferred
            </p>
          </div>

          {transferResult && (
            <div className="bg-white p-4 rounded-lg border border-green-200 space-y-2 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transaction ID</span>
                <Badge className="bg-green-100 text-green-700 font-mono">
                  {transferResult.transactionId}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">From</span>
                <span className="font-semibold">{transferResult.fromAccount.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {transferResult.type === "internal" ? "To Account" : "Recipient"}
                </span>
                <span className="font-semibold">
                  {transferResult.type === "internal"
                    ? transferResult.toAccount.name
                    : transferResult.recipient}
                </span>
              </div>
            </div>
          )}

          <Button onClick={resetForm} className="w-full mt-6">
            Make Another Transfer
          </Button>
        </CardContent>
      </Card>
    );
  }
};

export default TransferForm;
