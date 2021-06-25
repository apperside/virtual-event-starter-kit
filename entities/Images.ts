import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Event } from "./Event";

@Index("event_id", ["eventId"], {})
@Entity("Images", { schema: "test_generation" })
export class Images {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  public id!: number;

  @Column("int", { name: "event_id", nullable: true })
  public eventId!: number | null;

  @Column("varchar", { name: "filename", nullable: true, length: 256 })
  public filename!: string | null;

  @ManyToOne("Event", "images", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "event_id", referencedColumnName: "id" }])
  public event!: Event;
}
