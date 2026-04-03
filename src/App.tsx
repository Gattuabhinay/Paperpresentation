/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CreditCard, 
  FileText, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Trophy, 
  QrCode, 
  Phone, 
  Mail, 
  ChevronDown,
  ExternalLink,
  Presentation,
  Info,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Supabase Setup ---

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'https://dklzqwcgboolzisqngei.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY_HERE'
);

// --- Components ---

const SectionHeading = ({ children, color = "#0D9488" }: { children: React.ReactNode, color?: string }) => (
  <h2 
    className="text-center font-black uppercase tracking-[3px] mb-12"
    style={{ fontSize: '36px', color }}
  >
    {children}
  </h2>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-[#0D1B2A] rounded-2xl border border-white/5 hover:border-[#0D9488]/40 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const InfoCard = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <Card className="p-7 text-center flex flex-col items-center justify-center">
    <Icon className="w-6 h-6 text-[#0D9488] mb-3" />
    <span className="text-[#9CA3AF] text-[11px] uppercase tracking-[2px] mb-1">{label}</span>
    <span className="text-[#0D9488] font-bold text-base">{value}</span>
  </Card>
);

const DeadlineCard = ({ label, date, title, subtitle, text, bgColor, accentColor, badgeColor }: any) => (
  <div className={`rounded-2xl p-6 ${bgColor} flex flex-col h-full`}>
    <div className="flex justify-between items-center mb-6">
      <span className="text-gray-500 text-[9px] font-bold uppercase tracking-wider">DEADLINE</span>
      <span className={`text-[11px] font-bold px-3 py-1 rounded-full text-white ${badgeColor}`}>{date}</span>
    </div>
    <h3 className="text-2xl font-bold mb-1" style={{ color: accentColor }}>{title}</h3>
    <p className="text-black font-bold text-sm mb-2">{subtitle}</p>
    <p className="text-[#6e7681] text-[13px] leading-relaxed">{text}</p>
  </div>
);

const ProcessCard = ({ stage, date, title, subtitle, bullets, bgColor, accentColor, badgeColor, iconColor }: any) => (
  <div className={`rounded-2xl p-6 ${bgColor} flex flex-col h-full`}>
    <div className="flex justify-between items-center mb-6">
      <span className="text-gray-500 text-[9px] font-bold uppercase tracking-wider">{stage}</span>
      <span className={`text-[11px] font-bold px-3 py-1 rounded-full text-white ${badgeColor}`}>{date}</span>
    </div>
    <h3 className="text-xl font-bold mb-1" style={{ color: accentColor }}>{title}</h3>
    <p className="text-black font-bold text-[14px] mb-4">{subtitle}</p>
    <ul className="space-y-3">
      {bullets.map((bullet: string, idx: number) => (
        <li key={idx} className="flex items-start gap-2 text-[13px] text-[#6e7681]">
          <Check className={`w-4 h-4 mt-0.5 shrink-0`} style={{ color: iconColor }} />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  </div>
);

const GuidelineCard = ({ title, bullets, bgColor, accentColor, iconColor }: any) => (
  <div className={`rounded-2xl p-5.5 ${bgColor} flex flex-col h-full`}>
    <h3 className="text-lg font-bold mb-4" style={{ color: accentColor }}>{title}</h3>
    <ul className="space-y-2.5">
      {bullets.map((bullet: string, idx: number) => (
        <li key={idx} className="flex items-start gap-2 text-[13px] text-[#6e7681]">
          <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: iconColor }} />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  </div>
);

const FormatCard = ({ label, title, subtitle, items, isNumbered, bgColor, accentColor, iconColor }: any) => (
  <div className={`rounded-2xl p-6 ${bgColor} flex flex-col h-full`}>
    <span className="text-gray-500 text-[9px] font-bold uppercase tracking-wider mb-4 block">{label}</span>
    <h3 className="text-[20px] font-bold mb-1" style={{ color: accentColor }}>{title}</h3>
    <p className="text-black font-bold text-[14px] mb-4">{subtitle}</p>
    <ul className="space-y-3">
      {items.map((item: string, idx: number) => (
        <li key={idx} className="flex items-start gap-3 text-[13px] text-[#6e7681]">
          {isNumbered ? (
            <span className="font-bold shrink-0" style={{ color: iconColor }}>{idx + 1}.</span>
          ) : (
            <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: iconColor }} />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const PresentationCard = ({ label, title, subtitle, items, isNumbered, bgColor, accentColor, iconColor }: any) => (
  <div className={`rounded-2xl p-6 ${bgColor} flex flex-col h-full`}>
    <span className="text-gray-500 text-[9px] font-bold uppercase tracking-wider mb-4 block">{label}</span>
    <h3 className="text-[20px] font-bold mb-1" style={{ color: accentColor }}>{title}</h3>
    <p className="text-black font-bold text-[14px] mb-4">{subtitle}</p>
    <ul className="space-y-3">
      {items.map((item: string, idx: number) => (
        <li key={idx} className="flex items-start gap-3 text-[13px] text-[#6e7681]">
          {isNumbered ? (
            <span className="font-bold shrink-0" style={{ color: iconColor }}>{idx + 1}.</span>
          ) : (
            <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: iconColor }} />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const WarningCard = ({ title, bullets }: any) => (
  <div className="rounded-2xl p-5.5 bg-[#FEF2F2] border border-[#DC2626]/15 flex flex-col h-full">
    <h3 className="text-lg font-bold mb-4 text-[#DC2626]">{title}</h3>
    <ul className="space-y-3">
      {bullets.map((bullet: string, idx: number) => (
        <li key={idx} className="flex items-start gap-2 text-[13px] text-[#6e7681]">
          <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-[#DC2626]" />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  </div>
);

const PrizeCard = ({ icon, place, title, rewards, bgColor, borderColor, accentColor }: any) => (
  <div 
    className={`rounded-2xl p-7 text-center border transition-all duration-300 ${bgColor} ${borderColor} hover:scale-[1.02]`}
  >
    <div className="text-[36px] mb-4">{icon}</div>
    <div className="text-[11px] font-bold uppercase tracking-[3px] mb-1" style={{ color: accentColor }}>{place}</div>
    <div className="text-white font-black text-[22px] mb-4">{title}</div>
    <div className="space-y-2">
      {rewards.map((reward: string, idx: number) => (
        <div key={idx} className="text-white/80 text-sm flex items-center justify-center gap-2">
          {reward.includes('Cash') ? '💵' : reward.includes('Certificate') ? '🎖' : '🏆'} {reward}
        </div>
      ))}
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [registrationCount, setRegistrationCount] = useState(0);
  const [formData, setFormData] = useState({
    college: "NNRG - Nalla Narasimha Reddy Education Society's Group of Institutions",
    otherCollege: "",
    teamName: "",
    leaderName: "",
    leaderRoll: "",
    leaderDept: "CSE",
    leaderYear: "3rd Year",
    leaderMobile: "",
    leaderEmail: "",
    member2Name: "",
    member2Roll: "",
    transactionId: ""
  });

  const [errors, setErrors] = useState<string[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  const fetchCount = async () => {
    try {
      const { count } = await supabase
        .from('paperpresentations')
        .select('*', { count: 'exact', head: true });
      setRegistrationCount(count ?? 0);
    } catch (err) {
      console.error('Error fetching count:', err);
    }
  };

  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const colleges = [
    "NNRG - Nalla Narasimha Reddy Education Society's Group of Institutions",
    "GCTC - Geethanjali College of Engineering and Technology",
    "KPRIT - Kommuri Pratap Reddy Institute of Technology",
    "SITS - Siddhartha Institute of Technology & Sciences",
    "ANURAG - Anurag University, Hyderabad",
    "NMREC - Nalla Malla Reddy Engineering College",
    "Other"
  ];

  const departments = ["CSE", "CSE (AI&ML)", "CSE (DS)", "ECE", "CIVIL", "IT"];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!formData.teamName) newErrors.push("teamName");
    if (!formData.leaderName) newErrors.push("leaderName");
    if (!formData.leaderRoll) newErrors.push("leaderRoll");
    if (!formData.leaderMobile) newErrors.push("leaderMobile");
    if (!formData.transactionId) newErrors.push("transactionId");
    if (formData.college === "Other" && !formData.otherCollege) newErrors.push("otherCollege");
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const collegeName = formData.college === "Other" ? formData.otherCollege : formData.college;
      
      // Save to Supabase
      const { error } = await supabase
        .from('paperpresentations')
        .insert([{
          college: collegeName,
          name: formData.leaderName,
          roll_number: formData.leaderRoll,
          department: formData.leaderDept,
          year: formData.leaderYear,
          mobile_no: formData.leaderMobile,
          e_mail: formData.leaderEmail || null,
          transaction_id: formData.transactionId,
          team_name: formData.teamName,
          member2_name: formData.member2Name || null,
          member2_roll: formData.member2Roll || null
        }]);

      if (error) {
        console.error('Supabase error:', error);
      } else {
        console.log('Saved successfully!');
        fetchCount();
      }

      const message = `Hello! I have registered for *PAPER PRESENTATION* event at NNRG Tech Fest 2027.

*Team Details:*
━━━━━━━━━━━━━━━━
College: ${collegeName}
Team Name: ${formData.teamName}

*Team Leader:*
Name: ${formData.leaderName}
Roll No: ${formData.leaderRoll}
Department: ${formData.leaderDept}
Year: ${formData.leaderYear}
Mobile: ${formData.leaderMobile}
Email: ${formData.leaderEmail || "Not provided"}

${formData.member2Name ? `*Member 2:*
Name: ${formData.member2Name}
Roll No: ${formData.member2Roll || "Not provided"}
` : ""}
*Payment Details:*
Amount Paid: ₹400
Transaction ID: ${formData.transactionId}
━━━━━━━━━━━━━━━━
Please verify my payment and confirm my registration for Paper Presentation.
Thank you! 🙏
━━━━━━━━━━━━━━━━━━━━━━━`;

      const whatsappUrl = `https://wa.me/918309030400?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // Shake effect or scroll to first error
      const firstError = document.querySelector('.border-red-500');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const snippets = [
    "research.publish()",
    "abstract.write()",
    "IEEE.format()",
    "results.analyze()",
    "paper.submit()"
  ];

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-[#F5F5F5]">
      {/* --- Hero Section --- */}
      <section className="relative h-screen w-full bg-[#0D1117] overflow-hidden flex items-center">
        {/* Background Layers */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url("https://res.cloudinary.com/djz4ulfhh/image/upload/v1774022354/paperfinalimmp_mnenqs.png")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117]/97 via-[#0D1117]/75 to-[#0D1117]/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D1117]/97" />

        {/* Floating Snippets */}
        {snippets.map((snippet, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.1, 0],
              x: [Math.random() * 100, Math.random() * 100 + 20],
              y: [Math.random() * 100, Math.random() * 100 - 20]
            }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
            className="absolute font-mono text-[13px] text-[#0D9488]/10 pointer-events-none"
            style={{ 
              left: `${10 + i * 20}%`, 
              top: `${20 + i * 15}%` 
            }}
          >
            {snippet}
          </motion.div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="font-mono text-[11px] text-white/35 mb-6">
              visitor@nnrg:~$ ./launch paper_presentation --year=2027
            </div>

            {/* Live Registration Counter */}
            <div className="inline-flex items-center gap-3 bg-[#10B981]/12 border border-[#10B981]/40 rounded-full px-6 py-2.5 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.2)] mb-5">
              <div className="w-2.5 h-2.5 bg-[#10B981] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
              <div className="text-white text-[13px] font-bold tracking-[3px] uppercase">
                LIVE  •  <span className="text-[#10B981] text-[18px] font-black">{registrationCount}</span> REGISTERED
              </div>
              <span className="text-[#10B981]/70 text-base">👥</span>
            </div>

            <div className="inline-block bg-[#0D9488] text-white text-[11px] font-bold px-4 py-1.5 rounded-full tracking-widest mb-8">
              RESEARCH
            </div>

            <h1 className="text-white font-black leading-[0.9] tracking-[-3px] mb-6">
              <span className="block text-[48px] md:text-[88px]">PAPER</span>
              <span className="block text-[48px] md:text-[88px] text-[#0D9488] drop-shadow-[0_0_15px_rgba(13,148,136,0.3)]">PRESENTATION</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl mb-10 max-w-xl mx-auto">
              Present your research and innovative ideas
            </p>

            <div className="flex flex-wrap items-center justify-center gap-y-4 mb-12 text-white/90 text-[13px]">
              <div className="flex items-center gap-2 pr-4 border-r border-white/10">
                <Calendar className="w-4 h-4 text-[#0D9488]" />
                <span>Feb 26, 2027</span>
              </div>
              <div className="flex items-center gap-2 px-4 border-r border-white/10">
                <Clock className="w-4 h-4 text-[#0D9488]" />
                <span>10:00 AM</span>
              </div>
              <div className="flex items-center gap-2 px-4 border-r border-white/10">
                <MapPin className="w-4 h-4 text-[#0D9488]" />
                <span>T08</span>
              </div>
              <div className="flex items-center gap-2 px-4 border-r border-white/10">
                <Users className="w-4 h-4 text-[#0D9488]" />
                <span>1-2 Members</span>
              </div>
              <div className="flex items-center gap-2 pl-4">
                <CreditCard className="w-4 h-4 text-[#0D9488]" />
                <span>₹400/team</span>
              </div>
            </div>

            <a 
              href="#register"
              className="inline-flex items-center justify-center w-full max-w-[500px] bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold py-4.5 rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(13,148,136,0.5)] group mb-10"
            >
              <span className="mr-2">↓</span>
              Register Now
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <div className="mt-20 w-full max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-6 mb-6 opacity-30">
                <div className="h-[1px] bg-white/50 flex-1" />
                <div className="text-[#9CA3AF] text-[10px] font-bold uppercase tracking-[6px] whitespace-nowrap">Organizing by</div>
                <div className="h-[1px] bg-white/50 flex-1" />
              </div>
              <div className="text-white font-black text-3xl md:text-6xl tracking-tighter uppercase">AI & ML Department</div>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-[10px] tracking-[4px] font-bold animate-pulse">
          ↓ SCROLL TO EXPLORE ↓
        </div>
      </section>

      {/* --- Event Details Section --- */}
      <section className="py-24 px-6 container mx-auto">
        <SectionHeading>EVENT DETAILS</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <InfoCard icon={Calendar} label="DATE" value="Feb 26, 2027" />
          <InfoCard icon={Clock} label="TIME" value="10:00 AM" />
          <InfoCard icon={MapPin} label="VENUE" value="T08" />
          <InfoCard icon={Users} label="TEAM" value="1-2 Members" />
          <InfoCard icon={CreditCard} label="FEE" value="₹400 / Team" />
        </div>
      </section>

      {/* --- Important Dates Section --- */}
      <section className="py-24 px-6 bg-[#F5F5F5]">
        <div className="container mx-auto">
          <SectionHeading>IMPORTANT DATES</SectionHeading>
          <p className="text-center text-[#6e7681] -mt-8 mb-16">Key deadlines for paper presentation event</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DeadlineCard 
              label="DEADLINE"
              date="12 Feb"
              title="Payment"
              subtitle="Registration Payment"
              text="Last date to complete registration fee payment"
              bgColor="bg-[#EEF3FA]"
              accentColor="#1D4ED8"
              badgeColor="bg-[#2563EB]"
            />
            <DeadlineCard 
              label="DEADLINE"
              date="14 Feb"
              title="Paper"
              subtitle="Full Paper Submission"
              text="Submit complete paper via email"
              bgColor="bg-[#ECF7F1]"
              accentColor="#15803D"
              badgeColor="bg-[#15803D]"
            />
            <DeadlineCard 
              label="DEADLINE"
              date="16 Feb"
              title="PPT"
              subtitle="Presentation File"
              text="Submit final PPT for presentation"
              bgColor="bg-[#F7F2FB]"
              accentColor="#7C3AED"
              badgeColor="bg-[#7C3AED]"
            />
          </div>
        </div>
      </section>

      {/* --- Event Process Section --- */}
      <section className="py-24 px-6 bg-[#F5F5F5]">
        <div className="container mx-auto">
          <SectionHeading>EVENT PROCESS</SectionHeading>
          <p className="text-center text-[#6e7681] -mt-8 mb-16">Three stages of paper presentation competition</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProcessCard 
              stage="STAGE 1"
              date="By 14 Feb"
              title="Paper Submission"
              subtitle="Submit full paper via email"
              bullets={[
                "IEEE format required",
                "Max 15 pages + abstract (250 words)",
                "Email: aimltechsamprathi2k26@gmail.com",
                "Include cover page with details"
              ]}
              bgColor="bg-[#EEF3FA]"
              accentColor="#1D4ED8"
              badgeColor="bg-[#2563EB]"
              iconColor="#2563EB"
            />
            <ProcessCard 
              stage="STAGE 2"
              date="After 14 Feb"
              title="Review Process"
              subtitle="Panel review & shortlisting"
              bullets={[
                "Judges review submissions",
                "Selected papers notified via email",
                "Shortlisted participants informed",
                "Prepare for presentation"
              ]}
              bgColor="bg-[#ECF7F1]"
              accentColor="#15803D"
              badgeColor="bg-[#15803D]"
              iconColor="#15803D"
            />
            <ProcessCard 
              stage="STAGE 3"
              date="10 AM"
              title="Final Presentation"
              subtitle="8 min presentation + 2 min Q&A"
              bullets={[
                "Bring hard copy of paper",
                "PPT in .pptx format only",
                "Videos allowed within time",
                "Strict time limit enforcement"
              ]}
              bgColor="bg-[#F7F2FB]"
              accentColor="#7C3AED"
              badgeColor="bg-[#7C3AED]"
              iconColor="#7C3AED"
            />
          </div>
        </div>
      </section>

      {/* --- Event Rules Section --- */}
      <section className="py-24 px-6 bg-[#F5F5F5]">
        <div className="container mx-auto">
          <SectionHeading>EVENT RULES</SectionHeading>
          <div className="max-w-[900px] mx-auto bg-[#0D1B2A] rounded-2xl p-8 border border-white/5 shadow-xl">
            <div className="space-y-6">
              {[
                "Maximum 2 participants per paper. Teams from different colleges allowed.",
                <>IEEE document format is mandatory. <span className="text-[#0D9488] font-bold">(IEEE document format)</span></>,
                "Paper must be maximum 15 pages with a 250 word abstract.",
                "Submit soft copy + abstract via email. Bring hard copy on event day.",
                <>8 minutes for presentation + 2 minutes for Q&A. <span className="text-[#0D9488] font-bold">Strictly enforced.</span></>,
                "PPT must be in .pptx format only.",
                <>Exceeding time limit may result in <span className="text-[#0D9488] font-bold">mark deduction.</span></>,
                "Violation of any rule may result in paper rejection.",
                <>Judge's decision is final — <span className="text-[#0D9488] font-bold">no appeals.</span></>,
                "Time limit must be strictly followed in all rounds."
              ].map((rule, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <span className="text-[#0D9488] font-bold text-lg shrink-0">{(i + 1).toString().padStart(2, '0')}</span>
                  <div className="flex flex-col w-full">
                    <p className="text-[#8b949e] text-[13px] leading-relaxed">{rule}</p>
                    {i < 9 && <div className="h-[1px] bg-white/5 w-full mt-6" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- General Guidelines Section --- */}
      <section className="py-24 px-6 bg-[#F5F5F5]">
        <div className="container mx-auto">
          <SectionHeading>GENERAL GUIDELINES</SectionHeading>
          <p className="text-center text-[#6e7681] -mt-8 mb-16">Important rules and requirements for participation</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <GuidelineCard 
              title="Team Size"
              bullets={["Maximum 2 participants per paper", "Teams from different colleges allowed"]}
              bgColor="bg-[#EEF3FA]"
              accentColor="#1D4ED8"
              iconColor="#1D4ED8"
            />
            <GuidelineCard 
              title="Format & Topic"
              bullets={["IEEE document format mandatory", "Any CSE-related topic permitted"]}
              bgColor="bg-[#ECF7F1]"
              accentColor="#15803D"
              iconColor="#15803D"
            />
            <GuidelineCard 
              title="Submission"
              bullets={["Submit soft copy + abstract", "Bring hard copy on event day"]}
              bgColor="bg-[#F7F2FB]"
              accentColor="#7C3AED"
              iconColor="#7C3AED"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
            <GuidelineCard 
              title="Presentation"
              bullets={["8 min presentation + 2 min Q&A", "Videos allowed within time limit"]}
              bgColor="bg-[#FFF7ED]"
              accentColor="#C2410C"
              iconColor="#C2410C"
            />
            <GuidelineCard 
              title="Notification"
              bullets={["Selected papers notified via email", "All participants get certificates"]}
              bgColor="bg-[#ECFDF5]"
              accentColor="#0D9488"
              iconColor="#0D9488"
            />
          </div>
        </div>
      </section>

      {/* --- Paper Format Section --- */}
      <section className="py-24 px-6 bg-[#F5F5F5]">
        <div className="container mx-auto">
          <SectionHeading>PAPER FORMAT</SectionHeading>
          <p className="text-center text-[#6e7681] -mt-8 mb-16">Required sections and format specifications</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FormatCard 
              label="STRUCTURE"
              title="Required Sections"
              subtitle="9 mandatory sections in order"
              items={[
                "Cover Page (Title, Authors, College, Contact, Email)",
                "Index",
                "List of Figures & Tables",
                "Abstract (Max 250 words)",
                "Introduction",
                "Point-wise Description",
                "Results",
                "Conclusion",
                "References"
              ]}
              isNumbered={true}
              bgColor="bg-[#EEF3FA]"
              accentColor="#1D4ED8"
              iconColor="#1D4ED8"
            />
            <FormatCard 
              label="FORMAT"
              title="Requirements"
              subtitle="Submission specifications"
              items={[
                "Format: IEEE document format",
                "Length: Maximum 15 pages",
                "Abstract: Maximum 250 words",
                "File Type: .docx only",
                "Email to: aimltechsamprathi2k26@gmail.com",
                "Include abstract, references, email & mobile"
              ]}
              isNumbered={false}
              bgColor="bg-[#ECF7F1]"
              accentColor="#15803D"
              iconColor="#15803D"
            />
          </div>
        </div>
      </section>

      {/* --- Presentation Guidelines Section --- */}
      <section className="py-24 px-6 bg-[#F5F5F5]">
        <div className="container mx-auto">
          <SectionHeading>PRESENTATION GUIDELINES</SectionHeading>
          <p className="text-center text-[#6e7681] -mt-8 mb-16">Slide design rules and required content</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <PresentationCard 
              label="DESIGN"
              title="Slide Rules"
              subtitle="Formatting specifications"
              items={[
                "Font Size: Min 18 (Titles: 40, Bullets: 28)",
                "Content: Max 8-9 lines per slide",
                "Use images/diagrams over text",
                "Highlight important keywords",
                "Use bullet points, avoid full sentences",
                "Graphs/charts must be clearly visible",
                "Don't read directly from slides",
                "Format: .pptx only"
              ]}
              isNumbered={false}
              bgColor="bg-[#F7F2FB]"
              accentColor="#7C3AED"
              iconColor="#7C3AED"
            />
            <PresentationCard 
              label="CONTENT"
              title="Required Slides"
              subtitle="Minimum slide requirements"
              items={[
                "Background of the work (1 slide)",
                "Hypothesis & Objectives (1 slide)",
                "Methodology — reference only (1 slide)",
                "Results & Key Findings (4-5 slides)",
                "Conclusions (1 slide)"
              ]}
              isNumbered={true}
              bgColor="bg-[#FFF7ED]"
              accentColor="#C2410C"
              iconColor="#C2410C"
            />
          </div>
        </div>
      </section>

      {/* --- Important Warnings Section --- */}
      <section className="py-24 px-6 bg-[#F5F5F5]">
        <div className="container mx-auto">
          <SectionHeading color="#DC2626">⚠️ IMPORTANT WARNINGS</SectionHeading>
          <p className="text-center text-[#6e7681] -mt-8 mb-16">Critical rules — violations may result in disqualification</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <WarningCard 
              title="Time & Rules"
              bullets={[
                "Exceeding time limit may result in mark deduction",
                "Violation of any rule may result in paper rejection"
              ]}
            />
            <WarningCard 
              title="Final Decision"
              bullets={[
                "Judge's decision is final — no appeals",
                "Time limit must be strictly followed"
              ]}
            />
          </div>
        </div>
      </section>

      {/* --- Prizes & Rewards Section --- */}
      <section className="py-24 px-6 bg-[#F5F5F5]">
        <div className="container mx-auto">
          <SectionHeading>PRIZES & REWARDS</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PrizeCard 
              icon="🥇"
              place="1ST PLACE"
              title="WINNER"
              rewards={["Cash Prize", "Certificate", "Trophy"]}
              bgColor="bg-[#1A0F00]"
              borderColor="border-[#0D9488]/35"
              accentColor="#0D9488"
            />
            <PrizeCard 
              icon="🥈"
              place="2ND PLACE"
              title="RUNNER-UP"
              rewards={["Cash Prize", "Certificate"]}
              bgColor="bg-[#0D1B2A]"
              borderColor="border-[#3B82F6]/30"
              accentColor="#60A5FA"
            />
            <PrizeCard 
              icon="🥉"
              place="3RD PLACE"
              title="FINALIST"
              rewards={["Cash Prize", "Certificate"]}
              bgColor="bg-[#0D1117]"
              borderColor="border-[#9CA3AF]/30"
              accentColor="#9CA3AF"
            />
          </div>
          <p className="text-center text-[#6e7681] text-[13px] mt-10">
            🎓 Every participant will receive a participation certificate
          </p>
        </div>
      </section>

      {/* --- Payment Details Section --- */}
      <section className="py-24 px-6 bg-[#F5F5F5]">
        <div className="container mx-auto">
          <SectionHeading>PAYMENT DETAILS</SectionHeading>
          <div className="max-w-[700px] mx-auto bg-[#0D1B2A] rounded-2xl p-8 border border-white/5 shadow-xl">
            <div className="bg-[#0D9488]/8 border-l-[3px] border-[#0D9488] p-3 px-4 mb-8">
              <p className="text-[#0D9488] text-xs">
                ⚠ PAY FIRST, THEN FILL THE FORM | Keep your Transaction ID ready
              </p>
            </div>

            <div className="text-center mb-8">
              <span className="text-[#6e7681] text-[10px] tracking-[3px] uppercase">SCAN QR CODE TO PAY</span>
            </div>

            <div className="flex justify-center mb-10">
              <div className="bg-white p-3 rounded-xl">
                <img 
                  src="https://quickchart.io/qr?text=upi://pay?pa=8309030400-id8e@axl%26pn=GattuAbhinay%26am=400%26cu=INR%26tn=NNRG_TechFest_PaperPresentation&size=300" 
                  alt="Payment QR Code"
                  className="w-[260px] h-[260px]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="space-y-1">
                <div className="text-[#6e7681] text-[10px] uppercase">UPI ID</div>
                <div className="text-[#0D9488] font-bold text-sm">8309030400-id8e@axl</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#6e7681] text-[10px] uppercase">PHONE</div>
                <div className="text-[#0D9488] font-bold text-sm">8309030400</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#6e7681] text-[10px] uppercase">NAME</div>
                <div className="text-white font-bold text-sm">GATTU ABHINAY</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#6e7681] text-[10px] uppercase">AMOUNT</div>
                <div className="text-[#22C55E] font-bold text-sm">₹400</div>
              </div>
            </div>

            <div className="bg-[#0D9488]/6 border-l-2 border-[#0D9488] p-3">
              <p className="text-[#0D9488] text-[13px]">📋 Note: NNRG TechFest - Paper Presentation</p>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 max-w-[700px] mx-auto my-12">
            <div className="flex-1 h-[1px] bg-white/8" />
            <div className="bg-[#1A1A2E] border border-[#0D9488]/30 text-[#0D9488]/80 text-[9px] tracking-[3px] px-[14px] py-[5px] rounded-[20px] uppercase">
              OR | ALTERNATIVE
            </div>
            <div className="flex-1 h-[1px] bg-white/8" />
          </div>

          {/* Alternative Payment Card */}
          <div className="max-w-[700px] mx-auto bg-[#0D1B2A] rounded-2xl p-8 border border-white/5 shadow-xl relative">
            <div className="absolute top-6 right-6 border border-[#0D9488]/50 text-[#0D9488] text-[9px] font-bold tracking-[2px] px-2 py-1 rounded-[4px] uppercase">
              ALTERNATIVE
            </div>
            
            <div className="bg-[#0D9488]/5 border-l-[3px] border-[#0D9488]/50 p-[10px_14px] mb-8">
              <p className="text-[#0D9488]/80 text-[11px]">
                ⚡ Use this UPI ID if the primary payment option has reached its daily transaction limit.
              </p>
            </div>

            <div className="text-center mb-8">
              <span className="text-[#6e7681] text-[9px] tracking-[3px] uppercase">SCAN QR CODE TO PAY</span>
            </div>

            <div className="flex justify-center mb-10">
              <div className="bg-white p-2 rounded-lg">
                <img 
                  src="https://quickchart.io/qr?text=upi://pay?pa=6301523538-id6e@axl%26pn=Nithish%26am=400%26cu=INR%26tn=NNRG_TechFest_PaperPresentation&size=300" 
                  alt="Alternative Payment QR Code"
                  className="w-[260px] h-[260px]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="space-y-1">
                <div className="text-[#6e7681] text-[10px] uppercase">UPI ID</div>
                <div className="text-[#0D9488] font-bold text-sm">6301523538-id6e@axl</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#6e7681] text-[10px] uppercase">PHONE</div>
                <div className="text-[#0D9488] font-bold text-sm">6301523538</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#6e7681] text-[10px] uppercase">NAME</div>
                <div className="text-white font-bold text-sm">NITHISH</div>
              </div>
              <div className="space-y-1">
                <div className="text-[#6e7681] text-[10px] uppercase">AMOUNT</div>
                <div className="text-[#22C55E] font-bold text-sm">₹400</div>
              </div>
            </div>

            <div className="bg-[#0D9488]/3 border-l-2 border-[#0D9488]/50 p-3">
              <p className="text-[#0D9488]/70 text-[13px]">📋 Note: NNRG TechFest - Paper Presentation</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Registration Form Section --- */}
      <section id="register" className="py-24 px-6 bg-[#F5F5F5]">
        <div className="container mx-auto">
          <SectionHeading>REGISTRATION FORM</SectionHeading>
          <p className="text-center text-[#6e7681] -mt-8 mb-16 max-w-2xl mx-auto">
            Fill in your team details below. After submission, you'll be redirected to WhatsApp to confirm your registration.
          </p>

          <div className="max-w-[760px] mx-auto bg-[#0D1B2A] rounded-2xl p-9 border border-white/5 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* College Selection */}
              <div>
                <label className="block text-[#0D9488] text-[10px] font-bold uppercase tracking-[2px] mb-2">COLLEGE *</label>
                <select 
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  className={`w-full bg-white/5 border ${errors.includes('college') ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-white text-[13px] focus:border-[#0D9488] outline-none transition-colors`}
                >
                  {colleges.map((c, i) => (
                    <option key={i} value={c} className="bg-[#0D1B2A]">{c}</option>
                  ))}
                </select>
              </div>

              {formData.college === "Other" && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  <label className="block text-[#0D9488] text-[10px] font-bold uppercase tracking-[2px] mb-2">OTHER COLLEGE NAME *</label>
                  <input 
                    type="text"
                    name="otherCollege"
                    value={formData.otherCollege}
                    onChange={handleInputChange}
                    placeholder="Enter your college name"
                    className={`w-full bg-white/5 border ${errors.includes('otherCollege') ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-white text-[13px] focus:border-[#0D9488] outline-none transition-colors`}
                  />
                </motion.div>
              )}

              {/* Team Name */}
              <div>
                <label className="block text-[#0D9488] text-[10px] font-bold uppercase tracking-[2px] mb-2">TEAM NAME *</label>
                <input 
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  placeholder="Enter your team name"
                  className={`w-full bg-white/5 border ${errors.includes('teamName') ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-white text-[13px] focus:border-[#0D9488] outline-none transition-colors`}
                />
              </div>

              {/* Team Leader Section */}
              <div className="pt-4">
                <h3 className="text-white font-bold text-[15px] mb-6">Team Leader</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[#0D9488] text-[10px] font-bold uppercase tracking-[2px] mb-2">LEADER FULL NAME *</label>
                    <input 
                      type="text"
                      name="leaderName"
                      value={formData.leaderName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className={`w-full bg-white/5 border ${errors.includes('leaderName') ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-white text-[13px] focus:border-[#0D9488] outline-none transition-colors`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[#0D9488] text-[10px] font-bold uppercase tracking-[2px] mb-2">ROLL NUMBER *</label>
                      <input 
                        type="text"
                        name="leaderRoll"
                        value={formData.leaderRoll}
                        onChange={handleInputChange}
                        placeholder="Roll Number"
                        className={`w-full bg-white/5 border ${errors.includes('leaderRoll') ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-white text-[13px] focus:border-[#0D9488] outline-none transition-colors`}
                      />
                    </div>
                    <div>
                      <label className="block text-[#0D9488] text-[10px] font-bold uppercase tracking-[2px] mb-2">DEPARTMENT *</label>
                      <select 
                        name="leaderDept"
                        value={formData.leaderDept}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-[13px] focus:border-[#0D9488] outline-none transition-colors"
                      >
                        {departments.map((d, i) => (
                          <option key={i} value={d} className="bg-[#0D1B2A]">{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#0D9488] text-[10px] font-bold uppercase tracking-[2px] mb-2">YEAR *</label>
                      <select 
                        name="leaderYear"
                        value={formData.leaderYear}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-[13px] focus:border-[#0D9488] outline-none transition-colors"
                      >
                        {years.map((y, i) => (
                          <option key={i} value={y} className="bg-[#0D1B2A]">{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#0D9488] text-[10px] font-bold uppercase tracking-[2px] mb-2">MOBILE *</label>
                      <input 
                        type="tel"
                        name="leaderMobile"
                        value={formData.leaderMobile}
                        onChange={handleInputChange}
                        placeholder="Mobile"
                        className={`w-full bg-white/5 border ${errors.includes('leaderMobile') ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-white text-[13px] focus:border-[#0D9488] outline-none transition-colors`}
                      />
                    </div>
                    <div>
                      <label className="block text-[#0D9488] text-[10px] font-bold uppercase tracking-[2px] mb-2">EMAIL (OPTIONAL)</label>
                      <input 
                        type="email"
                        name="leaderEmail"
                        value={formData.leaderEmail}
                        onChange={handleInputChange}
                        placeholder="Email (optional)"
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-[13px] focus:border-[#0D9488] outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Member 2 Section */}
              <div className="pt-4">
                <h3 className="text-white font-bold text-[14px] mb-6">Member 2 (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0D9488] text-[10px] font-bold uppercase tracking-[2px] mb-2">FULL NAME</label>
                    <input 
                      type="text"
                      name="member2Name"
                      value={formData.member2Name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-[13px] focus:border-[#0D9488] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#0D9488] text-[10px] font-bold uppercase tracking-[2px] mb-2">ROLL NUMBER</label>
                    <input 
                      type="text"
                      name="member2Roll"
                      value={formData.member2Roll}
                      onChange={handleInputChange}
                      placeholder="Roll Number"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-[13px] focus:border-[#0D9488] outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Transaction ID */}
              <div className="pt-4">
                <label className="block text-[#0D9488] text-[10px] font-bold uppercase tracking-[2px] mb-2">TRANSACTION ID *</label>
                <input 
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  placeholder="UPI Transaction ID after payment"
                  className={`w-full bg-white/5 border ${errors.includes('transactionId') ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-white text-[13px] focus:border-[#0D9488] outline-none transition-colors`}
                />
              </div>

              {/* Reminder Boxes */}
              <div className="space-y-4 pt-4">
                <div className="bg-[#0D9488]/6 border-l-[3px] border-[#0D9488] p-3 px-4">
                  <p className="text-[#0D9488] text-[13px]">
                    💡 Reminder: Pay ₹400 to UPI ID <span className="font-bold">8309030400-id8e@axl</span> first, then enter your Transaction ID above.
                  </p>
                </div>
                <div className="bg-[#22C55E]/6 border-l-[3px] border-[#22C55E] p-3 px-4">
                  <p className="text-[#22C55E] text-[13px]">
                    🟢 On Submit: You'll be redirected to WhatsApp to send your registration details to the coordinator for confirmation.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold py-4.5 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(13,148,136,0.4)] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>⊕</span>
                Submit Registration & Open WhatsApp
                <span>→</span>
              </button>

              <p className="text-center text-[#6e7681] text-[11px] mt-6">
                By submitting, you agree to the event rules and confirm that your payment has been made. All decisions by the organizing committee are final.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* --- Footer Section --- */}
      <footer className="relative bg-black py-24 px-6 overflow-hidden">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="text-white/[0.03] font-black tracking-[8px] whitespace-nowrap select-none" style={{ fontSize: 'clamp(60px, 12vw, 160px)' }}>
            TECH FEST 2027
          </div>
        </div>

        <div className="relative z-10 container mx-auto">
          <h2 className="text-center text-white font-bold text-[28px] mb-16">NEED HELP?</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Faculty Coordinators */}
            <div>
              <h3 className="text-white/30 text-[10px] font-bold uppercase tracking-[3px] mb-6">FACULTY COORDINATORS</h3>
              <div className="space-y-2">
                {[
                  { name: "Dr. V.V. Appaji", phone: "9949062386" },
                  { name: "Mr. M. Eswara Rao", phone: "8143848778" }
                ].map((coord, i) => (
                  <div key={i} className="bg-[#0D1117] border border-[#21262d] rounded-lg p-4 flex justify-between items-center">
                    <span className="text-white font-bold text-sm">{coord.name}</span>
                    <span className="text-gray-400 text-xs">{coord.phone}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Coordinators */}
            <div>
              <h3 className="text-white/30 text-[10px] font-bold uppercase tracking-[3px] mb-6">STUDENT COORDINATORS</h3>
              <div className="space-y-2">
                {/* Main Highlighted Coordinator */}
                <a 
                  href="https://wa.me/918309030400" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-[#051a18] border-l-4 border-[#0D9488] rounded-r-lg p-4 flex justify-between items-center group transition-colors"
                >
                  <div>
                    <div className="text-[#0D9488]/60 text-[8px] font-bold uppercase mb-1">STUDENT COORDINATOR</div>
                    <div className="text-[#0D9488] font-bold text-base">GATTU ABHINAY</div>
                  </div>
                  <div className="text-[#0D9488] font-bold text-[13px] group-hover:translate-x-1 transition-transform">
                    8309030400 ↗
                  </div>
                </a>

                {[
                  { name: "Nithish", phone: "6301234532" },
                  { name: "Akhil", phone: "7281823454" }
                ].map((coord, i) => (
                  <div key={i} className="bg-[#0D1117] border border-[#21262d] rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <div className="text-gray-500 text-[8px] font-bold uppercase">STUDENT COORDINATOR</div>
                      <span className="text-white font-bold text-sm">{coord.name}</span>
                    </div>
                    <span className="text-gray-400 text-xs">{coord.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-top border-white/7 pt-4 mt-20 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-[10px]">
            <div>Developed by the Department CSM</div>
            <div className="text-center">© 2027 NNRG Fest. All rights reserved.</div>
            <a 
              href="https://wa.me/918309030400" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#0D9488] hover:underline"
            >
              Designed by GATTU ABHINAY ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
