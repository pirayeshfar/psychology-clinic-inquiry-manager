
import React, { useState } from 'react';
import { Inquiry } from '../types';
import { generateDraftResponse } from '../services/geminiService';

interface TherapistDashboardProps {
  inquiries: Inquiry[];
  therapistEmail: string;
  onRespond: (id: number, response: string) => void;
}

const InquiryRow: React.FC<{ inquiry: Inquiry; onSelect: (inquiry: Inquiry) => void }> = ({ inquiry, onSelect }) => {
    const getStatusChip = (status: string) => {
        const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full";
        switch (status) {
            case 'assigned': return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case 'responded': return `${baseClasses} bg-green-100 text-green-800`;
            default: return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };
    
    return (
        <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onSelect(inquiry)}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inquiry.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{inquiry.serviceType.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</td>
            <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">{inquiry.description}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{inquiry.createdAt.toLocaleDateString()}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm"><span className={getStatusChip(inquiry.status)}>{inquiry.status}</span></td>
        </tr>
    );
};

const ResponseModal: React.FC<{inquiry: Inquiry; onClose: () => void; onRespond: (id: number, response: string) => void}> = ({inquiry, onClose, onRespond}) => {
    const [response, setResponse] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateDraft = async () => {
        setIsGenerating(true);
        const draft = await generateDraftResponse(inquiry.description);
        setResponse(draft);
        setIsGenerating(false);
    };

    const handleSend = () => {
        if (response.trim()) {
            onRespond(inquiry.id, response);
            onClose();
        }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl transform transition-all">
            <div className="p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-800">Respond to Inquiry #{inquiry.id}</h3>
                <p className="text-sm text-gray-500 mt-1">Service: {inquiry.serviceType.replace('_', ' ')}</p>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-semibold text-gray-700 mb-2">Client's Description:</h4>
                    <p className="text-gray-600 whitespace-pre-wrap">{inquiry.description}</p>
                </div>
                 <div>
                    <label htmlFor="response-text" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Confidential Response
                    </label>
                    <textarea id="response-text" rows={8} value={response} onChange={(e) => setResponse(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Write your supportive response here..."></textarea>
                 </div>
                 <div className="flex justify-end">
                    <button onClick={handleGenerateDraft} disabled={isGenerating} className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 disabled:bg-gray-100 disabled:text-gray-400 transition">
                        {isGenerating ? 'Generating...' : 'Suggest Draft with AI'}
                    </button>
                 </div>
            </div>
            <div className="p-6 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                <button onClick={handleSend} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={!response.trim()}>Send Response</button>
            </div>
        </div>
      </div>
    );
};


const TherapistDashboard: React.FC<TherapistDashboardProps> = ({ inquiries, therapistEmail, onRespond }) => {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Therapist Dashboard</h2>
      <p className="text-gray-500 mb-6">Viewing inquiries assigned to: <span className="font-medium text-gray-700">{therapistEmail}</span></p>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Service</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Description (Snippet)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Received</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inquiries.length > 0 ? (
                inquiries.map(inq => <InquiryRow key={inq.id} inquiry={inq} onSelect={setSelectedInquiry} />)
            ) : (
                <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-500">No inquiries assigned to you at the moment.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedInquiry && <ResponseModal inquiry={selectedInquiry} onClose={() => setSelectedInquiry(null)} onRespond={onRespond} />}
    </div>
  );
};

export default TherapistDashboard;
