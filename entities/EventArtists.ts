import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Event } from "./Event";
import { Artist } from "./Artist";

@Index("event_id", ["eventId"], {})
@Index("artist_id", ["artistId"], {})
@Entity("Event_artists", { schema: "test_generation" })
export class EventArtists {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("int", { name: "event_id", nullable: true })
  eventId!: number | null;

  @Column("int", { name: "artist_id", nullable: true })
  artistId!: number | null;

  @ManyToOne("MyEvent", "eventArtists", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "event_id", referencedColumnName: "id" }])
  event!: Event;

  @ManyToOne("Artist", "eventArtists", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "artist_id", referencedColumnName: "id" }])
  artist!: Artist;
}
