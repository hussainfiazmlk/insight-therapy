import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({})
export class Logs {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Index("user-id-idx")
  @Column()
  user_id: string;

  @Column()
  method: string;

  @Column("json", { nullable: true })
  oldValues?: any;

  @Column("json", { nullable: true })
  newValues: any;

  @CreateDateColumn()
  created_at?: Date;
}
