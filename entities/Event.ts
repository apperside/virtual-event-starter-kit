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
@Entity("Event", { schema: "test_generation" })
export class Event {
  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("varchar", { name: "title", nullable: true, length: 256 })
  public title!: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 256 })
  public description!: string | null;

  @Column("datetime", { name: "date", nullable: true })
  public date!: Date | null;

  @Column("int", { name: "start_ticket_opening", nullable: true })
  public startTicketOpening!: number | null;

  @Column("int", { name: "available_tickets", nullable: true })
  public availableTickets!: number | null;

  @Column("int", { name: "duration", nullable: true })
  public duration!: number | null;

  @Column("decimal", { name: "price", nullable: true, precision: 10, scale: 0 })
  public price!: string | null;

  @Column("varchar", { name: "type", nullable: true, length: 256 })
  public type!: string | null;

  @Column("int", { name: "genre_id", nullable: true })
  public genreId!: number | null;

  @OneToMany("Bookings", "event")
  public bookings!: Bookings[];

  @ManyToOne("Genre", "events", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "genre_id", referencedColumnName: "id" }])
  public genre!: Genre;

  @OneToMany("Event_artists", "event")
  public eventArtists!: EventArtists[];

  @OneToMany("Images", "event")
  public images!: Images[];

  @OneToMany("Rooms", "event")
  public rooms!: Rooms[];

  @OneToMany("Vouchers", "event")
  public vouchers!: Vouchers[];
}
