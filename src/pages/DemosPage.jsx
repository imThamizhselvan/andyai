import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'

const demos = [
  {
    title: 'Plumber — Emergency Leak Call',
    description:
      'Hear how Andy handles an urgent plumbing call, captures the issue, and books a same-day appointment.',
    tag: 'Plumbing',
    industry: 'Plumbing',
    conversation: [
      { sender: 'andy', text: "Good morning! Thanks for calling Smith Plumbing. This is Andy, how can I help you today?" },
      { sender: 'user', text: "Hi, I've got a burst pipe under my kitchen sink. There's water everywhere!" },
      { sender: 'andy', text: "I'm sorry to hear that! Let me get someone out to you right away. Can I grab your name and address?" },
      { sender: 'user', text: "It's Lisa, 42 Park Avenue, Westfield." },
      { sender: 'andy', text: "Thanks Lisa. I've flagged this as urgent. I have a technician available at 11:30 AM today — does that work for you?" },
      { sender: 'user', text: "Yes, that's perfect. Thank you!" },
      { sender: 'andy', text: "Great! You're booked for 11:30 AM. Our plumber Dave will be there. I'll send you a confirmation text now. In the meantime, try to turn off the water supply under the sink if you can." },
    ],
  },
  {
    title: 'Electrician — After-Hours Quote Request',
    description:
      'See how Andy handles an after-hours call for an electrician, captures the job details, and schedules a quote visit.',
    tag: 'Electrical',
    industry: 'Electrical',
    conversation: [
      { sender: 'andy', text: "Hi there! Thanks for calling Bright Spark Electrical. This is Andy. We're currently after hours but I can absolutely help you. What do you need?" },
      { sender: 'user', text: "I want to get a quote for rewiring my living room. The switches keep flickering." },
      { sender: 'andy', text: "No worries! I can book you in for a free quote. Can I get your name and a good contact number?" },
      { sender: 'user', text: "James Miller, 0412 345 678." },
      { sender: 'andy', text: "Perfect James. I have availability for a quote visit on Thursday at 9 AM or Friday at 2 PM. Which works better?" },
      { sender: 'user', text: "Thursday morning is great." },
      { sender: 'andy', text: "Done! You're booked for Thursday 9 AM. Our electrician will call you 30 minutes before arriving. You'll get a confirmation text shortly. Is there anything else I can help with?" },
    ],
  },
  {
    title: 'Dental Clinic — New Patient Booking',
    description:
      'Watch Andy book a new patient appointment, gather their details, and handle insurance questions.',
    tag: 'Healthcare',
    industry: 'Dental',
    conversation: [
      { sender: 'andy', text: "Good afternoon! Thank you for calling Sunshine Dental. This is Andy. Are you an existing patient or would you like to book your first visit?" },
      { sender: 'user', text: "I'm a new patient. I need a general checkup and cleaning." },
      { sender: 'andy', text: "Welcome! I'd love to get you booked in. Can I get your full name and date of birth?" },
      { sender: 'user', text: "Maria Santos, September 15, 1990." },
      { sender: 'andy', text: "Thanks Maria! Do you have any dental insurance?" },
      { sender: 'user', text: "Yes, I have Delta Dental through my work." },
      { sender: 'andy', text: "Great, we accept Delta Dental! I have openings next Tuesday at 10 AM or Wednesday at 3 PM for a new patient checkup and clean. Which do you prefer?" },
      { sender: 'user', text: "Tuesday at 10 works." },
      { sender: 'andy', text: "Perfect! You're booked for Tuesday at 10 AM. Please arrive 15 minutes early to complete your new patient forms. I'll send you a confirmation with all the details. See you then!" },
    ],
  },
  {
    title: 'HVAC — AC Repair During Summer Rush',
    description:
      'See how Andy efficiently handles a high-volume summer call for an HVAC company.',
    tag: 'HVAC',
    industry: 'HVAC',
    conversation: [
      { sender: 'andy', text: "Thanks for calling CoolBreeze Air Conditioning! This is Andy. How can I help you today?" },
      { sender: 'user', text: "My AC stopped working and it's 95 degrees in my house. I need someone ASAP." },
      { sender: 'andy', text: "I completely understand — that's no fun in this heat! Let me check our schedule. Can I get your name and address?" },
      { sender: 'user', text: "Tom Roberts, 88 Elm Street." },
      { sender: 'andy', text: "Thanks Tom. What type of AC system do you have — split system, ducted, or window unit?" },
      { sender: 'user', text: "It's a split system. It just stopped blowing cold air this morning." },
      { sender: 'andy', text: "Got it. I've marked this as priority. Our earliest available slot is today at 4 PM. Would that work for you?" },
      { sender: 'user', text: "Yes please!" },
      { sender: 'andy', text: "You're all set for 4 PM today. Our technician will give you a call when they're on their way. I'll text you the confirmation now." },
    ],
  },
]

export default function DemosPage() {
  const [activeDemo, setActiveDemo] = useState(0)

  return (
    <div>
      {/* Header */}
      <section className="bg-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Demo Calls
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Hear Andy AI{' '}
              <span className="gradient-text">In Action</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Real call scenarios showing how Andy answers, captures details,
              and books appointments for different industries.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Interactive Demos */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            {/* Demo Tabs */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {demos.map((demo, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDemo(i)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeDemo === i
                      ? 'bg-gradient-to-r from-primary to-emerald-400 text-white shadow-lg shadow-primary/25'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {demo.tag}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Description */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                  {demos[activeDemo].industry}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {demos[activeDemo].title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  {demos[activeDemo].description}
                </p>

                {/* Call Summary Card */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    What Andy captures:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Caller name & contact details
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Issue description & urgency level
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Location / service address
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Booked appointment date & time
                    </li>
                  </ul>
                </div>

                <Link to="/contact" className="btn-primary">
                  Try Andy for Your Business
                </Link>
              </div>

              {/* Call Transcript Window */}
              <div className="bg-navy rounded-2xl overflow-hidden shadow-2xl">
                <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white font-bold text-sm">
                    A
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Andy AI — Live Call</p>
                    <p className="text-green-400 text-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Call in progress
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-xs">Transcript</span>
                  </div>
                </div>

                <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                  {demos[activeDemo].conversation.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {msg.sender === 'andy' && (
                        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                          <span className="text-primary text-xs font-bold">A</span>
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                          msg.sender === 'user'
                            ? 'bg-primary/20 text-gray-200 rounded-tr-none'
                            : 'bg-white/10 text-gray-200 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      {msg.sender === 'user' && (
                        <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 ml-2 mt-1">
                          <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
              Want Andy Answering Your Calls?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Start your free trial and hear Andy handle your first call today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary text-lg">
                Get Started Free
              </Link>
              <Link to="/pricing" className="btn-outline">
                View Pricing
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
