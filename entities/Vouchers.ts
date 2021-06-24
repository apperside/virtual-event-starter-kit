import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Event } from "./Event";

@Index("used_by", ["usedBy"], {})
@Index("event_id", ["eventId"], {})
@Entity("Vouchers", { schema: "test_generation" })
export class Vouchers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "value", nullable: true, length: 256 })
  value!: string | null;

  @Column("int", { name: "event_id", nullable: true })
  eventId!: number | null;

  @Column("timestamp", { name: "used_time", nullable: true })
  usedTime!: Date | null;

  @Column("int", { name: "used_by", nullable: true })
  usedBy!: number | null;

  @ManyToOne("TheUser", "vouchers", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "used_by", referencedColumnName: "id" }])
  usedBy2!: User;

  @ManyToOne("MyEvent", "vouchers", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "event_id", referencedColumnName: "id" }])
  event!: Event;
}
