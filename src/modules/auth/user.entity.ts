import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    hashCode: string

    @CreateDateColumn({ name: "created_at"})
    createdAt: Date

    @UpdateDateColumn({ name: "updated_at"})
    updatedAt: Date
}
