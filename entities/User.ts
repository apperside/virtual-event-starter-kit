import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bookings } from "./Bookings";
import { Rooms } from "./Rooms";
import { Transactions } from "./Transactions";
import { Vouchers } from "./Vouchers";

@Entity("TheUser", { schema: "test_generation" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  public id!: number;

  @Column("varchar", { name: "spotify_id", nullable: true, length: 256 })
  public spotifyId!: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 256 })
  public email!: string | null;

  @Column("timestamp", { name: "signup_date", nullable: true })
  public signupDate!: Date | null;

  @Column("int", { name: "balance", nullable: true })
  public balance!: number | null;

  @OneToMany("Bookings", "user")
  public bookings!: Bookings[];

  @OneToMany("Rooms", "user")
  public rooms!: Rooms[];

  @OneToMany("Transactions", "user")
  public transactions!: Transactions[];

  @OneToMany("Vouchers", "usedBy2")
  public vouchers!: Vouchers[];
}
