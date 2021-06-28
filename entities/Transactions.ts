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
@Entity("transactions", { schema: "test_generation" })
export class Transactions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  public id!: number;

  @Column("int", { name: "amount", nullable: true })
  public amount!: number | null;

  @Column("varchar", { name: "sku", nullable: true, length: 256 })
  public sku!: string | null;

  @Column("timestamp", { name: "tx_date", nullable: true })
  public txDate!: Date | null;

  @Column("int", { name: "user_id", nullable: true })
  public userId!: number | null;

  @ManyToOne("users", "transactions", {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  public user!: User;
}
