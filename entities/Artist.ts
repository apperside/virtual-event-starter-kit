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
@Entity("artists", { schema: "test_generation" })
export class Artist {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  public id!: number;

  @Column("varchar", { name: "full_name", nullable: true, length: 256 })
  public fullName!: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 256 })
  public password!: string | null;

  @Column("int", { name: "rights_level", nullable: true })
  public rightsLevel!: number | null;

  @Column("int", { name: "genre", nullable: true })
  public genre!: number | null;

  @Column("int", { name: "last_login", nullable: true })
  public lastLogin!: number | null;

  @Column("varchar", { name: "spotify_playlist", nullable: true, length: 256 })
  public spotifyPlaylist!: string | null;

  @ManyToOne("genres", "artists", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    cascade: ["insert"]
  })
  @JoinColumn([{ name: "genre", referencedColumnName: "id", }])
  public genre2!: Genre;

  @OneToMany("event_artists", "artist")
  public eventArtists!: EventArtists[];
}
