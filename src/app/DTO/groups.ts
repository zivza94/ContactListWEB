import { Contact } from './contact';

export class Group {
    constructor(
        public groupName:string,
        public contacts:Array<Contact>
    ){}
}
