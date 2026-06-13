/**
 * The kinds of widget that can live on a dashboard. Backed by a Postgres
 * enum (`widgets_type_enum`). This is the initial set drawn from the product
 * vision and is expected to grow — adding a value requires a migration.
 */
export enum WidgetType {
  Finance = 'finance',
  Sports = 'sports',
  JobAlert = 'job_alert',
  Discount = 'discount',
  TechStack = 'tech_stack',
  Email = 'email',
  Tasks = 'tasks',
  Notes = 'notes',
}
