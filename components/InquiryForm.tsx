
import React, { useState } from 'react';
import { Inquiry, Service } from '../types';

interface InquiryFormProps {
  services: Service[];
  onSubmit: (inquiry: Omit<Inquiry, 'id' | 'status' | 'therapistEmail' | 'createdAt'>) => void;
}

const InquiryForm: React.FC<InquiryFormProps> = ({ services, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !serviceType || !description) {
      setMessage({ type: 'error', text: 'All fields are required.' });
      return;
    }
    setIsLoading(true);
    setMessage(null);

    // Simulate network delay
    setTimeout(() => {
      onSubmit({ userEmail: email, serviceType, description });
      setMessage({ type: 'success', text: 'Your inquiry has been sent successfully. You will receive a response via email.' });
      setEmail('');
      setServiceType('');
      setDescription('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Confidential Inquiry Form</h2>
        <p className="text-gray-500 mt-2">Your privacy is our priority. Please share your concerns below.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-1">
            Your Email Address (for receiving replies)
          </label>
          <input
            type="email"
            id="user_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="service_type" className="block text-sm font-medium text-gray-700 mb-1">
            Type of Service
          </label>
          <select
            id="service_type"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition bg-white"
            required
          >
            <option value="">Select a service...</option>
            {services.map((service) => (
              <option key={service.key} value={service.key}>{service.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Please describe your concern
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="You can write freely here. All information is kept confidential."
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Submitting...' : 'Send Secure Inquiry'}
        </button>
      </form>
      {message && (
        <div className={`mt-6 p-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default InquiryForm;
