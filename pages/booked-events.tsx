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

import { GetStaticProps } from 'next';

import Page from '@components/page';
import SponsorsGrid from '@components/sponsors-grid';
import EventsGrid from '@components/events-grid';
import Header from '@components/header';
import Layout from '@components/layout';

import { getAllEvents, getAllSponsors } from '@lib/cms-api';
import { Sponsor, Event } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';
import { getSession, useSession } from "next-auth/client";
import React from "react";
import Link from "next/link";

type Props = {
  events: Event[]
};

export default function BookedEventsPage({ events }: Props) {
  const meta = {
    title: 'Expo - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };

  const [session, loading] = useSession()


  console.log("events in page are", events)
  console.log("client side session is", session)
  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Expo" description={meta.description} />
        <div>ciao {JSON.stringify(session)}</div>
        <Link href="/api/auth/signout">LOGOUT</Link>
      </Layout>
    </Page>
  );
}
BookedEventsPage.auth = true;
export const getServerSideProps: GetStaticProps<Props> = async ({ req }: any) => {
  const session = await getSession({ req })
  console.log("server side session is", session)
  const events = await getAllEvents();
  return {
    props: {
      events
    },
  };
};
