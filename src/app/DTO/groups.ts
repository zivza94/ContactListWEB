import { Contact } from './contact';

export class Group {
    constructor(
        public groupID:number,
        public groupName:string,
        public contacts:Array<Contact>
    ){}
}
