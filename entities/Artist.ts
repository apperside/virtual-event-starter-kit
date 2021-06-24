import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Genre } from "./Genre";
import { EventArtists } from "./EventArtists";

@Index("genre", ["genre"], {})
@Entity("Artist", { schema: "test_generation" })
export class Artist {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "full_name", nullable: true, length: 256 })
  fullName!: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 256 })
  password!: string | null;

  @Column("int", { name: "rights_level", nullable: true })
  rightsLevel!: number | null;

  @Column("int", { name: "genre", nullable: true })
  genre!: number | null;

  @Column("int", { name: "last_login", nullable: true })
  lastLogin!: number | null;

  @Column("varchar", { name: "spotify_playlist", nullable: true, length: 256 })
  spotifyPlaylist!: string | null;

  @ManyToOne("Genre", "artists", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "genre", referencedColumnName: "id" }])
  genre2!: Genre;

  @OneToMany("Event_artists", "artist")
  eventArtists!: EventArtists[];
}
