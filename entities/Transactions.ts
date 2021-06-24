import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("user_id", ["userId"], {})
@Entity("Transactions", { schema: "test_generation" })
export class Transactions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("int", { name: "amount", nullable: true })
  amount!: number | null;

  @Column("varchar", { name: "sku", nullable: true, length: 256 })
  sku!: string | null;

  @Column("timestamp", { name: "tx_date", nullable: true })
  txDate!: Date | null;

  @Column("int", { name: "user_id", nullable: true })
  userId!: number | null;

  @ManyToOne(() => User, (user) => user.transactions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user!: User;
}
