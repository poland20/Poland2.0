import { CloudinaryPhoto } from './Cloudinary';
import Venue from './Venue';
import Speaker from './Speaker';
import SponsorCategory from './SponsorCategory';
import Sponsor from './Sponsor';
import TeamMember from './TeamMember';
import { AgendaDayType } from './Agenda';
import SpeakerCategory from './SpeakerCategory';

type Edition = {
  name: string;
  year?: number;
  description: string;
  coverPhoto?: CloudinaryPhoto;
  startDate: string;
  endDate: string;
  venue: Venue;
  speakerCategories?: SpeakerCategory[];
  speakers?: Speaker[];
  previousSpeakersYear?: number;
  sponsorCategories?: SponsorCategory[];
  sponsors?: Sponsor[];
  previousSponsorsYear?: number;
  teamMembers?: TeamMember[];
  agendaDays?: AgendaDayType[];
  previousAgendaYear?: number;
};

export default Edition;
