import React, { useState, useCallback } from 'react';
import { Inquiry, Service, View } from './types';
import Header from './components/Header';
import InquiryForm from './components/InquiryForm';
import TherapistDashboard from './components/TherapistDashboard';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

// Mock data simulating a database
const MOCK_SERVICES: Service[] = [
  { key: 'family_issues', label: 'Family Issues' },
  { key: 'anxiety', label: 'Anxiety & Stress' },
  { key: 'depression', label: 'Depression' },
  { key: 'career_counseling', label: 'Career Counseling' },
];

const MOCK_THERAPISTS: Record<string, string> = {
  family_issues: 'therapist.family@clinic.com',
  anxiety: 'therapist.anxiety@clinic.com',
  depression: 'therapist.anxiety@clinic.com', // anxiety therapist also handles depression
  career_counseling: 'therapist.career@clinic.com',
};

const MOCK_INQUIRIES: Inquiry[] = [
    {
        id: 1,
        userEmail: 'patient_a@test.com',
        serviceType: 'family_issues',
        description: 'I am having frequent arguments with my partner and it\'s affecting our children. We need guidance on how to communicate better.',
        status: 'assigned',
        therapistEmail: 'therapist.family@clinic.com',
        createdAt: new Date(Date.now() - 86400000 * 2),
    },
    {
        id: 2,
        userEmail: 'patient_b@test.com',
        serviceType: 'anxiety',
        description: 'I\'ve been experiencing panic attacks before important meetings at work. It\'s starting to impact my performance and I feel overwhelmed.',
        status: 'responded',
        therapistEmail: 'therapist.anxiety@clinic.com',
        response: 'Thank you for reaching out. It sounds like a very challenging situation. We can certainly explore some strategies to manage this anxiety. Let\'s start by discussing the triggers in more detail.',
        createdAt: new Date(Date.now() - 86400000),
    },
];


const App: React.FC = () => {
  const [view, setView] = useState<View>('patient');
  const [inquiries, setInquiries] = useState<Inquiry[]>(MOCK_INQUIRIES);

  const addInquiry = useCallback((inquiry: Omit<Inquiry, 'id' | 'status' | 'therapistEmail' | 'createdAt'>) => {
    const therapistEmail = MOCK_THERAPISTS[inquiry.serviceType] || 'admin@clinic.com';
    const newInquiry: Inquiry = {
      ...inquiry,
      id: inquiries.length + 1,
      status: 'assigned',
      therapistEmail,
      createdAt: new Date(),
    };
    setInquiries(prev => [newInquiry, ...prev]);
  }, [inquiries]);

  const updateInquiry = useCallback((id: number, response: string) => {
    setInquiries(prev =>
      prev.map(inq =>
        inq.id === id ? { ...inq, status: 'responded', response } : inq
      )
    );
  }, []);

  const currentTherapist = 'therapist.anxiety@clinic.com'; // Mock logged-in therapist

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Header currentView={view} setView={setView} />
      <main className="p-4 sm:p-6 md:p-8 flex-grow">
        <div className="max-w-7xl mx-auto">
          {view === 'patient' && (
            <InquiryForm services={MOCK_SERVICES} onSubmit={addInquiry} />
          )}
          {view === 'therapist' && (
            <TherapistDashboard
              inquiries={inquiries.filter(i => i.therapistEmail === currentTherapist)}
              therapistEmail={currentTherapist}
              onRespond={updateInquiry}
            />
          )}
          {view === 'admin' && <AdminDashboard inquiries={inquiries} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
