/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { Event } from '@lib/types';
import styles from './sponsors-grid.module.css';

function EventCard({ event }: { event: Event }) {
  return (
    <Link key={event.id} href={`/event/${event.id}`}>
      <a
        role="button"
        tabIndex={0}
        className={cn(styles.card, {
          [styles.diamond]: event.type === 'webinar',
          [styles.gold]: event.type === 'webstore'
        })}
      >
        <div className={styles.imageWrapper}>
          <Image
            alt={String(event.id)}
            src={event.images[0]?.url ?? event.artists[0].bigImage}
            className={cn(styles.image, {
              [styles.silver]: event.type === 'webinar'
            })}
            loading="lazy"
            title={event.title}
            width={900}
            height={500}
          />
        </div>
        <div className={styles.cardBody}>
          <div>
            <h2 className={styles.name}>{event.artists[0].name}</h2>
            <p className={styles.description}>{event.description}</p>
          </div>
          <div style={{ justifyContent: "flex-end", display: "flex" }}>
            <b><span className="text-primary">{Number(event.price).toFixed(2)}€</span></b>

          </div>
        </div>
      </a>
    </Link>
  );
}

type Props = {
  events: Event[];
};

export default function EventsGrid({ events: events }: Props) {
  const silverSponsors = events.filter(s => s.type === 'webinar');
  const otherSponsors = events.filter(s => s.type !== 'webstore');

  return (
    <>
      <div className={styles.grid}>
        {otherSponsors.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <div className={styles.grid}>
        {silverSponsors.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </>
  );
}
