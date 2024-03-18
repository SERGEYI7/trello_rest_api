import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class Commentary {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    // @ManyToOne(() => User, (user: User) => user.columns)
    // user: User
}
