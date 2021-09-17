import {IUser} from "../interfaces";


export class User
{
  public id: number;
  public first_name:string;
  public last_name:string;
  public email:string;
  public isLogin = false;

  public static me: User; 
  //  = new User({
  //    client_id: -1,
  //    first_name: '',
  //    last_name: '',
  //    email: '',
  //    created_at: ''
  // });

  constructor(data: IUser) {
    this.id = data.client_id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.isLogin = true;
  }


}
