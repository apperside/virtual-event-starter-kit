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

import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

import Page from '@components/page';
import ArtistSection from '@components/artist-section';
import Layout from '@components/layout';

import { getAllArtists, getAllSpeakers, getArtistInfo } from '@lib/cms-api';
import { Artist, Speaker } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';

type Props = {
  artist: Artist;
};

export default function ArtistPage(props: Props) {
  // const artist = { "id": 56, "name": "Tredici Pietro 2", "smalllImage": "https://apperside.ngrok.io/artists-images/b3a43aaba22a50ab6cfa768e754f4ee4.PNG", "bigImage": "https://apperside.ngrok.io/artists-images/16e2c2a27e5813a8eb07e7101197a9cf.PNG", "genreName": "Rap" } as Artist;
  const artist = props.artist;
  const meta = {
    title: 'Demo - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <ArtistSection artist={artist} />
      </Layout>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  console.log("ciao")
  const slug = params?.slug;
  const artist = await getArtistInfo(slug as any)
  // const artist = await Promise.resolve({ "id": 56, "full_name": "Tredici Pietro 2", "password": null, "rights_level": 1, "genre": 1, "last_login": null, "spotify_playlist": "37i9dQZF1DWVQfeA9N7Q0g", "spotify_id": "ASD", "small_image": "https://apperside.ngrok.io/artists-images/b3a43aaba22a50ab6cfa768e754f4ee4.PNG", "big_image": "https://apperside.ngrok.io/artists-images/16e2c2a27e5813a8eb07e7101197a9cf.PNG", "privacy_accepted": 0, "genreName": "Rap" } as Artist)
  // const speakers = await getAllSpeakers();
  // const currentSpeaker = speakers.find((s: Speaker) => s.slug === slug) || null;

  // if (!artist) {
  //   return {
  //     notFound: true
  //   };
  // }

  return {
    props: {
      artist//: { "id": 56, "name": "Tredici Pietro 2", "smalllImage": "https://apperside.ngrok.io/artists-images/b3a43aaba22a50ab6cfa768e754f4ee4.PNG", "bigImage": "https://apperside.ngrok.io/artists-images/16e2c2a27e5813a8eb07e7101197a9cf.PNG", "genreName": "Rap" } as Artist
    },
    // revalidate: 60
  };
};

// export const getStaticPaths: GetStaticPaths = async (prova: any) => {
//   console.log("prova is", prova)
//   const artists = await getAllArtists();
//   const slugs = artists.map((s: Artist) => ({ params: { slug: String(s.id) } }));
//   // const data = await Promise.resolve([])
//   return {
//     paths: [],//slugs,
//     fallback: false
//   };
// };
