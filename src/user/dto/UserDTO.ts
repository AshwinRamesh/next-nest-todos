export class UserDTO {
  readonly id: number;
  readonly username: string;
  readonly name: string;

  constructor(id: number, username: string, name: string) {
    this.id = id;
    this.username = username;
    this.name = name;
  }
}