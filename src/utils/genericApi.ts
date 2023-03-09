export class GenericApi {
  public route: string;
  private url = "http://127.0.0.1:8000";

  constructor(route: string) {
    this.route = route;
  }

  public async getAll() {
    const response = await fetch(`${this.url}/${this.route}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  }

  public async get(id: number) {
    const response = await fetch(`${this.url}/${this.route}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  }

  public async post(data: any) {
    const response = await fetch(`${this.url}/${this.route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.status;
  }

  public async put(id: number, data: any) {
    const response = await fetch(`${this.url}/${this.route}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(`dados: `,`${this.url}/${this.route}/${id}`, data);
    return response.status;
  }

  public async delete(id: number) {
    const response = await fetch(`${this.url}/${this.route}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.status;
  }

  public async filterByParam(filter: string, param: string) {
    const response = await fetch(
      `${this.url}/${this.route}/${filter}/${param}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    // console.log(`${this.url}/${this.route}/${filter}/${param}`);
    return await json;
  }

  public async attachIngredientToRecipe(recipeId: number, body: any) {
    const response = await fetch(
      `${this.url}/${this.route}/${recipeId}/ingredient`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    return response.status;
  }
}
