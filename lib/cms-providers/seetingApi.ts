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
import { Job, Sponsor, Stage, Speaker, Event } from '@lib/types';


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
  const res = await fetch("https://api.seetingapp.com/api/events/future", {
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
  const res = await fetch(`https://api.seetingapp.com/api/events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const data = await res.json();
  console.log("events are", data)
  return Promise.resolve(data.data.event as Event)

}
