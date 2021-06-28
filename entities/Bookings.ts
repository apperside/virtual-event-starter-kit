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
@Entity("bookings", { schema: "test_generation" })
export class Booking {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  public id!: number;

  @Column("int", { name: "user_id", nullable: true })
  public userId!: number | null;

  @Column("int", { name: "event_id", nullable: true })
  public eventId!: number | null;

  @Column("timestamp", { name: "booked_date", nullable: false })
  public bookedDate!: Date | null;

  @Column("varchar", { name: "payment_id", nullable: true, length: 256 })
  public paymentId!: string | null;

  @Column("varchar", { name: "payment_type", nullable: true, length: 256 })
  public paymentType!: "stripe" | "paypal"

  @Column("varchar", { name: "pin_code", nullable: true, length: 10 })
  public pinCode!: string | null

  // @ManyToOne("events", "bookings", {
  //   onDelete: "NO ACTION",
  //   onUpdate: "NO ACTION",
  // })
  // @JoinColumn([{ name: "event_id", referencedColumnName: "id" }])
  // public event!: Event;

  @ManyToOne("users", "bookings", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  public user!: any;
}
