import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-gilroy-bold mb-8 text-gray-900">About Digicots</h1>
          <p className="text-xl font-gilroy-regular text-gray-700 leading-relaxed max-w-3xl">
            We are a creative digital agency that helps brands tell their stories through innovative design and technology.
          </p>
        </div>
      </div>

      {/* Content Sections for Scroll Testing */}
      <div className="space-y-32 px-8 pb-32">
        {/* Section 1 */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-gilroy-bold mb-6 text-gray-900">Our Mission</h2>
              <p className="text-lg font-gilroy-regular text-gray-700 leading-relaxed mb-6">
                To empower brands with cutting-edge digital solutions that drive engagement and growth. We believe in the power of creativity combined with strategic thinking.
              </p>
              <p className="text-lg font-gilroy-regular text-gray-700 leading-relaxed">
                Every project we undertake is a journey of discovery, innovation, and transformation.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-96 rounded-2xl"></div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-gradient-to-br from-pink-500 to-red-600 h-96 rounded-2xl lg:order-1"></div>
            <div className="lg:order-2">
              <h2 className="text-4xl font-gilroy-bold mb-6 text-gray-900">Our Vision</h2>
              <p className="text-lg font-gilroy-regular text-gray-700 leading-relaxed mb-6">
                To be the leading digital agency that transforms how brands connect with their audiences in the digital age.
              </p>
              <p className="text-lg font-gilroy-regular text-gray-700 leading-relaxed">
                We envision a future where every brand has a powerful digital presence that resonates with their community.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-gilroy-bold mb-12 text-gray-900">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white rounded-2xl shadow-lg">
                <h3 className="text-2xl font-gilroy-bold mb-4 text-gray-900">Innovation</h3>
                <p className="font-gilroy-regular text-gray-700">We push boundaries and explore new possibilities in every project.</p>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-lg">
                <h3 className="text-2xl font-gilroy-bold mb-4 text-gray-900">Quality</h3>
                <p className="font-gilroy-regular text-gray-700">Excellence is our standard, not our goal. We deliver nothing but the best.</p>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-lg">
                <h3 className="text-2xl font-gilroy-bold mb-4 text-gray-900">Partnership</h3>
                <p className="font-gilroy-regular text-gray-700">We work alongside our clients as true partners in their success.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
