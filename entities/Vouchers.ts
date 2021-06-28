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
@Entity("vouchers", { schema: "test_generation" })
export class Vouchers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  public id!: number;

  @Column("varchar", { name: "value", nullable: true, length: 256 })
  public value!: string | null;

  @Column("int", { name: "event_id", nullable: true })
  public eventId!: number | null;

  @Column("timestamp", { name: "used_time", nullable: true })
  public usedTime!: Date | null;

  @Column("int", { name: "used_by", nullable: true })
  public usedBy!: number | null;

  @ManyToOne("users", "vouchers", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "used_by", referencedColumnName: "id" }])
  public usedBy2!: User;

  @ManyToOne("events", "vouchers", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "event_id", referencedColumnName: "id" }])
  public event!: Event;
}
