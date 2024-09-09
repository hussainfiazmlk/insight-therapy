import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Index("user-email-idx")
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
