import React, { useState } from 'react';
import { View } from '../../types';
import { MODELING_AGENCIES, MOVIE_AGENCIES } from '../../constants';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, Upload, Camera, ArrowRight, ArrowLeft, ShieldCheck, Heart } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface ApplyProps {
  navigateTo: (view: View) => void;
}

export const Apply: React.FC<ApplyProps> = ({ navigateTo }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    instagram: '',
    category: 'High Fashion',
    height: "5'10\"",
    bust: '32B',
    waist: '24"',
    hips: '34"',
    shoes: '8 US',
    eyeColor: 'Hazel',
    hairColor: 'Dark Brown',
    experience: '1-3 years',
    represented: 'no',
    bio: '',
    selectedAgencies: ['Elite World Model Management'],
    photos: [] as string[],
  });

  const allAgencies = [...MODELING_AGENCIES, ...MOVIE_AGENCIES];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAgency = (agencyName: string) => {
    playSound('click', 0.15);
    setFormData((prev) => {
      const exists = prev.selectedAgencies.includes(agencyName);
      if (exists) {
        return { ...prev, selectedAgencies: prev.selectedAgencies.filter((a) => a !== agencyName) };
      } else {
        return { ...prev, selectedAgencies: [...prev.selectedAgencies, agencyName] };
      }
    });
  };

  const handleSimulatedPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      playSound('click', 0.2);
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, url],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success', 0.4);

    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#f43f5e', '#38bdf8', '#fbbf24'],
      });
    } catch {
      // Confetti fallback
    }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="liquid-glass rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto text-emerald-400 mb-4 animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider">
            Submission Reference #ELY-{Math.floor(100000 + Math.random() * 900000)}
          </span>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1 mb-3">
            Portfolio Transmitted to Scouting Boards
          </h2>

          <p className="text-sm text-neutral-300 leading-relaxed max-w-md mx-auto mb-6">
            Thank you, <strong className="text-white">{formData.fullName}</strong>. Your digital comp card, measurements, and polaroids have been submitted directly to the scouting directors at{' '}
            <strong className="text-white">{formData.selectedAgencies.join(', ') || 'our partner agencies'}</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-neutral-400 max-w-md mx-auto text-left space-y-1 mb-8">
            <div className="flex justify-between text-neutral-300">
              <span>Primary Category:</span>
              <strong className="text-white">{formData.category}</strong>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span>Height & Measurements:</span>
              <strong className="text-white">{formData.height} • {formData.waist}/{formData.hips}</strong>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span>Direct Contact:</span>
              <strong className="text-white">{formData.email}</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setStep(1);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl liquid-pill text-xs font-semibold text-white"
            >
              Submit Another Application
            </button>

            <button
              onClick={() => navigateTo('models')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-semibold transition-all shadow-lg"
            >
              Explore Talent Roster
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-neutral-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Global Scouting Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Agency Representation Application
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Direct digital submission to accredited modeling and theatrical scouting directors worldwide.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-3">
        {[
          { num: 1, label: 'Identity & Specs' },
          { num: 2, label: 'Agencies & Media' },
          { num: 3, label: 'Review & Submit' },
        ].map((s) => (
          <button
            key={s.num}
            onClick={() => {
              if (s.num <= step) {
                playSound('click', 0.15);
                setStep(s.num as 1 | 2 | 3);
              }
            }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              step === s.num
                ? 'liquid-pill-active text-white font-semibold'
                : step > s.num
                ? 'liquid-pill text-white'
                : 'bg-white/[0.03] text-neutral-500 border border-white/5 cursor-not-allowed'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
              {s.num}
            </span>
            <span className="hidden sm:inline">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="liquid-glass rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-serif font-bold text-white border-b border-white/10 pb-3">
              1. Personal Identity & Physical Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-neutral-300 font-medium">Full Legal Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Aria Montgomery"
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-input text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 font-medium">Primary Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-input text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 font-medium">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-input text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 font-medium">Current Location (City, Country) *</label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Paris, France"
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-input text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 font-medium">Instagram Handle</label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="@yourhandle"
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-input text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 font-medium">Primary Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-input text-white bg-[#111]"
                >
                  <option value="High Fashion">High Fashion / Runway</option>
                  <option value="Commercial">Commercial / Print</option>
                  <option value="Editorial">Editorial</option>
                  <option value="Fitness">Fitness / Athletic</option>
                  <option value="Petite">Petite & Beauty</option>
                </select>
              </div>
            </div>

            {/* Measurement row */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider block">
                Precise Measurements
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="text-neutral-400">Height *</label>
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="5'11 (180cm)"
                    className="w-full px-3 py-2 rounded-xl liquid-input text-white text-center"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-400">Bust / Chest</label>
                  <input
                    type="text"
                    name="bust"
                    value={formData.bust}
                    onChange={handleInputChange}
                    placeholder="32B"
                    className="w-full px-3 py-2 rounded-xl liquid-input text-white text-center"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-400">Waist *</label>
                  <input
                    type="text"
                    name="waist"
                    value={formData.waist}
                    onChange={handleInputChange}
                    placeholder="24 in"
                    className="w-full px-3 py-2 rounded-xl liquid-input text-white text-center"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-400">Hips *</label>
                  <input
                    type="text"
                    name="hips"
                    value={formData.hips}
                    onChange={handleInputChange}
                    placeholder="34 in"
                    className="w-full px-3 py-2 rounded-xl liquid-input text-white text-center"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => {
                  if (!formData.fullName || !formData.email) {
                    alert('Please provide your name and email to proceed.');
                    return;
                  }
                  playSound('tab', 0.2);
                  setStep(2);
                }}
                className="px-6 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Continue to Agencies & Media</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-serif font-bold text-white border-b border-white/10 pb-3">
              2. Target Agencies & Digital Polaroids
            </h3>

            {/* Target Agencies Multi-select */}
            <div className="space-y-2">
              <span className="text-xs uppercase font-semibold text-neutral-300 tracking-wider block">
                Select Agencies for Simultaneous Submission:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {allAgencies.map((agency) => {
                  const isSelected = formData.selectedAgencies.includes(agency.name);
                  return (
                    <div
                      key={agency.id}
                      onClick={() => toggleAgency(agency.name)}
                      className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between text-xs ${
                        isSelected
                          ? 'liquid-pill-active text-white border-white/40'
                          : 'liquid-glass text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="font-semibold text-white block truncate">{agency.name}</span>
                        <span className="text-[11px] text-neutral-400">{agency.location}</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                          isSelected ? 'bg-white text-black border-white' : 'border-white/20'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Photo Upload Simulation */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <span className="text-xs uppercase font-semibold text-neutral-300 tracking-wider block">
                Digital Polaroids / Clean Digitals (Natural Light, No Filters)
              </span>

              <div className="p-6 rounded-2xl border-2 border-dashed border-white/20 text-center space-y-3 bg-white/[0.02]">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-neutral-300">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Upload Headshot, Profile, & Full Body</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">JPG, PNG or WEBP up to 25MB each</p>
                </div>

                <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl liquid-pill text-xs font-semibold text-white cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Photo File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSimulatedPhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {formData.photos.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pt-2">
                  {formData.photos.map((src, i) => (
                    <div key={i} className="relative w-20 h-24 rounded-xl overflow-hidden border border-white/20 shrink-0">
                      <img src={src} alt="Uploaded" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => {
                  playSound('tab', 0.2);
                  setStep(1);
                }}
                className="px-5 py-2.5 rounded-xl liquid-pill text-xs font-medium text-neutral-300 hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound('tab', 0.2);
                  setStep(3);
                }}
                className="px-6 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Review & Confirm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-serif font-bold text-white border-b border-white/10 pb-3">
              3. Final Verification & Submission
            </h3>

            <div className="p-4 rounded-2xl liquid-glass space-y-3 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-3 border-b border-white/10">
                <div>
                  <span className="text-neutral-400 block text-[10px]">Name</span>
                  <span className="font-semibold text-white">{formData.fullName || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">Email</span>
                  <span className="font-semibold text-white">{formData.email}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">Phone</span>
                  <span className="font-semibold text-white">{formData.phone}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">Category</span>
                  <span className="font-semibold text-white">{formData.category}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">Height</span>
                  <span className="font-semibold text-white">{formData.height}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">Measurements</span>
                  <span className="font-semibold text-white">{formData.waist} / {formData.hips}</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 block text-[10px] mb-1">Target Agency Submissions:</span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.selectedAgencies.map((a) => (
                    <span key={a} className="px-2 py-0.5 rounded-full text-[11px] bg-white/10 text-white border border-white/20">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="text-neutral-300 font-medium">Brief Artist Bio / Background (Optional)</label>
              <textarea
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Share any runway experience, acting training, languages, or sporting skills..."
                className="w-full px-3.5 py-2.5 rounded-xl liquid-input text-white"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>By submitting, your materials are encrypted and shared exclusively with verified agency scouting staff.</span>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => {
                  playSound('tab', 0.2);
                  setStep(2);
                }}
                className="px-5 py-2.5 rounded-xl liquid-pill text-xs font-medium text-neutral-300 hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="px-8 py-3 rounded-2xl bg-white text-black hover:bg-neutral-200 text-sm font-bold transition-all flex items-center gap-2 shadow-xl shadow-white/20"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Submit Scouting Application</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Apply;
