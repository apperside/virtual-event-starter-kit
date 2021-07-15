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

import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/page';
import SpeakerSection from '@components/speaker-section';
import Layout from '@components/layout';

import { getAllSpeakers } from '@lib/cms-api';
import { Speaker } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';
import React from "react";
import Ticket from "@components/ticket";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

type Props = {
  // speaker: Speaker;
  // bookingId: string
};

export default function PurchaseSuccessPage({ }: Props) {
  const meta = {
    title: 'Demo - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };

  const [session] = useSession()
  const router = useRouter()
  // router.query.bookingId!
  return (
    <Page meta={meta}>
      <Layout>
        <Ticket
          username={session?.user?.name ?? ""}
          name={session?.user?.name ?? ""}
          ticketNumber={router.query.bookingId! as any}
          sharePage={true}
        />
      </Layout>
    </Page>
  );
}



// export const getStaticProps: GetStaticProps<Props> = async (context) => {
//   const bookingId = context.params?.bookingId as string
//   // const events = await getAllEvents();
//   return {
//     props: {
//       bookingId: bookingId
//     },
//     revalidate: 60
//   };
// };
