import { Contact } from './contact'
import { Group } from './groups'

export class User {
    constructor(
        public firstname: string,
        public lastname: string,
        public username: string,
        public password: string,
        public contacts: Array<Contact>,
        public groups: Array<Group>,
        public idsConter: number[]
    ) { }
}
