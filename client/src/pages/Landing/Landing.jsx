import React from 'react'
import './index.css'
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4 min-h-screen">
      <div className="font-bold text-5xl md:text-8xl">Smart Warehouse</div>
      <div className="w-full md:max-w-6xl px-8">
        <p className="text-center text-lg">
        Revolutionizing inventory management with our smart warehouse solution, we seamlessly integrate advanced technology to ensure efficient, accurate, and secure operations. Our system optimizes storage, streamlines processes, and enhances visibility, transforming the way you manage your warehouse for the modern era.
        </p>
      </div>
      <div className="space-x-6 flex pt-6">
        <Link to="/login">
          <Button variant="outline">Login to your account</Button>
        </Link>
      </div>
    </div>
  );
}

export default Landing