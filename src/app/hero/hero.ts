export class Hero {
  id: number;
  firstName: string;
  lastName: string;

  fullName(): string {
      return this.firstName + ' ' + this.lastName;
  }
}
