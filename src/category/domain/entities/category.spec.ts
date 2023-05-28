import UniqueEntityId from '../../@seedwork/domain/value-objects/unique-entity-id'
import Category, { CategoryProps } from "./category";
import { omit } from "lodash";



describe("Category Unit Tests", () => {
  test("category constructor", () => {
    let category = new Category({ name: "Movie1" });
    let props = omit(category.props, "created_at");
    // Assert
    expect(props).toStrictEqual({
      name: "Movie1",
      is_active: true,
      description: null,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    category = new Category({
      name: "Movie1",
      is_active: false,
      description: null,
    });
    let created_at = new Date();
    expect(category.props).toStrictEqual({
      name: "Movie1",
      is_active: false,
      description: null,
      created_at,
    });

    category = new Category({
      name: "Movie1",
      description: "Description of Movie1",
    });
    expect(category.props).toMatchObject({
      name: "Movie1",
      description: "Description of Movie1",
    });

    category = new Category({
      name: "Movie1",
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie1",
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: "Movie1",
      created_at,
    });
    expect(category.props).toMatchObject({
      name: "Movie1",
      created_at,
    });
  });

  test("test id field", () => {
    type CategoryData = { props: CategoryProps; id?: string };
    const data: CategoryData[] = [
      { props: { name: "Movie1" } },
      { props: { name: "Movie1", id: null } },
      { props: { name: "Movie1", id: undefined } },
      { props: { name: "Movie1", id: "875a3cba-e53c-4b61-a17c-dbbffe648539" } },
    ];

    data.forEach((item) => {
      const category = new Category(item.props as any);
      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("name field getter", () => {
    const category = new Category({ name: "Movie1" });
    expect(category.name).toBe("Movie1");
  });
  test("description field getter and setter", () => {
    let category = new Category({
      name: "Movie1",
      description: "this is a movie description test",
    });
    expect(category.description).toBe("this is a movie description test");

    category = new Category({
      name: "Movie1",
      description: null,
    });
    expect(category.description).toBeNull();

    category = new Category({
      name: "Movie1",
    });
    category["description"] = "testing setter description";
    expect(category.description).toBe("testing setter description");

    category = new Category({
      name: "Movie1",
    });
    category["description"] = undefined;
    expect(category.description).toBeNull();
    category = new Category({
      name: "Movie1",
    });
    category["description"] = null;
    expect(category.description).toBeNull();
  });

  test("is_active field getter and setter", () => {
    let category = new Category({ name: "Movie1" });
    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Movie1",
    });
    category["is_active"] = false;
    expect(category.is_active).toBeFalsy();

    category = new Category({
      name: "Movie1",
    });
    category["is_active"] = undefined;
    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Movie1",
    });
    category["is_active"] = null;
    expect(category.is_active).toBeTruthy();
  });

  test("created_at field getter", () => {
    const created_at = new Date();
    let category = new Category({ name: "Movie1", created_at });
    expect(category.created_at).toBe(created_at);

    category = new Category({ name: "Movie1" });
    expect(category.created_at).toBeInstanceOf(Date);
  });
});
