import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Bookings";
import { Rooms } from "./Rooms";
import { Transactions } from "./Transactions";
import { Vouchers } from "./Vouchers";

@Entity("users", { schema: "test_generation" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  public id!: number;

  @Column("varchar", { name: "name", nullable: true, length: 256 })
  public name!: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 256 })
  public email!: string | null;

  @Column("boolean", { name: "email_verified", nullable: true })
  public emailVerified!: boolean

  @Column("varchar", { name: "image", nullable: true, length: 256 })
  public image!: string | null;

  @Column("timestamp", { name: "created_at", nullable: true })
  public createdAt!: number | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  public updatedAt!: number | null;

  @Column("varchar", { name: "phone_number", nullable: true, length: 256 })
  public phoneNumber!: string | null;

  @Column("varchar", { name: "stripe_customer_id", nullable: true, length: 256 })
  public stripeCustomerId!: string | null;
}
