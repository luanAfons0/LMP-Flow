import { Migration } from '@mikro-orm/migrations';

export class Migration20251116224624 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table \`order_product\` add \`related_order_id\` int unsigned not null;`,
    );
    this.addSql(
      `alter table \`order_product\` modify \`total_value\` numeric(10,2) not null default 0;`,
    );
    this.addSql(
      `alter table \`order_product\` add constraint \`order_product_related_order_id_foreign\` foreign key (\`related_order_id\`) references \`order\` (\`id\`) on update cascade;`,
    );
    this.addSql(
      `alter table \`order_product\` add index \`order_product_related_order_id_index\`(\`related_order_id\`);`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table \`order_product\` drop foreign key \`order_product_related_order_id_foreign\`;`,
    );

    this.addSql(
      `alter table \`order_product\` drop index \`order_product_related_order_id_index\`;`,
    );
    this.addSql(
      `alter table \`order_product\` drop column \`related_order_id\`;`,
    );

    this.addSql(
      `alter table \`order_product\` modify \`total_value\` decimal(10,2) not null default 0.00;`,
    );
  }
}
