import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { IoMdArrowRoundBack } from "react-icons/io";

import { getEventBySlug, createSlug, resolveParams, ScrollReveal } from './utils';
import EventHero from './components/EventHero';
import EventDetails from './components/EventDetails';
import EventSidebar from './components/EventSidebar';
import EventLocation from './components/EventLocation';
import EventAdditionalInfo from './components/EventAdditionalInfo';
import EventPeople from './components/EventPeople';
import EventSponsors from './components/EventSponsors';
import EventOrganizer from './components/EventOrganizer';

import ScrollElement from 'locomotive-scroll/dist/types/core/ScrollElement.js';

export async function generateMetadata(props: any) {
  const params = await resolveParams(props.params);
  const event = await getEventBySlug(params);
  
  if (!event) return { title: 'Event Not Found' };
  
  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: event.image ? [event.image] : [],
    },
  };
}

export default async function EventPage(props: any) {
  const params = await resolveParams(props.params);
  const event = await getEventBySlug(params);
  const t = await getTranslations('EventsPage');

  if (!event) {
    notFound();
  }

  return (
    <div className="bg-zinc-100/50 mx-auto px-4 py-14">
      <div className="max-w-6xl mx-auto space-y-16"> {/* Increased spacing between main sections */}
        {/* Hero section */}
        <ScrollReveal variant="fadeReveal" delay={0.1}>
        <EventHero event={event} />
        </ScrollReveal>

        {/* Event details - two column layout */}
        <ScrollReveal variant="fadeReveal" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main content */}
            <EventDetails event={event} />
            
            {/* Sidebar */}
            <EventSidebar 
              event={event} 
              registerText={t('in-event-info.Register')}
            />
          </div>
        </ScrollReveal>

        {/* Location section */}
        <ScrollReveal variant="fadeReveal" delay={0.1}>
          <EventLocation event={event} />
        </ScrollReveal>

        {/* Additional info sections */}
        <ScrollReveal variant="fadeReveal" delay={0.1}>
          <EventAdditionalInfo event={event} />
        </ScrollReveal>

        {/* Sponsors */}
        <ScrollReveal variant="fadeReveal" delay={0.1}>
          <EventSponsors event={event} />
        </ScrollReveal>

        {/* People sections - with proper spacing between types */}
          <EventPeople event={event} />

        {/* Organizer */}
        <ScrollReveal variant="fadeReveal" delay={0.1}>
          <EventOrganizer event={event} />
        </ScrollReveal>
        {/* Back to events button */}
        <div className='mt-12'>
          <Link href="/events" className="flex justify-center">
            <button className="bg-blue-600 flex flex-row items-center hover:bg-blue-500 text-white font-medium h-[48px] py-3 px-6 rounded-full transition-all hover:shadow-lg transform hover:-translate-y-0.5">
              <IoMdArrowRoundBack className="h-5 w-5 mr-2" />
              {t('in-event-info.BackButton')}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}