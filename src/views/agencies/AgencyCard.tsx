import React from 'react';
import { Agency } from '../../types';
import OptimizedImage from '../../components/OptimizedImage';
import { Globe, Mail, Users, Award, ExternalLink, CheckCircle } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface AgencyCardProps {
  agency: Agency;
  onApplyToAgency?: (agency: Agency) => void;
}

export const AgencyCard: React.FC<AgencyCardProps> = ({
  agency,
  onApplyToAgency,
}) => {
  return (
    <div className="group rounded-3xl overflow-hidden liquid-glass-hover p-5 flex flex-col justify-between transition-all duration-300">
      {/* Cover / Visual Banner */}
      <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 bg-neutral-900">
        <OptimizedImage
          src={agency.coverImage}
          alt={agency.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-white leading-snug drop-shadow-md">
              {agency.name}
            </h3>
            <span className="text-xs text-neutral-300 flex items-center gap-1">
              <Globe className="w-3 h-3 text-neutral-400" /> {agency.location}
            </span>
          </div>
          {agency.openForSubmissions && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 flex items-center gap-1 shrink-0">
              <CheckCircle className="w-3 h-3" />
              Scouting Active
            </span>
          )}
        </div>
      </div>

      {/* Body details */}
      <div className="space-y-3.5 flex-1 flex flex-col justify-between">
        <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
          {agency.description}
        </p>

        {/* Specialties tags */}
        <div className="flex flex-wrap gap-1.5">
          {agency.specialties.map((spec) => (
            <span
              key={spec}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.06] border border-white/10 text-neutral-300"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Notable campaigns */}
        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-400">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-neutral-400" />
            <strong className="text-white font-medium">{agency.rosterCount}</strong> Represented
          </span>
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-neutral-400" /> Est. {agency.founded}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <a
            href={agency.website}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2 px-3 rounded-xl liquid-pill text-xs font-semibold text-neutral-200 hover:text-white flex items-center justify-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Official Portal</span>
          </a>

          {agency.openForSubmissions && (
            <button
              onClick={() => {
                playSound('click', 0.25);
                if (onApplyToAgency) {
                  onApplyToAgency(agency);
                } else {
                  window.location.hash = '#/apply';
                }
              }}
              className="py-2 px-4 rounded-xl text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgencyCard;
