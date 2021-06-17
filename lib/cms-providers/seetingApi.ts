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
import { Job, Sponsor, Stage, Speaker, Event, Artist } from '@lib/types';

const BASE_URL = process.env.SEETING_API_URL as string;// "https://apperside.ngrok.io/api";
// const BASE_URL="https://api.seetingapp.com/api";
export async function getAllSpeakers(): Promise<Speaker[]> {
  return Promise.resolve([])
}

export async function getAllStages(): Promise<Stage[]> {
  return Promise.resolve([])
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  return Promise.resolve([])
}

export async function getAllJobs(): Promise<Job[]> {
  return Promise.resolve([])
}

export async function getAllEvents(): Promise<Event[]> {
  const res = await fetch(BASE_URL + "/events/future", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const data = await res.json();
  console.log("events are", data)
  return Promise.resolve(data.data.events as Event[])

}

export async function getEventDetails(id: number): Promise<Event> {
  const res = await fetch(`${BASE_URL}/events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const data = await res.json();
  console.log("events are", data)
  return Promise.resolve(data.data.event as Event)

}

export async function getArtists(): Promise<Artist[]> {
  try {
    const res = await fetch(`${BASE_URL}/artists/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const json = await res.json();
    const items = json.items as any[];
    return items.map((rawArtist) => {
      return {
        id: rawArtist.id,
        bigImage: rawArtist.big_image,
        smallImage: rawArtist.small_image,
        name: rawArtist.full_name,
        genreName: rawArtist.genreName
      } as Artist
    })
  } catch (err) {
    console.error("erorr getting artists", err);
    return []
  }

}

export async function getArtistInfo(id: number): Promise<Artist> {
  const res = await fetch(`${BASE_URL}/artist/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const json = await res.json();
  const rawArtist = json.data.artist;
  const result = {
    id: rawArtist.id,
    bigImage: rawArtist.big_image,
    smallImage: rawArtist.small_image,
    name: rawArtist.full_name,
    genreName: rawArtist.genreName
  } as Artist
  return result

}
