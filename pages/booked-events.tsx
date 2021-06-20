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

import EventsGrid from "@components/events-grid";
import Header from '@components/header';
import Layout from '@components/layout';
import Page from '@components/page';
import { getAllEvents } from '@lib/cms-api';
import { META_DESCRIPTION } from '@lib/constants';
import { dbManager } from "@lib/database";
import { Event } from '@lib/types';
import { GetStaticProps } from 'next';
import { getSession, useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";

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
        <Header hero="Eventi" description={meta.description} />
        <div style={{ marginLeft: 32 }}>ciao {(session?.user as any)?.name}</div>
        <Link href="/api/auth/signout"><b><span style={{ marginLeft: 32, color: "#0bb07a" }}>LOGOUT</span></b></Link>
        <EventsGrid events={events} />
      </Layout>
    </Page>
  );
}
BookedEventsPage.auth = true;
export const getServerSideProps: GetStaticProps<Props> = async ({ req }: any) => {
  const session = await getSession({ req })
  console.log("server side session is", session)

  const db_bookings = await dbManager.getModel("Booking");

  const bookings = await db_bookings.find({ userId: session?.user?.userId })
  console.log("bookings", bookings.length);

  // let connection: Connection
  // try {
  //   connection = getConnectionManager().get("app");
  // } catch (err) {
  //   connection = await createConnection({
  //     name: "app",
  //     type: "mysql",
  //     host: "localhost",
  //     port: 3306,
  //     username: "root",
  //     password: "ciaociaociao",
  //     database: "seeting_local",
  //     entities: [new EntitySchema(UserSchema), EventEntity]
  //   });
  //   await connection.synchronize()
  // }

  // const repo = await connection.getRepository("User").query("select * from users")
  // const count = repo.length;
  // // entities: new EntitySchema(Models..User.schema);

  // const conns = getConnectionManager().connections
  // console.log("🚀 ~ file: booked-events.tsx ~ line 63 ~ constgetServerSideProps:GetStaticProps<Props>= ~ metadata", metadata)
  // const defaultConnection = getConnectionManager().get("default")
  // const metadata = defaultConnection.entityMetadatas
  // // console.log("🚀 ~ file: booked-events.tsx ~ line 62 ~ constgetServerSideProps:GetStaticProps<Props>= ~ defaultConnection", defaultConnection)
  // // console.log("🚀 ~ file: booked-events.tsx ~ line 62 ~ constgetServerSideProps:GetStaticProps<Props>= ~ defaultConnection", defaultConnection)
  // try {
  //   const data = await defaultConnection.getRepository("Users").createQueryBuilder("User").getMany()
  //   console.log("🚀 ~ file: booked-events.tsx ~ line 73 ~ constgetServerSideProps:GetStaticProps<Props>= ~ data", data)
  // } catch (err) {
  //   console.log("error", err)
  // }
  // console.log("🚀 ~ file: booked-events.tsx ~ line 64 ~ constgetServerSideProps:GetStaticProps<Props>= ~ connection", connection)


  const events = await getAllEvents();


  return {
    props: {
      events: events.filter((event) => {
        const found = bookings.find((booking: any) => String(booking.eventId) === String(event.id))
        return !!found
      }),

    },
  };
};


