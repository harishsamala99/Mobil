import React from 'react';
import { useEmployeeStore } from '../store/useEmployeeStore';

const TeamMemberCard = ({ member }) => (
    <div className="bg-secondary/30 dark:bg-secondary p-6 rounded-lg text-center shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
        <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-accent/50"/>
        <h3 className="text-xl font-bold text-secondary dark:text-white">{member.name}</h3>
        <p className="text-accent">{member.role}</p>
        <p className="text-sm text-secondary/70 dark:text-light/60 mt-1">{member.shift} Shift</p>
    </div>
);

const About = () => {
  const employees = useEmployeeStore((state) => state.employees);

  return (
    <div className="bg-light dark:bg-primary py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary dark:text-white uppercase">About MOBIL</h1>
            <p className="mt-4 text-lg text-secondary/80 dark:text-light/60">
              Fueling communities for over a century.
            </p>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-secondary/90 dark:text-light/70 space-y-6">
            <p>
              Founded on the simple principle of providing reliable fuel and friendly service, MOBIL has grown from a single station into a global network of trusted roadside stops. Our mission is to make every journey better by offering high-quality products and convenient services in a clean, safe, and welcoming environment.
            </p>
            <p>
              We are committed to our customers and the communities we serve. This includes investing in modern technology like our Synergy™ fuel for a faster, more efficient experience, and a commitment to sustainability through various environmental initiatives. At MOBIL, we're not just a gas station; we're your partner on the road.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-20">
            <div className="text-center mb-12">
                <h2 className="font-heading text-4xl font-bold text-secondary dark:text-white uppercase">Meet Our Team</h2>
                <p className="mt-2 text-lg text-secondary/80 dark:text-light/60">The dedicated professionals keeping you on the move.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {employees.map(employee => (
                    <TeamMemberCard key={employee.id} member={employee} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
