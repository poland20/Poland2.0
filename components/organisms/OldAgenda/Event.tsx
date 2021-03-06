import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import moment from 'moment';
import Markdown from 'react-markdown';

import { _bold, rhythm } from '../../typography';
import {breakpointMin, colors, shadow, shadowActive} from '../../variables';
import { SpeakerList, SpeakerItem } from './Speaker';
import { AgendaEventType } from '../../../types/Agenda';

export const EventList = styled('ol')({
  listStyle: 'none',
  padding: 0,
  marginBottom: rhythm(1),
  marginLeft: 0,
});

const Content = styled('div')({
  paddingRight: rhythm(1),
  paddingLeft: rhythm(1.8),
  '> div': {
    marginBottom: rhythm(1)
  }
});

const Dash = styled('div')((props: { color?: string }) => ({
  position: 'absolute',
  left: rhythm(0.6),
  top: rhythm(1.4),
  height: 4,
  width: rhythm(0.75),
  backgroundColor: props.color || `${colors.red}`,
}));

const Line = styled('div')((props: { color?: string }) => ({
  zIndex: 1,
  position: 'absolute',
  top: 0,
  height: '100%',
  left: rhythm(0.6),
  width: 4,
  backgroundColor: props.color || `${colors.red}`,
}));

const Main = styled('section')(
  shadow,
  {
    padding: `${rhythm(1)} 0`,
    position: 'relative',
    backgroundColor: `${colors.white}`,
    border: '1px solid rgba(1, 1, 1, 0.12)',
    '&:hover': shadowActive,
  },
);

const Permalink = styled('a')({
  zIndex: 1,
  position: 'absolute',
  top: rhythm(1),
  right: rhythm(1),
  overflow: 'hidden',
  color: `${colors.gray}`,
  '& > *': {
    display: 'inline-block',
  },
});

const Summary = styled('section')({
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  [breakpointMin('mobile')]: {
    flexDirection: 'row'
  }
});

const TimeAndType = styled('div')(
  {
    display: 'flex',
    color: `${colors.grayDark}`,
    marginBottom: rhythm(0.25)
  },
);

const Wrapper = styled('li')({
  padding: '1rem 0',
  position: 'relative',
  marginBottom: 0
});

const permalinkIcon = css({
  zIndex: 1,
  transform: 'translateX(0)',
  margin: 0,
  marginLeft: rhythm(0.25),
  verticalAlign: 'middle',
  fontSize: rhythm(1),
});

const Duration: React.StatelessComponent<{ start: string, end: string }> =
  ({ start, end }) => {
    const startDate = start ? new Date(start) : undefined;
    const endDate = end ? new Date(end) : undefined;
    const startTime = moment.utc(start).format('HH:mm');
    const endTime = moment.utc(end).format('HH:mm');

    if (startDate && endDate) {
      return (
        <span className={_bold}>
          <time dateTime={startDate.toISOString()}>{startTime}</time>
          <span>-</span>
          <time dateTime={endDate.toISOString()}>{endTime}</time>
        </span>
      );
    }
    if (startDate) {
      return (
        <span className={_bold}>
          <time dateTime={startDate.toISOString()}>{startTime}</time>
          <span>-</span>
          <span>onwards</span>
        </span>
      );
    }
    if (endDate) {
      return (
        <span className={_bold}>
          <span>Until </span>
          <time dateTime={endDate.toISOString()}>{endTime}</time>
        </span>
      );
    }

    return <div/>;
  };

export const Event: React.StatelessComponent<{ event: AgendaEventType }> = ({ event }) => {
  const categoryColor = event.category && event.category.color;
  // const eventSlug = `event-${event.slug}`;

  return (
    <Wrapper>
      <Line color={categoryColor}/>
      <Main>
        <Dash color={categoryColor}/>
        {/* <Permalink href={`#${eventSlug}`} title="Link to this event">
          <LinkIcon css={permalinkIcon}/>
        </Permalink> */}
        <Content>
          <header style={{ marginBottom: rhythm(1) }}>
            <TimeAndType>
              {event.startTime && event.endTime &&
                <Duration start={event.startTime} end={event.endTime}/>
              }
              <span style={{ marginLeft: rhythm(0.5) }}>{event.type}</span>
            </TimeAndType>
            <h3 className={_bold}>{event.name}</h3>
          </header>
          {event.description && <Markdown>{event.description}</Markdown>}
          <Summary>
            <SpeakerList>
              {event.speakers &&
                event.speakers.map((speaker, index) =>
                  <SpeakerItem key={index} {...speaker}/>
                )
              }
            </SpeakerList>
          </Summary>
          {/* {event.venue && <Venue venue={event.venue}/>} */}
        </Content>
      </Main>
    </Wrapper>
  );
};
