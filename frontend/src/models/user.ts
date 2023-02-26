interface UserInterface {
    id?: string;
    username: string;
    email: string;
    password: string;
}
   
class User implements UserInterface {
    id?: string;
    username: string;
    email: string;
    password: string;
   
    constructor(username: string, email: string, password: string, id?: string) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
    }
}

export default User;