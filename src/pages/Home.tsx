import React from 'react';
import { Link } from 'react-router-dom';
import { Import as Passport, Search, UserPlus, Shield } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-primary-50 to-white">
      {/* Hero section */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <Passport className="h-16 w-16 text-primary-800" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Passport Application <span className="text-primary-800">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our automated system makes applying for and tracking your passport status quick and hassle-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="btn btn-primary text-base px-8 py-3"
            >
              Apply Now
            </Link>
            <Link 
              to="/status" 
              className="btn btn-outline text-base px-8 py-3"
            >
              Check Status
            </Link>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our passport automation system streamlines the entire process from application to approval.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card p-6 text-center animate-slide-up" style={{ animationDelay: '0ms' }}>
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
                <UserPlus className="h-7 w-7 text-primary-800" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Register</h3>
            <p className="text-gray-600">
              Fill out the registration form with your personal details to initiate your passport application.
            </p>
          </div>

          <div className="card p-6 text-center animate-slide-up" style={{ animationDelay: '150ms' }}>
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-secondary-100 flex items-center justify-center">
                <Shield className="h-7 w-7 text-secondary-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Processing</h3>
            <p className="text-gray-600">
              Our admin team verifies your information and processes your application securely.
            </p>
          </div>

          <div className="card p-6 text-center animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-accent-100 flex items-center justify-center">
                <Search className="h-7 w-7 text-accent-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Track Status</h3>
            <p className="text-gray-600">
              Check your application status anytime using your unique application ID.
            </p>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-primary-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 md:p-12 md:flex md:items-center md:justify-between">
            <div className="md:max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to get your passport?
              </h2>
              <p className="text-primary-100 mb-6 md:mb-0">
                Start your application today and experience our streamlined process.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/register" 
                className="btn bg-white text-primary-800 hover:bg-gray-100 active:bg-gray-200 text-base px-8 py-3"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;