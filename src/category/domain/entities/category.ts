import Entity from "category/@seedwork/domain/entity/entity";
import UniqueEntityId from "../../@seedwork/domain/value-objects/unique-entity-id";

export type CategoryProps = {
  name: string;
  id?: string;
  is_active?: boolean;
  description?: string;
  created_at?: Date;
};

export default class Category extends Entity<CategoryProps> {
  constructor(public readonly props: CategoryProps, id?: UniqueEntityId) {
    super(props, id);
    this.description = this.props.description;
    this.is_active = this.props.is_active;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  get name() {
    return this.props.name;
  }
  get description() {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }
  get is_active() {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at() {
    return this.props.created_at;
  }
}
