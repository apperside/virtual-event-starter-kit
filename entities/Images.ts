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
  id!: number;

  @Column("int", { name: "event_id", nullable: true })
  eventId!: number | null;

  @Column("varchar", { name: "filename", nullable: true, length: 256 })
  filename!: string | null;

  @ManyToOne(() => Event, (event) => event.images, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "event_id", referencedColumnName: "id" }])
  event!: Event;
}
