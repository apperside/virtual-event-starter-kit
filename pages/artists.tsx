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
import ArtistsGrid from '@components/artists-grid';
import Layout from '@components/layout';
import Header from '@components/header';

import { getAllArtists, getAllSpeakers } from '@lib/cms-api';
import { Artist, Speaker } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';
import { useEffect } from "react";

type Props = {
  artists: Artist[];
};

export default function Artists({ artists }: Props) {
  const meta = {
    title: 'Speakers - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Speakers" description={meta.description} />
        <ArtistsGrid artists={artists} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const artists: any[] = await getAllArtists();

  return {
    props: {
      artists
    },
    revalidate: 60
  };
};
