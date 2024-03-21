import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { ColumnEntity } from "src/column/entities/column.entity"
import { Expose, Exclude } from 'class-transformer'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column()
    @Expose()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @OneToMany(() => ColumnEntity, (column: ColumnEntity) => column.user, {cascade: true, eager: true})
    @Expose()
    columns: ColumnEntity[];
}