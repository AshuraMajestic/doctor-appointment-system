import React from 'react'
import { assets } from '../assets/assets'

function About() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image}/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Finding the right doctor for your healthcare needs has never been easier. Our platform is dedicated to connecting you with highly qualified and experienced medical professionals across various specialties. Whether you need a general physician, a dermatologist, a pediatrician, or any other specialist, we offer a seamless and convenient way to browse, book, and consult with doctors. With just a few clicks, you can schedule an appointment and receive expert medical advice from trusted professionals.</p>

          <p>We understand that healthcare should be accessible, reliable, and stress-free. That’s why we provide detailed doctor profiles, including their qualifications, experience, and patient reviews, to help you make informed decisions. Our platform also offers flexible appointment booking, ensuring you can choose a time that best fits your schedule. Whether you prefer in-person visits or online consultations, we cater to your needs with secure and efficient services.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Your well-being is our top priority. Our mission is to create a trusted healthcare ecosystem where patients can easily find the right medical support whenever needed. We continuously strive to enhance your experience by incorporating the latest advancements in healthcare technology. Join thousands of satisfied patients who have found reliable doctors through our platform and take a step toward better health today!</p>
        </div>
      </div>

      <div className='text-xl my-4'>
<p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border border-gray-200 px-10 md:px-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Streamlined Appoinment Scheduling. That Fits Into Your Busy Lifestyle.</p>
        </div>

        <div className='border border-gray-200 px-10 md:px-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Access To A Newtwork Of Trusted Healthcare Professionals In Your Area.</p>
        </div>

        <div className='border border-gray-200 px-10 md:px-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.</p>
        </div>

      </div>
    </div>
  )
}

export default About
