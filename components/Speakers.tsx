import React from 'react';
import Markdown from 'react-markdown';
import styled, { css } from 'react-emotion';
import {
  Container,
  rhythm,
  Center,
  bold,
  fat,
  stripe,
  CardList,
  Card,
  fill,
  Modal,
  breakpointMin
} from 'p20-components';
import { SpeakerCategories, Speaker } from '../pages';
import ModalCard from './ModalCard';

const LearnMore = styled('small')({
  [breakpointMin('tablet')]: {
    display: 'none'
  }
});

const Title = styled('h1')(bold, fat, stripe);

const Wrapper = styled('section')({
  position: 'relative',
  paddingBottom: rhythm(0.5)
});

export const smallMarginBottom = css({
  marginBottom: rhythm(0.25),
  wordWrap: 'normal'
});

const speakerCard = (speaker: Speaker, index?: number) => (
  <Card
    key={index}
    image={fill(speaker.photo.secure_url, 300, 300, { gravity: 'faces' })}
    imagePreview={fill(speaker.photo.secure_url, 32, 32, { gravity: 'faces' })}
    footer={(
      <React.Fragment>
        {speaker.position}<br/>
        {index ? '' : <LearnMore>Tap on the image to learn more...</LearnMore>}
      </React.Fragment>
    )}
  >
    <Center>
      <h3 className={smallMarginBottom}>{speaker.name}</h3>
      <h4>{speaker.company && speaker.company}</h4>
    </Center>
  </Card>
);

const Speakers: React.StatelessComponent<{ speakerCategories: SpeakerCategories }> =
  ({ speakerCategories }) => (
    <Wrapper id="speakers">
      <Container>
        <Center><Title>Speakers</Title></Center>
          {speakerCategories && speakerCategories.map((category, index) => (
            <React.Fragment key={index}>
              <Center><h2>{category.displayName}</h2></Center>
              <CardList>
                {category.speakers && category.speakers.length > 0 &&
                  category.speakers.map((speaker, index) =>
                    speaker.description.md ?
                      <Modal
                        key={index}
                        trigger={speakerCard(speaker)}
                        label={`Learn more about ${speaker.name}`}
                      >
                        <ModalCard>
                          <h1 className={smallMarginBottom}>{speaker.name}</h1>
                          <p>
                            <strong>
                              {speaker.position}{speaker.company && `, ${speaker.company}`}
                            </strong>
                          </p>
                          <Markdown>{speaker.description.md}</Markdown>
                        </ModalCard>
                      </Modal>
                    : speakerCard(speaker, index)
                  )
                }
              </CardList>
            </React.Fragment>
          ))}
      </Container>
    </Wrapper>
  );

export default Speakers;
