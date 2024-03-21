import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Exclude, Expose } from "class-transformer"
import { Card } from "src/card/entities/card.entity"


@Entity()
export class Commentary {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @ManyToOne(() => Card, (card: Card) => card.commentaries, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    card: Card
}
