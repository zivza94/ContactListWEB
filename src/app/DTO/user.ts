import { Contact } from './contact'
import { Group } from './groups'

export class User {
    constructor(
        public username: string,
        public password: string,
        public contacts:Array<Contact>,
        public groups:Array<Group>,
        public idsConter:number[]
    ){}
}
