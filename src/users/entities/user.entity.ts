import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { ColumnEntity } from "src/column/entities/column.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => ColumnEntity, (column: ColumnEntity) => column.user)
    columns: ColumnEntity[];
}