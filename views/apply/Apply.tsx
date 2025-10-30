import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import type { View } from '../../types';
import { playSound } from '../../utils/sound';

interface ApplyProps {
    setActiveView: (view: View) => void;
}

type FormState = {
    fullName: string;
    email: string;
    phone: string;
    dob: string;
    country: string;
    city: string;
    height: string;
    hairColor: string;
    eyeColor: string;
};

type FileState = {
    headshot: File | null;
    fullBody: File | null;
    sideProfile: File | null;
};

const INITIAL_FORM_STATE: FormState = {
    fullName: '', email: '', phone: '', dob: '', country: '', city: '', height: '', hairColor: '', eyeColor: ''
};

const INITIAL_FILE_STATE: FileState = {
    headshot: null, fullBody: null, sideProfile: null
};

const Apply: React.FC<ApplyProps> = ({ setActiveView }) => {
    const [step, setStep] = useState<'terms' | 'form'>('terms');
    const [agreed, setAgreed] = useState(false);
    const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);
    const [files, setFiles] = useState<FileState>(INITIAL_FILE_STATE);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files: inputFiles } = e.target;
        if (inputFiles && inputFiles.length > 0) {
            setFiles(prev => ({ ...prev, [name]: inputFiles[0] }));
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you would typically handle form submission, e.g., send to an API.
        console.log('Form Submitted:', { formData, files });
        playSound('success', 0.4);
        setIsSubmitted(true);
    };

    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => {
                setActiveView('home');
            }, 3000); // Redirect after 3 seconds

            return () => clearTimeout(timer); // Cleanup on unmount
        }
    }, [isSubmitted, setActiveView]);
    
    const renderTerms = () => (
        <div className="relative max-w-4xl mx-auto bg-brand-secondary p-8 rounded-lg shadow-xl">
            <button
                onClick={() => {
                    playSound('close');
                    setActiveView('home');
                }}
                onMouseEnter={() => playSound('hover')}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10 p-1 rounded-full"
                aria-label="Close application"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 className="text-3xl font-bold text-white mb-4">Application Terms & Conditions</h2>
            <div className="h-64 overflow-y-auto bg-brand-primary p-4 rounded border border-brand-accent text-sm text-gray-300 mb-6">
                <p className="mb-2">Please read these terms and conditions carefully before submitting your application.</p>
                <p className="mb-4">By submitting your application to Elysian Talent Hub ("we", "us", "our"), you ("the applicant") agree to the following terms:</p>
                <ol className="list-decimal list-inside space-y-2">
                    <li>You confirm that you are 18 years of age or older. If you are under 18, you must have consent from a parent or legal guardian.</li>
                    <li>You certify that all information provided in your application is true, accurate, current, and complete.</li>
                    <li>You grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, distribute, and display the photographs and information submitted for the purpose of evaluation and potential representation.</li>
                    <li>There is no guarantee of representation or employment. Our team will review your submission, and we will contact you only if we are interested in moving forward.</li>
                    <li>You agree that we are not responsible for any costs incurred during the application process.</li>
                    <li>You understand that our recruitment process does not require any payment from applicants. Beware of scams. Elysian will never ask for money for an application.</li>
                </ol>
            </div>
            <div className="flex items-center space-x-3 mb-6">
                <input
                    type="checkbox"
                    id="terms-agree"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                    className="h-5 w-5 bg-brand-accent text-brand-highlight focus:ring-brand-highlight border-gray-500 rounded"
                />
                <label htmlFor="terms-agree" className="text-brand-text">I have read and agree to the Terms & Conditions.</label>
            </div>
            <button
                onClick={() => {
                    playSound('click');
                    setStep('form');
                }}
                disabled={!agreed}
                onMouseEnter={(e) => !(e.target as HTMLButtonElement).disabled && playSound('hover')}
                className="w-full bg-brand-highlight text-black font-semibold py-3 px-6 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100"
            >
                Continue to Application
            </button>
        </div>
    );

    const renderForm = () => (
        <div className="relative max-w-4xl mx-auto bg-brand-secondary p-8 rounded-lg shadow-xl">
            <button
                onClick={() => {
                    playSound('close');
                    setActiveView('home');
                }}
                onMouseEnter={() => playSound('hover')}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10 p-1 rounded-full"
                aria-label="Close application"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 className="text-3xl font-bold text-white mb-6">Your Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Details */}
                    <input type="text" name="fullName" placeholder="Full Name" onChange={handleInputChange} required className="input-style" />
                    <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} required className="input-style" />
                    <input type="tel" name="phone" placeholder="Phone Number" onChange={handleInputChange} required className="input-style" />
                    <input type="date" name="dob" placeholder="Date of Birth" onChange={handleInputChange} required className="input-style" />
                    <input type="text" name="country" placeholder="Country" onChange={handleInputChange} required className="input-style" />
                    <input type="text" name="city" placeholder="City" onChange={handleInputChange} required className="input-style" />
                    {/* Model Stats */}
                    <input type="text" name="height" placeholder="Height (e.g., 5'11&quot;)" onChange={handleInputChange} required className="input-style" />
                    <input type="text" name="hairColor" placeholder="Hair Color" onChange={handleInputChange} required className="input-style" />
                    <input type="text" name="eyeColor" placeholder="Eye Color" onChange={handleInputChange} required className="input-style" />
                </div>

                {/* Photo Uploads */}
                <div className="mt-8 border-t border-brand-accent pt-6">
                    <h3 className="text-xl font-bold text-white mb-4">Upload Photos</h3>
                    <p className="text-sm text-gray-400 mb-4">Please provide clear, recent photos. No filters, sunglasses, or hats.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="file-input-wrapper">
                            <label htmlFor="headshot" className="file-input-label">
                                {files.headshot ? files.headshot.name : 'Upload Headshot'}
                            </label>
                            <input type="file" name="headshot" id="headshot" onChange={handleFileChange} required className="hidden" accept="image/*" />
                        </div>
                         <div className="file-input-wrapper">
                            <label htmlFor="fullBody" className="file-input-label">
                                {files.fullBody ? files.fullBody.name : 'Upload Full Body Shot'}
                            </label>
                            <input type="file" name="fullBody" id="fullBody" onChange={handleFileChange} required className="hidden" accept="image/*" />
                        </div>
                         <div className="file-input-wrapper">
                            <label htmlFor="sideProfile" className="file-input-label">
                                {files.sideProfile ? files.sideProfile.name : 'Upload Side Profile'}
                            </label>
                            <input type="file" name="sideProfile" id="sideProfile" onChange={handleFileChange} required className="hidden" accept="image/*" />
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                     <button
                        type="submit"
                        onMouseEnter={() => playSound('hover')}
                        className="w-full bg-brand-highlight text-black font-semibold py-3 px-6 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg">
                        Submit Application
                    </button>
                </div>
            </form>
        </div>
    );

    const renderSuccess = () => (
        <div className="relative max-w-4xl mx-auto bg-brand-secondary p-8 rounded-lg shadow-xl text-center">
            <div className="flex justify-center items-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Application Submitted!</h2>
            <p className="text-lg text-brand-text mb-8">Thank you. Please refer back to the person that contacted you for the next steps.</p>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-white">Become an Elysian</h1>
                <p className="mt-4 text-lg text-brand-text">Join the next generation of talent. Start your application below.</p>
            </div>
            
            {isSubmitted ? renderSuccess() : (step === 'terms' ? renderTerms() : renderForm())}

            <style>{`
                .input-style {
                    background-color: #111;
                    border: 1px solid #222;
                    border-radius: 0.5rem;
                    padding: 0.75rem 1rem;
                    color: #FAFAFA;
                    width: 100%;
                }
                .input-style::placeholder {
                    color: #6b7280;
                }
                .input-style:focus {
                    outline: none;
                    box-shadow: 0 0 0 2px #FFFFFF;
                }
                .file-input-label {
                    display: block;
                    background-color: #111;
                    border: 1px solid #222;
                    border-radius: 0.5rem;
                    padding: 0.75rem 1rem;
                    color: #9ca3af;
                    cursor: pointer;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    transition: all 0.2s;
                }
                .file-input-label:hover {
                    border-color: #FFFFFF;
                    color: #FFFFFF;
                }
            `}</style>
        </div>
    );
};

export default Apply;