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

import * as strapiApi from './cms-providers/strapi';
import * as agilityApi from './cms-providers/agility';
import * as datoCmsApi from './cms-providers/dato';
import * as contentfulApi from './cms-providers/contentful';
import * as prismicApi from './cms-providers/prismic';
import * as storyblokApi from './cms-providers/storyblok';
import * as seetingApi from './cms-providers/seetingApi';

interface ICMSApi {
  getAllSpeakers: () => Promise<Speaker[]>;
  getAllStages: () => Promise<Stage[]>;
  getAllSponsors: () => Promise<Sponsor[]>;
  getAllJobs: () => Promise<Job[]>;
  getAllEvents: () => Promise<Event[]>
}
let cmsApi: ICMSApi

if (process.env.DATOCMS_READ_ONLY_API_TOKEN) {
  cmsApi = datoCmsApi;
} else if (process.env.CONTENTFUL_ACCESS_TOKEN && process.env.CONTENTFUL_SPACE_ID) {
  cmsApi = contentfulApi;
} else if (process.env.STORYBLOK_PREVIEW_TOKEN) {
  cmsApi = storyblokApi;
} else if (process.env.PRISMIC_REPO_ID) {
  cmsApi = prismicApi;
} else if (
  process.env.AGILITY_GUID &&
  process.env.AGILITY_API_FETCH_KEY &&
  process.env.AGILITY_API_PREVIEW_KEY
) {
  cmsApi = agilityApi;
} else if (process.env.STRAPI_API_URL) {
  cmsApi = strapiApi;
} else {
  cmsApi = {
    getAllSpeakers: async () => Promise.resolve([]),
    getAllStages: async () => Promise.resolve([]),
    getAllSponsors: async () => Promise.resolve([]),
    getAllJobs: async () => Promise.resolve([]),
    getAllEvents: async () => Promise.resolve([])
  };
}

export async function getAllSpeakers(): Promise<Speaker[]> {
  return cmsApi.getAllSpeakers();
}

export async function getAllStages(): Promise<Stage[]> {
  return cmsApi.getAllStages();
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  return cmsApi.getAllSponsors();
}

export async function getAllJobs(): Promise<Job[]> {
  return cmsApi.getAllJobs();
}

export async function getAllEvents(): Promise<Event[]> {
  return seetingApi.getAllEvents();
}

export async function getEventDetails(id: number): Promise<Event> {
  return seetingApi.getEventDetails(id);
}

export async function getAllArtists(): Promise<Artist[]> {
  return seetingApi.getArtists();
}

export async function getArtistInfo(id: number): Promise<Artist> {
  return seetingApi.getArtistInfo(id);
}

