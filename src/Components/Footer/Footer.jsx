import React from 'react'
import { FaEnvelope, FaFacebookF, FaGithub, FaLinkedinIn, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>
            <footer className='bg-gradient-to-br from-blue-600 to-teal-600 text-white'>
                {/* top section */}
                <div className='max-w-7xl mx-auto px-6 py-10 grid grid-col-1 md:grid-cols-3 gap-8 text-center place-items-center'>

                    {/* about section */}
                    <div >
                        <h3 className='text-lg font-semibold md-3'>About SRMS</h3>
                        <p className='text-sm leading-relaxed text-blue-100'>Service Request Management System streamlines maintenance and
                            support operations for educational institutions and organizations.</p>
                    </div>

                    {/* quick link */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-center md:text-left">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-blue-100 text-left">
                            <li className="hover:text-white cursor-pointer ">Dashboard</li>
                            <li className="hover:text-white cursor-pointer">Service Requests</li>
                            <li className="hover:text-white cursor-pointer">Reports</li>
                            <li className="hover:text-white cursor-pointer">Help & Support</li>
                        </ul>
                    </div>

                    {/* contact us */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-center md:text-left">Contact us</h3>
                        <ul className='space-y-3 text-sm text-blue-100'>
                            <li className='flex items-center gap-3'> <FaEnvelope /> support@srms.edu</li>
                            <li className='flex items-center gap-3'> <FaPhoneAlt /> +91 123 456 7890</li>
                            <li className='flex items-center gap-3'> <FaEnvelope /> Mumbai, Maharashtra, India</li>

                        </ul>
                    </div>
                </div>

                {/* bottm part */}

                <div className='border-t border-white/20'>
                {/* left - 1 */}
                    <div className='max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4'>
                        <p className='text-sm text-blue-100'> © 2025 SRMS. All rights reserved. v1.0.0</p>

                        {/* left-2 */}
                        <div className='flex gap-3'>
                            <div className='w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer'>
                                <FaFacebookF />
                            </div>
                            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer">
                                <FaTwitter />
                            </div>
                            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer">
                                <FaLinkedinIn />
                            </div>
                            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer">
                                <FaGithub />
                            </div>
                        </div>
                        {/* left- 3 */}
                        <div className='text-sm text-blue-100'>
                            <span className='hover:text-white cursor-pointer'>Privacy Policy</span>
                            <span className="mx-2">|</span>
                            <span className="hover:text-white cursor-pointer">
                                Terms of Service
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer