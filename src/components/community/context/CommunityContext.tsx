'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getMembers, getAvailableYears, getCurrentYear } from '@/lib/data';

// Define types for our context
interface Member {
  id: string;
  name?: string;         // Legacy field
  nameEN?: string;       // English name
  nameMN?: string;       // Mongolian name
  role: string;
  oldRole?: string;      // Previous role if applicable
  image?: string;
  bio?: string;
  bioEN?: string;        // English bio
  bioMN?: string;        // Mongolian bio
  year?: string;
  sinceYear?: string;
  exitYear?: string | boolean;  // When the member left (year or false)
  activeStatus?: boolean;       // If the member is still active
  socialLinks?: {
    x?: string;
    linkedin?: string;
    github?: string;
    google?: string;
    facebook?: string;
    instagram?: string;
    website?: string;
    kaggle?: string;
    medium?: string;
    youtube?: string;
    playstore?: string;
  };
}

interface CommunityContextType {
  members: Member[];
  filteredMembers: Member[];
  isLoading: boolean;
  activeRoleFilter: string;
  activeYearFilter: string;
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setActiveRoleFilter: (role: string) => void;
  setActiveYearFilter: (year: string) => void;
  setSearchQuery: (query: string) => void;
  availableRoles: string[];
  availableYears: string[];
  paginatedMembers: Member[];
}

// Create the context
const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

// Provider component
export function CommunityProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [allMembers, setAllMembers] = useState<Member[]>([]); // Store all members for search
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [paginatedMembers, setPaginatedMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRoleFilter, setActiveRoleFilter] = useState('all');
  const [activeYearFilter, setActiveYearFilter] = useState(getCurrentYear()); // Default to current year
  const [searchQuery, setSearchQuery] = useState('');
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>(['all', ...getAvailableYears()]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of members per page
  const [totalPages, setTotalPages] = useState(1);

  // Fetch all members once on component mount for searching
  useEffect(() => {
    const fetchAllMembers = async () => {
      try {
        const allMembersData = await getMembers('all');
        setAllMembers(allMembersData);
      } catch (error) {
        console.error('Failed to fetch all members:', error);
      }
    };
    
    fetchAllMembers();
  }, []);

  // Fetch members on component mount - use current year by default
  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
        const currentYearData = await getMembers(getCurrentYear());
        setMembers(currentYearData);
        setFilteredMembers(currentYearData);
        
        // Extract unique roles
        const roles = ['all', ...new Set(currentYearData.map(member => member.role))];
        setAvailableRoles(roles);
        
        // Calculate total pages
        setTotalPages(Math.ceil(currentYearData.length / itemsPerPage));
      } catch (error) {
        console.error('Failed to fetch members:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMembers();
  }, []);

  // Fetch members when year filter changes
  useEffect(() => {
    const fetchMembersByYear = async () => {
      setIsLoading(true);
      try {
        // If there's a search query, skip changing the year filter behavior
        if (!searchQuery) {
          const data = await getMembers(activeYearFilter);
          setMembers(data);
          
          // Extract unique roles for this year
          const roles = ['all', ...new Set(data.map(member => member.role))];
          setAvailableRoles(roles);
          
          // Reset role filter if current role doesn't exist in this year
          if (activeRoleFilter !== 'all' && !roles.includes(activeRoleFilter)) {
            setActiveRoleFilter('all');
          }
        }
      } catch (error) {
        console.error(`Failed to fetch members for year ${activeYearFilter}:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMembersByYear();
  }, [activeYearFilter, searchQuery]);

  // Apply filters when any filter changes
  useEffect(() => {
    let result: Member[];
    
    // If we have a search query, search across all members (all years)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = allMembers.filter(member => 
        member.name?.toLowerCase().includes(query) || 
        member.nameEN?.toLowerCase().includes(query) || 
        member.nameMN?.toLowerCase().includes(query) || 
        member.role.toLowerCase().includes(query) || 
        (member.bio && member.bio.toLowerCase().includes(query)) ||
        (member.bioEN && member.bioEN.toLowerCase().includes(query)) ||
        (member.bioMN && member.bioMN.toLowerCase().includes(query))
      );
      
      // Apply role filter if needed
      if (activeRoleFilter !== 'all') {
        result = result.filter(member => member.role === activeRoleFilter);
      }
    } else {
      // No search query, just use members from the selected year
      result = [...members];
      
      // Apply role filter
      if (activeRoleFilter !== 'all') {
        result = result.filter(member => member.role === activeRoleFilter);
      }
    }
    
    // Update filtered members
    setFilteredMembers(result);
    
    // Reset to first page when filters change
    setCurrentPage(1);
    
    // Calculate new total pages
    setTotalPages(Math.ceil(result.length / itemsPerPage));
  }, [activeRoleFilter, searchQuery, members, allMembers]);

  // Update paginated members when filtered members or current page change
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedMembers(filteredMembers.slice(startIndex, endIndex));
  }, [filteredMembers, currentPage, itemsPerPage]);

  return (
    <CommunityContext.Provider 
      value={{
        members,
        filteredMembers,
        paginatedMembers,
        isLoading,
        activeRoleFilter,
        activeYearFilter,
        searchQuery,
        currentPage,
        itemsPerPage,
        totalPages,
        setCurrentPage,
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
