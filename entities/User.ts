import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bookings } from "./Bookings";
import { Rooms } from "./Rooms";
import { Transactions } from "./Transactions";
import { Vouchers } from "./Vouchers";

@Entity("TheUser", { schema: "test_generation" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "spotify_id", nullable: true, length: 256 })
  spotifyId!: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 256 })
  email!: string | null;

  @Column("timestamp", { name: "signup_date", nullable: true })
  signupDate!: Date | null;

  @Column("int", { name: "balance", nullable: true })
  balance!: number | null;

  @OneToMany("Bookings", "user")
  bookings!: Bookings[];

  @OneToMany("Rooms", "user")
  rooms!: Rooms[];

  @OneToMany("Transactions", "user")
  transactions!: Transactions[];

  @OneToMany("Vouchers", "usedBy2")
  vouchers!: Vouchers[];
}
