import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinTable, OneToMany } from "typeorm"
import { User } from "src/users/entities/user.entity"
import { Card } from "src/card/entities/card.entity"
import { Expose, Exclude } from "class-transformer"

@Entity()
export class ColumnEntity {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number

    @Column()
    @Expose()
    name: string

    @ManyToOne(() => User, (user: User) => user.columns, {onDelete: "CASCADE", onUpdate: "CASCADE"})    
    user: User

    @OneToMany(() => Card, (card: Card) => card.column, {cascade: true, eager: true})
    cards: Card[]
}
