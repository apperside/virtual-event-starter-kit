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

@Index("event_id", ["eventId"], {})
@Index("user_id", ["userId"], {})
@Entity("Rooms", { schema: "test_generation" })
export class Rooms {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("int", { name: "user_id", nullable: true })
  userId!: number | null;

  @Column("int", { name: "event_id", nullable: true })
  eventId!: number | null;

  @Column("varchar", { name: "code", nullable: true, length: 256 })
  code!: string | null;

  @Column("int", { name: "created_at", nullable: true })
  createdAt!: number | null;

  @Column("int", { name: "completed", nullable: true })
  completed!: number | null;

  @ManyToOne("MyEvent", "rooms", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "event_id", referencedColumnName: "id" }])
  event!: Event;

  @ManyToOne("TheUser", "rooms", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user!: User;
}
