import React from 'react';
import styled from '@emotion/styled';
import { DefaultPageProps } from './_app';
import Speakers from '../components/Speakers';
import Sponsors from '../components/Sponsors';
import { NextFunctionComponent } from 'next';
import { colors } from '../components/variables';
import Banner from '../components/Banner';
import Agenda from '../components/Agenda';
import Tickets from '../components/Tickets';

export const Background = styled('section')({
  '& > *:nth-of-type(odd)': {
    backgroundColor: `${colors.lightGray}`
  },
  '& > *:nth-of-type(even)': {
    backgroundColor: `${colors.white}`
  }
});

const Home: NextFunctionComponent<DefaultPageProps> = ({ currentEdition, contentControl }) => (
  <React.Fragment>
    {contentControl.ticketControl.onSale &&
      <Tickets ticketControl={contentControl.ticketControl}/>
    }
    <Banner currentEdition={currentEdition}/>
    <Background>
      {contentControl.showAgenda && currentEdition.agendaDays.length > 0 &&
        <Agenda agendaDays={currentEdition.agendaDays}/>
      }
      {contentControl.showSpeakers && currentEdition.speakers.length > 0 &&
        <Speakers
          speakerCategories={currentEdition.speakerCategories}
          speakers={currentEdition.speakers}
        />
      }
      {contentControl.showSponsors &&
        <Sponsors
          id="partners"
          sponsorCategories={currentEdition.sponsorCategories}
          sponsors={currentEdition.sponsors}
          title="Partners"
        />
      }
      {/* {contentControl.showPreviousSponsors &&
        <Sponsors
          id="previous-partners"
          sponsorCategories={previousSponsorCategories}
          title="Previous Partners"
        />
      } */}
    </Background>
  </React.Fragment>
);

export default Home;
