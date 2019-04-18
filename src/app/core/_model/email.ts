export class Email {
  name: string;
  address: string;
  message: string;

  composeMessage() {
    return `Name: ${this.name}\nAddress: ${this.address}\n\n${this.message}`;
  }
}
