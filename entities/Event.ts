import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Bookings } from "./Bookings";
import { Genre } from "./Genre";
import { EventArtists } from "./EventArtists";
import { Images } from "./Images";
import { Rooms } from "./Rooms";
import { Vouchers } from "./Vouchers";

@Index("genre_id", ["genreId"], {})
@Entity("MyEvent", { schema: "test_generation" })
export class Event {
  @Column("int", { primary: true, name: "id" })
  id!: number;

  @Column("varchar", { name: "title", nullable: true, length: 256 })
  title!: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 256 })
  description!: string | null;

  @Column("datetime", { name: "date", nullable: true })
  date!: Date | null;

  @Column("int", { name: "start_ticket_opening", nullable: true })
  startTicketOpening!: number | null;

  @Column("int", { name: "available_tickets", nullable: true })
  availableTickets!: number | null;

  @Column("int", { name: "duration", nullable: true })
  duration!: number | null;

  @Column("decimal", { name: "price", nullable: true, precision: 10, scale: 0 })
  price!: string | null;

  @Column("varchar", { name: "type", nullable: true, length: 256 })
  type!: string | null;

  @Column("int", { name: "genre_id", nullable: true })
  genreId!: number | null;

  @OneToMany("Bookings", "event")
  bookings!: Bookings[];

  @ManyToOne(() => Genre, (genre) => genre.events, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "genre_id", referencedColumnName: "id" }])
  genre!: Genre;

  @OneToMany("Event_artists", "event")
  eventArtists!: EventArtists[];

  @OneToMany("Images", "event")
  images!: Images[];

  @OneToMany("Rooms", "event")
  rooms!: Rooms[];

  @OneToMany("Vouchers", "event")
  vouchers!: Vouchers[];
}
