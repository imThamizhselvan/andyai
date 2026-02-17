import AnimatedSection from './AnimatedSection'

const logos = [
  'TechCrunch', 'Forbes', 'Bloomberg', 'Wired', 'VentureBeat', 'Inc.',
]

export default function TrustedBy() {
  return (
    <section className="bg-dark py-16 border-y border-white/5">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm font-medium uppercase tracking-widest mb-8">
            As featured in
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {logos.map((logo) => (
              <div
                key={logo}
                className="text-gray-500 font-bold text-lg md:text-xl tracking-tight opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
