'use client';

import { getMembers } from '@/lib/data';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import ScrollReveal from '@/components/utils/animations/ScrollReveal';

import { useState, useEffect } from 'react';

import PaginationControls from '@/components/utils/PaginationControls';
const ITEMS_PER_PAGE = 12;

interface Member {
  id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// export async function generateMetadata() {
//   return {
//     title: "Our Team | Community",
//     description: "Meet our amazing team members working to build and grow our community",
//     openGraph: {
//       title: "Our Team | Community",
//       description: "Meet our amazing team members working to build and grow our community",
//     },
//   };
// }

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {member.image ? (
        <div className="relative h-64 w-full">
          <Image 
            src={member.image} 
            alt={member.name}
            fill
            style={{objectFit: 'cover'}}
            className="transition-all duration-500 hover:scale-105"
          />
        </div>
      ) : (
        <div className="bg-blue-100 h-64 flex items-center justify-center">
          <div className="bg-blue-200 rounded-full p-8">
            <span className="text-4xl font-bold text-blue-500">
              {member.name.charAt(0)}
            </span>
          </div>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
        {member.role === "GDG Lead" ? (
          <p className="text-red-600 font-medium mb-3">{member.role}</p>
        ) : (
          <p className="text-blue-600 font-medium mb-3">{member.role}</p>
        )}
        {member.bio && <p className="text-gray-600 mb-4 line-clamp-3">{member.bio}</p>}
        
        {member.socialLinks && (
          <div className="flex space-x-4 pt-3 border-t border-gray-100">
            {member.socialLinks.twitter && (
              <a href={member.socialLinks.twitter} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-gray-500 hover:text-blue-400 transition-colors">
                <FaTwitter size={20} />
              </a>
            )}
            {member.socialLinks.linkedin && (
              <a href={member.socialLinks.linkedin} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-gray-500 hover:text-blue-700 transition-colors">
                <FaLinkedin size={20} />
              </a>
            )}
            {member.socialLinks.github && (
              <a href={member.socialLinks.github} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-gray-500 hover:text-black transition-colors">
                <FaGithub size={20} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MemberGrid({ members, title, description }: { 
  members: Member[], 
  title: string,
  description: string
}) {
  if (!members || members.length === 0) {
    return <p className="text-center text-gray-500 py-10">No team members to display.</p>;
  }

  return (
    <div className="my-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">{title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {members.map((member) => (
          <ScrollReveal key={member.id} variant="fadeReveal" delay={0.1}>
            <MemberCard member={member} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function MemberCategories({ members }: { members: Member[] }) {
  // Group members by role
  const roleGroups: Record<string, Member[]> = {};
  
  members.forEach(member => {
    if (!roleGroups[member.role]) {
      roleGroups[member.role] = [];
    }
    roleGroups[member.role].push(member);
  });

  return (
    <>
      {Object.entries(roleGroups).map(([role, members], index) => (
        <ScrollReveal key={role} variant="fadeReveal" delay={0.1 * (index + 1)}>
          <h3 className="text-2xl font-bold mb-6 mt-16 text-center">{role}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {members.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </ScrollReveal>
      ))}
    </>
  );
}

export default function CommunityMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const t = useTranslations('CommunityPage');
  
  useEffect(() => {
    async function fetchData() {
      const data = await getMembers();
      setMembers(data);
    }
    fetchData();
  }, []);
  
  // Example: you might want to filter leadership vs regular members
  // const leadershipTeam = members.filter(m => ['Lead', 'Director', 'Chair'].some(term => m.role.includes(term)));
  // const coreTeam = members.filter(m => !['Lead', 'Director', 'Chair'].some(term => m.role.includes(term)));
  
  return (
    <>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-16">

          {/* Members Grid - Option 1: Show all together */}
          <ScrollReveal variant="fadeReveal" delay={0.2}>
            <MemberGrid 
              members={members} 
              title="Meet Our Team"
              description="Dedicated individuals working together to build and grow our tech community"
            />
          </ScrollReveal>

          {/* Members Grid - Option 2: Show by categories */}
          {/* <MemberCategories members={members} /> */}
        </div>
      </div>
    </>
  );
}