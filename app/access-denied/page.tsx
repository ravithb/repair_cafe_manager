'use client'

import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const AccessDenied: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Icon Container */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
          <ShieldAlert className="w-10 h-10 text-red-600" />
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Access Denied
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Sorry, you don't have permission to open this page. 
          <span className="block font-medium text-slate-800 mt-2">
            Please contact your administrator.
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition shadow-sm"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          
        </div>

      </div>
    </div>
  );
};

export default AccessDenied;