import React from 'react'
import './index.css'

const Card = ({ title, description }) => {
  return (
    <div className="card-container">
      <div className="glass-effect bg-[#5522d0] p-6 rounded-lg shadow-lg">
        <h2 className="text-white text-xl font-semibold mb-2">{title}</h2>
        <p className="text-white">{description}</p>
      </div>
    </div>
  );
};

const Landing = () => {
  const features = [
    {
      title: 'VPC for Data Privacy and Cyber Security',
      description: 'Implementing a VPC to ensure secure data transmission and storage within isolated environments.',
    },
    {
      title: 'Efficient Employee Crew Management and Scheduling',
      description: 'Streamline employee scheduling and management for optimal productivity and resource allocation.',
    },
    {
      title: 'Priority and Time-Based Dock Scheduling for Trucks',
      description: 'Optimize dock scheduling with priority and time-based algorithms to reduce delays and maximize efficiency.',
    },
    {
      title: 'Mobile Notification Alert System',
      description: 'Instant alerts sent to mobile devices to keep everyone updated on important events and changes.',
    },
    {
      title: 'Secure Authentication and Authorization',
      description: 'Robust authentication and authorization mechanisms to ensure secure access to systems and data.',
    },
    {
      title: 'Responsive and Cross-Compatibility on All Devices',
      description: 'Ensure that the application works seamlessly across all devices with responsive design.',
    },
    {
      title: 'Efficient Returning Process Streamlined into UI Alerts',
      description: 'Simplify the returning process with streamlined UI alerts and notifications for user convenience.',
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center space-y-4 min-h-screen">
      <div className="font-bold text-5xl md:text-8xl">Smart Warehouse</div>
      <div className="w-full md:max-w-6xl px-8">
        <p className="text-center text-lg">
          Revolutionizing inventory management with our smart warehouse solution, we seamlessly integrate advanced technology to ensure efficient, accurate, and secure operations. Our system optimizes storage, streamlines processes, and enhances visibility, transforming the way you manage your warehouse for the modern era.
        </p>
      </div>
      <div className="w-full md:max-w-6xl px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
      <div className="space-x-6 flex pt-6 pb-10">
        <Link to="/login">
          <button className='border px-4 py-2 text-xl font-semibold rounded-md'>Login to your account</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing