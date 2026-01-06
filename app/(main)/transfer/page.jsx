import React from "react";
import { getUserAccounts } from "@/actions/transfer";
import TransferForm from "./_components/transfer-form";
import { ArrowRightLeft, Lock, Zap, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

async function TransferPage() {
  const accounts = await getUserAccounts();

  if (accounts.length < 1) {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Money Transfer</h1>
          <p className="text-slate-600 mt-2">Send money between your accounts or to other users</p>
        </div>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6 text-center space-y-3">
            <p className="text-yellow-800 font-semibold">No Accounts Found</p>
            <p className="text-yellow-700 text-sm">
              You need at least one account to make transfers. Please create an account first.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
          <ArrowRightLeft className="h-10 w-10 text-blue-600" />
          Money Transfer
        </h1>
        <p className="text-slate-600 mt-2">
          Send money between your accounts or to other users instantly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Features */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3 mb-3">
              <Zap className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900">Instant Transfers</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Transfer money between accounts instantly
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <div className="flex items-start gap-3 mb-3">
              <Shield className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900">Secure Transfers</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Your transactions are encrypted and secure
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
            <div className="flex items-start gap-3 mb-3">
              <Lock className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900">QR & Scan</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Scan QR codes or enter recipient details
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <TransferForm accounts={accounts} />
        </div>
      </div>

      {/* How it works */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-8 rounded-xl border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { num: "1", title: "Select Account", desc: "Choose the account to send from" },
            { num: "2", title: "Select Recipient", desc: "Choose destination or scan QR" },
            { num: "3", title: "Enter Amount", desc: "Specify the amount to transfer" },
            { num: "4", title: "Confirm & Send", desc: "Review and confirm the transfer" },
          ].map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                {step.num}
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">{step.title}</h3>
              <p className="text-sm text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransferPage;
