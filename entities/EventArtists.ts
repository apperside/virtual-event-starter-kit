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
@Entity("event_artists", { schema: "test_generation" })
export class EventArtists {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  public id!: number;

  @Column("int", { name: "event_id", nullable: true })
  public eventId!: number | null;

  @Column("int", { name: "artist_id", nullable: true })
  public artistId!: number | null;

  @ManyToOne("events", "eventArtists", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "event_id", referencedColumnName: "id" }])
  public event!: Event;

  @ManyToOne("artists", "eventArtists", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "artist_id", referencedColumnName: "id" }])
  public artist!: Artist;
}
