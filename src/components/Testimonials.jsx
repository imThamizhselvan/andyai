import AnimatedSection from './AnimatedSection'

const testimonials = [
  {
    quote:
      "We were missing about 40% of our calls while out on jobs. Since switching to Andy AI, every single call gets answered and appointments get booked. Our revenue is up 30% in 3 months.",
    name: 'Mike Thompson',
    role: 'Owner, Thompson Plumbing',
    initials: 'MT',
  },
  {
    quote:
      "It's like having a full-time receptionist for a fraction of the cost. Andy handles after-hours calls perfectly — callers don't even realize it's AI. We wake up to a full schedule every morning.",
    name: 'Sarah Williams',
    role: 'Manager, Spark Electrical Services',
    initials: 'SW',
  },
  {
    quote:
      "The call summaries are a game changer. I know exactly what the customer needs before I even call them back. Andy books the appointment, captures the problem, and sends me everything instantly.",
    name: 'David Chen',
    role: 'Owner, CoolAir HVAC',
    initials: 'DC',
  },
]

export default function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Loved by{' '}
              <span className="gradient-text">Service Businesses</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See why thousands of tradies and service businesses trust Andy AI
              to handle their calls.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <AnimatedSection key={testimonial.name} delay={i * 0.1}>
              <div className="bg-gray-50 rounded-2xl p-8 h-full flex flex-col border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-gray-700 leading-relaxed mb-6 flex-grow">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
