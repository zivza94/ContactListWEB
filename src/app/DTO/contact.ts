import { Group } from './groups';

export class Contact {
    public mobile:Array<string> = new Array<string>()
    public telephone:Array<string> = new Array<string>()
    public mail:Array<string> = new Array<string>()
    public website:string
    public address:string
    public userName:string
    constructor(
        public id:number,
        public name:string,
        public groups:Array<Group>,
        public image:string,
        
    ){}
    
}
