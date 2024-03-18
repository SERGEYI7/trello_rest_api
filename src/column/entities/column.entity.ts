import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import {User} from "src/users/entities/user.entity"

@Entity()
export class ColumnEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => User, (user: User) => user.columns)
    user: User
}
