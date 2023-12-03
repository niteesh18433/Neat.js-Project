import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, MinLength } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}



