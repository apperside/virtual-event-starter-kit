import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Event } from "./Event";
import { User } from "./User";

@Index("event_id", ["eventId"], {})
@Index("user_id", ["userId"], {})
@Entity("Booking", { schema: "test_generation" })
export class Bookings {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("int", { name: "user_id", nullable: true })
  userId!: number | null;

  @Column("int", { name: "event_id", nullable: true })
  eventId!: number | null;

  @Column("timestamp", { name: "booked_date", nullable: true })
  bookedDate!: Date | null;

  @ManyToOne("Event", "bookings", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "event_id", referencedColumnName: "id" }])
  event!: Event;

  @ManyToOne("TheUser", "bookings", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user!: User;
}
