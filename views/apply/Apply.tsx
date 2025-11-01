import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import type { View } from '../../types';
import { playSound } from '../../utils/sound';

interface ApplyProps {
    navigateTo: (view: View) => void;
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
    video: File | null;
};

const INITIAL_FORM_STATE: FormState = {
    fullName: '', email: '', phone: '', dob: '', country: '', city: '', height: '', hairColor: '', eyeColor: ''
};

const INITIAL_FILE_STATE: FileState = {
    headshot: null, fullBody: null, sideProfile: null, video: null
};

const Apply: React.FC<ApplyProps> = ({ navigateTo }) => {
    const [step, setStep] = useState<'terms' | 'form'>('terms');
    const [agreed, setAgreed] = useState(false);
    const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);
    const [files, setFiles] = useState<FileState>(INITIAL_FILE_STATE);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    useEffect(() => {
        if (sessionStorage.getItem('applicationSubmitted') === 'true') {
            setSubmissionStatus('success');
        }
    }, []);

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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!files.headshot || !files.fullBody || !files.sideProfile) {
            setSubmissionError('Please upload all three required photos.');
            return;
        }

        setSubmissionStatus('submitting');
        setSubmissionError(null);

        const submissionData = new FormData();

        // Append form text data
        // FIX: Replaced Object.entries with Object.keys for better type safety with FormData. This resolves an issue where the value was inferred as 'unknown'.
        Object.keys(formData).forEach((key) => {
            submissionData.append(key, formData[key as keyof FormState]);
        });

        // Append files
        // FIX: Replaced Object.entries with Object.keys for better type safety with FormData. This resolves an issue where the file was inferred as 'unknown' or '{}'.
        Object.keys(files).forEach((key) => {
            const file = files[key as keyof FileState];
            if (file) {
                submissionData.append(key, file);
            }
        });

        // FormSubmit.co specific fields
        submissionData.append('_subject', `New Elysian Hub Application: ${formData.fullName}`);
        submissionData.append('_captcha', 'false');

        try {
            const response = await fetch('https://formsubmit.co/elysianhub74@gmail.com', {
                method: 'POST',
                body: submissionData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Handle success
                playSound('success', 0.4);
                setSubmissionStatus('success');
                sessionStorage.setItem('applicationSubmitted', 'true');
            } else {
                // FormSubmit.co might return a 4xx error with a JSON body
                throw new Error(result.message || 'Sorry, there was an error submitting your application.');
            }

        } catch (error) {
            console.error("Submission error: ", error);
            const message = error instanceof Error ? `Submission failed: ${error.message}` : "An unknown error occurred. Please try again.";
            setSubmissionError(message);
            setSubmissionStatus('idle'); // Reset status to allow retry
        }
    };
    
    const renderTerms = () => (
        <div className="relative max-w-4xl mx-auto bg-brand-secondary p-8 rounded-lg shadow-xl">
            <button
                onClick={() => {
                    playSound('close');
                    navigateTo('home');
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
            <div className="h-96 overflow-y-auto bg-brand-primary p-4 rounded border border-brand-accent text-sm text-gray-300 mb-6 space-y-4">
                <p className="font-bold text-white">IMPORTANT: Please read these Terms and Conditions ("T&amp;C") carefully before submitting your application. By clicking "I Agree" and submitting an application through this website, you agree to be bound by these T&amp;C.</p>

                <div>
                    <h3 className="font-semibold text-white mb-2">1. Introduction and Scope</h3>
                    <p>These T&amp;C govern your use of this website and the process of submitting an application for professional representation to one of our two divisions ("Application"). Submitting an Application does not create a formal Agency/Artist Representation Agreement, nor does it guarantee an interview or eventual representation. A formal, exclusive relationship is only established upon the execution of a separate Representation Agreement signed by both parties. The terms applicable to your Application are determined by the division you select: Acting Division (LightStorm Entertainment Ltd., US-based) or Music Division (Independent Talent Group Ltd., UK-based).</p>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-2">2. Applicant Obligations and Status</h3>
                    <p>By submitting an Application, you represent and warrant that you are legally eligible to enter into a professional representation agreement. You must provide true, accurate, current, and complete information as required by the Application form; misrepresentation will result in immediate rejection. You agree to cooperate with the Agency's review process, including promptly responding to communications. You acknowledge that your Application is for consideration as an Independent Contractor and not an employee of either Agency.</p>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-2">3. Financial Obligations (Processing Fee)</h3>
                    <p>You acknowledge and agree that a one-time processing fee will be required only upon the successful signing of a formal Representation Agreement. This fee covers initial administrative and establishment costs and is non-refundable under all circumstances, including the subsequent termination of the Representation Agreement.</p>
                    <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
                        <li>If you are applying to the Acting Division (LightStorm Entertainment Ltd.), the non-refundable processing fee is $1,000.00 (One Thousand US Dollars).</li>
                        <li>If you are applying to the Music Division (Independent Talent Group Ltd.), the non-refundable processing fee is $1,500.00 (One Thousand Five Hundred US Dollars).</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-2">4. Application Material and Use of Likeness</h3>
                    <p>You retain all ownership rights to your submitted materials, including photographs, video reels, music tracks, and resumes ("Application Materials"). By submitting them, you grant the respective Agency division a non-exclusive, royalty-free, worldwide license to use, reproduce, and display these materials solely for the purpose of evaluating your potential for representation and internal team review. You will receive no compensation or payment for the Agency's review or internal use of these materials. The Agency is under no obligation to return Application Materials.</p>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-2">5. Governing Law and Jurisdiction</h3>
                    <p>You acknowledge that the potential formal Representation Agreement, and all matters related to your application, will be governed by the laws and jurisdiction of the relevant division:</p>
                    <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
                        <li>For the Acting Division (LightStorm Entertainment Ltd.): The governing law is the United States, and the primary jurisdiction and seat of arbitration shall be Santa Monica, California, U.S.</li>
                        <li>For the Music Division (Independent Talent Group Ltd.): The governing law is the United Kingdom, and the primary jurisdiction and seat of arbitration shall be London, U.K.</li>
                    </ul>
                    <p className="mt-2">Any dispute related to the application process will first be attempted through good-faith negotiation. If negotiation fails, the Parties agree to engage in Mediation before resorting to Litigation or Arbitration, as specified in the formal contract for the relevant division.</p>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-2">6. General Provisions</h3>
                    <p>Both parties agree to keep confidential any non-public information disclosed during the application process. These T&amp;C constitute the entire agreement regarding the Application process and supersede all prior communications regarding your submission. The Agency reserves the right to amend these T&amp;C at any time, and your continued use of the website after an amendment constitutes your acceptance of the revised T&amp;C.</p>
                </div>

                <p className="font-bold text-white">By proceeding with your online application, you acknowledge that you have read, understood, and agree to be bound by these Application Terms and Conditions and the specific jurisdictional terms of the division to which you are applying.</p>
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
                    navigateTo('home');
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

                {/* Optional Video Upload */}
                <div className="mt-8 border-t border-brand-accent pt-6">
                    <h3 className="text-xl font-bold text-white mb-2">Upload Optional Video</h3>
                    <p className="text-sm text-gray-400 mb-4">Showcase your personality or skills (e.g., runway walk, short monologue). This is highly recommended.</p>
                    <div className="file-input-wrapper">
                        <label htmlFor="video" className="file-input-label">
                            {files.video ? files.video.name : 'Upload Video (Optional)'}
                        </label>
                        <input type="file" name="video" id="video" onChange={handleFileChange} className="hidden" accept="video/*" />
                    </div>
                </div>

                <div className="mt-8">
                     <button
                        type="submit"
                        disabled={submissionStatus === 'submitting'}
                        onMouseEnter={() => submissionStatus !== 'submitting' && playSound('hover')}
                        className="w-full bg-brand-highlight text-black font-semibold py-3 px-6 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:scale-100 flex justify-center items-center"
                    >
                         {submissionStatus === 'submitting' ? (
                            <>
                                <div className="spinner-small" role="status">
                                    <span className="sr-only">Submitting...</span>
                                </div>
                                <span className="ml-2">Submitting...</span>
                            </>
                        ) : (
                            'Submit Application'
                        )}
                    </button>
                    {submissionError && (
                        <p className="text-red-500 text-center mt-4 text-sm break-words">{submissionError}</p>
                    )}
                </div>
            </form>
        </div>
    );
    
    const renderSuccess = () => (
        <div className="max-w-4xl mx-auto bg-brand-secondary p-8 md:p-12 rounded-lg shadow-xl text-center animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-400 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h2 className="text-3xl font-bold text-white mb-4">Application Submitted!</h2>
            <p className="text-brand-text mb-8">Thank you for your interest in Elysian Talent Hub. Our team will review your application and contact you if you are a potential fit.</p>
            <button
                onClick={() => {
                    playSound('click');
                    navigateTo('home');
                }}
                onMouseEnter={() => playSound('hover')}
                className="font-semibold py-3 px-8 rounded-full text-lg text-brand-highlight transition duration-300 transform hover:scale-105 shadow-lg liquid-glass-hover"
            >
                Back to Home
            </button>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-white">Become an Elysian</h1>
                <p className="mt-4 text-lg text-brand-text">Join the next generation of talent. Start your application below.</p>
            </div>
            
            {submissionStatus === 'success' ? (
                renderSuccess()
            ) : step === 'terms' ? (
                renderTerms()
            ) : (
                renderForm()
            )}

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
                .spinner-small {
                  width: 20px;
                  height: 20px;
                  border: 3px solid rgba(0, 0, 0, 0.2);
                  border-top-color: #000;
                  border-radius: 50%;
                  animation: spin 1s linear infinite;
                }
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
                @keyframes fade-in {
                  from { opacity: 0; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                  animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Apply;