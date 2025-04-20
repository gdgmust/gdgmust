// /src/lib/data.ts
import eventsData from '@/data/events.json';
import membersData from '@/data/community.json';

export async function getEvents() {
  // Get current date for status comparison
  const currentDate = new Date();
  
  // Make a copy of the events and update the status based on date
  const updatedEvents = eventsData.map(event => {
    const eventDate = new Date(event.date);
    // Determine if the event is upcoming or past
    const status = eventDate > currentDate ? 'upcoming' : 'past';
    
    // Return a new object with updated status
    return {
      ...event,
      status
    };
  });
  
  return updatedEvents;
}

export async function getMembers(year?: string) {
  const currentYear = getCurrentYear();
  
  try {
    if (!year || year === 'all') {
      // If no year is specified, return all members after deduplicating
      const uniqueMemberMap = new Map();
      membersData.forEach(member => {
        if (!uniqueMemberMap.has(member.id)) {
          uniqueMemberMap.set(member.id, member);
        }
      });
      return Array.from(uniqueMemberMap.values());
    }
    
    // Filter from all members based on:
    // Member was active during this year (between joinYear and exitYear inclusive)
    const selectedYearNum = parseInt(year);
    
    const filteredMembers = membersData.filter(member => {
      // Use either sinceYear or year as the join year
      const memberJoinYear = parseInt(member.sinceYear || member.year || '0');
      
      // Get exit year (default to current year + 1 if still active)
      let memberExitYear;
      if (member.exitYear && typeof member.exitYear === 'string') {
        memberExitYear = parseInt(member.exitYear);
      } else if (member.activeStatus === false) {
        // If inactive but no exit year specified, assume they left last year
        memberExitYear = parseInt(currentYear) - 1;
      } else {
        // Still active, set exit year to future
        memberExitYear = parseInt(currentYear) + 1;
      }
      
      // Member should appear if the selected year falls within their active period
      return selectedYearNum >= memberJoinYear && selectedYearNum <= memberExitYear;
    });
    
    // Deduplicate by ID before returning
    const uniqueMembers = new Map();
    filteredMembers.forEach(member => {
      if (!uniqueMembers.has(member.id)) {
        uniqueMembers.set(member.id, member);
      }
    });
    
    return Array.from(uniqueMembers.values());
  } catch (error) {
    console.error(`Error getting members:`, error);
    return [];
  }
}

export function getAvailableYears() {
  // Define the start year (the earliest year with data)
  const startYear = 2022; // You can adjust this to match your earliest data
  const currentYear = new Date().getFullYear();
  
  // Create array of all years from start year to current year
  const years = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year.toString());
  }
  
  // Return all years, plus an "all" option
  return years;
}

export function getCurrentYear() {
  return new Date().getFullYear().toString();
}