'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getMembers } from '@/lib/data';

// Define types for our context
interface Member {
  id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
  year?: string; // Add year for filtering
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

interface CommunityContextType {
  members: Member[];
  filteredMembers: Member[];
  isLoading: boolean;
  activeRoleFilter: string;
  activeYearFilter: string;
  searchQuery: string;
  setActiveRoleFilter: (role: string) => void;
  setActiveYearFilter: (year: string) => void;
  setSearchQuery: (query: string) => void;
  availableRoles: string[];
  availableYears: string[];
}

// Create the context
const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

// Provider component
export function CommunityProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRoleFilter, setActiveRoleFilter] = useState('all');
  const [activeYearFilter, setActiveYearFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);

  // Fetch members on component mount
  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
        const data = await getMembers();
        setMembers(data);
        setFilteredMembers(data);
        
        // Extract unique roles and years
        const roles = ['all', ...new Set(data.map(member => member.role))];
        const years = ['all', ...new Set(data.map(member => member.year).filter(Boolean))];
        
        setAvailableRoles(roles);
        setAvailableYears(years);
      } catch (error) {
        console.error('Failed to fetch members:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMembers();
  }, []);

  // Apply filters when any filter changes
  useEffect(() => {
    let result = [...members];
    
    // Apply role filter
    if (activeRoleFilter !== 'all') {
      result = result.filter(member => member.role === activeRoleFilter);
    }
    
    // Apply year filter
    if (activeYearFilter !== 'all') {
      result = result.filter(member => member.year === activeYearFilter);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(member => 
        member.name.toLowerCase().includes(query) || 
        member.role.toLowerCase().includes(query) || 
        (member.bio && member.bio.toLowerCase().includes(query))
      );
    }
    
    setFilteredMembers(result);
  }, [activeRoleFilter, activeYearFilter, searchQuery, members]);

  return (
    <CommunityContext.Provider 
      value={{
        members,
        filteredMembers,
        isLoading,
        activeRoleFilter,
        activeYearFilter,
        searchQuery,
        setActiveRoleFilter,
        setActiveYearFilter,
        setSearchQuery,
        availableRoles,
        availableYears
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
}

// Custom hook to use the context
export function useCommunity() {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
}
