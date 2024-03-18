import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    // @ManyToOne(() => User, (user: User) => user.columns)
    // user: User
}

