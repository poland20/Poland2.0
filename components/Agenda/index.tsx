import * as React from 'react';
import styled from '@emotion/styled';
import Container from '../Container';
import Venue from './Venue';
import { bold, Center, dangerousSuperscripts, fat, rhythm, stripe } from '../typography';
import { colors } from '../variables';
import { DayItem, DayList, Description } from './Day';
import { Event, EventList } from './Event';
import { AgendaDay } from '../../types/Agenda';

const Main = styled('main')({
  position: 'relative',
  marginBottom: rhythm(1),
});

const Heading = styled('h1')(bold, fat, stripe);

const Section = styled('section')({
  paddingBottom: rhythm(1)
});

const Timeline = styled('div')({
  position: 'absolute',
  top: rhythm(0.5),
  bottom: rhythm(0.5),
  left: rhythm(0.6),
  width: 4,
  backgroundColor: `${colors.primary}`,
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: `-${rhythm(0.5)}`,
    width: 0,
    height: 0,
    left: `-${rhythm(0.45)}`,
    borderLeft: `${rhythm(0.5)} solid transparent`,
    borderRight: `${rhythm(0.5)} solid transparent`,
    borderTop: `${rhythm(0.5)} solid ${colors.primary}`,
  },
});

interface Props {
  agendaDays: AgendaDay[];
  endDate?: Date;
}

const Agenda: React.StatelessComponent<Props> = ({ agendaDays, endDate }) => (
  <Section id="agenda">
    <Container>
      <Center>
        <Heading>
          {endDate && endDate > new Date() ? 'Agenda' : `Agenda of ${endDate.getFullYear()}`}
        </Heading>
      </Center>
      <Main>
        <DayList>
          {agendaDays.map((day, index) => {
            return (
              <DayItem key={index}>
                <Description>
                  <h3 dangerouslySetInnerHTML={dangerousSuperscripts(day.name)}/>
                  {day.description && <p>{day.description}</p>}
                  {day.venue && <Venue venue={day.venue}/>}
                </Description>
                {day.events &&
                  <EventList>
                    {day.events.map((event, index) =>
                      <Event key={index} event={event}/>,
                    )}
                  </EventList>
                }
              </DayItem>
            );
          })}
        </DayList>
        <Timeline/>
      </Main>
    </Container>
  </Section>
);

export default Agenda;
