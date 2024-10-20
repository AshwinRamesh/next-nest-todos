import { Migration } from '@mikro-orm/migrations';

export class Migration20241020080606 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "todolist_item" alter column "details" type varchar(255) using ("details"::varchar(255));`);
    this.addSql(`alter table "todolist_item" alter column "details" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "todolist_item" alter column "details" type varchar(255) using ("details"::varchar(255));`);
    this.addSql(`alter table "todolist_item" alter column "details" set not null;`);
  }

}
