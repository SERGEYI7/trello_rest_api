import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ColumnEntity } from "src/column/entities/column.entity"
import { Commentary } from "src/commentary/entities/commentary.entity"
import { Expose, Exclude } from "class-transformer"

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => ColumnEntity, (column: ColumnEntity) => column.cards, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    column: ColumnEntity

    @OneToMany(() => Commentary, (commentary: Commentary) => commentary.card, {cascade: true, eager: true})
    commentaries: Commentary[]
}

