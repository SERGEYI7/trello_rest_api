import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinTable } from "typeorm"
import { User } from "src/users/entities/user.entity"
import { Expose, Exclude } from "class-transformer"

@Entity()
export class ColumnEntity {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number

    @Column()
    @Expose()
    name: string

    @ManyToOne(() => User, (user: User) => user.columns)    user: User
}
