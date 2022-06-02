import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class User1654059818002 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'varchar'
                },
                {
                    name: "hashCode",
                    type: 'varchar',
                    isNullable: true,
                    default: null
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'current_timestamp'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'current_timestamp'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }
}
