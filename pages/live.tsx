/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
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
import Script from 'next/script'
import Page from '@components/page';
import SpeakerSection from '@components/speaker-section';
import Layout from '@components/layout';

import { getAllSpeakers } from '@lib/cms-api';
import { Speaker } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';
import React, { useEffect } from "react";
import Ticket from "@components/ticket";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Head from "next/head";

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

  useEffect(() => {
    // const _options = {
    //   '_license_key': '874-399-679',
    //   '_role_token': '',
    //   '_registration_token': '',
    //   '_widget_containerID': 'embedWidget',
    //   '_widget_width': '100%',
    //   '_widget_height': '100vh',
    // };

    // const func = (i: any) => {
    //   i.Widget = function (c) {
    //     'function' == typeof c && i.Widget.__cbs.push(c),
    //       i.Widget.initialized && (i.Widget.__cbs.forEach(function (i) { i() }),
    //         i.Widget.__cbs = [])
    //   },
    //     i.Widget.__cbs = []
    // }

    // func(window)
    // const ab = document.createElement('script');
    // ab.type = 'text/javascript';
    // ab.async = true;
    // ab.src = 'https://embed.livewebinar.com/em?t=' + _options['_license_key'] + '&' + Object.keys(_options).reduce(function (a: any, k: any) {
    //   a.push(`${k}=${encodeURIComponent((_options as any)[k]) as any}`);
    //   return a;
    // }, []).join('&');
    // const s = document.getElementsByTagName('script')[0];
    // s.parentNode?.insertBefore(ab, s);

  }, [])
  // router.query.bookingId!
  return (
    <>
      <Script id="655c0f51-1a63-1a61-4c2a-2f3dff2d0ca9-live-a0a8ecd6-a08d-d4d5-b8b3-c5f4bceaed30" width="100%" height="100%" src="https://player.dacast.com/js/player.js?contentId=655c0f51-1a63-1a61-4c2a-2f3dff2d0ca9-live-a0a8ecd6-a08d-d4d5-b8b3-c5f4bceaed30" class="dacast-video"></Script>
      <Page meta={meta}>
        <Layout>
          {/* <div id="embedWidget"></div> */}
        </Layout>
      </Page>
    </>
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
