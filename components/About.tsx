import React from 'react';

const About: React.FC = () => {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-32" style={{ backgroundImage: 'url(https://picsum.photos/seed/about/1600/600)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            About CourierMitra
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Connecting the world, one parcel at a time. Discover our journey, our mission, and the values that drive us.
          </p>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="prose lg:prose-lg max-w-none text-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p>
                Our mission is to simplify logistics through technology, making shipment tracking transparent, accessible, and effortless for everyone. We strive to empower individuals and businesses by providing a single, reliable platform to monitor their packages from any carrier, anywhere in the world.
              </p>
              <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Our Vision</h2>
              <p>
                We envision a world where the complexities of global shipping are invisible to the end-user. Our goal is to be the most trusted and user-friendly tracking service, continuously innovating to provide real-time insights and peace of mind for every shipment.
              </p>
            </div>
            <div>
              <img src="https://picsum.photos/seed/mission/600/400" alt="A diverse team collaborating around a table with laptops and documents." className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our History Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Journey</h2>
                <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
                    From a simple idea to a global service.
                </p>
            </div>
            <div className="relative" role="feed" aria-label="Company history timeline">
                {/* Timeline line */}
                <div className="absolute left-1/2 h-full w-0.5 bg-gray-300 hidden md:block" style={{ transform: 'translateX(-50%)' }} aria-hidden="true"></div>

                {/* Timeline Item 1 */}
                <div className="mb-8 flex justify-between items-center w-full flex-row-reverse md:flex-row" role="article">
                    <div className="order-1 md:w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-blue-500 shadow-xl w-8 h-8 rounded-full" aria-hidden="true">
                        <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
                    </div>
                    <div className="order-1 bg-white rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4">
                        <h3 className="mb-3 font-bold text-gray-800 text-xl">The Idea (2018)</h3>
                        <p className="text-sm leading-snug tracking-wide text-gray-700">
                            CourierMitra was born from a simple frustration: the difficulty of tracking multiple packages from different carriers. Our founders envisioned a single, unified platform to solve this problem.
                        </p>
                    </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="mb-8 flex justify-between items-center w-full" role="article">
                    <div className="order-1 md:w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-blue-500 shadow-xl w-8 h-8 rounded-full" aria-hidden="true">
                        <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
                    </div>
                    <div className="order-1 bg-white rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4">
                        <h3 className="mb-3 font-bold text-gray-800 text-xl">Launch Day (2019)</h3>
                        <p className="text-sm leading-snug tracking-wide text-gray-700">
                            After a year of development, we launched our initial platform, supporting 50+ major courier services. The response was overwhelmingly positive, validating our mission.
                        </p>
                    </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="mb-8 flex justify-between items-center w-full flex-row-reverse md:flex-row" role="article">
                    <div className="order-1 md:w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-blue-500 shadow-xl w-8 h-8 rounded-full" aria-hidden="true">
                        <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
                    </div>
                    <div className="order-1 bg-white rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4">
                        <h3 className="mb-3 font-bold text-gray-800 text-xl">Going Global (2021)</h3>
                        <p className="text-sm leading-snug tracking-wide text-gray-700">
                           We expanded our partnerships to over 500+ carriers, offering true global coverage. We also introduced new features like SMS notifications and tracking history for registered users.
                        </p>
                    </div>
                </div>
                 {/* Timeline Item 4 */}
                <div className="mb-8 flex justify-between items-center w-full" role="article">
                    <div className="order-1 md:w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-blue-500 shadow-xl w-8 h-8 rounded-full" aria-hidden="true">
                        <h1 className="mx-auto text-white font-semibold text-lg">4</h1>
                    </div>
                    <div className="order-1 bg-white rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4">
                        <h3 className="mb-3 font-bold text-gray-800 text-xl">Today & Beyond</h3>
                        <p className="text-sm leading-snug tracking-wide text-gray-700">
                           We continue to innovate, focusing on improving our technology, expanding our partnerships, and delivering the best possible experience for our millions of users worldwide.
                        </p>
                    </div>
                </div>

            </div>
        </div>
      </section>
    </main>
  );
};

export default About;