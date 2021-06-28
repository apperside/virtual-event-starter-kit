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
@Entity("rooms", { schema: "test_generation" })
export class Rooms {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  public id!: number;

  @Column("int", { name: "user_id", nullable: true })
  public userId!: number | null;

  @Column("int", { name: "event_id", nullable: true })
  public eventId!: number | null;

  @Column("varchar", { name: "code", nullable: true, length: 256 })
  public code!: string | null;

  @Column("int", { name: "created_at", nullable: true })
  public createdAt!: number | null;

  @Column("int", { name: "completed", nullable: true })
  public completed!: number | null;

  @ManyToOne("events", "rooms", { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "event_id", referencedColumnName: "id" }])
  public event!: Event;

  @ManyToOne("users", "rooms", { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  public user!: User;
}
