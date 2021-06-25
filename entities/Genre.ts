import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "./Artist";
import { Event } from "./Event";

@Entity("Genre", { schema: "test_generation" })
export class Genre {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  public id!: number;

  @Column("varchar", { name: "value", nullable: true, length: 256 })
  public value!: string | null;

  @OneToMany("Artist", "genre2")
  public artists!: Artist[];

  @OneToMany("Event", "genre")
  public events!: Event[];
}
